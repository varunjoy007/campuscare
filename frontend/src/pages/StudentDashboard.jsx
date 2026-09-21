import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !user.id || !token) {
          setError("Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://campuscare-waov.onrender.com/api/complaints/student/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setComplaints(data.complaints || []);
        } else {
          setError(data.message || "Failed to load complaints");
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Under Review" ||
      complaint.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved" ||
      complaint.status === "Closed"
  ).length;

  const recentComplaints = complaints.slice(0, 5);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back! Manage your college complaints here.</p>
        </div>

        <Link to="/submit">
          <button>Submit New Complaint</button>
        </Link>
      </div>

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Complaints</h3>
          <p>{totalComplaints}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingComplaints}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressComplaints}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolvedComplaints}</p>
        </div>

      </div>

      <div className="recent-complaints">

        <div className="recent-header">
          <h2>Recent Complaints</h2>

          {complaints.length > 0 && (
            <Link to="/complaints">
              View All
            </Link>
          )}
        </div>

        {complaints.length === 0 ? (
          <p>You have not submitted any complaints yet.</p>
        ) : (
          <div className="recent-complaints-list">

            {recentComplaints.map((complaint) => (
              <div
                className="recent-complaint-item"
                key={complaint._id}
              >

                <div className="recent-complaint-info">

                  <h3>{complaint.title}</h3>

                  <p>
                    <strong>Category:</strong>{" "}
                    {complaint.category}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {complaint.priority}
                  </p>

                  <p>
                    <strong>Submitted:</strong>{" "}
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </p>

                </div>

                <div className="recent-complaint-action">

                  <span
                    className={`status-badge ${complaint.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {complaint.status}
                  </span>

                  <Link to={`/complaints/${complaint._id}`}>
                    <button className="view-button">
                      View
                    </button>
                  </Link>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default StudentDashboard;