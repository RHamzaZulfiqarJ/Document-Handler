import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.js';

export const verifyToken = async (req, res, next) => {
    try {
        const token = await req.headers.authtoken;
        if (!token) return next(createError(401, 'Token is required'))

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedData;

        next();
    } catch (err) {
        next(createError(401, 'Invalid token'));
    }
};

export const verifyAdmin = (req, res, next) => {
    try {
        verifyToken(req, res, () => {
            if (req.user.role === 'admin') {
                next();
            } else {
                next(createError(403, 'Access denied'))
            }
        });
    } catch (err) {
        next(createError(500, err.message));
    }
};