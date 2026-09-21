import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! 🎉");

        setFormData({
          name: "",
          email: "",
          studentId: "",
          department: "",
          password: "",
        });
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">

        <h1>Student Registration</h1>

        <p>Create an account to submit complaints</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />

          <label>College Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your college email"
          />

          <label>Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            placeholder="Enter your student ID"
          />

          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter your department"
          />

         <label>Password</label>

<div className="password-container">

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Create a password"
  />

  <button
    type="button"
    className="password-toggle"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "🙈" : "👁️"}
  </button>

</div>

          <button type="submit">
            Create Account
          </button>

        </form>

        {message && (
          <p className="register-text">
            {message}
          </p>
        )}

       <p className="register-text">
  Already have an account?{" "}
  <Link to="/login">Login here</Link>
</p>

      </div>
    </div>
  );
}

export default Register;