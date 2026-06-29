const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/authMiddleware");

const admin =
    require("../middleware/adminMiddleware");

const {

    getDashboardStats,
    getUsers,
    deleteUser,
    getDocuments,
    deleteDocument,
    getChats

} = require(
    "../controllers/adminController"
);


// Dashboard

router.get(
    "/dashboard",
    auth,
    admin,
    getDashboardStats
);


// Users

router.get(
    "/users",
    auth,
    admin,
    getUsers
);

router.delete(
    "/users/:id",
    auth,
    admin,
    deleteUser
);


// Documents

router.get(
    "/documents",
    auth,
    admin,
    getDocuments
);

router.delete(
    "/documents/:id",
    auth,
    admin,
    deleteDocument
);


// Chats

router.get(
    "/chats",
    auth,
    admin,
    getChats
);

module.exports = router;
