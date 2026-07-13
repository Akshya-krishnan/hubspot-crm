    const express = require("express");
    const cors = require("cors");
    const dotenv = require("dotenv");
    const connectDB = require("./config/db");
    const authRoutes = require("./routes/authRoutes");
    const leadRoutes = require("./routes/leadRoutes");
    const dashboardRoutes = require("./routes/dashboardRoutes")
    const noteRoutes = require("./routes/noteRoutes");
    const taskRoutes = require("./routes/taskRoutes");
    const contactRoutes = require("./routes/contactRoutes");
    const companyRoutes = require("./routes/companyRoutes");

    dotenv.config();

    const app = express();

    connectDB();

    app.use(cors());
    app.use(express.json());
    app.use("/api/auth", authRoutes);
    app.use("/api/leads", leadRoutes);
    app.use("/api/dashboard", dashboardRoutes);
    app.use("/api", noteRoutes);
    app.use("/api", taskRoutes);
    app.use("/api/contacts", contactRoutes);
    app.use("/api/companies", companyRoutes);

    app.get("/", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome to HubSpot CRM API 🚀"
        });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });