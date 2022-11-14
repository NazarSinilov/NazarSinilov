const Expense = require("../../db/modules/task/schema")

module.exports.getAllExpenses = async (_, res) => {
    try {
        const expenses = await Expense.find()
        res.send({data: expenses})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.createNewExpense = async (req, res) => {
    try {
        const {text, price} = req.body
        if (text && typeof text === "string" && price >= 0.01 && typeof price === "number" ) {
            const expense = await Expense.create({text, price})
            res.send({data: expense})
        } else {
            throw new Error("Enter a valid value")
        }
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.changeExpenseInfo = async (req, res) => {
    try {
        const {text,price,date,id} = req.body
        let lastWeek = new Date(date)
        lastWeek.setDate(new Date(date).getDate() - 7)
        const nextWeek = new Date(date)
        nextWeek.setDate(new Date(date).getDate() + 7)
        if (!await Expense.findOne({_id:id})){
            res.status(404).send({message: "Not found"})
        }
        if (text && price && date >= 0.01) {
            await Expense.updateOne({_id: id}, {text, price, date})
            res.send({message: "Expense edit"})
        } else {
            res.status(400).send({message: "Validation error"})
        }
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteExpense = async (req, res) => {
    try {
        await Expense.deleteOne({_id: req.query._id })
        res.send({message:"Expense delete"})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}