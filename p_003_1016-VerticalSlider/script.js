import data from './data.js';

const sliderContainer = document.querySelector('.container');
const slideLeft = document.querySelector('.left-slide');
const slideRight = document.querySelector('.right-slide');


//-- build slideLeft
/*  <div style="background-color: #fd3555">
        <h1>Nature flower</h1>
        <p>all in pink</p>
    </div> */
slideLeft.innerHTML = data.map(item => 
    `<div style="background-color: ${item.bgColor}">
        <h1>${item.title}</h1>
        <p>${item.sub}</p>
     </div>`
).join("");

//-- build slideRight
/* <div style="background-image: url('https://images.unsplash.com/photo-1508768787810-6adc1f613514?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e27f6661df21ed17ab5355b28af8df4e&auto=format&fit=crop&w=1350&q=80')"></div> */
slideRight.innerHTML = data.map(item => 
    `<div style="background-image: url(${item.img}">
     </div>`
).join("");


const totalSlides = data.length;
let activeSlideIndex = 0;
slideLeft.style.top = `-${(totalSlides - 1)*100}vh`;

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
};

const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
upButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('up')});
downButton.addEventListener('click', (e)=>{e.preventDefault();changeSlide('down')});