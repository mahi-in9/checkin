import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// import bg from "../assets/herosection.jpg";
// import showEyes from "../assets/eye-show.svg";
// import hideEyes from "../assets/eye-hide.svg";
import api from "../api/api";

import "./ResetPassword.css";

const ResetPassword = () => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { token } = useParams();

    const handleResetPassword = async (e) => {
        e.preventDefault();

        setMessage("");
        setMessageType("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType("error");
            return;
        }

        if (password.length < 4) {
            setMessage("Password must be at least 4 characters long.");
            setMessageType("error");
            return;
        }

        try {
            setLoading(true);

            await api.post(`/api/auth/reset-password/${token}`, {
                password,
            });

            setMessage("Password reset successful! Redirecting to login...");
            setMessageType("success");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            setMessage(
                error?.response?.data?.msg ||
                error?.response?.data?.message ||
                "Unable to reset password. Your link may have expired."
            );
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="reset-page"
        // style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="reset-overlay"></div>

            <div className="reset-card">
                {/* WorkTrack Branding */}
                <div className="reset-header">
                    <div className="reset-logo">
                        <span className="reset-logo-icon">W</span>
                        <span className="reset-logo-text">WorkTrack</span>
                    </div>

                    <div className="reset-badge">
                        Account Security
                    </div>

                    <h1>Reset Password</h1>

                    <p>
                        Create a new password to securely access your
                        WorkTrack account.
                    </p>
                </div>

                {/* Reset Password Form */}
                <form onSubmit={handleResetPassword} className="reset-form">
                    <div className="reset-field">
                        <label htmlFor="new-password">New Password</label>

                        <div className="reset-input-wrapper">
                            <input
                                id="new-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength={4}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {/* <img
                                    src={showPassword ? hideEyes : showEyes}
                                    alt=""
                                /> */}
                            </button>
                        </div>
                    </div>

                    <div className="reset-field">
                        <label htmlFor="confirm-password">
                            Confirm Password
                        </label>

                        <div className="reset-input-wrapper">
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                minLength={4}
                                autoComplete="new-password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide confirm password"
                                        : "Show confirm password"
                                }
                            >
                                {/* <img
                                    src={showConfirmPassword ? hideEyes : showEyes}
                                    alt=""
                                /> */}
                            </button>
                        </div>
                    </div>

                    <div className="password-hint">
                        Use at least 8 characters for your password.
                    </div>

                    {message && (
                        <div
                            className={`reset-message ${messageType}`}
                            role="status"
                            aria-live="polite"
                        >
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="reset-submit-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="reset-spinner"></span>
                                Resetting Password...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </button>
                </form>

                <div className="reset-footer">
                    <Link to="/login" className="back-to-login">
                        <span aria-hidden="true">←</span> Back to Login
                    </Link>
                </div>

                <div className="reset-security-note">
                    <span className="security-icon" aria-hidden="true">🔒</span>
                    Your account security matters to us.
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;