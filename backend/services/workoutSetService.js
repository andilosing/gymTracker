const workoutSetMoel = require('../models/workoutSetModel');
const { InternalServerError } = require('../errors/customError');  

const addSetToExercise = async (exerciseId, reps, weight, set_number) => {
    try {
        const set = await workoutSetMoel.addSetToExercise(exerciseId, reps, weight, set_number);
        return set;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error adding set to exercise");
        }
    }
};

const getAllSetsFromExercise = async (exerciseId) => {
    try {
        const sets = await workoutSetMoel.getAllSetsFromExercise(exerciseId);
        return sets;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting exercise sets");
        }
    }
};

const updateSetFromExercise = async (id, exerciseId, reps, weight, set_number) => {
    try {
        const set = await workoutSetMoel.updateSetFromExercise(id, exerciseId, reps, weight, set_number);
        return set;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error updating exercise set");
        }
    }
};





const deleteSetFromExercise = async (id, exerciseId) => {
    try {
       const deletedSetId =  await workoutSetMoel.deleteSetFromExercise(id, exerciseId);
       return deletedSetId
    } catch (error) {
        console.error(error)
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error deleting set from exercise");
        }
    }
};

const getAllSetsFromUser = async (userId) => {
    try {
        const sets = await workoutSetMoel.getAllSetsFromUser(userId);
        return sets;
    } catch (error) {
        if (error.customError) {
            throw error;
        } else {
            throw new InternalServerError("Error getting exercise sets");
        }
    }
};


module.exports = {
    addSetToExercise,
    getAllSetsFromExercise,
    deleteSetFromExercise,
    updateSetFromExercise,
    getAllSetsFromUser

};