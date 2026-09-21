import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Search and filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://campuscare-waov.onrender.com/api/complaints/admin/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setComplaints(data.complaints);
          setFilteredComplaints(data.complaints);
        } else {
          setMessage(
            data.message || "Failed to load complaints"
          );
        }
      } catch (error) {
        setMessage("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // SEARCH + FILTER
  useEffect(() => {
    let result = [...complaints];

    // Search
    if (search.trim() !== "") {
      const searchText = search.toLowerCase();

      result = result.filter((complaint) => {
        const title =
          complaint.title?.toLowerCase() || "";

        const category =
          complaint.category?.toLowerCase() || "";

        const studentName =
          complaint.student?.name?.toLowerCase() || "";

        const studentId =
          complaint.student?.studentId?.toLowerCase() || "";

        const complaintId =
          complaint._id?.toLowerCase() || "";

        return (
          title.includes(searchText) ||
          category.includes(searchText) ||
          studentName.includes(searchText) ||
          studentId.includes(searchText) ||
          complaintId.includes(searchText)
        );
      });
    }

    // Status filter
    if (statusFilter !== "") {
      result = result.filter(
        (complaint) =>
          complaint.status === statusFilter
      );
    }

    // Category filter
    if (categoryFilter !== "") {
      result = result.filter(
        (complaint) =>
          complaint.category === categoryFilter
      );
    }

    // Priority filter
    if (priorityFilter !== "") {
      result = result.filter(
        (complaint) =>
          complaint.priority === priorityFilter
      );
    }

    setFilteredComplaints(result);
  }, [
    search,
    statusFilter,
    categoryFilter,
    priorityFilter,
    complaints,
  ]);

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setPriorityFilter("");
  };

  // STATISTICS
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "In Progress" ||
      complaint.status === "Under Review"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status === "Resolved" ||
      complaint.status === "Closed"
  ).length;
  // CATEGORY STATISTICS
const categoryStats = {};

complaints.forEach((complaint) => {
  const category = complaint.category || "Other";

  if (categoryStats[category]) {
    categoryStats[category]++;
  } else {
    categoryStats[category] = 1;
  }
});

const categoryEntries = Object.entries(categoryStats);

const maxCategoryCount =
  categoryEntries.length > 0
    ? Math.max(...categoryEntries.map((item) => item[1]))
    : 1;
    // STATUS STATISTICS
