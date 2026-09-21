const jwt = require("jsonwebtoken");
require("dotenv").config();


// ==========================================
// PROTECT ROUTE
// ==========================================

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not authorized. Please login.",
      });
    }

    // Get token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store decoded user information
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};


// ==========================================
// ADMIN ONLY
// ==========================================

const adminOnly = (req, res, next) => {
  if (
    !req.user ||
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      message: "Admin access required",
    });
  }

  next();
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  protect,
  adminOnly,
};