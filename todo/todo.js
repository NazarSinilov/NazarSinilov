let element = document.querySelector(".tasks")
let input = document.querySelector("input")
let valueInput = ""
let allTasks = []
let editInputValue = null

const URL = "http://localhost:8000/"
const HEADER = {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
}

window.onload = async function init() {
    try {
        const resp = await fetch(`${URL}all/tasks`, {
            method: "GET"
        })
        let result = await resp.json();
        allTasks = result.data
        render()
        if (result) {
            getPreloader()
        }
        if (resp.status === 500) {
            throw new Error
        }
    } catch (err) {
        alert("Internal Server Error 500")
    }

}
const getPreloader = () => {
    let preloader = document.querySelector(".preloader")
    preloader.style.display = "none"
}

const getInputValue = () => {
    valueInput = document.querySelector("#inputText").value
}

const render = () => {
    let task = ""
    allTasks = _.sortBy(allTasks, "id");
    allTasks = _.sortBy(allTasks, "isCheck");
    allTasks.forEach((el, id) => {
        let isCompleted = el.isCheck ? "checked" : ""
        task += `<div class="task ${isCompleted ? "completed" : ""}">
                    <input type="checkbox"  id="input-${id}" onclick="completedTask(this, ${id})" ${isCompleted}>
                    <div class="text ${isCompleted}" id="text-${id}">${el.text}</div>
                    <div class="hide-block" id="hideBlock-${id}">
                        <input type="text" class="edit-input" value="${el.text}" id="editInput-${id}">
                        <div class="hide-block__control">
                            <img src="img/icon-complete.svg" alt="#" onclick="saveEdit(${id})">
                            <img src="img/icon-close.svg" alt="#" onclick="cancelEdit(${el.text} ,${id})">
                        </div>
                    </div>
                    <div class="control-block" id="controlBlock-${id}">
                        <img src="img/icon-edit.svg" alt="#" id="edit-${id}" class="${isCompleted ? "hide" : ""}" onclick="editTask(${id})">
                        <img src="img/icon-delete.svg" alt="#" id="delete-${id}" onclick="removeTask(${id})"> 
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
    render()
}

const saveEdit = async id => {
    let hideBlock = document.querySelector(`#hideBlock-${id}`)
    let showText = document.querySelector(`#text-${id}`)
    let showControlBlock = document.querySelector(`#controlBlock-${id}`)
    let inputText = document.querySelector(`#editInput-${id}`)
    let showCheckbox = document.querySelector(`#input-${id}`)

    showText.classList.remove("hide")
    hideBlock.classList.remove("active")
    showControlBlock.classList.remove("hide")
    showCheckbox.classList.remove("hide")

    let isValue = inputText.value.trim()
    inputText.value = inputText.value.trim()
    if (!isValue) {
        return
    }

    try {
        const resp = await fetch(`${URL}task`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify({
                text: inputText.value,
                id: allTasks[id]._id
            })
        })
        let result = await resp.json();
        alert(result.message)
        allTasks[id].text = result.text
        render()
        if (resp.status === 500) {
            throw new Error
        }

    } catch (err) {
        alert("Internal Server Error 500")
    }
}

const editTask = id => {
    render()
    let showBlock = document.querySelector(`#hideBlock-${id}`)
    let hideText = document.querySelector(`#text-${id}`)
    let hideControlBlock = document.querySelector(`#controlBlock-${id}`)
    let hideCheckbox = document.querySelector(`#input-${id}`)

    showBlock.classList.add("active")
    hideText.classList.add("hide")
    hideControlBlock.classList.add("hide")
    hideCheckbox.classList.add("hide")

    editInputValue = document.querySelector(`#editInput-${id}`)
    editInputValue.value = allTasks[id].text
    editInputValue.focus()
}

const completedTask = async (selectedTask, id) => {
    let textElement = document.querySelector(`#text-${id}`)
    let editElement = document.querySelector(`#edit-${id}`)
    try {
        const resp = await fetch(`${URL}task`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify({
                isCheck: !allTasks[id].isCheck,
                id: allTasks[id]._id
            })
        })
        if (resp.status === 500) {
            throw new Error
        }
    } catch (err) {
        alert("Internal Server Error 500")
    }

    if (selectedTask.checked) {
        textElement.classList.add("checked")
        editElement.classList.add("hide")
        allTasks[id].isCheck = true

    } else {
        textElement.classList.remove("checked")
        editElement.classList.remove("hide")
        allTasks[id].isCheck = false
    }
    render()
}

const addTask = async () => {
    let isValue = valueInput.trim()
    valueInput = valueInput.trim()

    if (!isValue) {
        return
    } else {
        input.value = ""
    }

    try {
        const resp = await fetch(`${URL}task`, {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({
                text: valueInput,
                isCheck: false
            })
        })
        if (resp.status === 500) {
            throw new Error
        }

        let result = await resp.json();
        allTasks.push(result.data)

        valueInput = ""
        input.value = ""
        render()
    } catch (err) {
        alert("Internal Server Error 500")
    }

}

const removeTask = async id => {
    try {
        const resp = await fetch(`${URL}task?_id=${allTasks[id]._id}`, {
            method: "DELETE",
            headers: HEADER
        })
        if (resp.status === 500) {
            throw new Error
        }
        let result = await resp.json();
        alert(result.message)
        allTasks.splice(id, 1)
        render()
    } catch (err) {
        alert("Internal Server Error 500")
    }
}

input.addEventListener("keyup", e => {
    let inputText = input.value.trim()
    if (e.key === "Enter" && inputText) {
        addTask()
    }
})



