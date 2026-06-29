// askAI, getChatHistory, deleteChat
const Document =
    require("../models/Document");

const ChatHistory =
    require("../models/ChatHistory");

const {
    askQuestion
} = require("../services/aiService");


// Ask Question

exports.askAI =
    async (req, res) => {

    try {

        const { question } = req.body;

        const document =
            await Document.findById(
                req.params.documentId
            );

        if (!document) {

            return res.status(404).json({
                message: "Document not found"
            });
        }

        const answer =
            await askQuestion(
                document.extractedText,
                question
            );

        const chat =
            await ChatHistory.create({

                userId: req.user.id,

                documentId:
                    document._id,

                question,

                answer
            });

        res.json(chat);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

exports.getChatHistory =
    async (req, res) => {

    try {

        const history =
            await ChatHistory.find({
                userId: req.user.id
            })
            .sort({ createdAt: -1 });

        res.json(history);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

//delete
exports.deleteChat =
    async (req, res) => {

    try {

        await ChatHistory.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message:
                "Chat deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};