import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";
import { useAuth } from "./authContext.jsx";

const CheckInContext = createContext(null);

export const CheckInProvider = ({ children }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(false)

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

    const fetchAttendanceData = async (date = todayDate()) => {
        try {
            setLoading(true)
            const res = await api.post("/api/checkinout/date", { date });
            setAttendanceData(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch attendance:", error.status === 403 ? "" : error?.message || "An error occurred while fetching attendance data.");
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            fetchAttendanceData();
        }
    }, [authLoading, isAuthenticated]);



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