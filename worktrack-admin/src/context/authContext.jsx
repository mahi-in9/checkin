import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get("/api/auth/me")
                const user = response.data.data;
                setUser(user)
            } catch (error) {
                setUser(null)
                console.error(error?.message || "Failed to fetch current user")
            } finally {
                setLoading(false)
            }
        }

        const getAllUsers = async () => {
            try {
                const res = await api.get("/api/auth/users")
                setAllUsers(res.data.data)
                return res.data.data;
            } catch (error) {
                throw error
            }
        }
        const token = localStorage.getItem("token")
        if (token) {
            getAllUsers(),
                fetchCurrentUser()
        } else {
            setLoading(false)
        }
    }, [])

    const register = async (userData) => {
        try {
            const res = await api.post("/api/auth/register", userData)
            // if (!res.ok) throw new Error("registration failed");
            const { token, user, ...userStatus } = res.data.data;

            localStorage.setItem("token", token)
            setUser({ user, ...userStatus })
            setLoading(false)

            return res.data.data;
        } catch (error) {
            throw error
        }
    }

    const login = async (userData) => {
        try {
            const res = await api.post("/api/auth/login", userData)
            // if (!res.ok) throw new Error("Login failed");
            const { token, user, ...userStatus } = res.data.data;

            localStorage.setItem("token", token)
            setUser({ user, ...userStatus })
            setLoading(false)

            return res.data.data;
        } catch (error) {
            throw error
        }
    }


    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            register,
            login,
            logout,
            user,
            isAuthenticated: Boolean(user),
            loading,
            allUsers
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

