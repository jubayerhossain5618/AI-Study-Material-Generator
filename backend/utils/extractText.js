const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {

    if (filePath.endsWith(".pdf")) {

        const dataBuffer =
            fs.readFileSync(filePath);

        const data =
            await pdf(dataBuffer);

        return data.text;
    }

    else if (filePath.endsWith(".docx")) {

        const result =
            await mammoth.extractRawText({
                path: filePath
            });

        return result.value;
    }

    else if (filePath.endsWith(".txt")) {

        return fs.readFileSync(
            filePath,
            "utf8"
        );
    }

    return "";
};

module.exports = extractText;
