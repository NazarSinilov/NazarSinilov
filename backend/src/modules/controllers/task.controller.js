const Task = require("../../db/modules/task/index")

module.exports.getAllTasks = async (_, res) => {
    try {
        const tasks = await Task.find()
        res.send({data: tasks})
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.createNewTask = async (req, res) => {
    try {
        const {text, isCheck} = req.body

        if (text && typeof text === "string" && typeof isCheck === "boolean") {
            const task = await Task.create({text, isCheck})
            res.send({data: task})
        } else {
            throw new Error("Enter a valid value")
        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.changeTaskInfo = async (req, res) => {
    try {
        const {text, isCheck, id} = req.body
        if (!await Task.findOne({_id: id})) {
            res.status(404).send({message: "Not found"})
        }
        if (text && typeof text === "string" && typeof isCheck === "boolean") {
            await Task.updateOne({_id: id}, req.body)
            res.send({message: "Task changed"})
        } else {
            res.status(400).send({message: "Validation error"})
        }
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteTask = async (req, res) => {
    try {
        const {_id} = req.query
        await Task.deleteOne({_id})
        res.send({message: "Task delete"})
    } catch (err) {
        res.status(500).send({message: err.message})
    }
}