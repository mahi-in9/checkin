const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    employeeId: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DOB: { type: String, required: true },
    shift: { type: String, enum: ["morning", "evening", "night"], required: true },
    designation: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isActive: { type: Boolean, default: true },
})

module.exports = mongoose.model("User", userSchema)
