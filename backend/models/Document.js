// Document model with extracted text
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fileName: {
        type: String,
        required: true
    },

    filePath: {
        type: String,
        required: true
    },

    fileType: {
        type: String
    },

    extractedText: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model(
    "Document",
    documentSchema
);