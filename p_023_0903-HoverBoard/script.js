const container = document.getElementById('container');
const colors = ['#e6bf10', '#e7cd3c', '#ab4ad4', '#287eb8', '#e67e22', '#34e07c', '#e67e22', '#e74c3c'];
// const numOfSquares = 500; //20x25 (25 rows and 20 columns)
const squareUnit = 25;
const canvasW = 450;
const canvasH = 625;
const rowNum = Math.floor(canvasH/squareUnit); 
const colNum = Math.floor(canvasW/squareUnit);


for (let i = 0; i < rowNum; i++) {
  for (let j = 0; j < colNum; j++) {
    const square = document.createElement('div');
    // const squareAfter = 
    square.classList.add('square');
    // let opacity = (Math.random()<.1)?  Math.random()*.75 : (.85 + Math.random()*.5);
    // let opacity = .85 + Math.random()*.5;
    let opacity = (1 - (i + j)/(rowNum + colNum)) + .25 + Math.random();
    // let opacity = (i + j)/(rowNum + colNum) + .15 + Math.random();
    // opacity = (opacity > 1) ? 1: opacity;
    
    square.style.setProperty('--pseueo-after-opacity', opacity);
    square.style.backgroundPosition = `${-j * squareUnit}px ${-i * squareUnit}px`; 
    // square.addEventListener('mouseover', () => setColor(square));
    // square.addEventListener('mouseout', () => removeColor(square));

    container.appendChild(square);
  }
}

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`; //** glowing **/
}

function removeColor(element) {
  element.style.background = '#1d1d1d';
  element.style.boxShadow = '0 0 2px #000';
}

function getRandomColor() {
   return colors[Math.floor(Math.random() * colors.length)]
}