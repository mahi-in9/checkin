import React, { useState } from "react";
// import bg from "../assets/herosection.jpg";
import api from "../api/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        setMessage("");
        setSuccess(false);
        setLoading(true);

        try {
            const res = await api.post("/api/auth/forgot-password", {
                email,
            });

            setSuccess(true);
            setMessage(
                res.data.msg || "If your account exists, a reset link will be sent to your email."
            );
        } catch (error) {
            setMessage(
                error?.response?.data?.msg ||
                "Unable to process your request. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="forgot-password-page"
        // style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="forgot-password-overlay" />

            <div className="forgot-password-container">
                <div className="forgot-password-card">
                    {/* Brand */}
                    <div className="forgot-password-header">
                        <div className="forgot-password-logo">
                            <span className="logo-mark">W</span>
                            <span className="logo-name">WorkTrack</span>
                        </div>

                        <span className="forgot-password-badge">
                            Account Recovery
                        </span>

                        <h1>Forgot Password?</h1>

                        <p className="forgot-password-description">
                            No worries. Enter your registered email address and
                            we'll help you reset your password.
                        </p>
                    </div>

                    {/* Message */}
                    {loading && (
                        <div className="forgot-message loading-message" role="status">
                            <span className="loading-spinner" />
                            Sending your reset link...
                        </div>
                    )}

                    {!loading && message && (
                        <div
                            className={`forgot-message ${success ? "success-message" : "error-message"
                                }`}
                            role="status"
                        >
                            {message}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleForgotPassword}
                        className="forgot-password-form"
                    >
                        <div className="form-group">
                            <label htmlFor="forgot-email">
                                Work email address
                            </label>

                            <input
                                type="email"
                                id="forgot-email"
                                name="email"
                                placeholder="you@company.com"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            className="forgot-submit-button"
                            disabled={loading}
                        >
                            {loading ? (
                                "Sending..."
                            ) : (
                                <>
                                    Send Reset Link
                                    <span aria-hidden="true">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="forgot-password-footer">
                        <a href="/login" className="back-to-login">
                            <span aria-hidden="true">←</span>
                            Back to Login
                        </a>

                        <div className="forgot-security-note">
                            <span className="security-dot" />
                            Your account security matters to us.
                        </div>
                    </div>
                </div>

                <p className="forgot-copyright">
                    © {new Date().getFullYear()} WorkTrack. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;