const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash(
      "Admin@12345",
      10
    );

    const admin = await User.findOneAndUpdate(
      {
        email: "admin@campuscare.com",
      },
      {
        password: hashedPassword,
        role: "admin",
      },
      {
        new: true,
      }
    );

    if (!admin) {
      console.log("Admin account not found.");
    } else {
      console.log("Admin password reset successfully!");
      console.log("Email: admin@campuscare.com");
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error.message);
  }
};

resetAdmin();