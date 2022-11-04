(() => {
  const TIMEOUT_ERR_TEXT = "__TIMEOUT__";
  const DEFAULT_INTERVAL = 300;

  function moveToNext() {
    window.parent.parent.postMessage("end", `chrome-extension://${chrome.runtime.id}/`);
  }

  function repeatCheck({ checker, interval = 300, checkError = false }) {
    let isTimeout = false;
    const checkTimeout = () => isTimeout;
    setTimeout(() => {
      isTimeout = true;
    }, 2000);

    return new Promise((resolve, reject) => {
      (function waitFor() {
        try {
          if (checkError && checkTimeout()) return reject(TIMEOUT_ERR_TEXT);
          if (checker()) return resolve();

          setTimeout(waitFor, interval);
        } catch (err) {
          return reject(err);
        }
      })();
    });
  }

  /* TODO: naive 솔루션 말고 스크립트 로드 완료되면 실행하도록 변경 */
  function checkPlayed() {
    const $frontScreen = document.querySelector("#front-screen");
    const $playBtn = $frontScreen?.querySelector(".vc-front-screen-play-btn");

    if (!$frontScreen) return false;
    if ($frontScreen.style.display === "none") return true;

    $playBtn.click();
    return false;
  }

  function checkOkCleared() {
    const $confirmDialog = document.querySelector("#confirm-dialog");
    const $okBtn = $confirmDialog?.querySelector(".confirm-ok-btn");

    if (!$confirmDialog) return false;
    if ($confirmDialog.style.display === "none") return true;

    $okBtn.click();
    return false;
  }

  function checkReplayed() {
    const $replayBtn = document.querySelector(".player-restart-btn");
    if (!$replayBtn) return false;
    if (!$replayBtn.style.display || $replayBtn.style.display === "none") return false;

    $replayBtn.click();
    moveToNext();
    return true;
  }

  // 익스텐션에서 실행될 때만 자동 재생 기능 활성화
  if (window.parent.parent.location === window.parent.parent.parent.location)
    repeatCheck({ checker: checkPlayed, interval: 300, checkError: true })
      .then(() => {
        setInterval(checkOkCleared, 2000);
        repeatCheck({ checker: checkReplayed, interval: 2000 });
      })
      .catch((err) => {
        console.log(err);
        if (err === TIMEOUT_ERR_TEXT) moveToNext();
        else throw err;
      });
})();
