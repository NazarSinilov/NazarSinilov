const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()

const apiRoutes = require("./src/modules/routes/routes")

app.use(cors())

const uri = "mongodb+srv://nsinilov:restart9876@cluster0.vx7ieno.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.json())
app.use("/", apiRoutes)

app.listen(8000, () => {
    console.log("Example app listening on port 8000")
})