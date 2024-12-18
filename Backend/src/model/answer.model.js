import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for individual answers
export const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Answer text is required'], // Enhanced validation
        trim: true,
    },
    upvotes: {
        type: Number,
        default: 0,
        min: [0, 'Upvotes cannot be negative'],
    },
    downvotes: {
        type: Number,
        default: 0,
        min: [0, 'Downvotes cannot be negative'],
    },
    answeredBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Answer must be linked to a user'],
    },
}, { timestamps: true });

// No model creation here, as it will be embedded in the `doubtSchema`
