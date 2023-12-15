const main = document.getElementById('main');
//
const addUserBtn = document.getElementById('add-user-btn');
const doubleMoneyBtn = document.getElementById('double-money-btn');
const showMillionairesBtn = document.getElementById('show-millionaires-btn');
const sortBtn = document.getElementById('sort-btn');
const calculateWealthBtn = document.getElementById('calculate-wealth-btn');
//
addUserBtn.addEventListener('click', getRandomUsers);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

let data = [];  //-- an array of user object {name, money}

const defaultUserNum = 4;
getRandomUsers(defaultUserNum);

/*

cell
: 
"(666) 218-7609"
dob
: 
{date: '1981-08-10T22:58:02.972Z', age: 42}
email
: 
"sharlene.garcia@example.com"
gender
: 
"female"
id
: 
{name: 'SSN', value: '141-19-4581'}
location
: 
{street: {…}, city: 'Gainesville', state: 'Delaware', country: 'United States', postcode: 34606, …}
login
: 
{uuid: 'd469c352-4aa5-49b0-9477-93a70c13abea', username: 'heavymeercat277', password: 'jaguar1', salt: 'MPvKSdMp', md5: '82df72a6108b9b77c6ec3ec862db81a5', …}
name
: 
{title: 'Mrs', first: 'Sharlene', last: 'Garcia'}
nat
: 
"US"
phone
: 
"(801) 779-6762"
picture
: 
{large: 'https://randomuser.me/api/portraits/women/2.jpg', medium: 'https://randomuser.me/api/portraits/med/women/2.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/2.jpg'}
registered
: 
{date: '2011-09-19T18:41:20.777Z', age: 12}
*/
//-- generate random users w. random amount of money
async function getRandomUsers(times=1) {
    // console.log("times?? ", times);
    const res = await fetch('https://randomuser.me/api' + "?results=" + times);
    const data = await res.json();
    const users = data.results;
    console.log("data?? ", data);
    console.log("users?? ", users);

    users.map( user => {
        let newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        };
        addData(newUser);
    });
    updateDOM();
}

//-- double eveyones money <map>
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//-- sort by richest <sort>
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//-- filter only millionaires <filter>
function showMillionaires() {
  data = data.filter(user => user.money >= 1000000);

  updateDOM();
}

//-- calculate the total wealth <reduce>
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
}

//-- add a new user object to data arr
function addData(obj) {
  data.push(obj);

  //updateDOM();
}

//-- update DOM
function updateDOM(providedData = data) {
  //-- clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//-- format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


