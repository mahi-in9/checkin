const { register, login, getMe, allUsers, forgotPasswordControllers, resetPasswordControllers, addEmployee, updateEmployeeStatus } = require("../controllers/auth.controller")
const express = require("express")
const router = express.Router()

const authMiddleware = require("../middlewares/auth.middleware")
const requireRole = require("../middlewares/requireRole")


router.post("/register", register)
router.post("/login", login)
router.post("/forgot-password", forgotPasswordControllers)
router.post("/reset-password/:token", resetPasswordControllers)
router.use(authMiddleware)
router.get("/me", getMe)
router.get("/users", requireRole("admin"), allUsers)
router.post("/add-employee", requireRole("admin"), addEmployee)
router.put("/update-employee-status/:id", requireRole("admin"), updateEmployeeStatus)

module.exports = router
