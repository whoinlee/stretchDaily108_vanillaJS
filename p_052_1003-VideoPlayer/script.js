const preloader = document.querySelector(".preloader");
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");

const video = document.querySelector(".video-holder");
const title = document.querySelector(".title");
const playPauseBtn = document.querySelector(".play-pause");

playPauseBtn.addEventListener("click", function () {
  if (!playPauseBtn.classList.contains("slide")) {
    playPauseBtn.classList.add("slide");
    overlay.classList.add("show");
    title.classList.remove("hide");
    video.pause();
  } else {
    playPauseBtn.classList.remove("slide");
    overlay.classList.remove("show");
    title.classList.add("hide");
    video.play();
  }
});

window.addEventListener("load", function () {
  // preloader.classList.add("hide-preloader");
  this.setTimeout(hidePreloader, 1000); //-- show preloader for a second
});

function hidePreloader() {
  preloader.classList.add("hide-preloader");
}
