const cors = require("cors")
const express = require('express')
const app = express()
app.use(cors())
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()
const apiRoutes = require("./src/modules/routes/routes")


const URI = process.env.MONGO_URI
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json())
app.use("/", apiRoutes)

app.listen(process.env.PORT, () => {
    console.log("Example app listening on port 8000")
})
