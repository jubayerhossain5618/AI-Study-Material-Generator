// generateSummary, generateMCQ, generateFlashcards, generateQuiz
const Document = require("../models/Document");

const Material = require("../models/Material");

const {
  generateContent
} = require("../services/aiServices");


// Generate Summary
exports.generateSummary = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    const prompt = `
Summarize the following study material:

${document.extractedText}
`;

    const summary = await generateContent(prompt);

    const saved = await Material.create({
      documentId: document._id,
      userId: req.user.id,
      materialType: "summary",
      content: summary
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Generate MCQ
exports.generateMCQ = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    const prompt = `
Generate 10 multiple choice questions.

Text:

${document.extractedText}

Format:

Question
A)
B)
C)
D)
Answer:
`;

    const mcqs = await generateContent(prompt);

    const saved = await Material.create({
      documentId: document._id,
      userId: req.user.id,
      materialType: "mcq",
      content: mcqs
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Generate Flashcards
exports.generateFlashcards = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    const prompt = `
Create flashcards.

Format:

Q:
A:

Text:

${document.extractedText}
`;

    const flashcards = await generateContent(prompt);

    const saved = await Material.create({
      documentId: document._id,
      userId: req.user.id,
      materialType: "flashcard",
      content: flashcards
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Generate Quiz
exports.generateQuiz = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found"
      });
    }

    const prompt = `
Create a short quiz from:

${document.extractedText}
`;

    const quiz = await generateContent(prompt);

    const saved = await Material.create({
      documentId: document._id,
      userId: req.user.id,
      materialType: "quiz",
      content: quiz
    });

    res.json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// Get Materials
exports.getMaterials = async (req, res) => {
  const materials = await Material.find({
    userId: req.user.id
  });

  res.json(materials);
};