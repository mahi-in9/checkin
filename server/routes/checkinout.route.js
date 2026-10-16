const { checkIn, checkOut, getActiveCheckIn, getAttendanceByDate, forceCheckout } = require("../controllers/checkinout.controller");

const authMiddleware = require("../middlewares/auth.middleware")
const requireRole = require("../middlewares/requireRole")

const express = require('express')

const router = express.Router()

// These handlers rely on req.user, which is populated by the auth middleware.
// router.get("/", getAllAttendance)

router.use(authMiddleware)

router.get("/active", getActiveCheckIn)
router.post("/date", requireRole("admin"), getAttendanceByDate)
router.post("/checkin", checkIn)
router.post("/checkout", checkOut)
router.post("/force-checkout", forceCheckout);

module.exports = router
