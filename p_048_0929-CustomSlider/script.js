const slider = document.getElementById('slider');
const label = document.getElementById('slider-label');
const range_width = getComputedStyle(slider).getPropertyValue('width'); //300
const label_width = getComputedStyle(label).getPropertyValue('width');  //80
const num_range_width = +range_width.substring(0, range_width.length - 2);    //number only (w/o 'px')
const num_label_width = +label_width.substring(0, label_width.length - 2);
const max = +slider.max;
const min = +slider.min;
const label_left_min = min - num_label_width/2 + 12;    //12 = thumb_width/2
const label_left_max = num_range_width - num_label_width/2 - 12;
// console.log("max, min", max)
// console.log("max, min", min)
console.log("label_left_min", label_left_min)
console.log("label_left_max", label_left_max)
// console.log("range_width", range_width);    //300px, also set in the css
// console.log("label_width", label_width);    //80px, also set in the css

slider.addEventListener('input', (e) => {
    const value = +e.target.value;  // 0 to 100, min to max
    // const left = value * (num_range_width / (max-min)) - num_label_width / 2 + scale(value, min, max, 10, -10);
    //-- slider thumb doesn't move from 0(min) to 300(num_range_width)
    //-- from (0 + thumb_width/2) to (100 - thumb_width/2)
    const left = scale(value, min, max, label_left_min, label_left_max);
    // console.log("v", value)
    // console.log("l", left)
    label.style.left = `${left}px`;
    label.innerHTML = value;
})

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
// const num = 5;
// console.log(scale(num, 0, 10, -50, 50)); // 0
// console.log(scale(num, -20, 0, -100, 100)); // 150