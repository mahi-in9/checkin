const CheckInOut = require("../models/checkinout.model")

const checkIn = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { checkIn, location } = req.body;

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
        const checkedOut = await CheckInOut.findOneAndUpdate({
            userId,
            checkOut: null
        }, { checkOut }, { new: true })

        if (!checkedOut) {
            const err = new Error("No active check-in found");
            err.status = 404;
            throw err;
        }

        return res.status(202).json({ success: true, message: "successfully checked out" })

    } catch (error) {
        next(error)
    }

}

module.exports = { checkIn, checkOut }

