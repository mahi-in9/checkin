const { register, login, getMe } = require("../controllers/auth.controller")
const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/auth.middleware")

router.post("/register", register)
router.post("/login", login)
router.use(authMiddleware)
router.get("/me", getMe)

module.exports = router
