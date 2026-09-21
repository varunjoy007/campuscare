const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      studentId,
      department,
      password,
    } = req.body;

    // Check required fields
    if (
      !name ||
      !email ||
      !studentId ||
      !department ||
      !password
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email },
        { studentId },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User with this email or student ID already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name,
      email,
      studentId,
      department,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Registration successful",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });

  }
};


// ==========================================
// LOGIN USER
// ==========================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Check email and password
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    // Find user
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id.toString(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",

      token: token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        department: user.department,
        role: user.role,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });

  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  registerUser,
  loginUser,
};