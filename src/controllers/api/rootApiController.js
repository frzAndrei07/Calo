import { stat } from "fs";
import pool from "../../config/db.js";

export const getIngredients = async (req, res) => {
    try {
        const id = req.payload.id;
        console.log(`getting ingredients for ${id}`);


        const qry = `SELECT id_ingredient, name, state, calories, protein, carbs, fats FROM ingredients WHERE id_user = $1`;
        const qryValues = [id];
        const qryRes = await pool.query(qry, qryValues);

        const rows = qryRes.rows;
        
        return res.status(200).json({ingredients: rows})
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({});
    }
}

export const postIngredients = async (req, res) => {
    try {
        const id = req.payload.id
        const {name, state, cals, protein, carbs, fats} = req.body;
    
        const qry = 'INSERT INTO ingredients (id_user, name, state, calories, protein, carbs, fats) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        const qryValues = [id, name, state, cals, protein, carbs, fats];

        const qryRes = await pool.query(qry, qryValues);

        console.log(qryRes)
    
        return res.status(201).json({});

    }  catch (err) {
        console.error(err.message);
        return res.status(500).json({});
    }
}