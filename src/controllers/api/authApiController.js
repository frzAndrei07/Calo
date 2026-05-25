//Dependencies
import pool from '../../config/db.js';
import bcrypt from 'bcrypt';

export const suPost = async (req, res) => {
    try {
        const {username, pwd} = (req.body);
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        const qry = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        const qryValues = [username, hashedPwd];

        const qryRes = await pool.query(qry, qryValues);
        
        return res.status(201).json();

    } catch (err) {
        console.error(err.message)
        if (err.code === '23505') {
            return res.status(400).json({err: 'Username already taken'});
        }
        return res.status(500).json({err: 'Server error'})
    }
}