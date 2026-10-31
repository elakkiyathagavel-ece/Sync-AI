const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-user-email"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

const path = require("path");

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/login.html"));
});

app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/signup.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../html/dashboard.html"));
});


app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "SYNC AI API is operational",
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/assessment", require("./routes/assessmentRoutes"));
app.use("/api/hackathons", require("./routes/hackathonRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));
app.use("/api/growth", require("./routes/growthRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Endpoint ${req.originalUrl} not found on SYNC AI server.`
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({
        success: false,
        message: "Internal server error: " + err.message
    });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    // Attempt DB connection
    await connectDB();

    app.listen(PORT, () => {
        console.log(`===============================================`);
        console.log(`🚀 SYNC AI Backend running on http://localhost:${PORT}`);
        console.log(`⚡ API Base URL: http://localhost:${PORT}/api`);
        console.log(`===============================================`);
    });
};

startServer();