// uploadDocument, getDocuments, deleteDocument
const Document = require("../models/Document");
const extractText =
    require("../utils/extractText");

const fs = require("fs");

// Upload Document

exports.uploadDocument =
    async (req, res) => {

    try {

        const file = req.file;

        if (!file) {

            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const text =
            await extractText(file.path);

        const document =
            await Document.create({

                userId: req.user.id,

                fileName: file.originalname,

                filePath: file.path,

                fileType: file.mimetype,

                extractedText: text
            });

        res.status(201).json({
            message:
                "Document uploaded successfully",

            document
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Documents

exports.getDocuments =
    async (req, res) => {

    try {

        const documents =
            await Document.find({
                userId: req.user.id
            });

        res.json(documents);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Document

exports.getDocumentById =
    async (req, res) => {

    try {

        const document =
            await Document.findById(
                req.params.id
            );

        if (!document) {

            return res.status(404).json({
                message: "Document not found"
            });
        }

        res.json(document);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Document

exports.deleteDocument =
    async (req, res) => {

    try {

        const document =
            await Document.findById(
                req.params.id
            );

        if (!document) {

            return res.status(404).json({
                message: "Document not found"
            });
        }

        fs.unlinkSync(document.filePath);

        await document.deleteOne();

        res.json({
            message:
                "Document deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};