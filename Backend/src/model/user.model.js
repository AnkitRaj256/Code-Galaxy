import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters']
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
        index: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
        maxlength: [50, 'Full name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Simple email regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false // Do not return password by default
    },
    refreshToken: {
        type: String,
        select: false // Do not return refresh token by default
    },
    questionsAsked: {
        type: Number,
        default: 0, // Default value set to 0
        min: [0, 'Questions asked cannot be negative']
    },
    questionsAnswered: {
        type: Number,
        default: 0, // Default value set to 0
        min: [0, 'Questions answered cannot be negative']
    },
    badgesEarned: {
        type: [String],
        enum: ['iron', 'bronze', 'silver', 'gold'], // Only these badges are allowed
        default: [], // Default is an empty array
    },
    leaderboardRank: {
        type: Number,
        default: 0, // Default value is 0 (unranked)
    },
    quesAskId: [
        {
            queryId: {
                type: mongoose.Schema.Types.ObjectId, // Store the ObjectId of the question
                ref: 'Query', // Reference the Query model
            },
            description: {
                type: String, // Store the associated string (e.g., question description)
                required: true,
            },
        }
    ],
    questionsAnsweredId: [
        {
            queryId: {
                type: mongoose.Schema.Types.ObjectId, // Store the ObjectId of the question
                ref: 'Query', // Reference the Query model
            },
            description: {
                type: String, // Store the associated string (e.g., question description)
                required: true,
            },
        },
    ],
    coverImage: {
        type: String,
        default: '',
    },
    bio: {
        type: String,
        default: '',
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// access token are short lived
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Refresh token expire in long duration
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model('User ', userSchema);