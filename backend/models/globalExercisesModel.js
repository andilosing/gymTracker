const db = require('../db');

const createExercise = async (name) => {
    try {
        
        const query = `INSERT INTO global_exercises (name) VALUES ($1) RETURNING *`;
        const values = [name];

        const { rows } = await db.query(query, values);
        return rows[0];
    } catch (error) {
        throw new Error("Database error: Cannot add exercise");
    }
};

const findAllExercises = async () => {
    try {
        const query = `SELECT * FROM global_exercises`;

        const { rows } = await db.query(query);
        return rows;
    } catch (error) {
        throw new Error("Database error: Cannot list exercises");
    }
};

const updateExercise = async (id, name) => {
    try {
        const query = `UPDATE global_exercises SET name = $1 WHERE id = $2 RETURNING *`;
        const values = [name, id];

        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new Error('No exercise found with the given ID.');
        return rows[0];
    } catch (error) {
        throw new Error("Database error: Cannot edit exercise");
    }
};

const deleteExercise = async (id) => {
    try {
        const query = `DELETE FROM global_exercises WHERE id = $1 RETURNING *`;
        const values = [id];

        const { rows } = await db.query(query, values);
        
        if (!rows[0]) throw new Error('No exercise found with the given ID.');
        return rows[0];
    } catch (error) {
        throw new Error("Database error: Cannot delete exercise");
    }
};

module.exports = {
    createExercise,
    findAllExercises,
    updateExercise,
    deleteExercise
};
