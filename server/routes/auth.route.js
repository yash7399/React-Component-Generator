// /routes/auth.js
import express from 'express';
import {registerUser, loginUser } from '../controllers/auth.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

// ## POST /api/auth/register
// ## Registers a new user
router.post('/register', registerUser);
router.post("/login",loginUser)
router.get('/me', auth, (req, res) => {
    // Thanks to the 'auth' middleware, we have access to req.user
    res.json({ msg: 'This is a protected route', user: req.user });
});

export default  router;