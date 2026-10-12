require("dotenv").config()

const express = require("express")

const cors = require("cors")
const connectDB = require("./config/db")
const authRoutes = require("./routes/auth.route")
const errorHandler = require("./middlewares/error.middleware")

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get("/", (req, res) => {
    res.send("app is running")
})

app.use("/api/auth", authRoutes)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`server running at Port: ${PORT}`))

