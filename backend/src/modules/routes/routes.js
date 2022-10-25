const express = require("express")
const router = express.Router();

const {
    getAllExpenses,
    createNewExpense,
    changeExpenseInfo,
    deleteExpense
} = require("../controllers/task.controller")

router.get("/all/expenses", getAllExpenses)
router.post("/expense", createNewExpense)
router.put("/expense", changeExpenseInfo)
router.delete("/expense", deleteExpense)

module.exports = router