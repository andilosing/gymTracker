const db = require('../db');
const { InternalServerError, NotFoundError } = require('../errors/customError');

const addSetToExercise = async (exerciseId, reps, weight, set_number) => {
    try {
        const query = `INSERT INTO workout_sets (workout_exercise_id, reps, weight, set_number) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [exerciseId, reps, weight, set_number];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No set to exercise added.');
        return rows[0];
    } catch (error) {
        console.log(error)
        if (!error.customError) {
            console.error(error)
            throw new InternalServerError("Database error: Cannot add set to exercise");
        }
        throw error;
    }
};

const getAllSetsFromExercise = async (exerciseId) => {
    try {
        
        const query = `SELECT * FROM workout_sets WHERE workout_exercise_id = $1`;
        const values = [exerciseId];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        console.error(error)
        throw new InternalServerError("Database error: Cannot get Exercise sets");
    }
};

const updateSetFromExercise = async (id, exerciseId, reps, weight, set_number) => {
    try {
        
        const query = `UPDATE workout_sets SET reps = $1, weight = $2, set_number = $3 WHERE id = $4 AND workout_exercise_id = $5 RETURNING *`;
        const values = [reps, weight, set_number, id, exerciseId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No set found with the given ID.');
        return rows[0];
    } catch (error) {
        console.log(error)
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot edit set");
        }
        throw error;
    }
};

const deleteSetFromExercise = async (id, exerciseId) => {
    try {
        const query = `DELETE FROM workout_sets WHERE id = $1 AND workout_exercise_id = $2 RETURNING *`;
        const values = [id, exerciseId]
        const { rows } = await db.query(query, values);
        
        if (!rows[0]) throw new NotFoundError('No set in in exercise found with the given ID.');
        return rows[0].id;
        
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot delete set from exercise");
        }
        throw error;
    }
};

const getAllSetsFromUser = async (userId) => {
    try {
        const query = `
        SELECT 
            workout_sets.id AS set_id,
            workout_sets.reps,
            workout_sets.weight,
            workout_sets.set_number,
            workout_sets.workout_exercise_id
        FROM 
            users
        JOIN
            workouts ON users.id = workouts.user_id
        JOIN
            workout_exercises ON workouts.id = workout_exercises.workout_id
        JOIN
            workout_sets ON workout_exercises.id = workout_sets.workout_exercise_id
        WHERE
            users.id = $1;
        `;
        const result = await db.query(query, [userId]);
        return result.rows;
    } catch (error) {
        console.error('Fehler beim Abrufen der Sets für den Benutzer:', error);
        throw error;
    }
};


module.exports = {
    addSetToExercise,
    getAllSetsFromExercise,
    deleteSetFromExercise,
    updateSetFromExercise,
    getAllSetsFromUser
};
