let aiClient = null;

// 60 seconds AI request timeout
const AI_TIMEOUT = 60000;

async function getAIClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  if (!aiClient) {
    const { GoogleGenAI } = await import("@google/genai");

    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  return aiClient;
}


// ================================
// Common Gemini Error Handler
// ================================

const handleGeminiError = (error) => {

  const errorMessage =
    error?.message?.toLowerCase() || "";

  // Timeout
  if (
    error?.name === "AbortError" ||
    errorMessage.includes("timeout") ||
    errorMessage.includes("timed out") ||
    errorMessage.includes("aborted")
  ) {
    throw new Error(
      "AI request timed out. Please try again."
    );
  }

  // Rate Limit
  if (
    error?.status === 429 ||
    error?.code === 429
  ) {
    throw new Error(
      "AI request limit reached. Please wait a little and try again."
    );
  }

  // Model unavailable
  if (
    error?.status === 404 ||
    error?.code === 404
  ) {
    throw new Error(
      "Selected Gemini AI model is currently unavailable."
    );
  }

  // Temporary Gemini/server problem
  if (
    error?.status === 500 ||
    error?.status === 502 ||
    error?.status === 503
  ) {
    throw new Error(
      "AI service is temporarily unavailable. Please try again."
    );
  }

  throw new Error(
    error?.message ||
    "AI service is temporarily unavailable."
  );
};


// ================================
// Generic AI Content Generator
// Summary, MCQ, Flashcards, Quiz
// ================================

const generateContent = async (prompt) => {

  try {

    if (!prompt || !prompt.trim()) {
      throw new Error("AI prompt is empty");
    }

    const ai = await getAIClient();

    const response =
      await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: prompt,

        config: {

          httpOptions: {
            timeout: AI_TIMEOUT,
          },

          systemInstruction: `
You are an educational AI assistant for university students.

Your job is to generate accurate, clear and student-friendly study materials.

Rules:
- Use only the study material provided by the user.
- Do not invent unsupported information.
- Keep the output well organized.
- Use simple and understandable language.
- Follow the requested output format carefully.
- Do not return an empty response.
          `,
        },
      });

    const text =
      response.text?.trim();

    if (!text) {
      throw new Error(
        "AI returned an empty response"
      );
    }

    return text;

  } catch (error) {

    console.error(
      "Gemini AI Error:",
      error
    );

    handleGeminiError(error);
  }
};


// ================================
// AI Tutor
// ================================

const askQuestion = async (
  documentText,
  question
) => {

  try {

    if (
      !documentText ||
      !documentText.trim()
    ) {
      throw new Error(
        "Study material is empty"
      );
    }

    if (
      !question ||
      !question.trim()
    ) {
      throw new Error(
        "Question is required"
      );
    }

    const ai =
      await getAIClient();

    const response =
      await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: `
Study Material:

${documentText}

Student Question:

${question}
        `,

        config: {

          httpOptions: {
            timeout: AI_TIMEOUT,
          },

          systemInstruction: `
You are an AI Study Tutor for university students.

Answer the student's question using only the provided study material.

Rules:
- Do not invent facts.
- Do not use information outside the provided material.
- If the answer cannot be found in the material, say:
  "The answer is not available in the uploaded study material."
- Explain clearly and educationally.
- Use simple language.
- Give examples only when they can be supported by the provided material.
- Keep the answer focused on the student's question.
          `,
        },
      });

    const text =
      response.text?.trim();

    if (!text) {
      throw new Error(
        "AI returned an empty response"
      );
    }

    return text;

  } catch (error) {

    console.error(
      "Gemini Tutor Error:",
      error
    );

    handleGeminiError(error);
  }
};


module.exports = {
  generateContent,
  askQuestion,
};