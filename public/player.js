(async () => {
  const TIMEOUT_ERR_TEXT = "__TIMEOUT__";
  const DEFAULT_INTERVAL = 300;
  const DEFAULT_WAIT_TIMEOUT = 0;
  const PLAYRATE = await chrome.runtime.sendMessage({ message: "playrate" });

  function waitFor({ checker, interval = DEFAULT_INTERVAL, timeout = DEFAULT_WAIT_TIMEOUT }) {
    let isTimeout = false;
    const checkTimeout = () => isTimeout;
    if (DEFAULT_WAIT_TIMEOUT)
      setTimeout(() => {
        isTimeout = true;
      }, timeout);

    return new Promise((resolve, reject) => {
      (function waitFor() {
        try {
          if (timeout && checkTimeout()) return reject(TIMEOUT_ERR_TEXT);
          if (checker()) return resolve();

          setTimeout(waitFor, interval);
        } catch (err) {
          return reject(err);
        }
      })();
    });
  }

  function observeOkAndClear() {
    new MutationObserver(() => {
      const $confirmDialog = document.querySelector("#confirm-dialog");
      const $okBtn = $confirmDialog.querySelector(".confirm-ok-btn");
      if (!$confirmDialog || !$okBtn) return;
      if ($confirmDialog.style.display !== "table") return;

      $okBtn.click();
    }).observe(document.querySelector("#confirm-dialog"), { attributes: true });
  }

  function observeReplay() {
    let timeoutId = null;
    new MutationObserver(() => {
      const $replayBtn = document.querySelector(".player-restart-btn");
      if (!$replayBtn) return;
      if (!$replayBtn.style.display || $replayBtn.style.display === "none") return;

      if (!timeoutId)
        timeoutId = setTimeout(() => {
          $replayBtn.click();
          chrome.runtime.sendMessage({ message: "end" });
        }, 1000);
    }).observe(document.querySelector(".player-restart-btn"), { attributes: true });
  }

  function checkPlay() {
    const $frontScreen = document.querySelector("#front-screen");
    if (!$frontScreen) return false;
    if ($frontScreen.style.display === "none") return true;

    const $playBtn = $frontScreen.querySelector(".vc-front-screen-play-btn");
    $playBtn.click();
  }
  const clickPlayrate = () =>
    document.querySelector(`.vc-pctrl-playback-rate-btn:nth-child(${PLAYRATE})`).click();
  const clickMute = () => document.querySelector(".vc-pctrl-volume-btn").click();

  // 익스텐션에서 실행될 때만 자동 재생 기능 활성화
  if (window.parent.parent.location === window.parent.parent.parent.location)
    waitFor({ checker: checkPlay, timeout: 2000 })
      .then(() => {
        clickMute();
        clickPlayrate();
        observeOkAndClear();
        observeReplay();
      })
      .catch((err) => {
        console.log(err);
        moveToNext();
      });
})();
