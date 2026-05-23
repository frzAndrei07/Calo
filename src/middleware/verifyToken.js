import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import path from 'path';

export const verifyToken = (req, res, next) => {
    console.log('Verifying token')
    const token = req.cookies.token;
    if (!token) {
        console.log('Redirecting to login')
        return res.redirect('/auth/login');
    } 
    const payload = jwt.verify(token, process.env.JWT_KEY);
    console.log(payload);
    next();
}