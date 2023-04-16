const express = require("express")
const path = require("path")
const dotenv = require("dotenv").config()
const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")))

// Albums route
app.use("/api/albums", require("../backend/routes/albumsRoute"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))