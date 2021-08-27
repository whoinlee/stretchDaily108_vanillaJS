const html = document.querySelector('html');
const toggleBtn = document.getElementById('themeToggleBtn');
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let theme = 'light';

toggleBtn.addEventListener('click', (e) => {
    // console.log("onClick");
    const circleEl = document.querySelector('.circle');
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        e.target.innerHTML = 'Dark Mode';
        toggleBtn.classList.remove('light');   
        hourEl.classList.remove('light');
        minuteEl.classList.remove('light');
        if (circleEl) {
            // circleEl.classList.remove('light');
        }
        theme = 'light';
    } else {
        html.classList.add('dark');
        e.target.innerHTML = 'Light Mode';
        toggleBtn.classList.add('light');
        hourEl.classList.add('light'); 
        minuteEl.classList.add('light');
        if (circleEl) {
            // circleEl.classList.add('light');
        }
        theme = 'dark';
    }
});

function setTime() {
    const time = new Date();
    const month = time.getMonth();
    const day = time.getDay();
    const date = time.getDate();
    const hours = time.getHours();
    const hoursForClock = hours >= 13 ? hours % 12 : hours;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const circleClass = (theme == 'light') ? "circle" : "circle light";
    // console.log("circleClass?", circleClass);
    // console.log("theme?", theme);

    hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`
    minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`
    secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`

    timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`;
    
    dateEl.innerHTML = `${days[day]}, ${months[month]} <span class=${circleClass}>${date}</span>`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setTime();
setInterval(setTime, 1000);