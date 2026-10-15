import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const CheckInContext = createContext(null);

export const CheckInProvider = ({ children }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false)

    const fetchAttendanceData = async (date = todayDate()) => {
        try {
            setLoading(true)
            const res = await api.post("/api/checkinout/date", { date });
            setAttendanceData(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const todayDate = () => {
        const parts = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).formatToParts(new Date());

        const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
        return `${values.year}-${values.month}-${values.day}`;
    };

    return (
        <CheckInContext.Provider
            value={{
                attendanceData,
                fetchAttendanceData,
                loading
            }}
        >
            {children}
        </CheckInContext.Provider>
    );
};

export const useCheckIn = () => {
    const context = useContext(CheckInContext);

    if (!context) {
        throw new Error("useCheckIn must be used within a CheckInProvider");
    }

    return context;
};