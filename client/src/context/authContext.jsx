import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api"

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await api.get("/api/auth/me")
                const user = response.data.data;
                setUser(user)
            } catch (error) {
                setUser(null)
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCurrentUser()
    }, [])

    const register = async (userData) => {
        try {
            const res = await api.post("/api/auth/register", userData)
            // if (!res.ok) throw new Error("registration failed");
            const { token, user } = res.data.data;

            localStorage.setItem("token", token)
            setUser(user)
            setLoading(false)

            return res.data;
        } catch (error) {
            throw error
        }
    }

    const login = async (userData) => {
        try {
            const res = await api.post("/api/auth/login", userData)
            // if (!res.ok) throw new Error("Login failed");
            const { token, user } = res.data.data;

            localStorage.setItem("token", token)
            setUser(user)
            setLoading(false)

            return res.data;
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
            loading
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

