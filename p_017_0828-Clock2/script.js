const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

function setTime() {
    const time = new Date();
    const secondDeg = time.getSeconds()/60; 
    const minuteDeg = (secondDeg + time.getMinutes())/60;
    const hourDeg = (minuteDeg + time.getHours())/12;

    handsDegs(hourHand, hourDeg);
    handsDegs(minuteHand, minuteDeg);
    handsDegs(secondHand, secondDeg);
}

function handsDegs(elt, rotationRatio) {
    elt.style.setProperty('--rotation', rotationRatio * 360);
}

setTime();
// setInterval(setTime, 1000);