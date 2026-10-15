import {
    UsersRound,
    CheckCircle2,
    Clock3,
    UserRound,
    Search,
    Bell,
    CalendarDays,
    ChevronRight,
    House,
    Users,
    ChartNoAxesColumn,
    Settings,
    Headset,
    SlidersHorizontal,
    MoreVertical,
    MapPin,
    Plus,
    Minus,
    Plane,
} from "lucide-react";

import "./Attendance.css";

const employees = [
    {
        id: 1,
        name: "Rahul Sharma",
        department: "Engineering",
        checkIn: "09:02 AM",
        checkOut: "06:10 PM",
        hours: "9h 08m",
        location: "Noida",
        ip: "192.168.1.24",
        status: "Checked In",
        initials: "RS",
        color: "avatar-one",
    }
];

const navigation = [
    { name: "Dashboard", icon: House },
    { name: "Attendance", icon: Clock3, active: true },
    { name: "Employees", icon: Users },
    { name: "Reports", icon: ChartNoAxesColumn },
    { name: "Settings", icon: Settings },
];

function Attendance() {
    return (
        <div className="attendance-layout">

            {/* Main page */}
            <main className="attendance-main">
                {/* Topbar */}
                <header className="attendance-topbar">
                    <div className="global-search">
                        <Search size={20} />
                        <input
                            type="search"
                            placeholder="Search employees, departments..."
                        />
                    </div>

                    <div className="topbar-user">
                        <button
                            type="button"
                            className="notification-button"
                            aria-label="Notifications"
                        >
                            <Bell size={22} />
                            <span />
                        </button>

                        <div className="topbar-avatar">AS</div>
                        <strong>Admin User</strong>
                        <ChevronRight className="user-chevron" size={17} />
                    </div>
                </header>

                <div className="attendance-content">
                    {/* Page heading */}
                    <section className="attendance-page-heading">
                        <div>
                            <h1>Attendance</h1>
                            <p>
                                Track your team's attendance and working hours in real time.
                            </p>
                        </div>

                        <button className="date-picker" type="button">
                            <CalendarDays size={19} />
                            <span>May 14, 2025</span>
                            <ChevronRight size={18} />
                        </button>
                    </section>

                    {/* Summary cards */}
                    <section className="attendance-stats">
                        <div className="stat-card">
                            <div className="stat-icon stat-teal">
                                <UsersRound size={35} />
                            </div>
                            <div className="stat-details">
                                <p>Total Employees</p>
                                <h2>120</h2>
                                <small className="stat-growth">
                                    ↑ +12% <span>from last month</span>
                                </small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon stat-green">
                                <CheckCircle2 size={34} />
                            </div>
                            <div className="stat-details">
                                <p>Checked In</p>
                                <h2>96</h2>
                                <small>80% of total</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon stat-gray">
                                <Clock3 size={34} />
                            </div>
                            <div className="stat-details">
                                <p>Checked Out</p>
                                <h2>41</h2>
                                <small>34% of total</small>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon stat-red">
                                <UserRound size={34} />
                            </div>
                            <div className="stat-details">
                                <p>Absent</p>
                                <h2>24</h2>
                                <small>20% of total</small>
                            </div>
                        </div>
                    </section>

                    {/* Attendance table */}
                    <section className="attendance-table-card">
                        <div className="table-toolbar">
                            <h2>Today's Attendance</h2>

                            <div className="table-filters">
                                <label className="table-search">
                                    <Search size={19} />
                                    <input
                                        type="search"
                                        placeholder="Search employees..."
                                    />
                                </label>

                                <select aria-label="Filter by department">
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Marketing</option>
                                    <option>Sales</option>
                                    <option>HR</option>
                                    <option>Product</option>
                                </select>

                                <button
                                    type="button"
                                    className="filter-button"
                                    aria-label="Filters"
                                >
                                    <SlidersHorizontal size={21} />
                                </button>
                            </div>
                        </div>

                        <div className="attendance-table-wrapper">
                            <table className="attendance-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Employee</th>
                                        <th>Check In</th>
                                        <th>Check Out</th>
                                        <th>Total Hours</th>
                                        <th>Location</th>
                                        <th>IP Address</th>
                                        <th>Status</th>
                                        <th>
                                            <MoreVertical size={19} />
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>

                                            <td>
                                                <div className="employee-cell">
                                                    <div
                                                        className={`employee-avatar ${employee.color}`}
                                                    >
                                                        {employee.initials}
                                                    </div>

                                                    <div className="employee-info">
                                                        <strong>{employee.name}</strong>
                                                        <small>{employee.department}</small>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>{employee.checkIn}</td>
                                            <td>{employee.checkOut}</td>
                                            <td>{employee.hours}</td>
                                            <td>{employee.location}</td>
                                            <td>{employee.ip}</td>

                                            <td>
                                                <span
                                                    className={`status-pill ${employee.status === "Checked In"
                                                        ? "status-checked-in"
                                                        : employee.status === "Checked Out"
                                                            ? "status-checked-out"
                                                            : "status-absent"
                                                        }`}
                                                >
                                                    {employee.status}
                                                </span>
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="row-menu-button"
                                                    aria-label={`Options for ${employee.name}`}
                                                >
                                                    <MoreVertical size={19} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Bottom panels */}
                    <section className="attendance-bottom-grid">
                        <div className="bottom-card location-panel">
                            <h2>Check-in Locations</h2>
                            <p>Live location view of employee check-ins today.</p>

                            <div className="location-map">
                                <div className="map-label map-delhi">
                                    <strong>New Delhi</strong>
                                    <span>नई दिल्ली</span>
                                </div>

                                <div className="map-label map-mayur">
                                    Mayur Vihar
                                </div>

                                <div className="map-label map-noida">
                                    <strong>Noida</strong>
                                </div>

                                <div className="map-label map-gurgaon">
                                    <strong>Gurgaon</strong>
                                    <span>गुरुग्राम</span>
                                </div>

                                <div className="map-label map-greater">
                                    Greater Noida
                                    <span>ग्रेटर नोएडा</span>
                                </div>

                                <div className="map-road road-one" />
                                <div className="map-road road-two" />
                                <div className="map-river" />

                                <span className="map-pin pin-one">
                                    <MapPin size={31} fill="currentColor" />
                                </span>
                                <span className="map-pin pin-two">
                                    <MapPin size={31} fill="currentColor" />
                                </span>
                                <span className="map-pin pin-three">
                                    <MapPin size={31} fill="currentColor" />
                                </span>
                                <span className="map-pin pin-four">
                                    <MapPin size={31} fill="currentColor" />
                                </span>

                                <span className="airport-marker">
                                    <Plane size={17} />
                                </span>

                                <div className="map-zoom">
                                    <button type="button" aria-label="Zoom in">
                                        <Plus size={18} />
                                    </button>
                                    <button type="button" aria-label="Zoom out">
                                        <Minus size={18} />
                                    </button>
                                </div>

                                <span className="map-caption">Illustrative map</span>
                            </div>
                        </div>

                        <div className="bottom-card summary-panel">
                            <h2>Attendance Summary</h2>

                            <div className="summary-content">
                                <div className="donut-chart">
                                    <div className="donut-center">
                                        <strong>120</strong>
                                        <span>Employees</span>
                                    </div>
                                </div>

                                <div className="summary-legend">
                                    <div className="legend-row">
                                        <span className="legend-dot dot-teal" />
                                        <span>Checked In</span>
                                        <strong>96</strong>
                                        <span>80%</span>
                                    </div>

                                    <div className="legend-row">
                                        <span className="legend-dot dot-gray" />
                                        <span>Checked Out</span>
                                        <strong>41</strong>
                                        <span>34%</span>
                                    </div>

                                    <div className="legend-row">
                                        <span className="legend-dot dot-red" />
                                        <span>Absent</span>
                                        <strong>24</strong>
                                        <span>20%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Attendance;