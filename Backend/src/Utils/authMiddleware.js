import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticate = (req, res, next) => {
  const bearerToken = req.header('Authorization');
    // Check if the Authorization header is present
    if (!bearerToken) {
        return res.status(401).json({ message: 'Authorization header missing. Please Authenticate.' });
    }
    // Check if the header format is correct
    if (!bearerToken.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid token format. Use format - Bearer <token>.' });
    }
    // Extract the token from the header
    const token = bearerToken.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Please Authenticate. Access denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user object to the request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token. Access denied.' });
    }
};

export default authenticate;