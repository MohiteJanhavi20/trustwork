const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

require("dotenv").config();

const connectDB = require("./config/db");

const Admin = require("./models/Admin");

connectDB();

async function seed() {
  try {
    const hashedPassword =
      await bcrypt.hash("admin123", 10);

    await Admin.create({
      name: "Vinay",
      email: "admin@trustwork.com",
      password: hashedPassword,
    });

    console.log("Admin created");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit();
  }
}

seed();