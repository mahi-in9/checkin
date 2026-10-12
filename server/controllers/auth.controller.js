const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const err = new Error("user already exist")
            err.status = 400;
            throw err;
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashPassword, role })

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" })

        return res.status(201).json({ message: "user created successfully", data: { token } })

    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            const err = new Error("Invalid details")
            err.status = 400;
            throw err;
        }

        const confirmPassword = await bcrypt.compare(password, user.password);

        if (!confirmPassword) {
            const err = new Error("Password doesn't match")
            err.status = 400
            throw err;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN, { expiresIn: "7d" })

        return res.status(200).json({ message: "user logged-in successfully", data: { token } })

    } catch (error) {
        next(error)
    }
}


module.exports = { register, login }
