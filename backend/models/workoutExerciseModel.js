const db = require('../db');
const { InternalServerError, NotFoundError } = require('../errors/customError');

const addExerciseToWorkout = async (workoutId, globalExerciseId, userExerciseId) => {
    try {
        const query = `INSERT INTO workout_exercises (workout_id, global_exercise_id, user_exercise_id) VALUES ($1, $2, $3) RETURNING *`;
        const values = [workoutId, globalExerciseId, userExerciseId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No exercise to workout added .');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot add exercise to workout");
        }
        throw error;
    }
};

const getAllExercisesFromWorkout = async (workoutId) => {
    try {
        
        const query = `SELECT * FROM workout_exercises WHERE workout_id = $1`;
        const values = [workoutId];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        throw new InternalServerError("Database error: Cannot get Workout Exercises");
    }
};


const deleteExerciseFromWorkout = async (id, workoutId) => {
    try {
        const query = `DELETE FROM workout_exercises WHERE id = $1 AND workout_id = $2 RETURNING *`;
        const values = [id, workoutId]
        const { rows } = await db.query(query, values);
        
        if (!rows[0]) throw new NotFoundError('No exercise in workout found with the given ID.');
        return rows[0].id;
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot delete exercise from workout");
        }
        throw error;
    }
};

const getAllExercisesFromWorkoutFromUser = async (userId) => {
    try {
        const query = `
            SELECT we.id AS workout_exercise_id, 
                   w.id AS workout_id,
                   ge.id AS global_exercise_id,
                   ce.id AS user_exercise_id,
                   COALESCE(ge.name, ce.name) AS exercise_name
            FROM workouts w
            LEFT JOIN workout_exercises we ON w.id = we.workout_id
            LEFT JOIN global_exercises ge ON we.global_exercise_id = ge.id
            LEFT JOIN custom_exercises ce ON we.user_exercise_id = ce.id
            WHERE w.user_id = $1;
        `;
        const values = [userId];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        console.error(error)
        throw new InternalServerError("Database error: Cannot get user's exercises");
    }
};




module.exports = {
    addExerciseToWorkout,
    getAllExercisesFromWorkout,
    deleteExerciseFromWorkout,
    getAllExercisesFromWorkoutFromUser
};
