const body = document.body;
const slides = document.querySelectorAll('.slide');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');

let activeSlideIndex = 0;
setBgToBody();

rightBtn.addEventListener('click', () => {
    activeSlideIndex++;
    if (activeSlideIndex > slides.length - 1) {
        activeSlideIndex = 0
    }
    setBgToBody();
    setActiveSlide();
});
leftBtn.addEventListener('click', () => {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
        activeSlideIndex = slides.length - 1
    }
    setBgToBody();
    setActiveSlide();
});

function setBgToBody() {
    //-- copy src
    body.style.backgroundImage = slides[activeSlideIndex].style.backgroundImage;
};
function setActiveSlide() {
  slides.forEach((slide) => slide.classList.remove('active'));
  slides[activeSlideIndex].classList.add('active');
};