import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    priority: "Medium",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE TEXT INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setImage(null);
      return;
    }

    // Maximum 5 MB
    if (selectedImage.size > 5 * 1024 * 1024) {
      setMessage("Image size must be less than 5 MB");

      e.target.value = "";
      setImage(null);

      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(selectedImage.type)) {
      setMessage(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      );

      e.target.value = "";
      setImage(null);

      return;
    }

    setMessage("");
    setImage(selectedImage);
  };

  // ==========================================
  // SUBMIT COMPLAINT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const token = localStorage.getItem("token");

      if (!user || !user.id || !token) {
        setMessage(
          "Please login before submitting a complaint"
        );

        setLoading(false);

        return;
      }

      // ==========================================
      // CREATE FORM DATA
      // ==========================================

      const data = new FormData();

      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append(
        "description",
        formData.description
      );
      data.append(
        "location",
        formData.location
      );
      data.append(
        "priority",
        formData.priority
      );

      data.append("student", user.id);

      // Add image only if selected
      if (image) {
        data.append("image", image);
      }

      // ==========================================
      // SEND REQUEST
      // ==========================================

      const response = await fetch(
        "http://localhost:5000/api/complaints",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: data,
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(
          "Complaint submitted successfully! 🎉"
        );

        setTimeout(() => {
          navigate("/complaints");
        }, 1000);
      } else {
        setMessage(
          result.message ||
            "Failed to submit complaint"
        );
      }

    } catch (error) {
      console.error(
        "Submit complaint error:",
        error
      );

      setMessage(
        "Unable to connect to server"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="submit-page">

      <div className="submit-box">

        <h1>Submit Complaint</h1>

        <p>
          Tell us about the issue you are facing
        </p>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}

          <label>
            Complaint Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter complaint title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* CATEGORY */}

          <label>
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Category
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

          {/* DESCRIPTION */}

          <label>
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe your complaint in detail..."
            value={formData.description}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>

          {/* LOCATION */}

          <label>
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="Example: Block A, Room 204"
            value={formData.location}
            onChange={handleChange}
            required
          />

          {/* PRIORITY */}

          <label>
            Priority
          </label>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >

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

          {/* IMAGE */}

          <label>
            Complaint Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleImageChange}
          />

          <small>
            Optional. JPG, JPEG, PNG or WEBP. Maximum 5 MB.
          </small>

          {image && (
            <p>
              📷 Selected: {image.name}
            </p>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Complaint"}
          </button>

        </form>

        {/* MESSAGE */}

        {message && (
          <p className="register-text">
            {message}
          </p>
        )}

      </div>

    </div>
  );
}

export default SubmitComplaint;