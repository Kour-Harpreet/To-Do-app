// querySelector will use CSS selector syntax to select HTML elements.
// <input type="text">
const input = document.querySelector("input");
// <button type="submit">Add item</button> 
const addButton = document.querySelector("button");
// <ul class="empty">
const ul = document.querySelector("ul");
// <p id="error-output"></p>
const error = document.querySelector("#error-output");
// <ul id="completedUl"></ul> 
const completedUl = document.getElementById("completedUl");
//<form> 
const form = document.querySelector("form");
// Running list of all our items.
let itemArray = [];
form.addEventListener("submit", (event) => { //eventlistener at addbutton.
    event.preventDefault();
    // Keep track of if the current submission has an error.
    let errors = false;
    // If the input is empty.
    if (input.value.trim() === "") {
        error.innerText = "Sorry, please ensure you enter an item before attempting to add it.";
        errors = true;
    }
    // If the input already exists.
    if (itemArray.includes(input.value.trim().toLowerCase())) {
        error.innerText = "Sorry, please ensure that the item you have entered is not already on your list.";
        errors = true;
    }
    // Prevent Empty List Items (Including Whitespace) and Prevent Duplicate List Items (Case Insensitive)
    if (!errors) {
        // Clear any errors from previous submissions if this one is valid.
        error.innerText = "";
        // 1. Create a list item element.
        let newListItem = document.createElement("li");
        newListItem.id = "newlistItem1";
        // 2. Add the text from the text field to the list item.
        // P.S. Also removing trailing and leading whitespace and changing to lower case.
        newListItem.innerText = input.value.trim().toLowerCase();
        itemArray.push(input.value.trim().toLowerCase());
        if (ul.className === "empty") {
            // 3a. If it is the first item, remove the empty class from
            // the list.
            ul.classList.remove("empty");
            // 3b. If it is the first item, remove the "No items yet!" item.
            // If the list still has the empty class, it should only
            // have the "no items" li.
            ul.children[0].remove();
        }
        // adding checklist to the list.
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = "box";
        checkbox.value = input.value.trim().toLowerCase();
        // Create a delete button in active to do list
        var deleteButton = document.createElement('button');
        var txt = document.createTextNode("delete");
        //eventlistener on delete button to delete item from active to do list.
        deleteButton.addEventListener('click', function(e) {
            newListItem.parentNode.removeChild(newListItem);
        });
        // newListItem.appendChild(deleteButton);
        newListItem.appendChild(checkbox);
        deleteButton.appendChild(txt);
        newListItem.appendChild(deleteButton);
        checkbox.addEventListener('click', () => { //eventlistener on checkbox
            newListItem.parentNode.removeChild(newListItem); //removing item from active todo list
        });
        checkbox.addEventListener('click', completeToDo); //calling completeTodo function
        // 3. Add the list item to the list.
        ul.appendChild(newListItem);
        // 4. Clear the text input. 
        input.value = "";
        // Reset Focus To Input After Adding
        input.focus();
    }
});
// completeToDo function
function completeToDo() {
    //appending list item to completed to do list from active todo list.
    console.log(this);
    // creating element for completed todo list item.
    var completeToDoList = document.createElement('li');
    completeToDoList.innerText = this.value;
    completedUl.appendChild(completeToDoList); //appending item to completed list.
    // completedUl.appendChild(completeToDoList);
    // creating delete button
    let deleteButton = document.createElement('button');
    let txt = document.createTextNode("delete");
    deleteButton.appendChild(txt);
    //appending delete button to the completed list item.
    completeToDoList.appendChild(deleteButton);
    deleteButton.className = "delete";
    //deleting list item from completed to do list.
    deleteButton.addEventListener("click", function(e) {
        //eventlistener on delete button and it pops up the alert.
        alert("Well Done!!!\nYou finished one task. Now take rest and come back again.");
        completeToDoList.parentNode.removeChild(completeToDoList);
    });
}