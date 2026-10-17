import Icon from "./Icons.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";

const items = [
  { key: "attendance", route: "/attendance", label: "Attendance", icon: "clock" },
  { key: "admin-dashboard", route: "/", label: "Admin Dashboard", icon: "home" },
  { key: "add-employee", route: "/add-employee", label: "Add Employee", icon: "plus" },
  { key: "employees", route: "/employees", label: "Employees", icon: "user" },
  // { key: "settings", route: "/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const initials = user?.user.firstName
    ? user.user.firstName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  const isAdmin = user?.user.role === "admin" || user.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;

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
        {items
          .filter((item) => {
            const isAdminItem = ["admin-dashboard", "add-employee", "employees"].includes(
              item.key
            );

            return !isAdminItem || isAdmin;
          })
          .map((item) => (
            <NavLink
              key={item.key}
              to={item.route}
              end={item.route === "/"}
              className={({ isActive }) =>
                "nav-item" + (isActive ? " active" : "")
              }
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
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
                <strong>{user?.user.firstName ?? "Admin User"}</strong>
                <span>{user?.user.role ?? "Super Admin"}</span>
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
