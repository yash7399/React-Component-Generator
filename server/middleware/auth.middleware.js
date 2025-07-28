// /middleware/auth.js
import jwt from 'jsonwebtoken';

const auth =async (req, res, next) => {
    try {
        // 1. Get token from header
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ msg: 'No authentication token, authorization denied.' });
        }
        
        const token = authHeader.split(' ')[1];
        // 2. Verify token
        console.log(token)
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            console.log("Token verification failed");
        }
        // 3. Add user from payload to the request object
        req.user = decoded.user;
        
        next(); // Pass control to the next middleware or route handler
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default auth;
