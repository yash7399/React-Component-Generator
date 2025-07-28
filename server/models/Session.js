// server/models/Session.js
import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      default: 'Untitled Session',
    },
    // For now, we'll just save the last prompt and code.
    // This can be expanded to a full chat history later.
    lastPrompt: {
      type: String,
      default: '',
    },
    generatedJsx: {
      type: String,
      default: '',
    },
    generatedCss: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Session = mongoose.model('Session', SessionSchema);

export default Session;