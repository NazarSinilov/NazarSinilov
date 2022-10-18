const mongoose = require('mongoose');
const {Schema} = mongoose

const expensesScheme = new Schema({
    text : String,
    price : Number,
    date : {type : Date, default : Date.now}
})

module.exports = Task = mongoose.model("expenses", expensesScheme)