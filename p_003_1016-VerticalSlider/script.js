const sliderContainer = document.querySelector('.container');
const slideLeft = document.querySelector('.left-slide');
const slideRight = document.querySelector('.right-slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const totalSlides = slideRight.querySelectorAll('div').length;  //****//

let activeSlideIndex = 0;
slideLeft.style.top = `-${(totalSlides - 1)*100}vh`;

upButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('up')});
downButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('down')});

const changeSlide = (direction) => {
    const sliderHeight = sliderContainer.clientHeight;
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex > (totalSlides -1)) activeSlideIndex = 0;
        slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    } else if (direction === 'down') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) activeSlideIndex = totalSlides -1;
        slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
    }
    // console.log("activeSlideIndex? " + activeSlideIndex)
}