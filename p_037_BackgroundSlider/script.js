// import slides from "./slides.js";

const body = document.body;
const slideArr = document.querySelectorAll(".slide");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let activeSlideIndex = 0;
setBgToBody();

function setBgToBody() {
  //-- copy src
  body.style.backgroundImage = slideArr[activeSlideIndex].style.backgroundImage;
}

function setActiveSlide() {
  slideArr.forEach((slide) => slide.classList.remove("active"));
  slideArr[activeSlideIndex].classList.add("active");
}

rightBtn.addEventListener("click", () => {
  activeSlideIndex++;
  if (activeSlideIndex > slideArr.length - 1) {
    activeSlideIndex = 0;
  }
  setBgToBody();
  setActiveSlide();
});

leftBtn.addEventListener("click", () => {
  activeSlideIndex--;
  if (activeSlideIndex < 0) {
    activeSlideIndex = slideArr.length - 1;
  }
  setBgToBody();
  setActiveSlide();
});
