import mongoose from 'mongoose';
import { answerSchema } from './answer.model.js'; // Import the answer schema
const { Schema } = mongoose;

// Schema for doubts
const doubtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    tags: {
        type: String, // Change from Array to String
        default: '',  // Default to an empty string
    },
    answers: [answerSchema], // Embeds multiple answers
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
    },
}, { timestamps: true });

// Create the Query model from the schema
export const Query = mongoose.model('Query', doubtSchema);
