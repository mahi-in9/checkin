import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "./AddEmployee.css";

const initialFormData = {
    employeeId: "",
    firstName: "",
    lastName: "",
    DOB: "",
    shift: "morning",
    designation: "",
    email: "",
    password: "",
    role: "user",
};

function AddEmployee() {
    const navigate = useNavigate();

    const [employeeData, setEmployeeData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployeeData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            // Change this URL to match your backend route.
            await api.post("/api/auth/add-employee", employeeData);

            setSuccess("Employee added successfully!");
            setEmployeeData(initialFormData);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add employee. Please try again."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="add-employee-page">
            <section className="employee-card">
                {/* Page Header */}
                <div className="employee-header">
                    <div>
                        <span className="employee-eyebrow">EMPLOYEE MANAGEMENT</span>
                        <h1>Add New Employee</h1>
                        <p>Enter the employee details to create a WorkTrack account.</p>
                    </div>

                    <div className="employee-icon" aria-hidden="true">
                        +
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="employee-alert employee-alert-error" role="alert">
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="employee-alert employee-alert-success" role="status">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="employee-form">
                    {/* Basic Information */}
                    <div className="employee-section-heading">
                        <h2>Basic Information</h2>
                        <p>Personal and employee identification details</p>
                    </div>

                    <div className="employee-form-grid">
                        {/* Employee ID */}
                        <div className="employee-field">
                            <label htmlFor="employeeId">Employee ID *</label>
                            <input
                                id="employeeId"
                                type="text"
                                name="employeeId"
                                placeholder="e.g. WT001"
                                value={employeeData.employeeId}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* First Name */}
                        <div className="employee-field">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="Enter first name"
                                value={employeeData.firstName}
                                onChange={handleChange}
                                autoComplete="given-name"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="employee-field">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                placeholder="Enter last name"
                                value={employeeData.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                                required
                            />
                        </div>

                        {/* Date of Birth */}
                        <div className="employee-field">
                            <label htmlFor="DOB">Date of Birth *</label>
                            <input
                                id="DOB"
                                type="date"
                                name="DOB"
                                value={employeeData.DOB}
                                onChange={handleChange}
                                max={new Date().toLocaleDateString("en-CA")}
                                required
                            />
                        </div>
                    </div>

                    {/* Work Information */}
                    <div className="employee-section-heading">
                        <h2>Work Information</h2>
                        <p>Configure the employee's role and working shift</p>
                    </div>

                    <div className="employee-form-grid">
                        {/* Designation */}
                        <div className="employee-field">
                            <label htmlFor="designation">Designation *</label>
                            <input
                                id="designation"
                                type="text"
                                name="designation"
                                placeholder="e.g. Software Developer"
                                value={employeeData.designation}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Shift */}
                        <div className="employee-field">
                            <label htmlFor="shift">Working Shift *</label>
                            <select
                                id="shift"
                                name="shift"
                                value={employeeData.shift}
                                onChange={handleChange}
                                required
                            >
                                <option value="morning">Morning</option>
                                <option value="evening">Evening</option>
                                <option value="night">Night</option>
                            </select>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="employee-section-heading">
                        <h2>Account Information</h2>
                        <p>Login credentials and account permissions</p>
                    </div>

                    <div className="employee-form-grid">
                        {/* Email */}
                        <div className="employee-field">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="employee@company.com"
                                value={employeeData.email}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="employee-field">
                            <label htmlFor="password">Temporary Password *</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a temporary password"
                                value={employeeData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                minLength={4}
                                required
                            />
                        </div>

                        {/* Role */}
                        <div className="employee-field">
                            <label htmlFor="role">Account Role *</label>
                            <select
                                id="role"
                                name="role"
                                value={employeeData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="user">Employee</option>
                                <option value="admin">Admin</option>
                            </select>
                            <small>Admin accounts should be assigned only to authorized staff.</small>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="employee-actions">
                        <button
                            type="button"
                            className="employee-cancel-btn"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="employee-submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Adding Employee..." : "Add Employee"}
                            {!loading && <span aria-hidden="true"> →</span>}
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default AddEmployee;