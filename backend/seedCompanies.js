const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = require("./config/db");

const CompanyVerification =
  require("./models/CompanyVerification");

connectDB();

const companies = [
  {
    companyName: "TCS",
    gstNumber: "27ABCDE1234F1Z5",
    cinNumber: "L12345MH2025PLC000001",
    status: "APPROVED",
  },

  {
    companyName: "Infosys",
    gstNumber: "27ABCDE5678F1Z5",
    cinNumber: "L12345MH2025PLC000002",
    status: "APPROVED",
  },

  {
    companyName: "Wipro",
    gstNumber: "27ABCDE9999F1Z5",
    cinNumber: "L12345MH2025PLC000003",
    status: "APPROVED",
  },

  {
    companyName: "Tech Mahindra",
    gstNumber: "27ABCDE1111F1Z5",
    cinNumber: "L12345MH2025PLC000004",
    status: "APPROVED",
  },
];

async function seedCompanies() {
  try {

    await CompanyVerification.deleteMany();

    await CompanyVerification.insertMany(
      companies
    );

    console.log(
      "Companies seeded successfully"
    );

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
}

seedCompanies();