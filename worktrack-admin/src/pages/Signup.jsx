import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


function Signup() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [userData, setUserData] = useState({
        employeeId: "",
        firstName: "",
        lastName: "",
        DOB: "",
        shift: "morning",
        designation: "",
        email: "",
        password: "",
        role: "user",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChangeValue = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await register(userData);
            navigate("/attendance");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to create your account."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <section className="auth-card">
                <Link to="/login" className="auth-brand">
                    <span className="brand-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <circle cx="9" cy="7" r="4" />
                            <path d="M2 21v-2a7 7 0 0 1 14 0v2" />
                            <path d="M16 3.5a4 4 0 0 1 0 7.5" />
                            <path d="M20 21v-2a7 7 0 0 0-3-5.7" />
                        </svg>
                    </span>

                    <span>
                        <strong>WorkTrack</strong>
                        <small>People · Presence · Progress</small>
                    </span>
                </Link>

                <div className="auth-heading">
                    <span className="auth-eyebrow">GET STARTED</span>
                    <h1>Create your account</h1>
                    <p>
                        Join WorkTrack and make every workday count.
                    </p>
                </div>

                {error && (
                    <div className="auth-error" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={userData.firstName}
                            onChange={handleChangeValue}
                            autoComplete="given-name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
                            value={userData.lastName}
                            onChange={handleChangeValue}
                            autoComplete="family-name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="employeeId">Employee ID</label>
                        <input
                            id="employeeId"
                            type="text"
                            name="employeeId"
                            placeholder="Enter your employee ID"
                            value={userData.employeeId}
                            onChange={handleChangeValue}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={userData.email}
                            onChange={handleChangeValue}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a strong password"
                                value={userData.password}
                                onChange={handleChangeValue}
                                autoComplete="new-password"
                                minLength={4}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                                aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        <small className="field-hint">
                            Use at least 8 characters.
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="DOB">Date of Birth</label>
                        <input
                            id="DOB"
                            type="date"
                            name="DOB"
                            value={userData.DOB}
                            onChange={handleChangeValue}
                            autoComplete="bday"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="shift">Work Shift</label>
                        <select
                            id="shift"
                            name="shift"
                            value={userData.shift}
                            onChange={handleChangeValue}
                            required
                        >
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                            <option value="night">Night</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="designation">Designation</label>
                        <input
                            id="designation"
                            type="text"
                            name="designation"
                            placeholder="e.g. Software Developer"
                            value={userData.designation}
                            onChange={handleChangeValue}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Create Account"}
                        {!loading && <span aria-hidden="true"> →</span>}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">Sign in</Link>
                </p>

                <div className="auth-footer">
                    WORKTRACK · PEOPLE · PRESENCE · PROGRESS
                </div>
            </section>
        </main>
    );
}

export default Signup;