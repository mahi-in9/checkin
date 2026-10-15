import Icon from "./Icons.jsx";
import { NavLink } from "react-router-dom";

const items = [
  { key: "dashboard", route: "/dashboard", label: "Dashboard", icon: "home" },
  { key: "attendance", route: "/", label: "Attendance", icon: "clock" },
  { key: "employees", route: "/employees", label: "Employees", icon: "users" },
  { key: "reports", route: "/reports", label: "Reports", icon: "report" },
  { key: "settings", route: "/settings", label: "Settings", icon: "settings" },
];

export default function Sidebar() {
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

        <div className="side-user">
          <div className="avatar mint">AS</div>
          <div>
            <strong>Admin User</strong>
            <span>Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
