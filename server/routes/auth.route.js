const { register, login, getMe, allUsers } = require("../controllers/auth.controller")
const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/auth.middleware")
const requireRole = require("../middlewares/requireRole")


router.post("/register", register)
router.post("/login", login)
router.use(authMiddleware)
router.get("/me", getMe)
router.get("/users", requireRole("admin"), allUsers)

module.exports = router
