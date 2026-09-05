const User = require("../models/User");
const Document = require("../models/Document");
const Material = require("../models/Material");
const ChatHistory = require("../models/ChatHistory");


// ======================
// Dashboard Statistics
// ======================

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalDocuments = await Document.countDocuments();
        const totalMaterials = await Material.countDocuments();
        const totalChats = await ChatHistory.countDocuments();

        res.json({
            totalUsers,
            totalDocuments,
            totalMaterials,
            totalChats
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ======================
// Get All Users
// ======================

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ======================
// Delete User
// ======================

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Admin account cannot be deleted
        if (user.role === "admin") {
            return res.status(400).json({
                message: "Admin account cannot be deleted"
            });
        }

        // Delete user's related data
        await Promise.all([
            Document.deleteMany({
                userId: user._id
            }),

            Material.deleteMany({
                userId: user._id
            }),

            ChatHistory.deleteMany({
                userId: user._id
            })
        ]);

        // Delete user
        await user.deleteOne();

        res.json({
            message:
                "User and related data deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ======================
// Get All Documents
// ======================

exports.getDocuments = async (req, res) => {
    try {
        const docs = await Document.find()
            .populate(
                "userId",
                "name email"
            );

        res.json(docs);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ======================
// Delete Document
// ======================

exports.deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findById(
            req.params.id
        );

        if (!doc) {
            return res.status(404).json({
                message: "Document not found"
            });
        }

        // Delete materials generated from this document
        await Material.deleteMany({
            documentId: doc._id
        });

        // Delete document
        await doc.deleteOne();

        res.json({
            message:
                "Document and related materials deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// ======================
// Get All Chats
// ======================

exports.getChats = async (req, res) => {
    try {
        const chats = await ChatHistory.find()
            .populate(
                "userId",
                "name email"
            );

        res.json(chats);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};