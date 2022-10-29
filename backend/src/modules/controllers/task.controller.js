const Expense = require("../../db/modules/task/index")

module.exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find()
        res.send({data: expenses})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.createNewExpense = async (req, res, next) => {
    try {
        const expense = await Expense.create({text: req.body.text, price: req.body.price })
        res.send({data: expense})

    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.changeExpenseInfo = async (req, res, next) => {
    const {text,price,date,id} = req.body
    try {
        await Expense.updateOne({_id : id}, {text, price, date })
        res.status(200).send({message:"Expense edite"})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteExpense = async (req, res, next) => {
    try {
        await Expense.deleteOne({_id: req.query._id })
        res.status(200).send({message:"Expense delete"})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}