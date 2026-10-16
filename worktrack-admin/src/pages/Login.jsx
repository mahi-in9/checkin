import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";


function Login() {
    const navigate = useNavigate();
    const { loading, login } = useAuth();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loginLoading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChangeValue = (e) => {
        const { name, value } = e.target;

        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await login(userData);
            console.log(res)
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to sign in."
            );
            console.log(error)
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
                    <span className="auth-eyebrow">WELCOME BACK</span>
                    <h1>Good to see you again.</h1>
                    <p>
                        Sign in to manage your attendance and workday.
                    </p>
                </div>

                {error && (
                    <div className="auth-error" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
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
                        <div className="label-row">
                            <label htmlFor="password">Password</label>

                            <Link
                                to="/forgot-password"
                                className="forgot-link"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={userData.password}
                                onChange={handleChangeValue}
                                autoComplete="current-password"
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
                    </div>

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Signing in..." : "Sign In"}
                        {!loginLoading && <span aria-hidden="true"> →</span>}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/signup">Create account</Link>
                </p>
                <p className="auth-switch">
                    <Link to="/forgot-password">Forgot password?</Link>
                </p>

                <div className="auth-footer">
                    WORKTRACK · PEOPLE · PRESENCE · PROGRESS
                </div>
            </section>
        </main>
    );
}

export default Login;