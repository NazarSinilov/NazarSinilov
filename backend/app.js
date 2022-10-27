const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config()
const apiRoutes = require("./src/modules/routes/routes")

app.use(cors())

const uri = process.env.MONGO_URI
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json())
app.use("/", apiRoutes)

app.listen(process.env.PORT, () => {
    console.log("Example app listening on port 8000")
})
