const express = require("express");
const router = express.Router();

const multer = require("multer");
const path = require("path");

const auth = require("../middleware/authMiddleware");

const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument
} = require("../controllers/documentController");

// ================= MULTER CONFIG =================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [".pdf", ".docx", ".txt"];
    const ext = path.extname(file.originalname);

    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOCX, TXT allowed"));
    }
  }
});

// ================= ROUTES =================

router.post(
  "/upload",
  auth,
  upload.single("file"),
  uploadDocument
);

router.get("/", auth, getDocuments);
router.get("/:id", auth, getDocumentById);
router.delete("/:id", auth, deleteDocument);

module.exports = router;