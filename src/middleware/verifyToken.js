import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export const verifyToken = (req, res, next) => {
    console.log('Checking')
    const token = req.cookies.token;
    if (!token) {
        return next()
    } 
    const payload = jwt.verify(token, process.env.JWT_KEY);
    
    
}