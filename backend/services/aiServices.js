
let aiClient = null;

// Request timeout: 60 seconds
const AI_TIMEOUT = 60000;

// Limit output to avoid unnecessarily long generations
const MAX_OUTPUT_TOKENS = 3072;

// ================================
// Get Gemini Client
// ================================

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
// Gemini Error Handler
// ================================

const handleGeminiError = (error) => {
  const message = String(error?.message || "");
  const normalizedMessage = message.toLowerCase();

  const status = Number(
    error?.status ??
    error?.code ??
    error?.response?.status ??
    error?.error?.code ??
    0
  );

  // Log diagnostic information without logging API keys
  console.error("Gemini request failed:", {
    message,
    status: status || "unknown",
  });

  // Timeout / deadline exceeded
  if (
    status === 504 ||
    normalizedMessage.includes("deadline_exceeded") ||
    normalizedMessage.includes("deadline expired") ||
    normalizedMessage.includes("timed out") ||
    normalizedMessage.includes("timeout") ||
    normalizedMessage.includes("aborted")
  ) {
    throw new Error(
      "AI generation took too long. Please try again with shorter study material."
    );
  }

  // Rate limit / quota
  if (
    status === 429 ||
    normalizedMessage.includes("resource_exhausted")
  ) {
    throw new Error(
      "AI request limit reached. Please try again later."
    );
  }

  // Temporary Gemini service issue
  if (
    status === 503 ||
    normalizedMessage.includes("service is busy") ||
    normalizedMessage.includes("overloaded")
  ) {
    throw new Error(
      "Gemini service is temporarily busy. Please try again shortly."
    );
  }

  // Model unavailable
  if (status === 404) {
    throw new Error(
      "Gemini model not available. Check the configured model name."
    );
  }

  // Invalid API key or permission
  if (status === 401 || status === 403) {
    throw new Error(
      "Gemini API authentication failed. Check the API key and permissions."
    );
  }

  throw new Error(message || "AI service error. Please try again.");
};

// ================================
// Common Gemini Request
// ================================

async function requestGemini(contents, systemInstruction) {
  const ai = await getAIClient();

  const response = await ai.models.generateContent({
    // Preserve the model currently configured in your project.
    model: "gemini-3.8-flash",

    contents,

    config: {
      httpOptions: {
        timeout: AI_TIMEOUT,
      },

      systemInstruction,

      maxOutputTokens: MAX_OUTPUT_TOKENS,

      temperature: 0.2,
    },
  });

  const text = response.text?.trim();

  if (!text) {
    throw new Error("Empty AI response. Please try again.");
  }

  return text;
}

// ================================
// Common AI Generator
// Summary, MCQ, Flashcards, Quiz
// ================================

const generateContent = async (prompt) => {
  try {
    if (typeof prompt !== "string" || !prompt.trim()) {
      throw new Error("AI prompt is empty");
    }

    return await requestGemini(
      prompt,
      `You are an educational AI assistant for university students.

Rules:
- Use the provided study material as the factual source.
- Do not invent facts or unsupported information.
- Follow the user's requested format and question count.
- Use clear, simple, student-friendly language.
- Keep answers concise while preserving important information.
- Organize the output with readable headings and numbering.
- Return the requested study material directly.`
    );
  } catch (error) {
    if (
      error?.message === "AI prompt is empty"
    ) {
      throw error;
    }

    handleGeminiError(error);
  }
};

// ================================
// AI Tutor
// ================================

const askQuestion = async (documentText, question) => {
  try {
    if (
      typeof documentText !== "string" ||
      !documentText.trim()
    ) {
      throw new Error("Study material is empty");
    }

    if (
      typeof question !== "string" ||
      !question.trim()
    ) {
      throw new Error("Question is required");
    }

    const contents = `
Study Material:
${documentText}

Student Question:
${question.trim()}
`;

    return await requestGemini(
      contents,
      `You are an AI Study Tutor for university students.

Rules:
- Answer using the provided study material.
- Do not invent facts or unsupported information.
- Explain concepts clearly using simple language.
- Keep the answer focused on the student's question.
- If the answer is unavailable, say:
"The answer is not available in the uploaded study material."`
    );
  } catch (error) {
    if (
      error?.message === "Study material is empty" ||
      error?.message === "Question is required"
    ) {
      throw error;
    }

    handleGeminiError(error);
  }
};

// ================================
// Exports
// ================================

module.exports = {
  generateContent,
  askQuestion,
};
