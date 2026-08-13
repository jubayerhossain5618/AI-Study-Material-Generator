const Document = require("../models/Document");
const Material = require("../models/Material");

const {
  generateContent
} = require("../services/aiServices");


// ==============================
// Helper: Get User Document
// ==============================

const getUserDocument = async (documentId, userId) => {

  const document = await Document.findOne({
    _id: documentId,
    userId: userId
  });

  if (!document) {
    throw new Error("DOCUMENT_NOT_FOUND");
  }

  if (
    !document.extractedText ||
    !document.extractedText.trim()
  ) {
    throw new Error("NO_READABLE_TEXT");
  }

  return document;
};


// ==============================
// Common Error Handler
// ==============================

const handleAIError = (error, res) => {

  if (error.message === "DOCUMENT_NOT_FOUND") {
    return res.status(404).json({
      message: "Document not found."
    });
  }

  if (error.message === "NO_READABLE_TEXT") {
    return res.status(400).json({
      message:
        "No readable text found in this document. Please upload a text-based PDF, DOCX or TXT file."
    });
  }

  return res.status(500).json({
    message:
      error.message ||
      "AI generation failed. Please try again."
  });
};


// ==============================
// Generate Summary
// ==============================

exports.generateSummary = async (req, res) => {

  try {

    const document = await getUserDocument(
      req.params.id,
      req.user.id
    );

    const prompt = `
Create a clear and concise summary from the following study material.

Requirements:
- Focus on the most important concepts.
- Use simple language suitable for university students.
- Organize the summary clearly.
- Do not add information that is not present in the study material.

Study Material:

${document.extractedText}
`;

    const summary =
      await generateContent(prompt);

    const saved =
      await Material.create({

        documentId: document._id,
        userId: req.user.id,
        materialType: "summary",
        content: summary

      });

    res.json(saved);

  } catch (error) {

    handleAIError(error, res);

  }
};


// ==============================
// Generate MCQ
// ==============================

exports.generateMCQ = async (req, res) => {

  try {

    const document = await getUserDocument(
      req.params.id,
      req.user.id
    );

    const prompt = `
Generate exactly 10 multiple choice questions from the following study material.

For every question use this format:

Question 1:
A)
B)
C)
D)
Answer:
Explanation:

Requirements:
- Exactly 10 questions.
- Four options for every question.
- Only one correct answer.
- Include a short explanation.
- Avoid duplicate questions.
- Use only information from the provided study material.

Study Material:

${document.extractedText}
`;

    const mcqs =
      await generateContent(prompt);

    const saved =
      await Material.create({

        documentId: document._id,
        userId: req.user.id,
        materialType: "mcq",
        content: mcqs

      });

    res.json(saved);

  } catch (error) {

    handleAIError(error, res);

  }
};


// ==============================
// Generate Flashcards
// ==============================

exports.generateFlashcards = async (req, res) => {

  try {

    const document = await getUserDocument(
      req.params.id,
      req.user.id
    );

    const prompt = `
Create 15 useful flashcards from the following study material.

Use this format:

Flashcard 1
Q:
A:

Requirements:
- Create 15 flashcards.
- Keep answers concise.
- Cover important concepts.
- Avoid duplicate flashcards.
- Use only information from the provided study material.

Study Material:

${document.extractedText}
`;

    const flashcards =
      await generateContent(prompt);

    const saved =
      await Material.create({

        documentId: document._id,
        userId: req.user.id,
        materialType: "flashcard",
        content: flashcards

      });

    res.json(saved);

  } catch (error) {

    handleAIError(error, res);

  }
};


// ==============================
// Generate Quiz
// ==============================

exports.generateQuiz = async (req, res) => {

  try {

    const document = await getUserDocument(
      req.params.id,
      req.user.id
    );

    const prompt = `
Create a 10-question educational quiz from the following study material.

Difficulty:
- 3 Easy questions
- 4 Medium questions
- 3 Hard questions

Requirements:
- Include an answer for every question.
- Use only the provided study material.
- Do not invent information.

Study Material:

${document.extractedText}
`;

    const quiz =
      await generateContent(prompt);

    const saved =
      await Material.create({

        documentId: document._id,
        userId: req.user.id,
        materialType: "quiz",
        content: quiz

      });

    res.json(saved);

  } catch (error) {

    handleAIError(error, res);

  }
};


// ==============================
// Get Generated Materials
// ==============================

exports.getMaterials = async (req, res) => {

  try {

    const materials =
      await Material.find({
        userId: req.user.id
      })
      .sort({
        createdAt: -1
      });

    res.json(materials);

  } catch (error) {

    res.status(500).json({
      message:
        error.message ||
        "Unable to load generated materials."
    });

  }
};