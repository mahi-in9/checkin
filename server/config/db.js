const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI;
        const conn = await mongoose.connect(URI);
        console.log(`mongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error message: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB

