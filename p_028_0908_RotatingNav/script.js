const draggableList = document.getElementById('draggable-list');  //<u>
const checkBtn = document.getElementById('check-btn');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
];

const listItems = [];
let dragStartIndex;

createList();
// function shuffle(array) {
//   array.sort(() => Math.random() - 0.5);
// }
function createList() {
  richestPeople
    .map(a => ({ value: a, sort: Math.random() }))  //-- create an array of object
    .sort((a, b) => a.sort - b.sort)  //-- ascending
    .map(a => a.value)                //-- create an array of value (original item)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    //-- when other draggable item is being "dragovered .... "
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

//------------------------------------//
//-- drag and drop activities start --//
//------------------------------------//
function dragStart() {
  // console.log('Event: ', 'dragstart');
  //********** + => convert to a number, this.closest('li') => container li
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log('Event: dragStartIndex?? ', dragStartIndex);
}

function dragOver(e) {
  console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  //console.log('Event: ', 'dragdrop');
  const dragEndIndex = +this.getAttribute('data-index');  //container li
  swapItems(dragStartIndex, dragEndIndex);  //******/

  this.classList.remove('over');//bg color changes back to the org
}

function dragEnter() {
  console.log('Event: ', 'dragenter');      //처음은 enter, then stays at over
  this.classList.add('over');   //bg color changes
}

function dragLeave() {
  //console.log('Event: ', 'dragleave');
  this.classList.remove('over');//bg color changes back to the org
}
//--  drag and drop activities end  --//
//------------------------------------//


//-- Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

//-- Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

checkBtn.addEventListener('click', checkOrder);

