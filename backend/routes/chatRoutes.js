const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    askAI,
    getChatHistory,
    deleteChat

} = require(
    "../controllers/chatController"
);


// Ask AI

router.post(
    "/:documentId",
    auth,
    askAI
);


// Get History

router.get(
    "/history",
    auth,
    getChatHistory
);


// Delete Chat

router.delete(
    "/:id",
    auth,
    deleteChat
);

module.exports = router;