let index = 0;
let pages = []; //paginated data

const btnContainer = document.querySelector('.btn-container');
//********** event listener on the whole .btn-container **********//
btnContainer.addEventListener('click', function (e) {
  // console.log("clicked")
  if (e.target.classList.contains('btn-container')) return;
  if (e.target.classList.contains('page-btn')) {
    index = parseInt(e.target.dataset.index);
  }
  if (e.target.classList.contains('next-btn')) {
    index++;
    if (index > pages.length - 1) index = 0;
  }
  if (e.target.classList.contains('prev-btn')) {
    index--;
    if (index < 0) index = pages.length - 1;
  }
  setupUI();
});

//-- fetchFollowers
const url = 'https://api.github.com/users/mbostock/followers?per_page=100';
const fetchFollowers = async () => {
  const data = await (await fetch(url)).json();
  // console.log("script.js :: fetchFollowers, data??\n", data);// an array of 100 objects
  return data
}

//-- paginate
const paginate = (followers) => {
  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(followers.length / itemsPerPage);
  //**********/
  const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
    const start = index * itemsPerPage;
    return followers.slice(start, start + itemsPerPage);
  });

  console.log("newFollowers? ", newFollowers)
  //**********/
  return newFollowers;
}

//-- init
const title = document.getElementById('title');
const init = async () => {
  const followers = await fetchFollowers();
  // console.log("init, followers\n", followers);
  title.innerHTML = 'pagination';
  pages = paginate(followers);
  setupUI();
};

//-- displayFollowers, //?????????
const container = document.querySelector('.container');
const displayFollowers = (followers) => {
  const followersElts = followers
    .map((person) => {
      const { avatar_url, login, html_url } = person;
      return `<article class='card'>
                <img src="${avatar_url}" alt='person' />
                  <h4>${login}</h4>
                <a href="${html_url}" target="_blank" class="btn">view profile</a>
              </article>`;
    }).join('');//***.JOIN***
  container.innerHTML = followersElts;
};

//-- displayButtons
const displayButtons = (container, pages, activeIndex) => {
  let btns = pages.map((_, pageIndex) => {
    return `<button class="page-btn${activeIndex === pageIndex ? ' active-btn' : ''}" 
                    data-index="${pageIndex}">${pageIndex + 1}</button>`
  })
  btns.push(`<button class="next-btn">next</button>`);  //tail
  btns.unshift(`<button class="prev-btn">prev</button>`); //head
  container.innerHTML = btns.join('')
};

const setupUI = () => {
  displayFollowers(pages[index]);
  displayButtons(btnContainer, pages, index);
};

window.addEventListener('load', init);


