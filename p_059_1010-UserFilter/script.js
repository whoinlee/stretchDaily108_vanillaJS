const randomUserURL = 'https://randomuser.me/api/';

const filterInput = document.getElementById('filter');
const resultUl = document.getElementById('result');

const listItems = [];
const numOfUsers = 20;

const fetchUsers = async () => {
  const data = await (await fetch(`${randomUserURL}?results=${numOfUsers}`)).json();
//   console.log("script.js :: fetchUsers, data??\n", data);
  return data.results;
}

const init = async () => {
    const users = await fetchUsers(); //-- an array of [numOfUsers] objects
    resultUl.textContent = ''; //-- remove all existing child elts
    users.forEach(user => {
        const li = document.createElement('li');
        listItems.push(li);
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>`;
        resultUl.appendChild(li)
    });
};

function filterData(searchTerm) {
    listItems.forEach(item => {
        if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
            item.classList.remove('hide')
        } else {
            item.classList.add('hide')
        }
    })
}
filterInput.addEventListener('input', (e) => filterData(e.target.value));

init();
