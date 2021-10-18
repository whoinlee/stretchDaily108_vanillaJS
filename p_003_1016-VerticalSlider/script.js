import data from './data.js';

const totalSlides = data.length;
const sliderContainer = document.querySelector('.container');
const slideLeft = document.querySelector('.left-slide > .slide-container');
const slideRight = document.querySelector('.right-slide > .slide-container');

//-- build slideLeft
/*  <div style="background-color: #fd3555">
        <h1>Nature flower</h1>
        <p>all in pink</p>
    </div> */
slideLeft.innerHTML = data.map((item, index) => {
    let status = (index === 0)? 'active': 'prev';
    if (index === totalSlides - 1) status = 'next';
    return `<div class="slide ${status}" data-id="${item.id}" style="background-color: ${item.bgColor}">
        <h1>${item.title}</h1>
        <p>${item.sub}</p>
    </div>`}
).join("");

//-- build slideRight
/* <div style="background-image: url('https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80')"></div> */
slideRight.innerHTML = data.map((item, index) => {
    let status = (index === 0)? 'active': 'next';
    if (index === totalSlides - 1) status = 'prev';
    return `<div class="slide ${status}" data-id="${item.id}" style="background-image: url(${item.img}">
     </div>`}
).join("");


// let activeSlideIndex = 0;
// slideLeft.style.top = `-${(totalSlides - 1)*100}vh`;
// const changeSlide = (direction) => {
//     const sliderHeight = sliderContainer.clientHeight;
//     if (direction === 'up') {
//         activeSlideIndex++;
//         if (activeSlideIndex > (totalSlides -1)) activeSlideIndex = 0;
//         slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
//     } else if (direction === 'down') {
//         activeSlideIndex--;
//         if (activeSlideIndex < 0) activeSlideIndex = totalSlides -1;
//         slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
//     }
// };
// upButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('up')});
// downButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('down')});

function changeSlideUp() {
    const activeSlide = slideRight.querySelector('.active');
    const prevSlide = slideRight.querySelector('.prev');
    const nextSlide = activeSlide.nextElementSibling? activeSlide.nextElementSibling : slideRight.firstElementChild;
    activeSlide.classList.remove('active');
    nextSlide.classList.remove('next');
    prevSlide.classList.remove('prev');
    //
    activeSlide.style.zIndex = "1000";
    nextSlide.style.zIndex = "100";
    prevSlide.style.zIndex = "10";
    activeSlide.classList.add('prev');
    nextSlide.classList.add('active');
    prevSlide.classList.add('next');
}

function changeSlideDown() {
    const activeSlide = slideLeft.querySelector('.active');
    const nextSlide = slideLeft.querySelector('.next');
    const prevSlide = activeSlide.nextElementSibling? activeSlide.nextElementSibling : slideLeft.firstElementChild;
    activeSlide.classList.remove('active');
    nextSlide.classList.remove('next');
    prevSlide.classList.remove('prev');
    //
    activeSlide.style.zIndex = "1000";
    prevSlide.style.zIndex = "100";
    nextSlide.style.zIndex = "10";
    activeSlide.classList.add('next');
    prevSlide.classList.add('active');
    nextSlide.classList.add('prev');
}

const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
upButton.addEventListener('click', (e)=>{e.preventDefault();changeSlideUp()});
downButton.addEventListener('click', (e)=>{e.preventDefault();changeSlideDown()});