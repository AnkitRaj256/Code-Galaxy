import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true, // Ensures the answer text is mandatory
    },
    upvotes: {
        type: Number,
        default: 0, // Default value for upvotes
    },
    downvotes: {
        type: Number,
        default: 0, // Default value for downvotes
    },
    answeredBy: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true, // Ensures every answer is linked to a user
    },
}, { timestamps: true }); // Timestamps for when the answer is created or updated

const doubtSchema = new mongoose.Schema({
    doubt: {
        type: String,
        required: true, // Ensures the doubt field is mandatory
    },
    code: {
        type: String,
        default: null, // Default value if no code is provided
    },
    answers: [answerSchema], // Embeds multiple answers as an array
    language: {
        type: String,
        required: true, // Ensures the language field is mandatory
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true, // Ensures every query is linked to a user
    },
}, { timestamps: true });

export const Query = mongoose.model('Query', doubtSchema);
