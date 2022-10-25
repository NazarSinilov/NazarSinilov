let valuePlaceInput = ""
let valueCostInput = ""
let allExpenses = []
let placeInput = null
let costInput = null
let isEdit = true
const HEADER = {
    "Content-Type": "application/json;charset=utf-8",
    "Access-Control-Allow-Origin": "*"
}
const URL = "http://localhost:8000/"

window.onload = async function init() {
    placeInput = document.querySelector("#placeInput")
    costInput = document.querySelector("#costInput")
    placeInput.addEventListener("change", updatePlaceInput)
    costInput.addEventListener("change", updateCostInput)
    try {
        const resp = await fetch(`${URL}all/expenses`, {
            method: "GET"
        })
        let result = await resp.json();
        allExpenses = result.data
        render()
        if (resp.status === 500) {
            throw new Error
        }
    }
    catch (err) {
        alert("Internal Server Error 500")
    }

}

const updatePlaceInput = (event) => {
    valuePlaceInput = event.target.value.trim()
}

const updateCostInput = (event) => {
    valueCostInput = event.target.value.trim()
    if (valueCostInput <= 0) {
        valueCostInput = ""
        costInput.value = ""
    }
}


const render = () => {
    const purchases = document.querySelector(".purchases")
    const totalCost = document.querySelector(".total-price")
    purchases.innerHTML = ""
    let totalPrice = 0
    isEdit = true
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
        purchaseDate.innerText = new Date(item.date).toLocaleDateString();
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
        imageEdit.addEventListener("click", (event) => editExpense(event, index, purchase, item))


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
    if (!isEdit) {
        return
    }

    isEdit = false
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
    hiddenControlBlock.addEventListener("click", async (event) => {
        try {
            if (inputPlace.value && inputDate.valueAsDate && inputCost.value > 0) {
                const resp = await fetch(`${URL}expense`, {
                    method: "PUT",
                    headers: HEADER,
                    body: JSON.stringify({
                        text: inputPlace.value,
                        price: inputCost.value,
                        date: inputDate.valueAsDate,
                        id: allExpenses[id]._id
                    })
                })
                allExpenses[id].text = inputPlace.value.trim()
                allExpenses[id].date = inputDate.valueAsDate
                allExpenses[id].price = inputCost.value
                isEdit = true
                render()
                if (resp.status === 500) {
                    throw new Error
                }
            }
        }
        catch (err) {
            alert("Internal Server Error 500")
        }

    })

    const hiddenClose = document.createElement("img")
    hiddenClose.src = "img/icon-close.svg"
    hiddenClose.addEventListener("click", () => {
        isEdit = true
        render()
    })
    hiddenControlBlock.appendChild(hiddenClose)

}

const deleteExpense = async (event, id) => {
    try {
        const resp = await fetch(`${URL}expense?_id=${allExpenses[id]._id}`, {
            method: "DELETE",
            headers: HEADER
        })
        allExpenses.splice(id, 1)
        render()
        let result = await resp.json();
        alert(result.message)
        if (resp.status === 500) {
            throw new Error
        }
    }
    catch (err) {
        alert("Internal Server Error 500")
    }

}


const addExpense = async () => {
    if (!valuePlaceInput && !valueCostInput) {
        return
    }
    try {
        const resp = await fetch(`${URL}expense`, {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({
                text: valuePlaceInput,
                price: valueCostInput,
                date: new Date()
            })
        })

        let result = await resp.json()
        allExpenses.push(result.data)

        valuePlaceInput = ""
        valueCostInput = ""
        placeInput.value = ""
        costInput.value = ""
        render()
        if (resp.status === 500) {
            throw new Error
        }
    }
    catch (err) {
        alert("Internal Server Error 500")
    }


}



























