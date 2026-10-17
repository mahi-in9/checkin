import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import App from "../App.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import { useAuth } from "../context/authContext.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import AddEmployee from "../pages/AddEmployee.jsx";

function AuthLoader() {
    const { loading } = useAuth();
    if (loading) return <div className="auth-loader">Loading...</div>;
    return <Outlet />;
}

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? (
        <div className="layout">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    ) : (
        <Navigate to="/login" replace />
    );
}

// 👇 NEW — only admin/superadmin can pass through
function AdminRoute() {
    const { isAuthenticated, user, loading } = useAuth();
    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    const isAdmin = user?.user.role === "admin";
    if (!isAdmin) return <Navigate to="/dashboard" replace />; // send employees to their own page

    return <Outlet />;
}

function PublicRoute() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) return null;
    return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

function PageRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLoader />}>

                    {/* Public */}
                    <Route element={<PublicRoute />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password/:token" element={<ResetPassword />} />
                    </Route>

                    {/* Protected — any logged in user */}
                    <Route element={<ProtectedRoute />}>

                        {/* Employee page */}
                        <Route path="/attendance" element={<Dashboard />} />

                        {/* Admin only — employees get redirected to /dashboard */}
                        <Route element={<AdminRoute />}>
                            <Route path="/" element={<App />} />
                            <Route path="/add-employee" element={<AddEmployee />} />
                        </Route>

                    </Route>

                    <Route path="*" element={<Navigate to="/attendance" replace />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default PageRoute;