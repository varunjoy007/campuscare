const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  getMyComplaints,
  getComplaintById,
  getAllComplaints,
  updateComplaint,
} = require("../controllers/complaintController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// STUDENT - SUBMIT COMPLAINT
// ==========================================

router.post(
  "/",
  protect,
  upload.single("image"),
  createComplaint
);


// ==========================================
// STUDENT - GET MY COMPLAINTS
// ==========================================

router.get(
  "/student/:studentId",
  protect,
  getMyComplaints
);


// ==========================================
// ADMIN - GET ALL COMPLAINTS
// ==========================================

router.get(
  "/admin/all",
  protect,
  adminOnly,
  getAllComplaints
);


// ==========================================
// ADMIN - UPDATE COMPLAINT
// ==========================================

router.put(
  "/:id",
  protect,
  adminOnly,
  updateComplaint
);


// ==========================================
// GET ONE COMPLAINT
// ==========================================

router.get(
  "/:id",
  protect,
  getComplaintById
);


module.exports = router;