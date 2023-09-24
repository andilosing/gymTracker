const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const workoutSetService = require('../services/workoutSetService');
const { handleErrors } = require("../errors/errorHandler");

const addSetToExercise = async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId
        const { reps, weight, set_number } = req.body


        

        if (!exerciseId ) {
            throw new BadRequestError("Exercise id is required");
        }

        if(!reps || !set_number){
            throw new BadRequestError("Reps and set number are required")
        }

        const set = await workoutSetService.addSetToExercise(exerciseId, reps, weight, set_number)
        res.status(201).json(set);

    } catch (error) {
        handleErrors(error, res);
    }
};


const getAllSetsFromExercise = async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId

        if(!exerciseId ) {
            throw new BadRequestError("exercise id is required")
        }

        const sets = await workoutSetService.getAllSetsFromExercise(exerciseId);
        res.status(200).json(sets);
    } catch (error) {
        handleErrors(error, res);
    }
};

const updateSetFromExercise = async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId;
        const id = req.params.id;


        const { reps, weight, set_number } = req.body

        if (!exerciseId || !id) {
            throw new BadRequestError("Both id and exercise id fields are required.");
        }

        if(!reps || !set_number){
            throw new BadRequestError("Reps and set number are required")
        }

        const set = await workoutSetService.updateSetFromExercise(id, exerciseId, reps, weight, set_number);
        res.status(200).json(set);
    } catch (error) {
        handleErrors(error, res);
    }
};



const deleteSetFromExercise = async (req, res) => {
    try {
        const exerciseId = req.params.exerciseId
        const id = req.params.id

        

        if (!id || !exerciseId) {
            throw new BadRequestError("id and exercise id are required.");
        }

         

        const deltedSetId = await workoutSetService.deleteSetFromExercise(id, exerciseId);
        res.status(200).json(deltedSetId);
    } catch (error) {
        handleErrors(error, res);
    }
};

const getAllSetsFromUser = async (req, res) => {
    try {
        const userId = req.user.id
        

        if(!userId ) {
            throw new BadRequestError("user id is required")
        }

        const sets = await workoutSetService.getAllSetsFromUser(userId);
        res.status(200).json(sets);
    } catch (error) {
        handleErrors(error, res);
    }
};


module.exports = {
    addSetToExercise,
    getAllSetsFromExercise,
    deleteSetFromExercise,
    updateSetFromExercise,
    getAllSetsFromUser
};
