const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const verifyRoutes = require("./routes/verifyRoutes");
const reportRoutes = require("./routes/reportRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
console.log(dashboardRoutes);
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/verify", verifyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TrustWork Backend Running" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
