//Dependencies
import jwt from 'jsonwebtoken';
import pool from '../../config/db.js';
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const suPost = async (req, res) => {
    try {
        const {username, pwd} = (req.body);
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        const qry = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        const qryValues = [username, hashedPwd];

        const qryRes = await pool.query(qry, qryValues);

        return res.status(201).json();

    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') {
            return res.status(400).json({err: 'Username already taken'});
        }
        return res.status(500).json({err: 'Server error'});
    }
}

export const siPost = async (req, res) => {
    try {
        const {username, pwd} = (req.body);

        const qry = 'SELECT id_user, password FROM users WHERE username = $1';
        const qryValues = [username];
        const qryRes = await pool.query(qry, qryValues);

        if (qryRes.rowCount == 0) return res.status(404).json({});

        const valid = await bcrypt.compare(pwd, qryRes.rows[0].password);

        if (valid) {
            const payload = {
                id: qryRes.rows[0].id_user,
                username: username
            }

            const options = {
                expiresIn: '7d'
            }

            const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
            
            return res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200).json({});
        } else {
            return res.status(401).json({});
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({err: 'Server error'});
    }
}