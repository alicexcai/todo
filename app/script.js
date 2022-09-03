// COMMENT: this instantiates a list to store todo objects
const todoObjectList = [];

// COMMENT: this defnes the todo class
class Todo_Class {
    // COMMENT: this constructor instantiates the ul element
    constructor(item){
        this.ulElement =item;
    } 

    // COMMENT: this method adds a todo object to the list
    add() {
        // COMMENT: this gets the input value from the input field with the id "myInput"
        const todoInput = document.querySelector("#myInput").value;
        // COMMENT: this checks if the input field is empty
        if (todoInput == "") {
            alert("You did not enter any item!") 
        } else {
            // COMMENT: this defines a new todo object
            const todoObject = {
                id : todoObjectList.length,
                todoText : todoInput,
                isDone : false,
            }
        // COMMENT: this appends the new todo object to the list
        todoObjectList.unshift(todoObject);
        // COMMENT: this runs the display method to render the updated list
        this.display();
        // COMMENT: this clears the input field
        document.querySelector("#myInput").value = '';

        }
    }

    // COMMENT: this method toggles the done/undone status of a todo object
    done_undone(x) {
        // COMMENT: this finds the index of the selected todo object
        const selectedTodoIndex = todoObjectList.findIndex((item)=> item.id == x);
        // COMMENT: this console logs the current done/undone status of the selected todo object
        console.log(todoObjectList[selectedTodoIndex].isDone);
        // COMMENT: this toggles the done/undone status of the selected todo object
        todoObjectList[selectedTodoIndex].isDone == false ? todoObjectList[selectedTodoIndex].isDone = true : todoObjectList[selectedTodoIndex].isDone = false;
        // COMMENT: this runs the display method to render the updated list
        this.display();
    }

    // COMMENT: this method delets a todo object from the list
    deleteElement(z) {
        // COMMENT: this finds the index of the selected todo object
        const selectedDelIndex = todoObjectList.findIndex((item)=> item.id == z);
        // COMMENT: this deletes the selected todo object from the list
        todoObjectList.splice(selectedDelIndex,1);
        // COMMENT: this runs the display method to render the updated list
        this.display();
    }

    // COMMENT: this method renders the todolist on the page
    display() {
        // COMMENT: this clears the content of the ul element
        this.ulElement.innerHTML = "";
        // COMMENT: this loops through the list and renders the todo objects
        todoObjectList.forEach((object_item) => {
            // COMMENT: this creates a new li element
            const liElement = document.createElement("li");
            // COMMENT: this creates a new i element
            const delBtn = document.createElement("i");
            // COMMENT: this sets the text of the li element to the todo text of the todo object
            liElement.innerText = object_item.todoText;
            // COMMENT: this sets the data-id attribute of the li element to the id of the todo object
            liElement.setAttribute("data-id", object_item.id);
            // COMMENT: this sets the data-id attribute of the i element to the id of the todo object
            delBtn.setAttribute("data-id", object_item.id);
            // COMMENT: this adds cllasses to the li and i elements
            delBtn.classList.add("far", "fa-trash-alt");
            // COMMENT: this adds the i element to the li element as a child
            liElement.appendChild(delBtn);
            // COMMENT: this delets the todo object from the list if the i element is clicked
            delBtn.addEventListener("click", function(e) {
                const deleteId = e.target.getAttribute("data-id");
                myTodoList.deleteElement(deleteId);
            })
            // COMMENT: this toggles the done/undone status of the todo object if the li element is clicked
            liElement.addEventListener("click", function(e) {
                const selectedId = e.target.getAttribute("data-id");
                myTodoList.done_undone(selectedId);
            })
            // COMMENT: this adds the checked class to the li element if the todo object is done
            if (object_item.isDone) {
                liElement.classList.add("checked");
            }
            // COMMENT: this appends the li element to the ul element
            this.ulElement.appendChild(liElement);
        })
    }
} 




////-----MAIN PROGRAM------------

// COMMENT: this finds the element in which to put the list by looking for  the id "myUL"
const listSection = document.querySelector("#myUL");

// COMMENT: this instantiates a new todo list based on the class defined above
myTodoList = new Todo_Class(listSection);

// COMMENT: this runs the add method when the add button is clicked by adding an event listener to the elemnt with id "addBtn"
document.querySelector(".addBtn").addEventListener("click", function() {
    myTodoList.add()
})

// COMMENT: this runs the add method when the enter key is pressed by adding an event listener to the elemnt with id "myInput"
document.querySelector("#myInput").addEventListener("keydown", function(e) {
    if (e.keyCode == 13) {
        myTodoList.add()
    }
})


