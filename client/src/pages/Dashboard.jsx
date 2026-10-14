import { useState } from "react"
import { useAuth } from "../context/authContext"
import api from "../api/api"

function Dashboard() {
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [checkIn, setCheckIn] = useState(null)
    const [checkOut, setCheckOut] = useState(null)

    const { user, loading } = useAuth()

    const getCurrentLocation = () => {

        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { longitude, latitude } = position.coords;

                    setLongitude(longitude);
                    setLatitude(latitude);

                    resolve({ longitude, latitude })
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    const handleCheckIn = async (e) => {
        e.preventDefault();

        const location = await getCurrentLocation();
        const date = Date.now()

        setCheckIn(date)

        setLongitude(location.longitude)
        setLatitude(latitude)


        const attendanceData = { longitude, latitude, checkIn }

        console.log(longitude, latitude)
        try {
            const response = await api.post("/api/checkinout/checkin", attendanceData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const hanleCheckOut = async (e) => {
        e.preventDefault();

        const date = Date.now()
        setCheckOut(date)

        const attendanceData = { checkOut }

        try {
            const response = await api.post("/api/checkinout/checkout", attendanceData)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <div>
                <h4>Good Morning</h4>
                <h2>{user.name}</h2>
            </div>

            <div>
                <button onClick={handleCheckIn} >Check In</button>
                <button onClick={hanleCheckOut}>Check Out</button>
            </div>
        </div>
    )
}

export default Dashboard