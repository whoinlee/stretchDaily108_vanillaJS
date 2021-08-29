const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery-input");
const submitBtn = document.querySelector(".submit-btn");
//
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
//
let editElement;
let editFlag = false;
let editID = "";

//-- display items from localStorage on load
window.addEventListener("DOMContentLoaded", setupItems);
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

function setupItems(e) {
    console.log('DOM fully loaded and parsed');
    console.log("setupItems, ever???");
    // let items = getLocalStorage();
  
    // if (items.length > 0) {
    //   items.forEach(function (item) {
    //     createListItem(item.id, item.value);
    //   });
    //   container.classList.add("show-container");
    // }
  }
function addItem(e) {
    console.log("addItem");
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString(); //-- timeStamp set as id

    if (value !== "" && !editFlag) {
        const element = document.createElement("article");
        let attr = document.createAttribute("data-id"); //<article data-id="id">
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add("grocery-item");  //<article data-id="id" class="grocery-item">
        element.innerHTML = `<p class="title">${value}</p>
                <div class="btn-container">
                    <!-- edit -->
                    <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <!-- delete -->
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        // add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItem);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItem);

        // append child
        list.appendChild(element);
        // display alert
        displayAlert("item added to the list", "success");
        // show container
        container.classList.add("show-container");
        // set local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        editElement.innerHTML = value;
        displayAlert("value changed", "success");

        // edit  local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value", "danger");
    }
};

function clearItems(e) {
    console.log("clearItems");
    e.preventDefault();
};

console.log("ever??? =======>");
