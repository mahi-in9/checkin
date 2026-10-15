import React from "react";
import { employees } from "../data.js";
import { initials } from "../data.js";

export function EmployeesPage({ rows }) {
  return (
    <section className="card table-card">
      <div className="table-head"><h2>All Employees</h2></div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr><th className="c-num">#</th><th>Employee</th><th>Department</th><th>Location</th><th>IP Address</th></tr>
          </thead>
          <tbody>
            {rows.map((e, i) => (
              <tr key={e.id}>
                <td className="c-num">{i + 1}</td>
                <td>
                  <div className="emp">
                    <div className="avatar" style={{ background: e.color }}>{initials(e.name)}</div>
                    <strong>{e.name}</strong>
                  </div>
                </td>
                <td>{e.dept}</td><td>{e.location}</td><td>{e.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ReportsPage() {
  const reports = ["Daily Attendance", "Weekly Hours Summary", "Monthly Absence Report", "Late Check-ins"];
  return (
    <section className="card placeholder">
      <h2>Reports</h2>
      <p className="muted">Pick a report to generate.</p>
      <div className="report-list">
        {reports.map((r) => (
          <div className="report-item" key={r}>
            <strong>{r}</strong>
            <button className="btn" onClick={() => alert(`${r} generated (demo)`)}>Generate</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SettingsPage() {
  return (
    <section className="card placeholder">
      <h2>Settings</h2>
      <p className="muted">Demo settings — wire these to your backend.</p>
      <label className="setting"><span>Work start time</span><input type="time" defaultValue="09:00" /></label>
      <label className="setting"><span>Work end time</span><input type="time" defaultValue="18:00" /></label>
      <label className="setting"><span>Email daily summary</span><input type="checkbox" defaultChecked /></label>
    </section>
  );
}

export { employees };
