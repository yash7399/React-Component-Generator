// server/controllers/sessionController.js
import Session from '../models/Session.js';

// Get all sessions for the logged-in user
export const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ msg: 'Server error fetching sessions.' });
  }
};

// Save a new session
export const saveSession = async (req, res) => {
  const { name, lastPrompt, generatedJsx, generatedCss } = req.body;

  try {
    const newSession = new Session({
      user: req.user.id,
      name,
      lastPrompt,
      generatedJsx,
      generatedCss,
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ msg: 'Server error saving session.' });
  }
};