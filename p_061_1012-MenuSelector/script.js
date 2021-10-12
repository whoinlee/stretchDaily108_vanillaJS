//-- originally from
//-- https://github.com/john-smilga/javascript-basic-projects/blob/master/08-menu/final/app.js
import menu from './menu.js';


const btnContainer = document.querySelector(".btn-container");
const menuContainer = document.querySelector(".menu-items");

displayMenuButtons();
diplayMenuItems(menu);

function displayMenuButtons() {
    // console.log("script.js :: displayMenuButtons")
    const categories = menu.reduce((accValues, item) => {
        //-- collecting categories
        if (!accValues.includes(item.category)) accValues.push(item.category);
        return accValues;
    }, ["all"]);
    const categoryBtns = categories.map(category => 
        `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
        </button>`
    ).join("");
    btnContainer.innerHTML = categoryBtns;

    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            // console.log(e.currentTarget.dataset);
            const selectedCategory = e.currentTarget.dataset.id;
            const selectedMenu = menu.filter(menuItem => (menuItem.category === selectedCategory));
            if (selectedCategory === "all") {
                diplayMenuItems(menu);
            } else {
                diplayMenuItems(selectedMenu);
            }
        });
    });
};
function diplayMenuItems(menuItems) {
    console.log("script.js :: diplayMenuItems, menuItems ", menuItems)
    menuContainer.innerHTML = menuItems.map( (item) => 
        `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo" />
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
              </header>
              <p class="item-text">
                ${item.desc}
              </p>
            </div>
          </article>`
    ).join("");
};