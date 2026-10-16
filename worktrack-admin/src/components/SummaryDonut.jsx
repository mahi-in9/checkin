import React from "react";

const R = 78;
const C = 2 * Math.PI * R;

export default function SummaryDonut({ stats, users, attendanceData }) {


  // const pct = (n) => Math.round((n / stats.total) * 100);
  // const legend = [
  //   { label: "Checked In", value: stats.checkedIn, color: "#0f9a88" },
  //   { label: "Checked Out", value: stats.checkedOut, color: "#9aa5ad" },
  //   { label: "Absent", value: stats.absent, color: "#ef4444" },
  // ];

  // const teal = (stats.checkedIn / stats.total) * C;
  // const grey = (stats.checkedOut / stats.total) * C;

  // console.log(users, attendanceData)
  const totalUsers = users ? users.length : 0;

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
  // console.log(totalUsers, checkedInCount, checkedOutCount, absentCount)

  const pct = (n) => totalUsers ? Math.round((n / totalUsers) * 100) : 0;

  const legend = [
    { label: "Checked In", value: checkedInCount, color: "#0f9a88" },
    { label: "Checked Out", value: checkedOutCount, color: "#9aa5ad" },
    { label: "Absent", value: absentCount, color: "#ef4444" },
  ];

  const teal = (checkedInCount / totalUsers) * C;
  const grey = (checkedOutCount / totalUsers) * C;




  return (
    <section className="card summary-card">
      <h3>Attendance Summary</h3>
      <div className="summary-body">
        <div className="donut">
          <svg viewBox="0 0 200 200" width="180" height="180">
            <g transform="rotate(-90 100 100)">
              <circle cx="100" cy="100" r={R} fill="none" stroke="#e5e9ec" strokeWidth="26" />
              <circle cx="100" cy="100" r={R} fill="none" stroke="#b6bec5" strokeWidth="26"
                strokeDasharray={`${grey} ${C}`} transform="rotate(-6 100 100) scale(1,-1) translate(0,-200)" />
              <circle cx="100" cy="100" r={R} fill="none" stroke="#0f9a88" strokeWidth="26"
                strokeDasharray={`${teal} ${C}`} />
            </g>
          </svg>
          <div className="donut-center">
            <strong>{totalUsers}</strong>
            <span>Employees</span>
          </div>
        </div>

        <ul className="legend">
          {legend.map((l) => (
            <li key={l.label}>
              <span className="dot-lg" style={{ background: l.color }} />
              <span className="l-name">{l.label}</span>
              <strong>{l.value}</strong>
              <span className="l-pct">{pct(l.value)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
