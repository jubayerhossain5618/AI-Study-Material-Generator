let aiClient = null;


// 60 seconds timeout
const AI_TIMEOUT = 60000;



// ================================
// Get Gemini Client
// ================================

async function getAIClient() {

  if (!process.env.GEMINI_API_KEY) {

    throw new Error(
      "GEMINI_API_KEY is missing"
    );

  }


  if (!aiClient) {

    const { GoogleGenAI } =
      await import("@google/genai");


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


  console.error(
    "Gemini Error:",
    error
  );


  const message =
    error?.message?.toLowerCase() || "";



  if (
    message.includes("timeout") ||
    message.includes("aborted")
  ) {

    throw new Error(
      "AI request timed out. Please try again."
    );

  }



  if (
    error?.status === 429 ||
    error?.code === 429
  ) {

    throw new Error(
      "AI request limit reached. Please try again later."
    );

  }



  if (
    error?.status === 503 ||
    error?.code === 503
  ) {

    throw new Error(
      "Gemini service is busy. Please try again after a few seconds."
    );

  }



  if (
    error?.status === 404 ||
    error?.code === 404
  ) {

    throw new Error(
      "Gemini model not available."
    );

  }



  throw new Error(
    error?.message ||
    "AI service error"
  );


};






// ================================
// Common AI Generator
// Summary, MCQ, Flashcards, Quiz
// ================================


const generateContent = async (prompt) => {


  try {


    if (
      !prompt ||
      !prompt.trim()
    ) {

      throw new Error(
        "AI prompt is empty"
      );

    }



    const ai =
      await getAIClient();




    const response =
      await ai.models.generateContent({


        model: "gemini-3.8-flash",


        contents: prompt,



        config: {


          httpOptions: {

            timeout: AI_TIMEOUT,

          },



          systemInstruction: `

You are an educational AI assistant for university students.

Generate accurate, clear and student-friendly study materials.

Rules:
- Use only provided study material.
- Do not invent information.
- Keep answers organized.
- Use simple language.
- Follow requested format.

          `,


        },


      });




    const text =
      response.text?.trim();




    if (!text) {

      throw new Error(
        "Empty AI response"
      );

    }



    return text;




  } catch(error) {


    console.error(
      "Gemini Generate Error:",
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



        model: "gemini-3.8-flash",



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

Answer only from the provided study material.

Rules:
- Do not invent facts.
- Explain clearly.
- Use simple language.
- If answer is unavailable say:

"The answer is not available in the uploaded study material."

          `,


        },



      });






    const text =
      response.text?.trim();





    if (!text) {


      throw new Error(
        "Empty AI response"
      );


    }





    return text;






  } catch(error) {



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