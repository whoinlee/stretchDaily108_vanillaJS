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



//-- reset
function setBackToDefault() {
    // console.log("setBackToDefault :: reset");
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

//-- alert
function displayAlert(text, action) {
    // console.log("displayAlert, action? " + action);
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //-- remove alert after 1 sec
    setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 2000);
}

////////////////////////////////
//-- Grocery Item Handlers
////////////////////////////////
function setupItems(e) {
    console.log('DOM fully loaded and parsed');
    console.log("setupItems, ever???");
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createListItem(item.id, item.value);
      });
      container.classList.add("show-container");
    }
}

function addItem(e) {
    // console.log("submit, addItem");
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString(); //-- timeStamp set as id
    
    if (value !== "" && !editFlag) {
        //-- succss
        // console.log("grocery value exists and not editing");
        const element = document.createElement("article");  //***/
        let attr = document.createAttribute("data-id"); //<article data-id="id">
        attr.value = id;
        element.setAttributeNode(attr); //***/
        element.classList.add("grocery-item");  //<article data-id="id" class="grocery-item">
        element.innerHTML = `<p class="title">${value}</p>
                <div class="btn-container">
                    <button type="button" class="edit-btn">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;

        //-- add event listeners to both buttons;
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener("click", deleteItem);
        editBtn.addEventListener("click", editItem);

        list.appendChild(element);
        container.classList.add("show-container");
        displayAlert("item added to the list", "success");
        addToLocalStorage(id, value);
        setBackToDefault();
    } else if (value !== "" && editFlag) {
        //-- success
        // console.log("grocery value exists and editing");
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        //-- danger
        // console.log("no grocery value");
        displayAlert("please enter value", "danger");
    }
};

function deleteItem(e) {
    console.log("deleteItem");
}
// edit item
function editItem(e) {
    console.log("editItem");
}

function clearItems(e) {
    // console.log("clearItems");
    e.preventDefault();

    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach((item) => list.removeChild(item));
    }

    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem("list");
};

////////////////////////////////
//-- LocalStorage Handlers
////////////////////////////////
function getLocalStorage() {
    console.log("getLocalStorage");
}

function addToLocalStorage(id, value) {
    console.log("addToLocalStorage");
  }

function editLocalStorage(id, value) {
    console.log("editLocalStorage");
}
////////////////////////////////


console.log("ever??? =======>");
