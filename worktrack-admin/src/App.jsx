import React, { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Icon from "./components/Icons.jsx";
import StatCards from "./components/StatCards.jsx";
import AttendanceTable from "./components/AttendanceTable.jsx";
import LocationMap from "./components/LocationMap.jsx";
import SummaryDonut from "./components/SummaryDonut.jsx";
import { EmployeesPage, ReportsPage, SettingsPage } from "./pages/OtherPages.jsx";
import { employees, stats } from "./data.js";
import { useCheckIn } from "./context/CheckInContext.jsx";
import { useAuth } from "./context/authContext.jsx";

const titles = {
  dashboard: ["Dashboard", "Overview of your team's activity."],
  attendance: ["Attendance", "Track your team's attendance and working hours in real time."],
  employees: ["Employees", "Everyone in your organisation."],
  reports: ["Reports", "Generate and download reports."],
  settings: ["Settings", "Configure your workspace."],
};

export default function App() {
  const [page, setPage] = useState("attendance");
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All Departments");
  const [date, setDate] = useState(new Date(Date.now()));

  const { attendanceData, fetchAttendanceData, loading } = useCheckIn()
  const { allUsers } = useAuth();
  // console.log("App attendanceData:", attendanceData);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attendanceData.filter(
      (e) =>
        (e.userId.firstName.toLowerCase().includes(q) || e.userId.email.toLowerCase().includes(q)) || (e.userId.lastName.toLowerCase().includes(q))
    );
  }, [query, attendanceData]);

  const dateValue = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-")

  const shiftDay = (n) => setDate((d) => new Date(d.getTime() + n * 86400000));
  const dateLabel = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  const [title, subtitle] = titles[page];
  const showTable = page === "attendance" || page === "dashboard";

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(new Date(`${selectedDate}T00:00:00`));
    fetchAttendanceData(selectedDate);
  };

  return (
    <div className="layout">
      {/* <Sidebar page={page} onNavigate={setPage} /> */}

      <main className="main">
        <Topbar query={query} onQuery={setQuery} />

        <div className="content">
          <div className="page-head">
            <div>
              <h1>{title}</h1>
              <p className="muted">{subtitle}</p>
            </div>
            {page === "attendance" && (
              <div className="date-picker">
                {/* <Icon name="calendar" size={18} /> */}
                {/* <span>{dateLabel}</span> */}
                <input type="date" className="date-input" value={dateValue} onChange={handleDateChange} />
                {/* <button onClick={() => shiftDay(1)} aria-label="Next day"><Icon name="chevRight" size={16} /></button> */}
              </div>
            )}
          </div>

          {showTable && <StatCards stats={stats} />}

          {showTable && (
            <AttendanceTable rows={rows} query={query} onQuery={setQuery} dept={dept} onDept={setDept} />
          )}
          {showTable && (
            <div className="bottom-grid">
              <LocationMap />
              <SummaryDonut stats={stats} users={allUsers} attendanceData={attendanceData} />
            </div>
          )}

          {page === "employees" && <EmployeesPage rows={rows} />}
          {page === "reports" && <ReportsPage />}
          {page === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}
