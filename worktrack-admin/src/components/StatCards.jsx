import React from "react";
import Icon from "./Icons.jsx";

import { useAuth } from "../context/authContext.jsx";
import { useCheckIn } from "../context/CheckInContext.jsx";

export default function StatCards({ stats }) {
  const { attendanceData } = useCheckIn()
  const { allUsers } = useAuth();

  const totalUsers = allUsers ? allUsers.length : 0;

  const checkedInCount = attendanceData.filter((d) => d.checkIn).length;
  const checkedOutCount = attendanceData.filter((d) => d.checkOut).length;

  const totalHoursPerUser = attendanceData.reduce((total, d) => {
    if (d.checkIn && d.checkOut) {
      const checkInTime = new Date(d.checkIn);
      const checkOutTime = new Date(d.checkOut);
      const hoursWorked = (checkOutTime - checkInTime) / (1000 * 60 * 60);
      return total + hoursWorked;
    }
    return total;
  }, 0);

  const usersWith5hours = totalHoursPerUser >= 5 ? 1 : 0;

  const absentCount = totalUsers - usersWith5hours;

  const pct = (n) => totalUsers ? Math.round((n / totalUsers) * 100) : 0;
  const cards = [
    {
      label: "Total Employees", value: totalUsers, tone: "mint", icon: "users",
      sub: <span className="up"><Icon name="arrowUp" size={13} stroke={2.2} /> {pct(totalUsers)}% users</span>
    },
    { label: "Checked In", value: checkedInCount, tone: "green", icon: "check", sub: `${pct(checkedInCount)}% of total` },
    { label: "Checked Out", value: checkedOutCount, tone: "grey", icon: "clock", sub: `${pct(checkedOutCount)}% of total` },
    { label: "Absent", value: absentCount, tone: "red", icon: "user", sub: `${pct(absentCount)}% of total` },
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
