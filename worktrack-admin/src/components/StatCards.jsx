import React from "react";
import Icon from "./Icons.jsx";

export default function StatCards({ stats }) {
  const pct = (n) => Math.round((n / stats.total) * 100);
  const cards = [
    { label: "Total Employees", value: stats.total, tone: "mint", icon: "users",
      sub: <span className="up"><Icon name="arrowUp" size={13} stroke={2.2} /> +12% from last month</span> },
    { label: "Checked In", value: stats.checkedIn, tone: "green", icon: "check", sub: `${pct(stats.checkedIn)}% of total` },
    { label: "Checked Out", value: stats.checkedOut, tone: "grey", icon: "clock", sub: `${pct(stats.checkedOut)}% of total` },
    { label: "Absent", value: stats.absent, tone: "red", icon: "user", sub: `${pct(stats.absent)}% of total` },
  ];

  return (
    <section className="stat-grid">
      {cards.map((c) => (
        <div className="card stat-card" key={c.label}>
          <div className={"stat-icon " + c.tone}>
            {c.tone === "green" ? (
              <span className="check-circle"><Icon name="check" size={20} stroke={3} /></span>
            ) : (
              <Icon name={c.icon} size={28} stroke={c.tone === "grey" ? 2 : 1.8} />
            )}
          </div>
          <div>
            <div className="stat-label">{c.label}</div>
            <div className="stat-value">{c.value}</div>
            <div className="stat-sub">{c.sub}</div>
          </div>
        </div>
      ))}
    </section>
  );
}
