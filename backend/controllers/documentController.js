const Document = require("../models/Document");
const extractText = require("../utils/extractText");

const fs = require("fs");
const mongoose = require("mongoose");


// ==============================
// Upload Document
// ==============================

exports.uploadDocument = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded."
      });
    }

    const text = await extractText(file.path);

    const document = await Document.create({
      userId: req.user.id,
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      extractedText: text || ""
    });

    res.status(201).json({
      message: "Document uploaded successfully.",
      document
    });

  } catch (error) {
    console.error("Upload Error:", error);

    // Remove uploaded file if processing/database save failed
    if (
      req.file?.path &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message:
        error.message ||
        "Document upload failed."
    });
  }
};


// ==============================
// Get All User Documents
// ==============================

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      userId: req.user.id
    }).sort({
      createdAt: -1
    });

    res.json(documents);

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Unable to load documents."
    });
  }
};


// ==============================
// Get Single User Document
// ==============================

exports.getDocumentById = async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    res.json(document);

  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        "Unable to load document."
    });
  }
};


// ==============================
// Delete User Document
// ==============================

exports.deleteDocument = async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(
        req.params.id
      )
    ) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    const document = await Document.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    // Delete physical file safely
    if (
      document.filePath &&
      fs.existsSync(document.filePath)
    ) {
      fs.unlinkSync(document.filePath);
    }

    await document.deleteOne();

    res.json({
      message: "Document deleted successfully."
    });

  } catch (error) {
    console.error("Delete Document Error:", error);

    res.status(500).json({
      message:
        error.message ||
        "Unable to delete document."
    });
  }
};