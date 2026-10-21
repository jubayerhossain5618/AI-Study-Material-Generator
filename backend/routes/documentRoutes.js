
const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const auth = require("../middleware/authMiddleware");

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument
} = require("../controllers/documentController");

// ================= UPLOAD DIRECTORY =================

// Create uploads folder automatically if it does not exist
const uploadDir = path.join(__dirname, "..", "uploads");

fs.mkdirSync(uploadDir, { recursive: true });

// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".txt"];
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOCX, TXT files are allowed."));
    }
  }
});

// ================= ROUTES =================

// Upload document
router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

// Get all documents belonging to logged-in user
router.get("/", auth, getDocuments);

// Get a single document
router.get("/:id", auth, getDocumentById);

// Delete a document
router.delete("/:id", auth, deleteDocument);

module.exports = router;
