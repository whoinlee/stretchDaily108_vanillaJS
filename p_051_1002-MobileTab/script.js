const imgs = document.querySelectorAll('.content'); //<img>
const tabs = document.querySelectorAll('nav ul li');

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => {
      hideAllContents()
      hideAllItems()
      //-- then show only the selected
      tab.classList.add('active');
      imgs[i].classList.add('show');
  })
});

function hideAllContents() {
  imgs.forEach(content => content.classList.remove('show'));
}


function hideAllItems() {
  tabs.forEach(item => item.classList.remove('active'));
}