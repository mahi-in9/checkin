import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const CheckInContext = createContext(null);

export const CheckInProvider = ({ children }) => {
    const [attendanceData, setAttendanceData] = useState([]);

    const fetchAttendanceData = async () => {
        try {
            const res = await api.get("/api/checkinout");

            setAttendanceData(res.data.data || []);
        } catch (error) {
            console.error("Failed to fetch attendance:", error);
        }
    };

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    return (
        <CheckInContext.Provider
            value={{
                attendanceData,
                fetchAttendanceData,
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