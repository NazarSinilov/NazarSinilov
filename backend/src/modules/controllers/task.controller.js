const Expense = require("../../db/modules/task/index")

module.exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find()
        res.send({data: expenses})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.createNewExpense = async (req, res) => {
    const {text, price} = req.body
    try {
        if (text && price >= 0.01) {
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
    const {text,price,date,id} = req.body
    try {
        if (text && price >= 0.01  && date) {
            await Expense.updateOne({_id: id}, {text, price, date})
            res.status(200).send({message: "Expense edite"})
        } else {
            throw new Error("Enter a valid value")
        }
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteExpense = async (req, res) => {
    try {
        await Expense.deleteOne({_id: req.query._id })
        res.status(200).send({message:"Expense delete"})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}