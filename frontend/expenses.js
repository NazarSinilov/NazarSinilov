let valuePlaceInput = ""
let valueCostInput = ""
let allExpenses = []
let placeInput = null
let costInput = null
let isEdit = true

window.onload = function () {
    placeInput = document.querySelector("#placeInput")
    costInput = document.querySelector("#costInput")
    placeInput.addEventListener("change", updatePlaceInput)
    costInput.addEventListener("change" , updateCostInput)
}

const updatePlaceInput = (event) => {
    valuePlaceInput = event.target.value
}

const updateCostInput = (event) => {
    valueCostInput = event.target.value
}



/*const getInputValue = () => {
    valuePlaceInput = document.querySelector("#placeInput").value
    console.log(valuePlaceInput)
    valuePlaceInput = ""
}*/

const render = () => {
    const purchases = document.querySelector(".purchases")
    const totalCost = document.querySelector(".total-price")
    purchases.innerHTML = ""
    let totalPrice = 0

    allExpenses.forEach((item, index) => {
        const purchase = document.createElement("div")
        purchase.classList.add("purchase")


        const purchasePlaceBlock = document.createElement("div");
        purchasePlaceBlock.classList.add("block-place")
        purchase.appendChild(purchasePlaceBlock)

        const purchaseIndex = document.createElement("div");
        purchaseIndex.innerText = `${index + 1})`;
        purchaseIndex.classList.add("purchase__index")
        purchasePlaceBlock.appendChild(purchaseIndex);

        const purchasePlace = document.createElement("div");
        purchasePlace.innerText = item.text;
        purchasePlace.classList.add("purchase__place")
        purchasePlaceBlock.appendChild(purchasePlace);

        const purchaseCostBlock = document.createElement("div");
        purchaseCostBlock.classList.add("block-cost")
        purchase.appendChild(purchaseCostBlock)

        const purchaseDate = document.createElement("div");
        purchaseDate.innerText = item.date.toLocaleDateString();
        purchaseDate.classList.add("purchase__date")
        purchaseCostBlock.appendChild(purchaseDate);

        const purchaseCost = document.createElement("div");
        purchaseCost.innerText = `${item.price} p.`;
        purchaseCost.classList.add("purchase__cost")
        purchaseCostBlock.appendChild(purchaseCost);
        

        const purchaseControlBlock = document.createElement("div");
        purchaseControlBlock.classList.add("block-control")
        purchase.appendChild(purchaseControlBlock);

        const imageEdit = document.createElement("img");
        imageEdit.src = "img/icon-edit.svg"
        purchaseControlBlock.appendChild(imageEdit);
        imageEdit.addEventListener("click", (event) => editExpense(event, index, purchase, item ))


        const imageDelete = document.createElement("img");
        imageDelete.src = "img/icon-delete.svg"
        purchaseControlBlock.appendChild(imageDelete);
        imageDelete.addEventListener("click", (event) => deleteExpense(event, index))


        purchases.appendChild(purchase)
        totalPrice += +item.price
    })
    totalCost.innerText = `Итого: ${totalPrice} p.`
}

const editExpense = (event, id, element, item) => {


    const editFunc = () => {
        isEdit = !isEdit
        element.innerHTML = ""

        const inputPlace = document.createElement("input")
        inputPlace.classList.add("inputPlace_hidden")
        inputPlace.value = item.text
        element.appendChild(inputPlace)
        inputPlace.focus()


        const inputDate = document.createElement("input")
        inputDate.classList.add("inputDate_hidden")
        inputDate.type = "date"
        inputDate.valueAsDate = new Date(item.date)
        element.appendChild(inputDate)

        const inputCost = document.createElement("input")
        inputCost.type = "Number"
        inputCost.classList.add("inputCost_hidden")
        inputCost.value = item.price
        element.appendChild(inputCost)

        const hiddenControlBlock = document.createElement("div")
        hiddenControlBlock.classList.add("control-block_hidden")
        element.appendChild(hiddenControlBlock)

        const hiddenSave = document.createElement("img")
        hiddenSave.src = "img/icon-complete.svg"
        hiddenControlBlock.appendChild(hiddenSave)
        hiddenControlBlock.addEventListener("click", (event) => {
            allExpenses[id].text = inputPlace.value
            allExpenses[id].date = inputDate.valueAsDate
            allExpenses[id].price = inputCost.value
            render()
        })

        const hiddenClose = document.createElement("img")
        hiddenClose.src = "img/icon-close.svg"
        hiddenClose.addEventListener("click", () => {
            render()
        })
        hiddenControlBlock.appendChild(hiddenClose)
    }

    if (isEdit) {
        editFunc()
        isEdit = !isEdit
    }
}

const deleteExpense = (event, id) => {
    allExpenses.splice(id, 1)
    render()
}


const addExpense = () => {
    if (valuePlaceInput && valueCostInput) {
        allExpenses.push({
            text: valuePlaceInput,
            price: valueCostInput,
            date: new Date()
        })
        valuePlaceInput = ""
        valueCostInput = ""
        placeInput.value = ""
        costInput.value = ""
        render()
    }
}



