const statusStats = {
  Pending: complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length,

  "Under Review": complaints.filter(
    (complaint) =>
      complaint.status === "Under Review"
  ).length,

  "In Progress": complaints.filter(
    (complaint) =>
      complaint.status === "In Progress"
  ).length,

  Resolved: complaints.filter(
    (complaint) =>
      complaint.status === "Resolved"
  ).length,

  Closed: complaints.filter(
    (complaint) =>
      complaint.status === "Closed"
  ).length,
};

  if (loading) {
    return (
      <div className="admin-dashboard-page">
        <div className="admin-dashboard-container">
          <h1>Loading Admin Dashboard...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">

        {/* HEADER */}
        <div className="admin-dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>
              Manage and monitor college complaints
            </p>
          </div>

          <Link
            to="/"
            className="admin-home-button"
          >
            🏠 Home
          </Link>
        </div>

        {/* ERROR / MESSAGE */}
        {message && (
          <p className="admin-error-message">
            {message}
          </p>
        )}

        {/* STATISTICS */}
        <div className="admin-stats-grid">

          <div className="admin-stat-card">
            <h3>Total Complaints</h3>
            <p>{totalComplaints}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Pending</h3>
            <p>{pendingComplaints}</p>
          </div>

          <div className="admin-stat-card">
            <h3>In Progress</h3>
            <p>{inProgressComplaints}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Resolved</h3>
            <p>{resolvedComplaints}</p>
          </div>

        </div>

        {/* SEARCH AND FILTERS */}
        {/* DETAILED STATISTICS */}
<div className="admin-detailed-stats">

  <div className="admin-chart-card">

    <h2>📊 Complaints by Status</h2>

    <div className="status-stat-list">

      {Object.entries(statusStats).map(
        ([status, count]) => {

          const percentage =
            totalComplaints > 0
              ? (count / totalComplaints) * 100
              : 0;

          return (
            <div
              className="status-stat-item"
              key={status}
            >

              <div className="status-stat-header">
                <span>{status}</span>

                <strong>{count}</strong>
              </div>

              <div className="stat-progress-background">

                <div
                  className="stat-progress-bar"
                  style={{
                    width: `${percentage}%`,
                  }}
                ></div>

              </div>

              <small>
                {percentage.toFixed(1)}%
              </small>

            </div>
          );
        }
      )}

    </div>

  </div>


  <div className="admin-chart-card">

    <h2>📂 Complaints by Category</h2>

    {categoryEntries.length === 0 ? (
      <p className="admin-no-data">
        No complaint data available.
      </p>
    ) : (
      <div className="category-stat-list">

        {categoryEntries.map(
          ([category, count]) => {

            const percentage =
              (count / maxCategoryCount) * 100;

            return (
              <div
                className="category-stat-item"
                key={category}
              >

                <div className="category-stat-header">

                  <span>{category}</span>

                  <strong>{count}</strong>

                </div>

                <div className="stat-progress-background">

                  <div
                    className="category-progress-bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>

                </div>

              </div>
            );
          }
        )}

      </div>
    )}

  </div>

</div>
        <div className="admin-filters-card">

          <h2>🔎 Search & Filter Complaints</h2>

          <div className="admin-filter-grid">

            {/* SEARCH */}
            <div className="admin-filter-group search-group">
              <label>Search</label>

              <input
                type="text"
                placeholder="Search title, student, ID..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            {/* STATUS */}
            <div className="admin-filter-group">
              <label>Status</label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
              >
                <option value="">
                  All Status
                </option>

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
            </div>

            {/* CATEGORY */}
            <div className="admin-filter-group">
              <label>Category</label>

              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(e.target.value)
                }
              >
                <option value="">
                  All Categories
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
            </div>

            {/* PRIORITY */}
            <div className="admin-filter-group">
              <label>Priority</label>

              <select
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value)
                }
              >
                <option value="">
                  All Priorities
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

          </div>

          {/* CLEAR */}
          <button
            className="admin-clear-filter-button"
            onClick={clearFilters}
          >
            ✖ Clear Filters
          </button>

          <p className="admin-result-count">
            Showing{" "}
            <strong>
              {filteredComplaints.length}
            </strong>{" "}
            of{" "}
            <strong>
              {complaints.length}
            </strong>{" "}
            complaints
          </p>

        </div>

        {/* COMPLAINT TABLE */}
        <div className="admin-complaints-card">

          <div className="admin-table-header">
            <h2>All Complaints</h2>
          </div>

          {filteredComplaints.length === 0 ? (
            <div className="admin-no-results">
              <h3>No complaints found</h3>
              <p>
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="admin-table-wrapper">

              <table className="admin-complaints-table">

                <thead>
                  <tr>
                    <th>Complaint ID</th>
                    <th>Title</th>
                    <th>Student</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredComplaints.map(
                    (complaint) => {

                      const statusClass =
                        complaint.status
                          ?.toLowerCase()
                          .replaceAll(" ", "-");

                      return (
                        <tr
                          key={complaint._id}
                        >

                          <td>
                            <strong>
                              {complaint._id
                                .slice(-6)
                                .toUpperCase()}
                            </strong>
                          </td>

                          <td>
                            {complaint.title}
                          </td>

                          <td>
                            {complaint.student?.name ||
                              "Student"}
                          </td>

                          <td>
                            {complaint.category}
                          </td>

                          <td>
                            <span
                              className={`admin-priority-badge admin-priority-${complaint.priority?.toLowerCase()}`}
                            >
                              {complaint.priority}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`admin-table-status admin-table-status-${statusClass}`}
                            >
                              {complaint.status}
                            </span>
                          </td>

                          <td>
                            <Link
                              to={`/admin/complaints/${complaint._id}`}
                              className="admin-view-button"
                            >
                              View
                            </Link>
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;