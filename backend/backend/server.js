const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/employees", require("./routes/employeesRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/stock", require("./routes/stockRoutes"));
app.use("/api/finance", require("./routes/financialRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/members", require("./routes/membersRoutes"));
app.use("/api/memberManagement", require("./routes/memberManagementRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
