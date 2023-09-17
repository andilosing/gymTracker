const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const globalExercisesService = require('../services/globalExerciseService');
const { handleErrors } = require("../errors/errorHandler");

const addExercise = async (req, res) => {
    try {
        const name = req.body.name;

        if (!name) {
            throw new BadRequestError("Name field is required.");
        }

        const exercise = await globalExercisesService.addExercise(name);
        res.status(201).json(exercise);

    } catch (error) {
        handleErrors(error, res);
    }
};


const listExercises = async (req, res) => {
    try {
        const exercises = await globalExercisesService.listExercises();
        res.status(200).json(exercises);
    } catch (error) {
        handleErrors(error, res);
    }
};


const editExercise = async (req, res) => {
    try {
        const name = req.body.name;
        const id = req.params.id;

        if (!name || !id) {
            throw new BadRequestError("Both id and name fields are required.");
        }

        const exercise = await globalExercisesService.editExercise(id, name);
        res.status(200).json(exercise);
    } catch (error) {
        handleErrors(error, res);
    }
};

const deleteExercise = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw new BadRequestError("Id field is required.");
        }

        await globalExercisesService.deleteExercise(id);
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
