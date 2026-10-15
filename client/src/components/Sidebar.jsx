import { Link, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Clock3,
    Users,
    ChartNoAxesColumn,
    Settings,
    LogOut,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import "./Sidebar.css";

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const navigation = [
        { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
        { name: "Admin Dashboard", path: "/admin-dashboard", icon: LayoutDashboard },
        // { name: "Attendance", path: "/attendance", icon: Clock3 },
        // { name: "Employees", path: "/employees", icon: Users },
        // { name: "Reports", path: "/reports", icon: ChartNoAxesColumn },
        // { name: "Settings", path: "/settings", icon: Settings },
    ];

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <h2>WorkTrack</h2>
                <p>People. Time. Progress.</p>
            </div>

            <nav className="sidebar-navigation">
                <p className="sidebar-heading">WORKSPACE</p>

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="sidebar-link"
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-bottom">
                {user && (
                    <div className="sidebar-profile">
                        <div className="sidebar-avatar">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div className="sidebar-user">
                            <strong>{user.name}</strong>
                            <span>{user.role}</span>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="sidebar-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;