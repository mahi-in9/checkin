const { checkIn, checkOut } = require("../controllers/checkinout.controller");

const authMiddleware = require("../middlewares/auth.middleware")

const express = require('express')

const router = express.Router()

router.post("/checkin", checkIn)
router.post("/checkout", checkOut)

module.exports = router
