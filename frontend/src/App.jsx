import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import SubmitComplaint from "./pages/SubmitComplaint";
import MyComplaints from "./pages/MyComplaints";
import ComplaintDetails from "./pages/ComplaintDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminComplaintDetails from "./pages/AdminComplaintDetails";

import "./App.css";

/* =========================
   PROTECTED ROUTE
========================= */

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

/* =========================
   ADMIN ROUTE
========================= */

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

/* =========================
   HOME PAGE
========================= */

function Home() {
  return (
    <div>
      <main>
        <section className="hero">
          <h1>College Complaint Management System</h1>

          <p>
            Report campus problems quickly and track your complaint
            until it is resolved.
          </p>

          <div className="hero-buttons">
            <Link to="/submit">
              <button>Submit Complaint</button>
            </Link>

            <Link to="/complaints">
              <button>Track Complaint</button>
            </Link>
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>

          <p className="section-description">
            Submit your complaint and follow its progress until resolution.
          </p>

          <div className="steps">

            <div className="step-card">
              <div className="step-icon">📝</div>

              <h3>Submit Complaint</h3>

              <p>
                Describe your campus issue and submit your complaint.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">🔍</div>

              <h3>Track Complaint</h3>

              <p>
                Check the current status and progress of your complaint.
              </p>
            </div>

            <div className="step-card">
              <div className="step-icon">✅</div>

              <h3>Get Resolution</h3>

              <p>
                The concerned college department works on the issue.
              </p>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}

/* =========================
   APP
========================= */

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* STUDENT PROTECTED ROUTES */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submit"
          element={
            <ProtectedRoute>
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <MyComplaints />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints/:id"
          element={
            <ProtectedRoute>
              <ComplaintDetails />
            </ProtectedRoute>
          }
        />


        {/* ADMIN PROTECTED ROUTES */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/complaints/:id"
          element={
            <AdminRoute>
              <AdminComplaintDetails />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;