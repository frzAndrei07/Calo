//Dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import path from 'path';

export const verifyToken = (req, res, next) => {
    try {
        console.log('Verifying token');
    
        const token = req.cookies.token;
    
        if (!token) {
            throw new Error('No token found')
        } 
    
        const payload = jwt.verify(token, process.env.JWT_KEY);
        console.log(payload);
        next();
    } catch (err) {
        console.error(err.message)
        if (req.originalUrl.startsWith('/api/')) {
            return res.status(401).json({ error: 'No autorizado. Token inválido.' });
        } else {
            return res.redirect('/auth');
        }
    }
}