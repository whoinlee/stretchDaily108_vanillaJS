const result = document.getElementById('result');
const filter = document.getElementById('filter');
const listItems = [];
const RANDOM_USER_API = 'https://randomuser.me/api?results=50';

getData();

filter.addEventListener('input', (e) => filterData(e.target.value));

async function getData() {
    const res = await fetch(RANDOM_USER_API);
    const { results } = await res.json(); 
    console.log(results);

    result.innerHTML = '';
    results.forEach(user => {
       const li = document.createElement('li');
       listItems.push(li);
       li.innerHTML = `
        <img src='${user.picture.large}' alt='${user.name.first}'>
        <div class='user-info'>
            <h4>${user.name.first} ${user.name.last}</h4>
            <p>${user.location.city}, ${user.location.country}</p>
        </div>
       `;
       result.appendChild(li);
    });
}

function filterData(val) {
    console.log('ever??', val);
    console.log(listItems)
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(val.toLowerCase())) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
}

