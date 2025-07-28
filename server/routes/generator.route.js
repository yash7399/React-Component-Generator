// server/routes/generator.js
import express from 'express';
import { generateComponent } from '../controllers/generatorController.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// POST /api/generate
// This route is protected by the 'auth' middleware.
router.post('/', auth, generateComponent);

export default router;