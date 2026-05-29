//Dependencies
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import path from 'path';

export const verifyToken = (req, res, next) => {
    try {
        console.log('Verifying token');
    
        let token = req.cookies.token;
    
        if (!token) {
            throw new Error('No token found')
        } 

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const newPayload = {
            id: payload.id,
            username: payload.username
        };

        const options = {
            expiresIn: '7d'
        }

        token = jwt.sign(newPayload, process.env.JWT_SECRET, options);
        
        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        req.payload = newPayload;
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