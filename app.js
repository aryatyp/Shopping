//Sels
const itemInput = document.querySelector(".item-input");
const itemButton = document.querySelector(".add-item");
const itemList = document.querySelector(".shopping-list");
const filterOption = document.querySelector(".filter-items");

//Events
itemButton.addEventListener("click", addItem);
itemList.addEventListener("click", deleteCheck);
window.addEventListener("DOMContentLoaded", getItems)

//Functions
function addItem(event) {
    // prevent form submission
    event.preventDefault();
    // todo div
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("list");

    const newItem = document.createElement("li");
    newItem.innerText = itemInput.value;
    newItem.classList.add("list-item");
    // add todo to storage
    saveLocalItems(itemInput.value);
    // Done button

    const doneButton = document.createElement("button");
    doneButton.innerHTML = '<i class="fas fa-check"></i>';
    doneButton.classList.add("complete-btn");
    itemDiv.appendChild(doneButton);

    itemDiv.appendChild(newItem);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash");
    itemDiv.appendChild(deleteButton);

    const laterButton = document.createElement("button");
    laterButton.innerHTML = '<i class="fas fa-clock"></i>';
    laterButton.classList.add("later-btn");
    itemDiv.appendChild(laterButton);

    //append
    itemList.appendChild(itemDiv);

    //clear input
    itemInput.value = "";
}

function deleteCheck(e) {
    const itemSel = e.target;
    if (itemSel.classList[0] === "trash") {
        const sel = itemSel.parentElement;
        //ani
        sel.classList.add("anim");

        sel.addEventListener("transitionend", function () {
            sel.remove();
            removeLocalItems(itemSel);
        });
    }

    if (itemSel.classList[0] === "complete-btn") {
        const sel = itemSel.parentElement;
        sel.classList.toggle("completed");
    }

    if (itemSel.classList[0] === "later-btn") {
        const sel = itemSel.parentElement;
        sel.classList.toggle("later");
    }
}

function saveLocalItems(lists) {
    //check
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(lists);
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getItems() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (lists) {
        // todo div
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("list");

        const newItem = document.createElement("li");
        newItem.innerText = lists;
        newItem.classList.add("list-item");
        // Done button

        const doneButton = document.createElement("button");
        doneButton.innerHTML = '<i class="fas fa-check"></i>';
        doneButton.classList.add("complete-btn");
        itemDiv.appendChild(doneButton);

        itemDiv.appendChild(newItem);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("trash");
        itemDiv.appendChild(deleteButton);

        const laterButton = document.createElement("button");
        laterButton.innerHTML = '<i class="fas fa-clock"></i>';
        laterButton.classList.add("later-btn");
        itemDiv.appendChild(laterButton);

        //append
        itemList.appendChild(itemDiv);
    });
}

function removeLocalItems(lists){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const index = lists.children[0].innerText;
    console.log (index);
    todos.splice(todos.indexOf(index), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}