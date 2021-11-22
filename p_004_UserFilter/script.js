// <!-- original source from https://github.com/bradtraversy/50projects50days/tree/master/live-user-filter -->
const resultUL = document.getElementById("result");
const listItems = [];
const RANDOM_USER_API = "https://randomuser.me/api?results=50";

init();
async function init() {
  //   const response = await fetch(RANDOM_USER_API);
  //   console.log("res\n", response);
  //   const res = await response.json();
  //   console.log("res\n", res);
  /*
  {results: Array(50), info: {…}}
    info: {seed: '972efc939badc7c9', results: 50, page: 1, version: '1.3'}
    results: (50) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    [[Prototype]]: Object
*/
  //   const { results } = await response.json();

  const { results } = await (await fetch(RANDOM_USER_API)).json();
  console.log("results\n", results); //results: an array of objects

  /* <li>
     <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Sara">
     <div class="user-info">
        <h4>Sara Smith</h4>
        <p>Wexfors, Ireland</p>
     </div>
    </li> */
  resultUL.innerHTML = ""; //-- clear
  results.map((user) => {
    const li = document.createElement("li");
    listItems.push(li);
    li.innerHTML = `
        <img src='${user.picture.large}' alt='${user.name.first}'>
        <div class='user-info'>
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>
       `;
    resultUL.appendChild(li);
  });
}

const filter = document.getElementById("filter"); //input//
filter.addEventListener("input", (e) => filterData(e.target.value));
function filterData(val) {
  // console.log('ever??', val);
  // console.log(listItems)
  listItems.forEach((item) => {
    if (item.innerText.toLowerCase().includes(val.toLowerCase())) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
