import React from "react";
import Icon from "./Icons.jsx";

export default function Topbar({ query, onQuery }) {
  return (
    <header className="topbar">
      <div className="search-box wide">
        <Icon name="search" size={18} />
        <input
          placeholder="Search employees, departments..."
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        {/* <button className="icon-btn" aria-label="Notifications">
          <Icon name="bell" size={22} />
          <span className="dot" />
        </button>
        <button className="profile-btn">
          <div className="avatar teal">AS</div>
          <span>Admin User</span>
          <Icon name="chevDown" size={16} />
        </button> */}
      </div>
    </header>
  );
}
