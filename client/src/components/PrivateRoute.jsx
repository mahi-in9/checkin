import { useAuth } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {
    const { loading, user } = useAuth()

    if (loading) {
        <p>Checking authentication...</p>
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    return <Outlet />

}

export default PrivateRoute