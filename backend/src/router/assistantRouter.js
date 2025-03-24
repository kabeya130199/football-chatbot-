const express = require("express");
const fs = require('fs')
const path = require('path')
const {
  userAuthorization,
} = require("../middlewares/authorization.middleware");
const multer = require('multer');
const {
  saveMessage,
  getMessagesByUser,
  getMessagesByChatId,
} = require("../model/chat/Chat.model");
const { uploadFiles } = require('../model/assistant/Assistant.model');
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.all("/", (req, res, next) => {
  next();
});

// Save user message and get bot response
// router.post('/message', userAuthorization, async (req, res) => {
//     const { chatId, userId, message } = req.body;
//     if (!userId || !message) {
//         return res.status(400).json({ status: "error", message: "Invalid request. User ID and message are required." });
//     }
//     try {
//         const userMessage = await saveMessage({ chatId, userId, message, sender: 'user' });
//         const botResponse = await processBotResponse(message);
//         await saveMessage({ chatId, userId, message: botResponse, sender: 'bot' });
//         res.json({ status: "success", userMessage, botResponse });
//     } catch (error) {
//         res.status(500).json({ status: "error", message: error.message });
//     }
// });

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Set the upload folder
  },
  filename: (req, file, cb) => {
      // Generate a unique file name while preserving the original extension
      const fileExtension = path.extname(file.originalname); // Extract extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique identifier
      cb(null, uniqueSuffix + fileExtension); // Combine unique identifier and extension
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

router.post('/upload', upload.array('files', 10), async (req, res) => { // Allow up to 10 files
    try {
        const { threadId, assistantId } = req.body;
        console.log(threadId)
        const files = req.files; // Array of uploaded files


        if (!files || files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        const uploadedFiles = await uploadFiles(assistantId, threadId, files);
        res.json({ message: "Files uploaded successfully", files: uploadedFiles });
    } catch (error) {
        res.status(500).json({ error: "File upload failed" });
    }
});

module.exports = router;

