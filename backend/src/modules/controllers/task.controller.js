const Task = require("../../db/modules/task/index")

module.exports.getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()
        res.send({data: tasks})
    } catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.createNewTask = async (req, res, next) => {
    try {
        const task = await Task.create({text: req.body.text, isCheck: req.body.isCheck})
        res.send({data: task})
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.changeTaskInfo = async (req, res, next) => {
    try {
        await Task.updateOne({_id : req.body.id}, req.body)
        res.send(req.body)
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        await Task.deleteOne({_id: req.query._id })
        res.status(200).send({message:"Task delete"})
    }
    catch (err) {
        next(err)
        res.status(500).send({massage: err.massage})
    }
}