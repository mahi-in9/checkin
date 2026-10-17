import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./Employees.css";

function Employees() {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingEmployeeId, setUpdatingEmployeeId] = useState(null);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/api/auth/users");

            // Supports either { data: [...] } or { data: { users: [...] } }
            const result = response.data.data;
            const users = Array.isArray(result) ? result : result?.users;

            if (!Array.isArray(users)) {
                throw new Error("Unexpected employee data received from server.");
            }

            setEmployees(users);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to fetch employees."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const filteredEmployees = employees.filter((employee) => {
        const query = search.toLowerCase().trim();

        const searchableFields = [
            employee.employeeId,
            employee.firstName,
            employee.lastName,
            employee.email,
            employee.designation,
            employee.shift,
            employee.role,
        ];

        return searchableFields.some((field) =>
            String(field ?? "").toLowerCase().includes(query)
        );
    });

    const getInitials = (employee) => {
        const first = employee.firstName?.[0] || "";
        const last = employee.lastName?.[0] || "";

        return (first + last).toUpperCase() || "E";
    };

    const formatDate = (date) => {
        if (!date) return "—";

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return "—";

        return parsedDate.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleToggleStatus = async (employee) => {
        const currentlyActive = employee.isActive !== false;
        const newStatus = !currentlyActive;

        const action = newStatus ? "activate" : "deactivate";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} ${employee.firstName} ${employee.lastName}?`
        );

        if (!confirmed) return;

        setUpdatingEmployeeId(employee._id);
        setError("");

        try {
            const response = await api.put(
                `/api/auth/update-employee-status/${employee._id}`,
                { isActive: newStatus }
            );

            const updatedEmployee = response.data.data;

            setEmployees((prev) =>
                prev.map((item) =>
                    item._id === employee._id
                        ? { ...item, isActive: updatedEmployee.isActive }
                        : item
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update employee status."
            );
        } finally {
            setUpdatingEmployeeId(null);
        }
    };

    return (
        <main className="employees-page">
            {/* Header */}
            <header className="employees-header">
                <div>
                    <span className="employees-eyebrow">
                        EMPLOYEE MANAGEMENT
                    </span>

                    <h1>Employees</h1>

                    <p>Manage your workforce and employee information.</p>
                </div>

                <Link to="/add-employee" className="employees-add-btn">
                    <span aria-hidden="true">+</span>
                    Add Employee
                </Link>
            </header>

            {/* Summary */}
            <section className="employees-summary">
                <div className="employees-summary-card">
                    <div className="summary-icon">👥</div>

                    <div>
                        <span>Total Employees</span>
                        <strong>{employees.length}</strong>
                    </div>
                </div>

                <div className="employees-summary-card">
                    <div className="summary-icon">✓</div>

                    <div>
                        <span>Regular Employees</span>
                        <strong>
                            {employees.filter((employee) => employee.role === "user").length}
                        </strong>
                    </div>
                </div>

                <div className="employees-summary-card">
                    <div className="summary-icon">★</div>

                    <div>
                        <span>Administrators</span>
                        <strong>
                            {employees.filter((employee) => employee.role === "admin").length}
                        </strong>
                    </div>
                </div>
            </section>

            {/* Employee table */}
            <section className="employees-panel">
                <div className="employees-panel-header">
                    <div>
                        <h2>All Employees</h2>
                        <p>
                            {loading
                                ? "Loading employee records..."
                                : `${filteredEmployees.length} employee${filteredEmployees.length !== 1 ? "s" : ""
                                } found`}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="employees-refresh-btn"
                        onClick={fetchEmployees}
                        disabled={loading}
                    >
                        ↻ Refresh
                    </button>
                </div>

                {/* Search */}
                <div className="employees-toolbar">
                    <div className="employees-search">
                        <span aria-hidden="true">⌕</span>

                        <input
                            type="search"
                            placeholder="Search name, employee ID, email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search employees"
                        />
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="employees-error" role="alert">
                        <span>{error}</span>

                        <button type="button" onClick={fetchEmployees}>
                            Try again
                        </button>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="employees-state">
                        <div className="employees-spinner" />
                        <p>Loading employees...</p>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredEmployees.length === 0 && (
                    <div className="employees-state">
                        <div className="employees-empty-icon">👤</div>

                        <h3>
                            {search ? "No matching employees" : "No employees found"}
                        </h3>

                        <p>
                            {search
                                ? "Try a different search term."
                                : "Add an employee to get started."}
                        </p>

                        {!search && (
                            <Link to="/add-employee" className="employees-add-btn">
                                + Add Employee
                            </Link>
                        )}
                    </div>
                )}

                {/* Table */}
                {!loading && !error && filteredEmployees.length > 0 && (
                    <div className="employees-table-wrapper">
                        <table className="employees-table">
                            <thead>
                                <tr>
                                    <th>EMPLOYEE</th>
                                    <th>EMPLOYEE ID</th>
                                    <th>DESIGNATION</th>
                                    <th>SHIFT</th>
                                    <th>DATE OF BIRTH</th>
                                    <th>ROLE</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredEmployees.map((employee) => (
                                    <tr key={employee._id || employee.employeeId}>
                                        <td>
                                            <div className="employee-identity">
                                                <div className="employee-avatar">
                                                    {getInitials(employee)}
                                                </div>

                                                <div className="employee-identity-info">
                                                    <strong>
                                                        {employee.firstName} {employee.lastName}
                                                    </strong>

                                                    <span>{employee.email}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <span className="employee-id">
                                                {employee.employeeId || "—"}
                                            </span>
                                        </td>

                                        <td>{employee.designation || "—"}</td>

                                        <td>
                                            <span
                                                className={`shift-badge ${employee.shift || ""
                                                    }`}
                                            >
                                                {employee.shift || "—"}
                                            </span>
                                        </td>

                                        <td>{formatDate(employee.DOB)}</td>

                                        <td>
                                            <span
                                                className={`role-badge ${employee.role === "admin"
                                                    ? "role-admin"
                                                    : "role-user"
                                                    }`}
                                            >
                                                {employee.role || "user"}
                                            </span>
                                        </td>
                                        <td>
                                            <span
                                                className={`employee-status ${employee.isActive === false ? "status-inactive" : "status-active"
                                                    }`}
                                            >
                                                {employee.isActive === false ? "Inactive" : "Active"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={`employee-status-btn ${employee.isActive === false
                                                    ? "activate-btn"
                                                    : "deactivate-btn"
                                                    }`}
                                                onClick={() => handleToggleStatus(employee)}
                                                disabled={updatingEmployeeId === employee._id}
                                            >
                                                {updatingEmployeeId === employee._id
                                                    ? "Updating..."
                                                    : employee.isActive === false
                                                        ? "Activate"
                                                        : "Deactivate"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default Employees;