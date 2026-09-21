import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function AdminComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  const [status, setStatus] = useState("");
  const [assignedDepartment, setAssignedDepartment] = useState("");
  const [adminRemark, setAdminRemark] = useState("");

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  // ==========================================
  // FETCH COMPLAINT
  // ==========================================

  const fetchComplaint = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first.");
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
        "AI Category:",
        data.complaint?.aiPredictedCategory
      );

      console.log(
        "AI Confidence:",
        data.complaint?.aiConfidence
      );

      if (response.ok) {
        setComplaint(data.complaint);

        setStatus(
          data.complaint.status || "Pending"
        );

        setAssignedDepartment(
          data.complaint.assignedDepartment || ""
        );

        setAdminRemark(
          data.complaint.adminRemark || ""
        );
      } else {
        setMessage(
          data.message || "Failed to load complaint"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UPDATE COMPLAINT
  // ==========================================

  const handleUpdate = async (e) => {
    e.preventDefault();

    setUpdating(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("Please login first.");
        setUpdating(false);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/complaints/${id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status,
            assignedDepartment,
            adminRemark,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setComplaint(data.complaint);

        setStatus(
          data.complaint.status || "Pending"
        );

        setAssignedDepartment(
          data.complaint.assignedDepartment || ""
        );

        setAdminRemark(
          data.complaint.adminRemark || ""
        );

        setMessage(
          "Complaint updated successfully! ✅"
        );
      } else {
        setMessage(
          data.message ||
            "Failed to update complaint"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-details-page">
        <h2>Loading complaint...</h2>
      </div>
    );
  }

  // ==========================================
  // COMPLAINT NOT FOUND / ERROR
  // ==========================================

  if (!complaint) {
    return (
      <div className="admin-details-page">
        <h2>
          {message || "Complaint not found"}
        </h2>

        <Link to="/admin/dashboard">
          <button className="back-button">
            ← Back to Admin Dashboard
          </button>
        </Link>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="admin-details-page">

      {/* BACK BUTTON */}

      <Link to="/admin/dashboard">
        <button className="back-button">
          ← Back to Admin Dashboard
        </button>
      </Link>


      <div className="admin-details-card">

        <h1>Complaint Details</h1>

        <p className="admin-complaint-id">
          Complaint ID:{" "}
          <strong>
            {complaint._id
              .slice(-6)
              .toUpperCase()}
          </strong>
        </p>


        {/* =========================
            STUDENT INFORMATION
        ========================= */}

        <div className="admin-detail-section">

          <h2>👤 Student Information</h2>

          <p>
            <strong>Name:</strong>{" "}
            {complaint.student?.name ||
              "Not available"}
          </p>

          <p>
            <strong>Student ID:</strong>{" "}
            {complaint.student?.studentId ||
              "Not available"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {complaint.student?.email ||
              "Not available"}
          </p>

          <p>
            <strong>Department:</strong>{" "}
            {complaint.student?.department ||
              "Not available"}
          </p>

        </div>


        {/* =========================
            COMPLAINT INFORMATION
        ========================= */}

        <div className="admin-detail-section">

          <h2>📋 Complaint Information</h2>

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

        <div className="admin-detail-section">

          <h2>🤖 AI Category Prediction</h2>

          <div className="admin-ai-prediction-box">

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

        <div className="admin-detail-section">

          <h2>📝 Description</h2>

          <p className="admin-description">
            {complaint.description}
          </p>

        </div>


        {/* =========================
            COMPLAINT IMAGE
        ========================= */}

        <div className="admin-detail-section">

          <h2>📷 Complaint Evidence</h2>

          {complaint.image ? (

            <div className="admin-complaint-image-container">

              <img
                src={`http://localhost:5000${complaint.image}`}
                alt="Complaint evidence"
                className="admin-complaint-image"
              />

            </div>

          ) : (

            <p className="admin-no-image">
              No image was uploaded with this complaint.
            </p>

          )}

        </div>


        {/* =========================
            ADMIN UPDATE
        ========================= */}

        <div className="admin-detail-section">

          <h2>⚙️ Admin Update</h2>

          <form
            onSubmit={handleUpdate}
            className="admin-update-form"
          >

            <label>
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
            >

              <option value="Pending">
                Pending
              </option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>


            <label>
              Assigned Department
            </label>

            <select
              value={assignedDepartment}
              onChange={(e) =>
                setAssignedDepartment(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Department
              </option>

              <option value="Academic">
                Academic
              </option>

              <option value="Examination">
                Examination
              </option>

              <option value="Library">
                Library
              </option>

              <option value="Hostel">
                Hostel
              </option>

              <option value="Canteen">
                Canteen
              </option>

              <option value="Transport">
                Transport
              </option>

              <option value="Infrastructure">
                Infrastructure
              </option>

              <option value="Electrical">
                Electrical
              </option>

              <option value="Internet / Wi-Fi">
                Internet / Wi-Fi
              </option>

              <option value="Cleanliness">
                Cleanliness
              </option>

              <option value="Security">
                Security
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            <label>
              Admin Remark
            </label>

            <textarea
              value={adminRemark}
              onChange={(e) =>
                setAdminRemark(
                  e.target.value
                )
              }
              placeholder="Enter admin remark..."
              rows="5"
            ></textarea>


            <button
              type="submit"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Complaint"}
            </button>

          </form>


          {message && (
            <p className="admin-update-message">
              {message}
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default AdminComplaintDetails;