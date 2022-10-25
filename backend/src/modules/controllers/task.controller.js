const Expense = require("../../db/modules/task/index")

module.exports.getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find()
        res.send({data: expenses})
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.createNewExpense = async (req, res, next) => {
    try {
        const expense = await Expense.create({text: req.body.text, price: req.body.price })
        res.send({data: expense})
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.changeExpenseInfo = async (req, res, next) => {
    const {text,price,date} = req.body
    try {
        await Expense.updateOne({_id : req.body.id}, {text, price, date })
        res.send(req.body)
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.deleteExpense = async (req, res, next) => {
    try {
        await Expense.deleteOne({_id: req.query._id })
        res.status(200).send({message:"Expense delete"})
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}