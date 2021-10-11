
const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];

const randomUserURL = 'https://randomuser.me/api/';
const numOfUsers = 50;
const fetchUsers = async () => {
  const data = await (await fetch(`${randomUserURL}?results=${numOfUsers}`)).json();
  console.log("script.js :: fetchUsers, data??\n", data);
  return data.results;
}

const init = async () => {
    const users = await fetchUsers(); //-- an array of [numOfUsers] objects
    result.innerHTML = users.map(user => {
        const li = document.createElement('li');
        listItems.push(li);
        li.innerHTML = `
            <img src="${user.picture.large}" alt="${user.name.first}">
            <div class="user-info">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.location.city}, ${user.location.country}</p>
            </div>`
        return li;
    }).join(''); 
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
filter.addEventListener('input', (e) => filterData(e.target.value));

init();
