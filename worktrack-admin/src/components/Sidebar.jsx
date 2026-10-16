import Icon from "./Icons.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const items = [
  { key: "dashboard", route: "/dashboard", label: "Dashboard", icon: "home" },
  { key: "attendance", route: "/", label: "Attendance", icon: "clock" },
  // { key: "employees", route: "/employees", label: "Employees", icon: "users" },
  // { key: "reports", route: "/reports", label: "Reports", icon: "report" },
  // { key: "settings", route: "/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin" || user?.role === "superadmin";


  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <Icon name="logo" size={40} className="brand-logo" />
        <div>
          <div className="brand-name">WorkTrack</div>
          <div className="brand-tag">People. Time. Progress.</div>
        </div>
      </div>

      <nav className="nav">
        {items.map((it) => (
          <NavLink
            key={it.key}
            to={it.route}
            end={it.route === "/"}
            className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
          >
            <Icon name={it.icon} size={20} />
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <button className="help-card">
          <Icon name="headset" size={26} stroke={1.5} />
          <div className="help-text">
            <strong>Need help?</strong>
            <span>Contact support</span>
          </div>
          <Icon name="chevRight" size={16} />
        </button>

        {
          isAuthenticated ? (
            <div className="side-user">
              <div className="avatar mint">{initials}</div>
              <div className="side-user-info">
                <strong>{user?.name ?? "Admin User"}</strong>
                <span>{user?.role ?? "Super Admin"}</span>
              </div>
              <button
                className="sidebar-logout-btn"
                onClick={handleLogout}
                aria-label="Logout"
                title="Logout"
              >
                <Icon name="logout" size={18} />
              </button>
            </div>
          ) : (
            <button className="sidebar-login-btn" onClick={() => navigate("/login")}>
              <Icon name="login" size={18} />
              <span>Login</span>
            </button>
          )}
      </div>
    </aside>
  );
}
