const workoutsModel = require('../models/workoutsModel');
const { InternalServerError } = require('../errors/customError');  

const addWorkout = async (userId) => {
    try {
        const workout = await workoutsModel.createWorkout(userId);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error creating workout");
        }
    }
};

const getWorkout = async (id) => {
    try {
        const workout = await workoutsModel.getWorkout(id);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting workout");
        }
    }
};

const getAllWorkouts = async (userId) => {
    try {
        const workout = await workoutsModel.getAllWorkouts(userId);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting all workouts");
        }
    }
};


const endWorkout = async (id, userId) => {
    try {
        const workout = await workoutsModel.endWorkout(id, userId);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error ending Workout");
        }
    }
};


const deleteWorkout = async (id, userId) => {
    try {
        await workoutsModel.deleteWorkout(id, userId);
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error deleting workout");
        }
    }
};

const getWorkoutInfo = async (workoutId, userId) => {
    try {
        const workout = await workoutsModel.getWorkoutInfo(workoutId, userId);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting workout info");
        }
    }
}


module.exports = {
    addWorkout,
    getWorkout,
    endWorkout,
    deleteWorkout,
    getWorkoutInfo,
    getAllWorkouts
};

