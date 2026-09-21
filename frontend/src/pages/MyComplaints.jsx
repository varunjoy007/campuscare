import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) {
          setMessage("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/complaints/student/${user.id}`,
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
          setMessage(data.message || "Failed to fetch complaints");
        }
      } catch (error) {
        setMessage("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return (
      <div className="complaints-page">
        <h1>My Complaints</h1>
        <p>Loading complaints...</p>
      </div>
    );
  }

  return (
    <div className="complaints-page">
      <div className="complaints-header">
        <div>
          <h1>My Complaints</h1>
          <p>View and track the complaints you have submitted.</p>
        </div>

        <Link to="/submit">
          <button>Submit New Complaint</button>
        </Link>
      </div>

      {message && (
        <p className="register-text">
          {message}
        </p>
      )}

      {complaints.length === 0 ? (
        <div className="complaints-table-container">
          <p>No complaints found.</p>
        </div>
      ) : (
        <div className="complaints-table-container">
          <table className="complaints-table">
            <thead>
              <tr>
                <th>Complaint ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>
                  <td>
                    {complaint._id.slice(-6).toUpperCase()}
                  </td>

                  <td>{complaint.title}</td>

                  <td>{complaint.category}</td>

                  <td>{complaint.priority}</td>

                  <td>
                    <span
                      className={`status ${
                        complaint.status === "Pending"
                          ? "pending"
                          : complaint.status === "In Progress"
                          ? "progress"
                          : complaint.status === "Resolved"
                          ? "resolved"
                          : ""
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>

                  <td>
                    <Link to={`/complaints/${complaint._id}`}>
                      <button className="view-button">
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyComplaints;