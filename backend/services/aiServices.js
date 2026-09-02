const OpenAI = require("openai");

let aiClient = null;

const AI_TIMEOUT = 60000;

async function getAIClient() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  if (!aiClient) {
    aiClient = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
      timeout: AI_TIMEOUT,
    });
  }

  return aiClient;
}

const handleAIError = (error) => {
  const errorMessage =
    error?.message?.toLowerCase() || "";

  if (
    errorMessage.includes("timeout") ||
    errorMessage.includes("timed out") ||
    errorMessage.includes("aborted")
  ) {
    throw new Error(
      "AI request timed out. Please try again."
    );
  }

  if (
    error?.status === 401 ||
    error?.status === 403
  ) {
    throw new Error(
      "AI API key is invalid or unauthorized."
    );
  }

  if (error?.status === 402) {
    throw new Error(
      "OpenRouter credits or token limit is insufficient."
    );
  }

  if (error?.status === 429) {
    throw new Error(
      "AI request limit reached. Please wait and try again."
    );
  }

  if (error?.status === 404) {
    throw new Error(
      "Selected AI model is unavailable."
    );
  }

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

const generateContent = async (prompt) => {
  try {
    if (!prompt || !prompt.trim()) {
      throw new Error("AI prompt is empty");
    }

    const ai = await getAIClient();

    const response =
      await ai.chat.completions.create({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an educational AI assistant for university students. Generate accurate, clear and student-friendly study materials. Use only the study material provided. Do not invent unsupported information. Keep the output well organized. Follow the requested output format carefully.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 4000,
        extra_body: {
          reasoning: {
            max_tokens: 0,
          },
        },
      });

    const text =
      response.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new Error(
        "AI returned an empty response"
      );
    }

    return text;
  } catch (error) {
    console.error(
      "OpenRouter AI Error:",
      error
    );

    handleAIError(error);
  }
};

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

    const ai = await getAIClient();

    const response =
      await ai.chat.completions.create({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are an AI Study Tutor for university students. Answer the student's question using only the provided study material. Do not invent facts. If the answer cannot be found in the material, say: The answer is not available in the uploaded study material. Explain clearly and educationally using simple language.",
          },
          {
            role: "user",
            content: `
Study Material:

${documentText}

Student Question:

${question}
`,
          },
        ],
        max_tokens: 4000,
        extra_body: {
          reasoning: {
            max_tokens: 0,
          },
        },
      });

    const text =
      response.choices?.[0]?.message?.content?.trim();

    if (!text) {
      throw new Error(
        "AI returned an empty response"
      );
    }

    return text;
  } catch (error) {
    console.error(
      "OpenRouter Tutor Error:",
      error
    );

    handleAIError(error);
  }
};

module.exports = {
  generateContent,
  askQuestion,
};