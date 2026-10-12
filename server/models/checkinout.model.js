const mongoose = require("mongoose")

const checkinoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    checkIn: { type: Date, required: true, default: Date.now() },
    location: {
        type: {
            latitude: Number,
            longitude: Number,
        },
        required: true,
    },
    checkOut: { type: Date, required: true }
}, {
    timestamps: true
})


module.exports = mongoose.model("CheckInOut", checkinoutSchema)
