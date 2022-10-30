const Task = require("../../db/modules/task/index")

module.exports.getAllTasks = async (req, res) => {
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
        if (text) {
            const task = await Task.create({text, isCheck})
            res.send({data: task})
        } else {
            throw new Error("Enter a valid value")
        }

    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.changeTaskInfo = async (req, res) => {
    try {
        const {text} = req.body
        if (text) {
            await Task.updateOne({_id : req.body.id}, req.body)
            res.status(200).send({message:"Task changed"})
        } else {
            throw new Error("Enter a valid value")
        }
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteTask = async (req, res) => {
    try {
        const {_id} = req.query
        await Task.deleteOne({_id})
        res.status(200).send({message:"Task delete"})
    }
    catch (err) {
        res.status(500).send({message: err.message})
    }
}