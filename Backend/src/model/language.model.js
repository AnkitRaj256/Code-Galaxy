import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for languages
const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Language name is required'],
        unique: true, // Ensure each language is stored only once
        trim: true,
        validate: {
            validator: function (value) {
                // Add custom validation logic to allow dynamic values or restrict based on a list
                const allowedValues = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'HTML', 'Others'];
                return allowedValues.includes(value) || value === 'Others'; // Allow 'Others' for unrecognized tags
            },
            message: props => `${props.value} is not a valid language name`
        },
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Query', // Reference to the Query model
    }],
}, { timestamps: true });

// Create the Language model from the schema
export const Language = mongoose.model('Language', languageSchema);
