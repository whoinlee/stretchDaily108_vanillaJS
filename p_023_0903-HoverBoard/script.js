const container = document.getElementById('container');
const colors = ['#e6bf10', '#e7cd3c', '#ab4ad4', '#287eb8', '#e67e22', '#34e07c', '#e67e22', '#e74c3c'];
const numOfSquares = 500; //20x25 (25 rows and 20 columns)


for(let i = 0; i < numOfSquares; i++) {  //-- using 'flex-wrap: wrap;'
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('mouseover', () => setColor(square));
  square.addEventListener('mouseout', () => removeColor(square));

  container.appendChild(square);
}

function setColor(element) {
  const color = getRandomColor();
  element.style.background = color;
  element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`; //****/
}

function removeColor(element) {
  element.style.background = '#1d1d1d';
  element.style.boxShadow = '0 0 2px #000';
}

function getRandomColor() {
   return colors[Math.floor(Math.random() * colors.length)]
}