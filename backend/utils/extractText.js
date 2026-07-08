const fs = require("fs");
const mammoth = require("mammoth");

let pdfParse = require("pdf-parse");

if (pdfParse.default) {
  pdfParse = pdfParse.default;
}

const extractText = async (filePath) => {
  if (filePath.endsWith(".pdf")) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  if (filePath.endsWith(".docx")) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  if (filePath.endsWith(".txt")) {
    return fs.readFileSync(filePath, "utf8");
  }

  return "";
};

module.exports = extractText;