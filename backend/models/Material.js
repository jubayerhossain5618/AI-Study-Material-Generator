// Material model for summary/mcq/quiz/flashcards
const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
{
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document",
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    materialType: {
        type: String,
        enum: [
            "summary",
            "mcq",
            "flashcard",
            "quiz"
        ]
    },

    content: {
        type: String
    }
},
{
    timestamps: true
});

module.exports =
    mongoose.model(
        "Material",
        materialSchema
    );