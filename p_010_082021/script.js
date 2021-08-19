// const loadText = document.querySelector('.loading-text');
// const bg = document.querySelector('.bg');
// const scale = (num, in_min, in_max, out_min, out_max) => {
//     return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
// }

// let load = 0;
// let int = setInterval(blurring, 30);
// function blurring() {
//     load++;
//     loadText.innerText = `${load}%`;
//     loadText.style.opacity = (100 - load) / 100;
//     bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
//     if (load > 99) clearInterval(int);
//     // console.log(load);
// }

