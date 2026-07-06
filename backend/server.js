const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();


// ======================
// Middlewares
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));


// ======================
// Static Upload Folder
// ======================

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// ======================
// API Routes
// ======================

// Authentication Routes
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

// Document Routes
app.use(
    "/api/documents",
    require("./routes/documentRoutes")
);

// AI Routes
app.use(
    "/api/ai",
    require("./routes/aiRoutes")
);

// Chatbot Routes
app.use(
    "/api/chat",
    require("./routes/chatRoutes")
);

// Admin Routes
app.use(
    "/api/admin",
    require("./routes/adminRoutes")
);


// ======================
// Default Route
// ======================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message:
            "AI Study Material Generator API is running successfully"
    });

});


// ======================
// 404 Route Handler
// ======================

app.use("*", (req, res) => {

    res.status(404).json({
        success: false,
        message: "API Route Not Found"
    });

});


// ======================
// Global Error Handler
// ======================

app.use((err, req, res, next) => {

    console.error(err.stack);

    res.status(err.status || 500).json({

        success: false,

        message:
            err.message ||
            "Internal Server Error"

    });

});


// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `🚀 Server running on port ${PORT}`
    );

});