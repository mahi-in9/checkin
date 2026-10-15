import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import App from "../App.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useState } from "react";


function PageRoute() {
    const [page, setPage] = useState("attendance");

    return (
        <BrowserRouter>
            <div className="layout">
                <Sidebar page={page} onNavigate={setPage} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default PageRoute
