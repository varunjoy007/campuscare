import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/complaints/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        console.log("Complaint data:", data);
        console.log(
          "AI Predicted Category:",
          data.complaint?.aiPredictedCategory
        );
        console.log(
          "AI Confidence:",
          data.complaint?.aiConfidence
        );
        console.log(
          "Image path:",
          data.complaint?.image
        );

        if (response.ok) {
          setComplaint(data.complaint);
        } else {
          setError(
            data.message || "Failed to load complaint"
          );
        }
      } catch (error) {
        console.error(error);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaint();
  }, [id]);

  if (loading) {
    return (
      <div className="details-page">
        <h2>Loading complaint...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="details-page">
        <h2>{error}</h2>

        <Link to="/complaints">
          <button className="back-button">
            ← Back to My Complaints
          </button>
        </Link>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div className="details-page">

      {/* BACK BUTTON */}

      <Link to="/complaints">
        <button className="back-button">
          ← Back to My Complaints
        </button>
      </Link>


      <div className="details-card">

        <h1>Complaint Details</h1>

        <p className="complaint-id">
          Complaint ID:{" "}
          <strong>
            {complaint._id.slice(-6).toUpperCase()}
          </strong>
        </p>


        {/* =========================
            STATUS
        ========================= */}

        <div className="detail-section">

          <h3>Status</h3>

          <span
            className={`status-badge ${complaint.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {complaint.status}
          </span>

        </div>


        {/* =========================
            COMPLAINT INFORMATION
        ========================= */}

        <div className="detail-section">

          <h3>Complaint Information</h3>

          <p>
            <strong>Title:</strong>{" "}
            {complaint.title}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {complaint.category}
          </p>

          <p>
            <strong>Priority:</strong>{" "}
            {complaint.priority}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {complaint.location}
          </p>

          <p>
            <strong>Submitted:</strong>{" "}
            {new Date(
              complaint.createdAt
            ).toLocaleString()}
          </p>

        </div>


        {/* =========================
            AI PREDICTION
        ========================= */}

        <div className="detail-section">

          <h3>🤖 AI Category Prediction</h3>

          <div className="ai-prediction-box">

            <p>
              <strong>
                Student Selected Category:
              </strong>{" "}
              {complaint.category}
            </p>

            <p>
              <strong>
                AI Predicted Category:
              </strong>{" "}

              {complaint.aiPredictedCategory ||
                "Prediction not available"}
            </p>

            <p>
              <strong>
                🎯 AI Confidence:
              </strong>{" "}

              {complaint.aiConfidence !== null &&
              complaint.aiConfidence !== undefined
                ? `${complaint.aiConfidence}%`
                : "Not available"}
            </p>

            {complaint.aiPredictedCategory && (
              <p>
                <strong>
                  Prediction Status:
                </strong>{" "}

                {complaint.category ===
                complaint.aiPredictedCategory ? (
                  <span className="ai-match">
                    ✅ Category Match
                  </span>
                ) : (
                  <span className="ai-different">
                    ⚠️ AI Suggested Different Category
                  </span>
                )}

              </p>
            )}

          </div>

        </div>


        {/* =========================
            DESCRIPTION
        ========================= */}

        <div className="detail-section">

          <h3>Description</h3>

          <p>
            {complaint.description}
          </p>

        </div>


        {/* =========================
            COMPLAINT IMAGE
        ========================= */}

        <div className="detail-section">

          <h3>📷 Complaint Evidence</h3>

          {complaint.image ? (

            <div className="complaint-image-container">

              <img
                src={`http://localhost:5000${complaint.image}`}
                alt="Complaint evidence"
                className="complaint-image"
                onLoad={() =>
                  console.log(
                    "Image loaded successfully"
                  )
                }
                onError={(e) => {
                  console.error(
                    "Image failed to load:",
                    e.target.src
                  );
                }}
              />

            </div>

          ) : (

            <p>
              No image was uploaded with this complaint.
            </p>

          )}

        </div>


        {/* =========================
            ADMIN UPDATE
        ========================= */}

        <div className="detail-section admin-update-section">

          <h3>Admin Update</h3>

          <p>
            <strong>
              Assigned Department:
            </strong>{" "}

            {complaint.assignedDepartment ||
              "Not assigned yet"}
          </p>

          <p>
            <strong>
              Admin Remark:
            </strong>{" "}

            {complaint.adminRemark ||
              "No remark added yet"}
          </p>

        </div>


        {/* =========================
            STATUS TIMELINE
        ========================= */}

        <div className="detail-section">

          <h3>Status Timeline</h3>

          <div className="timeline">

            <div
              className={
                complaint.status === "Pending" ||
                complaint.status === "Under Review" ||
                complaint.status === "In Progress" ||
                complaint.status === "Resolved" ||
                complaint.status === "Closed"
                  ? "timeline-item active"
                  : "timeline-item"
              }
            >
              <span>1</span>
              <p>Pending</p>
            </div>


            <div
              className={
                complaint.status === "Under Review" ||
                complaint.status === "In Progress" ||
                complaint.status === "Resolved" ||
                complaint.status === "Closed"
                  ? "timeline-item active"
                  : "timeline-item"
              }
            >
              <span>2</span>
              <p>Under Review</p>
            </div>


            <div
              className={
                complaint.status === "In Progress" ||
                complaint.status === "Resolved" ||
                complaint.status === "Closed"
                  ? "timeline-item active"
                  : "timeline-item"
              }
            >
              <span>3</span>
              <p>In Progress</p>
            </div>


            <div
              className={
                complaint.status === "Resolved" ||
                complaint.status === "Closed"
                  ? "timeline-item active"
                  : "timeline-item"
              }
            >
              <span>4</span>
              <p>Resolved</p>
            </div>


            <div
              className={
                complaint.status === "Closed"
                  ? "timeline-item active"
                  : "timeline-item"
              }
            >
              <span>5</span>
              <p>Closed</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ComplaintDetails;