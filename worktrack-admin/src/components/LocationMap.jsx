import React, { useState } from "react";
import Icon from "./Icons.jsx";
import { useCheckIn } from "../context/CheckInContext";

const pins = [
  { x: 28, y: 52 },
  { x: 41, y: 22 },
  { x: 20, y: 64 },
  { x: 64, y: 56 },
];

export default function LocationMap() {
  const [zoom, setZoom] = useState(1);

  const { attendanceData } = useCheckIn()
  console.log(attendanceData)

  return (
    <section className="card map-card">
      <h3>Check-in Locations</h3>
      <p className="muted">Live location view of employee check-ins today.</p>

      <div className="map">
        <div className="map-canvas" style={{ transform: `scale(${zoom})` }}>
          <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="map-svg">
            <rect width="100" height="60" fill="#e9eeea" />
            <path d="M0 40 C 20 30, 30 48, 55 38 S 85 30, 100 36 L100 60 L0 60Z" fill="#dbe7df" />
            <path d="M44 0 C 46 14, 52 22, 50 34 S 58 52, 66 60" stroke="#bcd6e6" strokeWidth="2.4" fill="none" />
            <g stroke="#ffffff" strokeWidth="1.1" fill="none" opacity="0.95">
              <path d="M0 18 L100 30" /><path d="M10 0 L40 60" /><path d="M60 0 L82 60" />
              <path d="M0 48 L100 44" /><path d="M30 0 L74 60" />
            </g>
            <g stroke="#f3d9a0" strokeWidth="0.8" fill="none">
              <path d="M0 30 L100 14" /><path d="M20 60 L48 0" />
            </g>
          </svg>

          <span className="map-label big" style={{ left: "17%", top: "8%" }}>New Delhi<br /><small>नई दिल्ली</small></span>
          <span className="map-label" style={{ left: "44%", top: "6%" }}>Mayur Vihar<br /><small>मयूर विहार</small></span>
          <span className="map-label big" style={{ left: "58%", top: "46%" }}>Noida</span>
          <span className="map-label big" style={{ left: "10%", top: "70%" }}>Gurgaon<br /><small>गुरुग्राम</small></span>
          <span className="map-label" style={{ left: "74%", top: "73%" }}>Greater Noida<br /><small>ग्रेटर नोएडा</small></span>

          <span className="map-label airport" style={{ left: "0%", top: "40%" }}>
            <Icon name="plane" size={22} className="plane" />
            <span>Indira Gandhi<br />International Airport</span>
          </span>

          {attendanceData.map((p, i) => (
            <span key={p._id} className="pin" style={{ left: `${p.location.latitude}%`, top: `${p.location.longitude}%` }}>
              <svg width="30" height="36" viewBox="0 0 30 36">
                <path d="M15 0C7 0 1 6 1 14c0 10 14 22 14 22s14-12 14-22C29 6 23 0 15 0z" fill="#0f9a88" />
                <circle cx="15" cy="14" r="5" fill="#fff" />
              </svg>
            </span>
          ))}
        </div>

        <div className="zoom">
          <button onClick={() => setZoom((z) => Math.min(1.6, +(z + 0.15).toFixed(2)))} aria-label="Zoom in"><Icon name="plus" size={16} /></button>
          <button onClick={() => setZoom((z) => Math.max(1, +(z - 0.15).toFixed(2)))} aria-label="Zoom out"><Icon name="minus" size={16} /></button>
        </div>
      </div>
    </section>
  );
}
