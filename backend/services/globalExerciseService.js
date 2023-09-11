const globalExercisesModel = require('../models/globalExercisesModel');

const addExercise = async (name) => {
    try {
        const exercise = await globalExercisesModel.createExercise(name);
        return exercise;
    } catch (error) {
        throw new Error("Error adding global exercise");
    }
};

const listExercises = async () => {
    try {
        const exercises = await globalExercisesModel.findAllExercises();
        return exercises;
    } catch (error) {
        throw new Error("Error listing global exercises");
    }
};

const editExercise = async (id, name) => {
    try {
        const exercise = await globalExercisesModel.updateExercise(id, name);
        return exercise;
    } catch (error) {
        throw new Error("Error editing global exercise");
    }
};

const deleteExercise = async (id) => {
    try {
        await globalExercisesModel.deleteExercise(id);
    } catch (error) {
        throw new Error("Error deleting global exercise");
    }
};

module.exports = {
    addExercise,
    listExercises,
    editExercise,
    deleteExercise
};
