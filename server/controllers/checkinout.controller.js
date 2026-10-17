const CheckInOut = require("../models/checkinout.model")
const User = require("../models/user.model")
const axios = require("axios")

const checkIn = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body.location || {};
        const userId = req.user._id;

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid latitude and longitude are required",
            });
        }

        const activeUser = await User.findById({ _id: userId });

        if (!activeUser || !activeUser.isActive) {
            return res.status(403).json({
                success: false,
                message: "User is not active. Please contact the administrator.",
            });
        }

        const activeCheckIn = await CheckInOut.findOne({
            userId,
            checkOut: null,
        })

        if (activeCheckIn) {
            const err = new Error("the last checking is not checked out");
            err.status = 400;
            throw err;
        }

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return res.status(400).json({
                success: false,
                message: "Valid latitude and longitude are required",
            });
        }

        const response = await axios.post(
            "https://places.googleapis.com/v1/places:searchNearby",
            {
                maxResultCount: 10,
                rankPreference: "DISTANCE",
                locationRestriction: {
                    circle: {
                        center: {
                            latitude,
                            longitude,
                        },
                        radius: 100,
                    },
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask":
                        "places.displayName,places.formattedAddress,places.location",
                },
            }
        );

        // 3. Get the nearest business
        const places = response.data.places || [];

        if (places.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No nearby businesses found",
            });
        }

        const nearestPlace = places[0];

        const nearbyLocation = {
            name: nearestPlace.displayName?.text || "Unknown",
            address: nearestPlace.formattedAddress || "Address unavailable",
            latitude,
            longitude,
        };


        const checkinout = await CheckInOut.create({
            userId,
            location: nearbyLocation,
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

const getActiveCheckIn = async (req, res, next) => {
    try {
        const activeCheckIn = await CheckInOut.findOne({
            userId: req.user._id,
            checkOut: null
        });

        return res.status(200).json({
            success: true,
            data: activeCheckIn
        });
    } catch (error) {
        next(error);
    }
}


// const getAllAttendance = async (req, res, next) => {
//     try {
//         const attendanceData = await CheckInOut.find()
//             .populate("userId", "name email department")
//             .sort({ checkIn: -1 })

//         return res.status(200).json({ success: true, message: "all attendance fetched", data: attendanceData })

//     } catch (error) {
//         next(error)
//     }
// }

const getAttendanceByDate = async (req, res, next) => {
    try {
        const { date } = req.body;

        if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ success: false, message: "Invalid date" });
        }

        const startOfDay = new Date(`${date}T00:00:00+05:30`);
        const endOfDay = new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000);

        const attendanceData = await CheckInOut.find({
            checkIn: { $gte: startOfDay, $lt: endOfDay },
        }).populate("userId", "firstName lastName email department");


        return res.status(200).json({
            success: true,
            message: "Today's attendance fetched successfully",
            data: attendanceData,
            // userId: req.user._id
        });
    } catch (error) {
        next(error);
    }
};


const forceCheckout = async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Find the user's active attendance record
        const attendance = await CheckInOut.findOne({
            userId,
            checkOut: null,
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: "No active check-in found.",
            });
        }

        // Force checkout immediately
        attendance.checkOut = new Date();

        await attendance.save();

        return res.status(200).json({
            success: true,
            message: "Force checkout successful.",
            data: attendance,
        });
    } catch (error) {
        next(error);
    }
};


module.exports = { checkIn, checkOut, getActiveCheckIn, getAttendanceByDate, forceCheckout }
