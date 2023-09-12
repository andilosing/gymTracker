const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const workoutExerciseService = require('../services/workoutExerciseService');
const { handleErrors } = require("../errors/errorHandler");

const addExerciseToWorkout = async (req, res) => {
    try {
        const workoutId = req.params.workoutId
        const { globalExerciseId, customExerciseId} = req.body

        if (!workoutId || (!globalExerciseId && !customExerciseId)) {
            throw new BadRequestError("Workout id and gloablExercise id or userExercise id is required.");
        }

        if(globalExerciseId && customExerciseId) {
            throw new BadRequestError("Only GlobalExerciseId or UserExerciseId at one time.")
        }

        const exercise = await workoutExerciseService.addExerciseToWorkout(workoutId, globalExerciseId, customExerciseId)
        res.status(201).json(exercise);

    } catch (error) {
        handleErrors(error, res);
    }
};


const getAllExercisesFromWorkout = async (req, res) => {
    try {
        const workoutId = req.params.workoutId

        if(!workoutId ) {
            throw new BadRequestError("workout id is required")
        }

        const exercises = await workoutExerciseService.getAllExercisesFromWorkout(workoutId);
        res.status(200).json(exercises);
    } catch (error) {
        handleErrors(error, res);
    }
};




const deleteExerciseFromWorkout = async (req, res) => {
    try {
        const workoutId = req.params.workoutId
        const id = req.params.id
        const userId = req.user.id

        if (!id || !userId || !workoutId) {
            throw new BadRequestError("workout id, exercise Id and user id are required.");
        }

        await workoutExerciseService.deleteExerciseFromWorkout(id, workoutId);
        res.status(200).json({ message: 'Exercise from Workout deleted successfully' });
    } catch (error) {
        handleErrors(error, res);
    }
};


module.exports = {
    addExerciseToWorkout,
    getAllExercisesFromWorkout,
    deleteExerciseFromWorkout
};
