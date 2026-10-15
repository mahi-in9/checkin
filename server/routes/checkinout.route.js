const { checkIn, checkOut, getAttendanceByDate } = require("../controllers/checkinout.controller");

const authMiddleware = require("../middlewares/auth.middleware")

const express = require('express')

const router = express.Router()

// These handlers rely on req.user, which is populated by the auth middleware.
// router.get("/", getAllAttendance)
router.post("/date", getAttendanceByDate)

router.use(authMiddleware)

router.post("/checkin", checkIn)
router.post("/checkout", checkOut)

module.exports = router
