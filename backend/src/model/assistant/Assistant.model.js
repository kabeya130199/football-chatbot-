const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose');
const OpenAI = require('openai');
const { Assistant, File } = require('./Assistant.schema');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Create a new OpenAI Assistant for a user
 */
async function createAssistantForUser(userId) {
    try {
        // Step 1: Create Assistant in OpenAI
        const assistant = await openai.beta.assistants.create({
            name: `Soccer Bot - User ${userId}`,
            instructions: "You are a soccer analytics bot. Answer user questions based on uploaded soccer data.",
            model: "gpt-4o",
            tools: [{ type: "file_search" }],
        });

        // Step 2: Create a Thread for the Assistant
        const thread = await openai.beta.threads.create();

        // Step 3: Save to MongoDB
        const newAssistant = new Assistant({
            userId,
            assistantId: assistant.id,
            threadId: thread.id
        });

        await newAssistant.save();
        return newAssistant;
    } catch (error) {
        console.error("Error creating assistant:", error);
        throw new Error("Assistant creation failed");
    }
}


async function uploadFiles(assistantId, threadId, files) {
    try {
        if (!files || files.length === 0) {
            throw new Error("No files provided to upload.");
        }

        // Find the user's assistant
        const assistant = await Assistant.findOne({ assistantId: assistantId, threadId: threadId });
        if (!assistant) {
            throw new Error("Assistant not found for user");
        }

        let vectorStoreId = assistant.vectorStoreId;
        console.log(vectorStoreId)

        // If the assistant doesn't have a vector store, create one
        if (!vectorStoreId) {
            
            const vectorStore = await openai.vectorStores.create({
                name: `VectorStore-${assistantId}`,
            });

            vectorStoreId = vectorStore.id;

            // Update the assistant with the new vector store ID
            await Assistant.updateOne({ assistantId: assistantId, threadId: threadId }, { vectorStoreId });
        }

        // Step 1: Upload files and get file IDs
        const uploadedFileIds = [];

        for (const file of files) {
            const fileStream = fs.createReadStream(file.path);
            const response = await openai.files.create({
                file: fileStream,
                purpose: "assistants", // Specify the purpose as needed
            });

            uploadedFileIds.push(response.id); // Collect the file IDs
        }

        // Step 2: Upload file batch to the vector store
        const fileBatchResponse = await openai.vectorStores.fileBatches.create(
            vectorStoreId,
            {
                file_ids: uploadedFileIds, // Use the file IDs from the upload response
            }
        );

        await openai.beta.assistants.update(assistantId, {
            tool_resources: { file_search: { vector_store_ids: [vectorStoreId] } },
          });

        // Step 3: Prepare file data for batch insertion (if needed for your database)
        // const fileDataArray = files.map((file) => ({
        //     assistantId: assistantId,
        //     fileName: file.originalname,
        //     fileType: file.mimetype,
        //     fileSize: file.size,
        //     threadId: threadId, // Ensure threadId is included
        // }));

        // Step 4: Insert all file records at once (into your DB or other storage)
        
        if (uploadedFileIds.length > 0) {
            console.log(uploadedFileIds)
            const fileResponse = await File.findOne({assistantId: assistantId})
            if (fileResponse) {
                console.log(fileResponse)
                const oldIds = JSON.parse(fileResponse.openaiFileIds)
                oldIds.push(...uploadedFileIds)
                await File.updateOne({assistantId:assistantId}, {openaiFileIds: JSON.stringify(oldIds)})
            }
            else {
                await File.create({ 
                    assistantId: assistantId, 
                    openaiFileIds: JSON.stringify(uploadedFileIds), 
                    userId: assistant.userId,
                    threadId: threadId
                });
            }
            
        }

        return uploadedFileIds; // Optionally, return the file records
    } catch (error) {
        console.error("Error uploading files:", error);
        throw new Error("File upload failed");
    }
}

/**
 * Get Assistant by user ID
 */
async function getAssistantByUser(userId) {
    return Assistant.findOne({ userId });
}

/**
 * Get all files uploaded by a user
 */
async function getUserFiles(userId) {
    return File.find({ userId });
}

module.exports = { Assistant, createAssistantForUser, getAssistantByUser, File, uploadFiles, getUserFiles };
