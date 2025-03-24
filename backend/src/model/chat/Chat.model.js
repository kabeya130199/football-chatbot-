const Chat = require('./Chat.schema');

const saveMessage = async (userId, message, sender) => {
    try {
        const chatMessage = new Chat({ userId, message, sender });
        return await chatMessage.save();
    } catch (error) {
        throw new Error('Error saving chat message');
    }
};

const getChatHistory = async (userId) => {
    try {
        return await Chat.find({ userId }).sort({ timestamp: 1 });
    } catch (error) {
        throw new Error('Error retrieving chat history');
    }
};

module.exports = { saveMessage, getChatHistory };