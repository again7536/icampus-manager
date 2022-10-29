(() => {
  function repeatCheck(checker, timeout = 300) {
    return new Promise((resolve, reject) => {
      (function waitFor() {
        try {
          if (checker()) return resolve();
          else setTimeout(waitFor, timeout);
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
    window.parent.parent.postMessage("end", `chrome-extension://${chrome.runtime.id}/`);
    return true;
  }

  repeatCheck(checkPlayed).then(() => {
    setInterval(checkOkCleared, 2000);
    repeatCheck(checkReplayed, 2000);
  });
})();
