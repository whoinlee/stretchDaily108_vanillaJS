const container = document.querySelector('.container');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

const randomUserURL = 'https://randomuser.me/api/';
const numOfUsers = 5;
const fetchUsers = async () => {
  const data = await (await fetch(`${randomUserURL}?results=${numOfUsers}`)).json();
  // console.log("script.js :: fetchUsers, data??\n", data);
  return data.results;
}

const init = async () => {
  const users = await fetchUsers(); //-- an array of [numOfUsers] objects
  const fakeReview = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem quoeius recusandae officia voluptas sint deserunt dicta nihil nam omnis?`;
  /*{
  cell: "081-760-3729"
  dob: {date: '1960-06-15T04:27:00.275Z', age: 61}
  email: "ivan.gray@example.com"
  gender: "male"
  id: {name: 'PPS', value: '5418223T'}
  location: {street: {…}, city: 'Tullow', state: 'Kilkenny', country: 'Ireland', postcode: 51366, …}
  login: {uuid: '751dbf67-ba9e-4946-a7b4-24dc3145e7c3', username: 'sadelephant263', password: 'juggalo', salt: 'TML4JtyA', md5: 'f0b19de34e70f6bb3d98231ce9604fec', …}
  name: {title: 'Mr', first: 'Ivan', last: 'Gray'}
  nat: "IE"
  phone: "021-123-9482"
  picture: {large: 'https://randomuser.me/api/portraits/men/76.jpg', medium: 'https://randomuser.me/api/portraits/med/men/76.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/men/76.jpg'}
  registered: {date: '2017-06-02T00:28:07.644Z', age: 4}
  } */
  // title.innerHTML = 'pagination';
  // pages = paginate(followers);
  // setupUI();

  container.innerHTML = users.map((user, slideIndex) => {
    const { email } = user;
    const name = user.name.first + " " + user.name.last;
    const location = user.location.city + ", " + user.location.country;
    const img = user.picture.thumbnail;

    let status = 'next';
    if (slideIndex === 0) status = 'active';
    if (slideIndex === users.length - 1) status = 'last';
    return `<article class="slide ${status}">
                <img src=${img} class="img" alt="${name}"/>
                <h4>${name}</h4>
                <p class="location">${location}</p>
                <p class="contact">${email}</p>
                <p class="text">
                ${fakeReview}
                </p>
            </article>`
    }).join('');
};

const startSlider = (type) => {
  const active = document.querySelector('.active');
  const last = document.querySelector('.last');
  let next = active.nextElementSibling; //***** */
  if (!next) next = container.firstElementChild;

  active.classList.remove('active');
  last.classList.remove('last');
  next.classList.remove('next');
  if (type === 'prev') {
    active.classList.add('next');
    last.classList.add('active');
    next = last.previousElementSibling;
    if (!next) next = container.lastElementChild;

    next.classList.remove('next');
    next.classList.add('last');
    return;
  };

  active.classList.add('last');
  last.classList.add('next');
  next.classList.add('active');
}
nextBtn.addEventListener('click', () => {
  startSlider();
});
prevBtn.addEventListener('click', () => {
  startSlider('prev');
});

init();