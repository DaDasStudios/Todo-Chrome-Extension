

class Todo {
    constructor(title, description, createdAt, id) {
        this.title = title;
        this.description = description;
        this.createdAt = createdAt;
        this.id = id
    }

    createTodoElement() {
        const li = document.createElement("li");
        li.setAttribute("data-todo-id", this.id)
        li.classList.add("is-flex", "is-justify-content-space-between", "is-flex-direction-column", "mb-4")

        const h6 = document.createElement("h6")
        h6.textContent = this.title;
        h6.classList.add("is-size-6", "has-text-weight-medium")

        const p = document.createElement("p")
        p.classList.add("is-size-6")
        p.textContent = this.description;

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete"
        deleteButton.setAttribute("type", "button")
        deleteButton.className = "button is-danger is-outlined is-small is-pulled-left"
        deleteButton.onclick = () => {
            li.remove()
        }

        li.appendChild(h6)
        li.appendChild(p)
        li.appendChild(deleteButton)

        return li
    }
}

const samples = [
    new Todo("Some title", "Some description", new Date(), 0),
]

const todoList = document.querySelector("#todo-list")
const addButton = document.getElementById("add-todo")
const cancelTodo = document.getElementById("cancel-todo")
const addForm = document.getElementById("todo-form")

let isAdding = false;

function cancelAddTodo() {
    if (isAdding) {
        isAdding = false
        todoList.classList.remove("disabled")
        addForm.classList.add("disabled")
        cancelTodo.classList.add("disabled")
    }
}

function handleAddButtonClick() {
    if (!isAdding) {
        // Change the view to add a new todo
        isAdding = true;
        todoList.classList.add("disabled")
        addForm.classList.remove("disabled")
        cancelTodo.classList.remove("disabled")

    } else {
        const [titleInput, descriptionInput] = addForm.querySelectorAll("input")

        if (titleInput.value && descriptionInput.value) {
            const newTodo = new Todo(titleInput.value, descriptionInput.value, new Date(), todoList.childElementCount)

            titleInput.classList.remove("is-danger")
            descriptionInput.classList.remove("is-danger")
            todoList.appendChild(newTodo.createTodoElement())
            cancelAddTodo()
            titleInput.value = ""
            descriptionInput.value = ""
        } else {
            if (!titleInput.value) {
                titleInput.classList.add("is-danger")
            }

            if (!descriptionInput.value) {
                descriptionInput.classList.add("is-danger")
            }
        }

    }
}

addButton.addEventListener("click", handleAddButtonClick)
cancelTodo.addEventListener("click", cancelAddTodo)

samples.forEach(todo => {
    todoList.appendChild(todo.createTodoElement())
})
