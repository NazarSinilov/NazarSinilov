const Task = require("../../db/modules/task/index")

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
        res.send({data: tasks})
    } catch (err) {
        next(err)
        res.status(500).send({message: err.message})
    }
}

module.exports.createNewTask = async (req, res, next) => {
    try {
        const {text, isCheck} = req.body
        const task = await Task.create({text, isCheck})
        res.send({data: task})
    }
    catch (err) {
        next(err)
        res.status(500).send({message: err.message})
    }
}

module.exports.changeTaskInfo = async (req, res, next) => {
    try {
        await Task.updateOne({_id : req.body.id}, req.body)
        res.status(200).send({message:"Task changed"})
    }
    catch (err) {
        next(err)
        res.status(500).send({message: err.message})
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        await Task.deleteOne({_id: req.query._id })
        res.status(200).send({message:"Task delete"})
    }
    catch (err) {
        next(err)
        res.status(500).send({message: err.message})
    }
}