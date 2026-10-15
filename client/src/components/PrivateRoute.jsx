import { useAuth } from "../context/authContext"
import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute({ allowedRoles, children }) {
    const { loading, user } = useAuth()

    if (loading) {
        <p>Checking authentication...</p>
    }

    if (!user) {
        return <Navigate to={"/login"} replace />
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />

}

export default PrivateRoute