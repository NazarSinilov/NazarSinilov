let element = document.querySelector(".tasks")
let input = document.querySelector("input")
let valueInput = ""
let allTasks = JSON.parse(localStorage.getItem("todo-list"))  || []
let editInputValue = null

const getInputValue = () => {
    valueInput = document.querySelector("#inputText").value
}

const render = () => {
    let task = ""
    allTasks =  _.sortBy(allTasks, "completed");
    allTasks.forEach((el, id) => {
        let isCompleted = el.completed ? "checked" : ""
        task += `<div class="task">
                    <input type="checkbox" id="input-${id}" onclick="completedTask(this, ${id})" ${isCompleted}>
                    <div class="text ${isCompleted}" id="text-${id}">${el.text}</div>
                    <div class="hide-block" id="hideBlock-${id}">
                        <input type="text" class="editInput" value="${el.text}" id="editInput-${id}">
                        <div class="hide-block__control">
                            <img src="img/icon-complete.svg" alt="#" onclick="saveEdit(${id})">
                            <img src="img/icon-close.svg" alt="#" onclick="cancelEdit(${el.text} ,${id})">
                        </div>
                    </div>
                    <div class="control-block" id="controlBlock-${id}">
                        <img src="img/icon-edit.svg" alt="#" id="edit-${id}" class="${isCompleted? "hide" : ""}" onclick="editTask(${id}, ${el.text})">
                        <img src="img/icon-delete.svg" alt="#" id="delete-${id}"   onclick="removeTask(${id})"> 
                    </div>
                    
                 </div>`
    })
    element.innerHTML = task
}

render()

const cancelEdit = (taskText, id) => {
    let hideBlock = document.querySelector(`#hideBlock-${id}`)
    let showText = document.querySelector(`#text-${id}`)
    let showControlBlock = document.querySelector(`#controlBlock-${id}`)

    showText.classList.add("hide")
    hideBlock.classList.add("active")
    showControlBlock.classList.add("hide")

    allTasks[id].text = taskText

    localStorage.setItem("todo-list", JSON.stringify(allTasks))
    render()

}

const saveEdit = (id) => {
    let hideBlock = document.querySelector(`#hideBlock-${id}`)
    let showText = document.querySelector(`#text-${id}`)
    let showControlBlock = document.querySelector(`#controlBlock-${id}`)
    let inputText = document.querySelector(`#editInput-${id}`)

    showText.classList.remove("hide")
    hideBlock.classList.remove("active")
    showControlBlock.classList.remove("hide")

    allTasks[id].text = inputText.value
    localStorage.setItem("todo-list", JSON.stringify(allTasks))
    render()
}

const editTask = ( id, taskText) => {
    render()
    let showBlock = document.querySelector(`#hideBlock-${id}`)
    let hideText = document.querySelector(`#text-${id}`)
    let hideControlBlock = document.querySelector(`#controlBlock-${id}`)

    showBlock.classList.add("active")
    hideText.classList.add("hide")
    hideControlBlock.classList.add("hide")

    editInputValue = document.querySelector(`#editInput-${id}`)
    editInputValue.value = taskText
    editInputValue.focus()
    localStorage.setItem("todo-list", JSON.stringify(allTasks))
}

const completedTask = (selectedTask , id) => {

    let textElement = document.querySelector(`#text-${id}`)
    let editElement = document.querySelector(`#edit-${id}`)

    if (selectedTask.checked) {
        textElement.classList.add("checked")
        editElement.classList.add("hide")
        allTasks[id].completed = true

    } else {
        textElement.classList.remove("checked")
        editElement.classList.remove("hide")
        allTasks[id].completed = false
    }
    localStorage.setItem("todo-list", JSON.stringify(allTasks))
    render()
}

const addTask = () => {
    if (valueInput.trim()) {
        allTasks.unshift({
            text: valueInput,
            completed: false
        })
    }
    valueInput = ""
    input.value = ""
    localStorage.setItem("todo-list" , JSON.stringify(allTasks))
    render()
}

const removeTask = (id) => {
    allTasks.splice(id , 1)
    render()
    localStorage.setItem("todo-list", JSON.stringify(allTasks))
}

input.addEventListener("keyup", e => {
    let inputText = input.value.trim()
    if (e.key === "Enter" && inputText) {
        allTasks.unshift({
            text: inputText,
            completed: false
        })
        input.value = ""
        localStorage.setItem("todo-list" , JSON.stringify(allTasks))
        render()

    }
})



