const Task = require("../../db/modules/task/index")

module.exports.getAllTasks = (req, res, next) => {
    Task.find().then(result => {
        res.send({data:result})
    })
}

module.exports.createNewTask = (req, res, next) => {
    const task = new Task(req.body)
    task.save().then(result => {
        res.send(result)
    }).catch(err => console.log(err))
}

module.exports.changeTaskInfo = (req, res, next) => {
    Task.updateOne({_id : req.body.id},req.body).then( result =>
        Task.find({_id : req.body._id})).then(result => {
        res.send("task changed")
    })
}

module.exports.deleteTask = (req, res, next) => {
    Task.deleteOne({_id: req.query._id }).then(result => {
        res.send("task delete")
    })
}