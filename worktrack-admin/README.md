# WorkTrack Admin Panel (React + Vite)

Static React recreation of the WorkTrack "Attendance" admin dashboard.

## Run

```bash
npm install
npm run dev      # opens http://localhost:5173
npm run build    # production build in /dist
```

Requires Node.js 18+.

## What's included

- Dark-teal sidebar with working navigation (Dashboard, Attendance, Employees, Reports, Settings)
- Top bar with global search, notification bell and profile
- Stat cards: Total, Checked In, Checked Out, Absent (percentages computed)
- "Today's Attendance" table with live search + department filter, status badges and a per-row action menu
- Check-in Locations map (static SVG map with pins and working zoom buttons — no API key needed)
- Attendance Summary donut chart with legend
- Date picker with next-day button, responsive layout

## Structure

```
src/
  App.jsx                 page state + filtering
  data.js                 static demo data (edit this to change content)
  styles.css              all styling
  components/             Sidebar, Topbar, StatCards, AttendanceTable,
                          LocationMap, SummaryDonut, Icons
  pages/OtherPages.jsx    Employees / Reports / Settings pages
```

All data is static. Replace `src/data.js` with API calls when you connect a backend. For a real map, swap `LocationMap.jsx` for Leaflet or Google Maps.
