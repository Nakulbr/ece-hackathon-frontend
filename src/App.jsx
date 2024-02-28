import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  if (window.location.pathname === "/") window.location.pathname = "/login";
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route Component={ProtectedRoute}>
            <Route path="/dashboard" Component={DashboardPage} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
