require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

async function test() {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Say hello in one sentence",
    });

    console.log(response.text);

  } catch (error) {

    console.log("ERROR:");
    console.log(error);

  }

}

test();