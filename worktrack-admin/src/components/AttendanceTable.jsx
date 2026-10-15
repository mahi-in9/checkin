import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icons.jsx";
import { departments, initials } from "../data.js";
import api from "../api/api.js"
import { useCheckIn } from "../context/CheckInContext.jsx";

function RowMenu({ employee }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="row-menu" ref={ref}>
      <button className="icon-btn plain" onClick={() => setOpen((o) => !o)} aria-label="Row actions">
        <Icon name="more" size={18} />
      </button>
      {open && (
        <div className="menu">
          <button onClick={() => { alert(`Viewing ${employee.name}`); setOpen(false); }}>View details</button>
          <button onClick={() => { alert(`Editing attendance for ${employee.name}`); setOpen(false); }}>Edit attendance</button>
          <button onClick={() => { alert(`Report exported for ${employee.name}`); setOpen(false); }}>Export report</button>
        </div>
      )}
    </div>
  );
}

const badgeClass = (s) => ({ "Checked In": "in", "Checked Out": "out", Absent: "absent" }[s]);

export default function AttendanceTable({ rows, query, onQuery, dept, onDept, title = "Today's Attendance" }) {

  const { attendanceData } = useCheckIn()

  return (
    <section className="card table-card">
      <div className="table-head">
        <h2>{title}</h2>
        <div className="table-tools">
          <div className="search-box">
            <Icon name="search" size={16} />
            <input placeholder="Search employees..." value={query} onChange={(e) => onQuery(e.target.value)} />
          </div>
          <div className="select-wrap">
            <select value={dept} onChange={(e) => onDept(e.target.value)}>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <Icon name="chevDown" size={16} />
          </div>
          <button className="icon-btn boxed" aria-label="Filters"><Icon name="filter" size={18} /></button>
        </div>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th className="c-num">#</th>
              <th>Employee</th>
              <th>Check In</th>
              <th>Check Out</th>
              {/* <th>Total Hours</th> */}
              {/* <th>Location</th> */}
              {/* <th>IP Address</th> */}
              {/* <th>Status</th> */}
              <th className="c-act"><Icon name="more" size={16} /></th>
            </tr>
          </thead>
          <tbody>
            {attendanceData && attendanceData.map((e, i) => (
              <tr key={e._id}>
                <td className="c-num">{i + 1}</td>
                <td>
                  <div className="emp">
                    <div className="avatar" style={{ background: e.color }}>{initials(e.userId.name)}</div>
                    <div>
                      <strong>{e.userId.name}</strong>
                      {/* <span>{e.role}</span> */}
                    </div>
                  </div>
                </td>
                <td>
                  {new Date(e.checkIn).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td>{e.checkOut ? new Date(e.checkOut).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }) : (<p>-</p>)}</td>
                {/* <td>{e.hours}</td> */}
                {/* <td>{e.location}</td> */}
                {/* <td>{e.ip}</td> */}
                {/* <td><span className={"badge " + badgeClass(e.status)}>{e.status}</span></td> */}
                <td className="c-act"><RowMenu employee={e} /></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={9} className="empty">No employees match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
