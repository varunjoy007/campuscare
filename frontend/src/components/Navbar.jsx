import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav>
      <div>
        <h2>🎓 CampusCare</h2>
        <p>College Complaint Management System</p>
      </div>

      <div>
        <Link to="/">Home</Link>

        {token && user?.role !== "admin" && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/submit">Submit Complaint</Link>
            <Link to="/complaints">My Complaints</Link>
          </>
        )}

        {token && user?.role === "admin" && (
          <Link to="/admin/dashboard">
            Admin Dashboard
          </Link>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;