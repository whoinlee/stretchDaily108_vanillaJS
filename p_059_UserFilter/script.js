// <!-- original source from https://github.com/bradtraversy/50projects50days/tree/master/live-user-filter -->
const result = document.getElementById('result');
const listItems = [];
const RANDOM_USER_API = 'https://randomuser.me/api?results=50';

getData();

async function getData() {
    const res = await fetch(RANDOM_USER_API);
    const { results } = await res.json(); 
    // console.log(results);

//     <!-- <li>
//      <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Sara">
//      <div class="user-info">
//         <h4>Sara Smith</h4>
//         <p>Wexfors, Ireland</p>
//      </div>
//     </li> -->
    result.innerHTML = '';  //-- clear
    results.map(user => {
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


const filter = document.getElementById('filter');
filter.addEventListener('input', (e) => filterData(e.target.value));

function filterData(val) {
    // console.log('ever??', val);
    // console.log(listItems)
    listItems.forEach(item => {
        if (item.innerText.toLowerCase().includes(val.toLowerCase())) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    })
};