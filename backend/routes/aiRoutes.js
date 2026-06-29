const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const {

    generateSummary,
    generateMCQ,
    generateFlashcards,
    generateQuiz,
    getMaterials

} = require(
    "../controllers/aiController"
);


router.post(
    "/summary/:id",
    auth,
    generateSummary
);

router.post(
    "/mcq/:id",
    auth,
    generateMCQ
);

router.post(
    "/flashcards/:id",
    auth,
    generateFlashcards
);

router.post(
    "/quiz/:id",
    auth,
    generateQuiz
);

router.get(
    "/materials",
    auth,
    getMaterials
);

module.exports = router;