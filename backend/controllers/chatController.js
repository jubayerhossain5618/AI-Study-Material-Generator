const Document = require("../models/Document");
const ChatHistory = require("../models/ChatHistory");

const {
  askQuestion
} = require("../services/aiServices");


// ==============================
// Ask AI Tutor
// ==============================

exports.askAI = async (req, res) => {

  try {

    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        message: "Question is required."
      });
    }

    // Only allow logged-in user's own document
    const document = await Document.findOne({
      _id: req.params.documentId,
      userId: req.user.id
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found."
      });
    }

    if (
      !document.extractedText ||
      !document.extractedText.trim()
    ) {
      return res.status(400).json({
        message:
          "No readable text found in this document. Please upload a text-based PDF, DOCX or TXT file."
      });
    }

    const answer = await askQuestion(
      document.extractedText,
      question.trim()
    );

    if (!answer || !answer.trim()) {
      return res.status(502).json({
        message: "AI returned an empty answer."
      });
    }

    const chat = await ChatHistory.create({
      userId: req.user.id,
      documentId: document._id,
      question: question.trim(),
      answer
    });

    res.json(chat);

  } catch (error) {

    console.error("AI Tutor Error:", error);

    res.status(500).json({
      message:
        error.message ||
        "AI Tutor is temporarily unavailable."
    });

  }
};


// ==============================
// Get Chat History
// ==============================

exports.getChatHistory = async (req, res) => {

  try {

    const history = await ChatHistory.find({
      userId: req.user.id
    })
    .sort({
      createdAt: -1
    });

    res.json(history);

  } catch (error) {

    res.status(500).json({
      message:
        error.message ||
        "Unable to load chat history."
    });

  }
};


// ==============================
// Delete Chat
// ==============================

exports.deleteChat = async (req, res) => {

  try {

    const chat = await ChatHistory.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found."
      });
    }

    await chat.deleteOne();

    res.json({
      message: "Chat deleted successfully."
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message ||
        "Unable to delete chat."
    });

  }
};