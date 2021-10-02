const contents = document.querySelectorAll('.content'); //<img>
const tabs = document.querySelectorAll('nav ul li');//<li>

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
      hideAllContents();
      hideAllItems();
      //-- then show only the selected
      tab.classList.add('active');
      contents[i].classList.add('show');
  })
});

function hideAllContents() {
  contents.forEach(content => content.classList.remove('show'));
}

function hideAllItems() {
  tabs.forEach(tabItem => tabItem.classList.remove('active'));
}