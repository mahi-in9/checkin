import React from "react";
import ReactDOM from "react-dom/client";

import "./styles.css";
import { CheckInProvider } from "./context/CheckInContext.jsx"

import { AuthProvider } from "./context/authContext.jsx";
import PageRoute from "./routes/Route.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CheckInProvider>
        <PageRoute />
      </CheckInProvider>
    </AuthProvider>
  </React.StrictMode>
);
