const express = require("express")
const router = express.Router();

const {
    getAllTasks,
    createNewTask,
    changeTaskInfo,
    deleteTask
} = require("../controllers/task.controller")

router.get("/all/tasks", getAllTasks)
router.post("/task", createNewTask)
router.put("/task", changeTaskInfo)
router.delete("/task", deleteTask)

module.exports = router