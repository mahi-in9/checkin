const CheckInOut = require("../models/checkinout.model")

const checkIn = async (req, res, next) => {
    try {
        const { checkIn, location } = req.body;
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
            checkIn,
            location,
            checkOut: null
        });

        return res.status(201).json({ success: true, message: "Checked In Successfully" })
    } catch (error) {
        next(error)
    }
}

const checkOut = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { checkOut } = req.body;

        const checkedIn = await CheckInOut.findOne({
            userId,
            checkOut: null
        })

        if (!checkedIn) {
            const err = new Error("No active check-in found");
            err.status = 404;
            throw err;
        }

        const date1 = new Date(checkedIn.checkIn)
        const date2 = new Date(checkOut)

        date1.setHours(date1.getHours() + 8)

        if (date1 !== date2) {
            const err = new Error("You didn't completed your 8hours")
            err.status = 400;
            throw err;
        }

        checkedIn.checkOut = checkOut;

        checkedIn.save();

        return res.status(202).json({ success: true, message: "successfully checked out" })

    } catch (error) {
        next(error)
    }
}

module.exports = { checkIn, checkOut }

