import slides from "./slides.js";

const body = document.body;
const slideContainer = document.querySelector(".container");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let slideArr;
let activeSlideIndex = 0;
setSlides();

function setSlides() {
  slideContainer.innerHTML = slides
    .map(
      (slide) => `
      <div
        class="slide"
        style="background-image: url(${slide.img});">
      </div>
    `
    )
    .join("");
  slideArr = slideContainer.querySelectorAll(".slide");
  setBodyBackground();
  setActiveSlide();
}

function setBodyBackground() {
  //-- copy img src
  body.style.backgroundImage = `url(${slides[activeSlideIndex].img})`;
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
  setBodyBackground();
  setActiveSlide();
});

leftBtn.addEventListener("click", () => {
  activeSlideIndex--;
  if (activeSlideIndex < 0) {
    activeSlideIndex = slideArr.length - 1;
  }
  setBodyBackground();
  setActiveSlide();
});
