const globalExercisesModel = require('../models/globalExercisesModel');
const { InternalServerError } = require('../errors//customError');  

const addExercise = async (name) => {
    try {
        const exercise = await globalExercisesModel.createExercise(name);
        return exercise;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error adding global exercise");
        }
    }
};

const listExercises = async () => {
    try {
        const exercises = await globalExercisesModel.findAllExercises();
        return exercises;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error listing global exercises");
        }
    }
};


const editExercise = async (id, name) => {
    try {
        const exercise = await globalExercisesModel.updateExercise(id, name);
        return exercise;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error editing global exercise");
        }
    }
};


const deleteExercise = async (id) => {
    try {
        await globalExercisesModel.deleteExercise(id);
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error deleting global exercise");
        }
    }
};


module.exports = {
    addExercise,
    listExercises,
    editExercise,
    deleteExercise
};
