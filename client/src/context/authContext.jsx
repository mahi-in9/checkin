import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api"

const AuthContext = createContext(null)

export default AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")

        if (storedUser && token) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const register = async (userData) => {
        try {
            const res = await api.post("/api/register", userData)
            if (!res.ok) throw new Error("registration failed")
        } catch (error) {

        }
    }
}


