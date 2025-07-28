// /models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, // No two users can have the same email
            lowercase: true, // Store email in lowercase
            trim: true, // Remove whitespace
        },
        password: {
            type: String,
            required: true,
            minlength: 6, // Enforce a minimum password length
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const User = mongoose.model('User', userSchema);

export default User;