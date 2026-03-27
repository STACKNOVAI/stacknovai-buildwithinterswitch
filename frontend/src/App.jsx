import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import FindDoctor from "./pages/FindDoctor.jsx";

// 1. The Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // No token found, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [aiResult, setAiResult] = useState(null);

  const handleProceedToDoctor = (result, navigate) => {
    setAiResult(result);
    navigate("/find-doctor");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - Wrap these in ProtectedRoute */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home onProceedToDoctor={handleProceedToDoctor} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/find-doctor"
          element={
            <ProtectedRoute>
              <FindDoctor
                aiResult={aiResult}
                onConsult={(doctor, result) => {
                  console.log("Starting consult with:", doctor, result);
                }}
              />
            </ProtectedRoute>
          }
        />

        {/* The 404 Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn't exist.</p>
      <a href="/" style={{ color: "#007bff", textDecoration: "none" }}>
        Return to Home
      </a>
    </div>
  );
}

export default App;
