const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const userExercisesService = require('../services/userExerciseService');
const { handleErrors } = require("../errors/errorHandler");

const addExercise = async (req, res) => {
    try {
        const name = req.body.name;
        const userId = req.user.id

        if (!name || !userId) {
            throw new BadRequestError("both name and userId is required.");
        }

        const exercise = await userExercisesService.addExercise(name, userId);
        res.status(201).json(exercise);

    } catch (error) {
        handleErrors(error, res);
    }
};


const listExercises = async (req, res) => {
    try {
        const userId = req.user.id

        if(!userId){
            throw new BadRequestError("UserId is required")
        }


        const exercises = await userExercisesService.listExercises(userId);
        res.status(200).json(exercises);
    } catch (error) {
        handleErrors(error, res);
    }
};


const editExercise = async (req, res) => {
    try {
        const name = req.body.name;
        const exerciseId = req.params.id;
        const userId = req.user.id

        

        if (!name || !exerciseId || !userId) {
            throw new BadRequestError("All id, userId and name fields are required.");
        }

        const exercise = await userExercisesService.editExercise(exerciseId, name, userId);
        res.status(200).json(exercise);
    } catch (error) {
        handleErrors(error, res);
    }
};

const deleteExercise = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id


        if (!id || !userId) {
            throw new BadRequestError("Both Id and userId field is required.");
        }

        await userExercisesService.deleteExercise(id, userId);
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        handleErrors(error, res);
    }
};


module.exports = {
    addExercise,
    listExercises,
    editExercise,
    deleteExercise
};
