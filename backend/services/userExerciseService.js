const userExercisesModel = require('../models/userExercisesModel');
const { InternalServerError } = require('../errors//customError');  

const addExercise = async (name, userId) => {
    try {
        const exercise = await userExercisesModel.createExercise(name, userId);
        return exercise;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error adding user exercise");
        }
    }
};

const listExercises = async (userId) => {
    try {
        const exercises = await userExercisesModel.findAllExercises(userId);
        return exercises;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error listing user exercises");
        }
    }
};


const editExercise = async (id, name, userId) => {
    try {
        const exercise = await userExercisesModel.updateExercise(id, name, userId);
        return exercise;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error editing user exercise");
        }
    }
};


const deleteExercise = async (id, userId) => {
    try {
        await userExercisesModel.deleteExercise(id, userId);
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error deleting user exercise");
        }
    }
};


module.exports = {
    addExercise,
    listExercises,
    editExercise,
    deleteExercise
};