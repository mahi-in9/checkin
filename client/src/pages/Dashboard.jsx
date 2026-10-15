import { useEffect, useState } from "react";
import {
    UsersRound,
    Bell,
    MapPin,
    Clock3,
    LogIn,
    LogOut,
    CheckCircle2,
    Navigation,
    Crosshair,
    CalendarDays,
    ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/authContext";
import api from "../api/api";
import "./Dashboard.css";

const EIGHT_HOURS = 8 * 60 * 60 * 1000;

function Dashboard() {
    const { user, loading } = useAuth();

    const [session, setSession] = useState(null);
    const [location, setLocation] = useState(null);
    const [workingMs, setWorkingMs] = useState(0);
    const [now, setNow] = useState(Date.now());
    const [requestLoading, setRequestLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    // Live clock and working duration
    useEffect(() => {
        const timer = setInterval(() => {
            const currentTime = Date.now();

            setNow(currentTime);

            if (session?.checkIn) {
                setWorkingMs(
                    currentTime - new Date(session.checkIn).getTime()
                );
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [session]);

    // Obtain current location
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Geolocation is not supported."));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                (err) => reject(err),
                {
                    enableHighAccuracy: false,
                    maximumAge: 60_000,
                    timeout: 15000,
                }
            );
        });
    };

    // Check in
    const handleCheckIn = async () => {
        setError("");
        setNotice("");
        setRequestLoading(true);

        try {
            const currentLocation = await getCurrentLocation();

            const response = await api.post("/api/checkinout/checkin", {
                location: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
            });

            const savedRecord =
                response.data.data || response.data.checkinout || {};

            const checkInTime = savedRecord.checkIn || new Date().toISOString();

            setLocation(currentLocation);

            setSession({
                ...savedRecord,
                checkIn: checkInTime,
                checkOut: null,
            });

            setWorkingMs(Date.now() - new Date(checkInTime).getTime());

            setNotice("You have successfully checked in.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to check in. Please try again."
            );
        } finally {
            setRequestLoading(false);
        }
    };

    // Check out
    const handleCheckOut = async () => {

        if (!session?.checkIn || !isCheckedIn) {
            return
        }

        const elapsed = Date.now() - new Date(session.checkIn).getTime()

        if (elapsed < EIGHT_HOURS) {
            const remainingMs = EIGHT_HOURS - elapsed;

            alert(
                `You cannot check out yet. Please complete 8 hours of work.\nTime remaining: ${formatDuration(remainingMs)}`
            )
            return
        }

        setError("");
        setNotice("");
        setRequestLoading(true);

        try {
            // The backend should generate the authoritative checkout time.
            await api.post("/api/checkinout/checkout");

            setSession(null);
            setWorkingMs(0);

            setNotice("You have successfully checked out.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to check out. Please try again."
            );
        } finally {
            setRequestLoading(false);
        }
    };

    if (loading) {
        return <div className="worktrack-loading">Loading WorkTrack...</div>;
    }

    const isCheckedIn = Boolean(session?.checkIn && !session?.checkOut);

    const remainingMs = Math.max(
        0,
        EIGHT_HOURS - workingMs
    );

    const canCheckOut = isCheckedIn && remainingMs === 0;

    const formatDuration = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map((value) => String(value).padStart(2, "0"))
            .join(":");
    };

    const formatTime = (date) =>
        new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    const formattedDate = new Date(now).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    const firstName = user?.name?.split(" ")[0] || "there";

    return (
        <main className="worktrack-dashboard">
            {/* Header */}
            <header className="wt-header">
                <div className="wt-brand">
                    <div className="wt-brand-icon">
                        <UsersRound size={27} />
                    </div>

                    <div>
                        <h2>WorkTrack</h2>
                        <p>People · Presence · Progress</p>
                    </div>
                </div>

                <div className="wt-header-actions">
                    <span className="wt-date">
                        <CalendarDays size={16} />
                        {formattedDate}
                    </span>

                    <button
                        type="button"
                        className="wt-icon-button"
                        aria-label="Notifications"
                    >
                        <Bell size={21} />
                    </button>

                    <div className="wt-user-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                </div>
            </header>

            {/* Greeting */}
            <section className="wt-greeting">
                <div>
                    <span className="wt-eyebrow">
                        YOUR WORKSPACE
                    </span>

                    <h1>
                        Good {new Date(now).getHours() < 12
                            ? "Morning"
                            : new Date(now).getHours() < 17
                                ? "Afternoon"
                                : "Evening"}
                        , {firstName}
                    </h1>

                    <p>
                        {isCheckedIn
                            ? "You're checked in. Keep going!"
                            : "Let's make it a productive day."}
                    </p>
                </div>

                <div className="wt-greeting-decoration">
                    <Clock3 size={42} strokeWidth={1.3} />
                </div>
            </section>

            {/* Notifications */}
            {error && (
                <div className="wt-alert wt-alert-error" role="alert">
                    {error}
                </div>
            )}

            {notice && (
                <div className="wt-alert wt-alert-success" role="status">
                    <CheckCircle2 size={18} />
                    {notice}
                </div>
            )}

            {/* Current status */}
            {isCheckedIn && (
                <section className="wt-status-banner">
                    <div className="wt-status-check">
                        <CheckCircle2 size={23} />
                    </div>

                    <div className="wt-status-copy">
                        <strong>
                            Checked in at {formatTime(session.checkIn)}
                        </strong>
                        <span>{formattedDate}</span>
                    </div>

                    <span className="wt-status-badge">On Site</span>
                </section>
            )}

            {/* Time card */}
            <section className="wt-time-card">
                <span className="wt-time-label">
                    {isCheckedIn ? "WORKING" : "CURRENT TIME"}
                </span>

                <h2>
                    {isCheckedIn
                        ? formatDuration(workingMs)
                        : formatTime(now)}
                </h2>

                <p>
                    {isCheckedIn
                        ? "Hours : Minutes : Seconds"
                        : formattedDate}
                </p>

                {isCheckedIn && !canCheckOut && (
                    <div className="wt-countdown">
                        <Clock3 size={15} />
                        Checkout available in {formatDuration(remainingMs)}
                    </div>
                )}

                {isCheckedIn && canCheckOut && (
                    <div className="wt-eligible">
                        <CheckCircle2 size={15} />
                        Eight-hour requirement completed
                    </div>
                )}
            </section>

            {/* Main action */}

            {!isCheckedIn && (
                <button
                    type="button"
                    className="wt-checkin-button"
                    onClick={handleCheckIn}
                    disabled={requestLoading}
                >
                    <span className="wt-action-icon">
                        <LogIn size={31} />
                    </span>

                    <span className="wt-action-title">
                        {requestLoading ? "Checking In..." : "Check In"}
                    </span>

                    <span className="wt-action-subtitle">
                        Start Your Day
                    </span>
                </button>
            )}

            <button
                type="button"
                className="wt-checkout-button"
                onClick={handleCheckOut}

            >
                <LogOut size={25} />

                <span>
                    <strong>
                        {requestLoading ? "Checking Out..." : "Check Out"}
                    </strong>

                    <small>
                        {!canCheckOut
                            ? "Complete 8 hours to check out"
                            : "End Your Work Day"}
                    </small>
                </span>
            </button>


            {/* Location card */}
            <section className="wt-location-card">
                <div className="wt-card-heading">
                    <div>
                        <h3>
                            {isCheckedIn ? "Check-In Details" : "Your Current Location"}
                        </h3>
                        <p>Location recorded for your attendance</p>
                    </div>

                    <span className="wt-location-icon">
                        <Navigation size={19} />
                    </span>
                </div>

                {location ? (
                    <>
                        <div className="wt-location-main">
                            <div className="wt-map-placeholder">
                                <MapPin size={30} />
                                <span>GPS Location</span>
                            </div>

                            <div className="wt-location-coordinates">
                                <strong>Current Coordinates</strong>
                                <span>Lat: {location.latitude.toFixed(5)}</span>
                                <span>Lng: {location.longitude.toFixed(5)}</span>
                            </div>
                        </div>

                        <div className="wt-detail-row">
                            <MapPin size={18} />
                            <span>GPS Accuracy</span>
                            <strong>
                                {Math.round(location.accuracy)} metres
                            </strong>
                        </div>
                    </>
                ) : (
                    <div className="wt-empty-location">
                        <Crosshair size={28} />
                        <div>
                            <strong>Location not recorded yet</strong>
                            <p>Check in to capture your current location.</p>
                        </div>
                    </div>
                )}

                <div className="wt-detail-row">
                    <ShieldCheck size={18} />
                    <span>Attendance status</span>
                    <strong>{isCheckedIn ? "Checked In" : "Not Checked In"}</strong>
                </div>
            </section>

            {/* Footer */}
            <footer className="wt-footer">
                WorkTrack · People · Presence · Progress
            </footer>
        </main>
    );
}

export default Dashboard;