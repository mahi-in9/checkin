const CheckInOut = require("../models/checkinout.model")

const checkIn = async (req, res, next) => {
    try {
        const { location } = req.body;
        const userId = req.user._id;

        const activeCheckIn = await CheckInOut.findOne({
            userId,
            checkOut: null
        })

        if (activeCheckIn) {
            const err = new Error("the last checking is not checked out");
            err.status = 400;
            throw err;
        }

        const checkinout = await CheckInOut.create({
            userId,
            location,
            ipAddress: req.ip,
            checkOut: null
        });

        return res.status(201).json({ success: true, message: "Checked In Successfully", data: checkinout })
    } catch (error) {
        next(error)
    }
}

const checkOut = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const checkOut = new Date()

        const checkedIn = await CheckInOut.findOne({
            userId,
            checkOut: null
        })

        if (!checkedIn) {
            const err = new Error("No active check-in found");
            err.status = 404;
            throw err;
        }

        const workedMs = checkOut.getTime() - checkedIn.checkIn.getTime()
        const eightHoursMs = 8 * 60 * 60 * 1000

        if (workedMs < eightHoursMs) {
            const err = new Error("You didn't completed your 8hours")
            err.status = 400;
            throw err;
        }

        checkedIn.checkOut = checkOut;
        await checkedIn.save();

        return res.status(200).json({ success: true, message: "successfully checked out", data: checkedIn })

    } catch (error) {
        next(error)
    }
}


const getAllAttendance = async (req, res, next) => {
    try {
        const attendanceData = await CheckInOut.find()
            .populate("userId", "name email department")
            .sort({ checkIn: -1 })

        return res.status(200).json({ success: true, message: "all attendance fetched", data: attendanceData })

    } catch (error) {
        next(error)
    }
}


module.exports = { checkIn, checkOut, getAllAttendance }

