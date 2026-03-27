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
import ProfilePage from "./pages/ProfilePage.jsx";
import Conversations from "./pages/Conversations.jsx";
import Medications from "./pages/Medications.jsx";
import Doctors from "./pages/Doctors.jsx";
import Bookings from "./pages/Bookings.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [aiResult, setAiResult] = useState(null);

  const handleProceedToDoctor = (result, navigate) => {
    setAiResult(result);
    if (navigate) navigate("/find-doctor");
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
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

        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <Conversations aiResult={aiResult} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medications"
          element={
            <ProtectedRoute>
              <Medications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
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
      <a href="/" style={{ color: "#22C55E", textDecoration: "none" }}>
        Return to Home
      </a>
    </div>
  );
}

export default App;