const db = require('../db');
const { InternalServerError, NotFoundError } = require('../errors/customError');

const createWorkout = async (userId) => {
    try {
        
        const query = `INSERT INTO workouts (user_id) VALUES ($1) RETURNING *`;
        const values = [userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No workout created.');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot create workout");
        }
        throw error;
    }
};

const getWorkout = async (id) => {
    try {
       
        const query = `SELECT * FROM workouts WHERE id = $1`;
        const values = [id];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        throw new InternalServerError("Database error: Cannot get Workout");
    }
};

const endWorkout = async (id, userId) => {
    try {
        const query = `UPDATE workouts 
                        SET end_time = NOW(), duration = EXTRACT(EPOCH FROM (NOW() - start_time)) 
                        WHERE id = $1 AND user_id = $2 RETURNING *`
        const values = [id, userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No workout found with the given ID.');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot end Workout");
        }
        throw error;
    }
};

const deleteWorkout = async (id, userId) => {
    try {
        const query = `DELETE FROM workouts WHERE id = $1 AND user_id = $2 RETURNING *`;
        const values = [id, userId];
        const { rows } = await db.query(query, values);
        if (!rows[0]) throw new NotFoundError('No workout found with the given ID.');
        return rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error: Cannot delete workout");
        }
        throw error;
    }
};

const getWorkoutInfo = async (workoutId, userId) => {
    try {
       
        const query = `SELECT 
        w.id AS workout_id,
        we.id AS workout_exercise_id,
        ge.name AS global_exercise_name,
        ce.name AS custom_exercise_name,
        ws.id AS set_id,
        ws.reps,
        ws.weight,
        ws.set_number
    FROM workouts w
    LEFT JOIN workout_exercises we ON w.id = we.workout_id
    LEFT JOIN global_exercises ge ON we.global_exercise_id = ge.id
    LEFT JOIN custom_exercises ce ON we.user_exercise_id = ce.id
    LEFT JOIN workout_sets ws ON we.id = ws.workout_exercise_id
    WHERE w.id = $1 AND w.user_id = $2
    ORDER BY we.id, ws.set_number;`;
        const values = [workoutId, userId];
        const { rows } = await db.query(query, values);
        return rows;
    } catch (error) {
        console.log(error)
        throw new InternalServerError("Database error: Cannot get Workout Infos");
    }
}

module.exports = {
    createWorkout,
    getWorkout,
    endWorkout,
    deleteWorkout,
    getWorkoutInfo
};


