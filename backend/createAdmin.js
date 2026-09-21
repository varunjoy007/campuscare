const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@campuscare.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@12345",
      10
    );

    const admin = await User.create({
      name: "Campus Admin",
      email: "admin@campuscare.com",
      studentId: "ADMIN001",
      department: "Administration",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully!");
    console.log("Email:", admin.email);

    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();