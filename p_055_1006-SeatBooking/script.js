
const movies = [
  {name: "Avengers: Endgame", price: 10},
  {name: "Joker", price: 12},
  {name: "Toy Story 4", price: 8},
  {name: "The Lion King", price: 9},
];

{/* 
<select id="movie">
  <option value="10">Avengers: Endgame ($10)</option>
  <option value="12">Joker ($12)</option>
  <option value="8">Toy Story 4 ($8)</option>
  <option value="9">The Lion King ($9)</option> 
</select>
*/}

/*
`<option value="${movie.price}">${movie.name} ($${movie.price})</option>`
*/

const rows = 6;
const cols = 8;

{/* <div class="row">
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
  <div class="seat"></div>
</div> */}

const occupied = 3 + Math.random(10);
