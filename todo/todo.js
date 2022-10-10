let element = document.querySelector(".tasks")
let input = document.querySelector("input")
let isEditTask = false
let valueInput = ""
const allTasks = []

const getInputValue = () => {
    valueInput = document.querySelector("#inputText").value
}

const addTask = () => {
    if (valueInput) {
        allTasks.push({
            text: valueInput,
            completed: false
        })
    }
    valueInput = ""
    input.value = ""
    render()
}

const render = () => {
    let task = ""
    allTasks.forEach((el, id) => {
        task += `<div class="task">
                    <p>${id + 1}.</p>
                    <input type="checkbox">
                    <div class="text">${el.text}</div>
                    <img src="img/icon-edit.svg" alt="#" onclick="editTask(${id})">
                    <img src="img/icon-delete.svg" alt="#" onclick="removeTask(${id})">
                 </div>`
    })
    element.innerHTML = task
}
const editTask = () => {

}
const removeTask = (id) => {
    allTasks.splice(id , 1)
    render()
    console.log(allTasks)
}


input.addEventListener("keyup", e => {
    let inputText = input.value.trim()
    if (e.key === "Enter" && inputText) {
        allTasks.push({
            text: valueInput,
            completed: false
        })
        render()
        valueInput = ""
        input.value = ""
    }
})



