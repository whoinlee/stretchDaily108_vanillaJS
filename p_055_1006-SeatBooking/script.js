//-- construct movieSelect dropdown
const movieSelect = document.getElementById('movie');
const movies = [
  {name: "Finding Nemo", price: 11},
  {name: "Avengers: Endgame", price: 10},
  {name: "Joker", price: 12},
  {name: "Toy Story 4", price: 8},
  {name: "The Lion King", price: 9}
];
movies.map((movie, i) => {
  const optionElt = document.createElement('option');
  optionElt.setAttribute("value", `${movie.price}`);
  optionElt.innerHTML = `${movie.name} ($${movie.price})`;
  movieSelect.appendChild(optionElt);
});
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value; //== ~~e.target.value    , ~e.target.value = +e.target.value + 1;
  // setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});


//-- construct container, seat rows
const container = document.querySelector('.container');
const rows = 8;
const cols = 9;
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

// const isSaved = (!localStorage.getItem('selectedSeats'))? false : true;
// console.log("isSaved?? ", isSaved);
// console.log("localStorage.getItem('selectedSeats')?? ", localStorage.getItem('selectedSeats'));
for (let i = 0; i < rows; i++) {
  const rowElt = document.createElement('div');
  rowElt.setAttribute("class", "row");
  container.appendChild(rowElt);
  for (let j=0; j < cols; j++) {
    const seatElt = document.createElement('div');
    const classVal = (Math.random()*10 < 2) ? "seat occupied" : "seat";
    seatElt.setAttribute("class", classVal);
    rowElt.appendChild(seatElt);
  }
};
container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  };
});


const count = document.getElementById('count');
const total = document.getElementById('total');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');

populateUI();
//-- get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

let ticketPrice = +movieSelect.value;

//-- save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//-- update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

//-- initial count and total set
updateSelectedCount();