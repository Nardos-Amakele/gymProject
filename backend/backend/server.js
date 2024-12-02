const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const authRoutes = require("./routes/authRoutes"); // Import the authRoutes file

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow all routes from this origin
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Specify allowed methods if needed
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// Define your routes
app.use("/api/auth", authRoutes); // Add authentication routes here

app.use("/api/employees", require("./routes/employeesRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/finance", require("./routes/financialRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/members", require("./routes/membersRoutes"));
app.use("/api/memberManagement", require("./routes/memberManagementRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoute"));

app.listen(port, () => console.log(`Server started on port ${port}`));
