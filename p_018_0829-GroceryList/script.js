const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery-input");
const submitBtn = document.querySelector(".submit-btn");
//
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");


let editElement;
let editFlag = false;
let editID = "";
let displayAlertID;

//-- display items from localStorage on load
setupItems();
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);

//-- reset
function setBackToDefault() {
    console.log("setBackToDefault called??????????????\n")
    // alert("setBackToDefault")
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

//-- alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //-- remove alert after 2 secs
    if (displayAlertID) {
        clearTimeout(displayAlertID);
    }
    displayAlertID = setTimeout(() => {
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
    
}

////////////////////////////////
//-- Grocery Item Handlers
////////////////////////////////
function setupItems(e) {
    // console.log('DOM fully loaded and parsed'); //async & defer in index.html
    let items = getLocalStorage();
    if (items != null && items.length > 0) {
      items.forEach(item => createListItem(item.id, item.value));
      container.classList.add("show-container");
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `<p class="title">${value}</p>
                <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                    <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
                </div>
            `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}

function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString(); //-- timeStamp set as id
    
    if (value !== "" && !editFlag) {
        //-- succss
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
        editElement.innerHTML = value;
        displayAlert("value changed", "success");
        console.log("case2: editID??, ", editID);
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        //-- danger
        displayAlert("please enter value", "danger");
    }
};

function deleteItem(e) {
    console.log("deleteItem");

    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {    //.grocery-item
        container.classList.remove("show-container");
        displayAlert("empty list", "danger");
        // localStorage.removeItem("list");
    } else {
        displayAlert("item removed", "danger");
        
    }
    setBackToDefault();
    removeFromLocalStorage(id);
}

function editItem(e) {
    console.log("\neditItem ======>>>>>");
    const element = e.currentTarget.parentElement.parentElement;
    //-- set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    console.log("editElement?? " + editElement);
    //-- set input form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    //
    submitBtn.textContent = "edit";
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
    // console.log("getLocalStorage");
    return (
        localStorage.getItem("list") ? 
        JSON.parse(localStorage.getItem("list")) : []
    );
}

function addToLocalStorage(id, value) {
    // console.log("addToLocalStorage");
    const grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {
    const items = getLocalStorage();
    items.forEach(item => {
        (item.id === id) ? (item.value = value) : item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(item => (item.id !== id));
    localStorage.setItem("list", JSON.stringify(items));
}
////////////////////////////////
