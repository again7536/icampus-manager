(() => {
  const sid = setInterval(() => {
    const $playBtn = document.querySelector(".vc-front-screen-play-btn");
    if (!$playBtn) return;

    /* TODO: naive 솔루션 말고 스크립트 로드 완료되면 실행하도록 변경 */
    clearInterval(sid);
    setTimeout(() => $playBtn.click(), 500);

    const eid = setInterval(() => {
      const $replayBtn = document.querySelector(".player-restart-btn");
      if (!$replayBtn.style.display || $replayBtn.style.display === "none") return;

      clearInterval(eid);
      window.parent.parent.postMessage("end", "https://canvas.skku.edu/");
      window.parent.parent.parent.postMessage("end", "https://canvas.skku.edu/");
    }, 2000);
  }, 300);
})();
