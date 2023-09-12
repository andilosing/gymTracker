const workoutExerciseModel = require('../models/workoutExerciseModel');
const { InternalServerError } = require('../errors/customError');  

const addExerciseToWorkout = async (workoutId, globalExerciseId, userExerciseId) => {
    try {
        const workout = await workoutExerciseModel.addExerciseToWorkout(workoutId, globalExerciseId, userExerciseId);
        return workout;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error adding exercise to workout");
        }
    }
};

const getAllExercisesFromWorkout = async (workoutId) => {
    try {
        const exercises = await workoutExerciseModel.getAllExercisesFromWorkout(workoutId);
        return exercises;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting workout exercises");
        }
    }
};





const deleteExerciseFromWorkout = async (id, workoutId) => {
    try {
        await workoutExerciseModel.deleteExerciseFromWorkout(id, workoutId);
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error deleting exercise from workout");
        }
    }
};


module.exports = {
    addExerciseToWorkout,
    getAllExercisesFromWorkout,
    deleteExerciseFromWorkout
};