//-- https://github.com/bradtraversy/50projects50days/blob/master/blurry-loading/script.js

//-- https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const bg = document.querySelector(".bg");
const percentage = document.querySelector(".percentage");

let loaded = 0;
blurring();
let int = setInterval(blurring, 30);

function blurring() {
  percentage.innerText = `${loaded}%`;
  percentage.style.opacity = (100 - loaded) / 100; //-- 1 to 0
  bg.style.filter = `blur(${scale(loaded, 0, 100, 30, 0)}px)`; //-- 30 to 0
  if (loaded > 99) clearInterval(int);
  // console.log(loaded);
  loaded++;
}
