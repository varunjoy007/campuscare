const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();


// ==========================================
// IMPORT ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");


// ==========================================
// CREATE EXPRESS APP
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// SERVE UPLOADED IMAGES
// ==========================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);


// ==========================================
// API ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/complaints",
  complaintRoutes
);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.send(
    "CampusCare Backend is running!"
  );
});


// ==========================================
// CONNECT TO MONGODB
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB connected successfully!"
    );

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {

      console.log(
        `Server running on http://localhost:${PORT}`
      );

    });

  })

  .catch((error) => {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

  });