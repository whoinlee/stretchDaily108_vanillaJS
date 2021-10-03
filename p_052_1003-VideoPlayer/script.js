const preloader = document.querySelector(".preloader");
const video = document.querySelector(".video-holder");
const playPauseBtn = document.querySelector(".play-pause");

playPauseBtn.addEventListener("click", function () {
  if (!playPauseBtn.classList.contains("slide")) {
    playPauseBtn.classList.add("slide");
    video.pause();
  } else {
    playPauseBtn.classList.remove("slide");
    video.play();
  }
});

window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});