const db = require('../db');
const { InternalServerError, NotFoundError } = require('../errors/customError');

const createExercise = async (name, userId) => {
    try {
        
        const query = `INSERT INTO user_exercises (name, user_id) VALUES ($1, $2) RETURNING *`;
        const values = [name, userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No exercise added.');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot add exercise");
        }
        throw error;
    }
};

const findAllExercises = async (userId) => {
    try {
       
        const query = `SELECT * FROM user_exercises WHERE user_id = $1`;
        const values = [userId];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        throw new InternalServerError("Database error: Cannot list exercises");
    }
};

const updateExercise = async (id, name, userId) => {
    try {
        const query = `UPDATE user_exercises SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *`;
        const values = [name, id, userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No exercise found with the given ID.');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot edit exercise");
        }
        throw error;
    }
};

const deleteExercise = async (id, userId) => {
    try {
        const query = `DELETE FROM user_exercises WHERE id = $1 AND user_id = $2 RETURNING *`;
        const values = [id, userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No exercise found with the given ID.');
        return rows[0].id;
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot delete exercise");
        }
        throw error;
    }
};

module.exports = {
    createExercise,
    findAllExercises,
    updateExercise,
    deleteExercise
};
