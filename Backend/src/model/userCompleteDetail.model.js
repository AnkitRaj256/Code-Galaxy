import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for doubts
const CompleteUserDetailSchema = new mongoose.Schema({
    coverImage: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User reference is required'],
    },
}, { timestamps: true });

// Create the Query model from the schema
export const CompleteUserDetail = mongoose.model('CompleteUserDetail', CompleteUserDetailSchema);