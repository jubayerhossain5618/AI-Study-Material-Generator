const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Generic Function

const generateContent = async (prompt) => {

    const response =
        await client.chat.completions.create({

            model: "gpt-4o-mini",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

    return response
        .choices[0]
        .message
        .content;
};

module.exports = {
    generateContent
};

const askQuestion = async (
    documentText,
    question
) => {

    const prompt = `
You are an AI Study Assistant.

Answer only from the provided study material.

Study Material:

${documentText}

Student Question:

${question}

Provide a clear educational answer.
`;

    const response =
        await client.chat.completions.create({

            model: "gpt-4o-mini",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

    return response
        .choices[0]
        .message
        .content;
};

module.exports = {
    generateContent,
    askQuestion
};
