const express = require("express")

const app = express()

app.use(express.json())

app.use("/api/games", require("./routes/games"))

module.exports = app