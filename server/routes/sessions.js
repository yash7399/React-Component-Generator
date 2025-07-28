// server/routes/sessions.js
import express from 'express';
import { getSessions, saveSession } from '../controllers/sessionController.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// Both routes are protected and require a user to be logged in.
router.get('/', auth, getSessions);
router.post('/', auth, saveSession);

export default router;