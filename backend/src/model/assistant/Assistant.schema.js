const mongoose = require('mongoose');

const AssistantSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assistantId: { type: String, required: true }, // OpenAI Assistant ID
    threadId: { type: String, required: true }, // OpenAI Thread ID for conversation history
    vectorStoreId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const FileSchema = new mongoose.Schema({
    assistantId: { type: String, required: true },
    openaiFileIds: { type: String, required: true }, // OpenAI File ID for API reference
    uploadedAt: { type: Date, default: Date.now }
});

const Assistant = mongoose.model('Assistant', AssistantSchema);
const File = mongoose.model('File', FileSchema);

module.exports = { Assistant, File };
