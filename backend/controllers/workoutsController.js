const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const workoutsService = require('../services/workoutsService');
const { handleErrors } = require("../errors/errorHandler");

const addWorkout = async (req, res) => {
    try {
        const userId = req.user.id

        if (!userId) {
            throw new BadRequestError("UserId is required.");
        }

        const workout = await workoutsService.addWorkout(userId);
        res.status(201).json(workout);

    } catch (error) {
        handleErrors(error, res);
    }
};


const getWorkout = async (req, res) => {
    try {

        const id = req.params.id

        if(!id) {
            throw new BadRequestError("Id is required")
        }

        const workout = await workoutsService.getWorkout(id);
        res.status(200).json(workout);
    } catch (error) {
        handleErrors(error, res);
    }
};

const getAllWorkouts = async (req, res) => {
    try {

        const userId = req.user.id

        if(!userId) {
            throw new BadRequestError("User Id is required")
        }

        const workouts = await workoutsService.getAllWorkouts(userId);
        res.status(200).json(workouts);
    } catch (error) {
        handleErrors(error, res);
    }
};


const endWorkout = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id


        if (!id || !userId) {
            throw new BadRequestError("Both workout id and user id are required.");
        }

        const workout = await workoutsService.endWorkout(id, userId);
        res.status(200).json(workout);
    } catch (error) {
        handleErrors(error, res);
    }
};

const deleteWorkout = async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user.id

        if (!id || !userId) {
            throw new BadRequestError("Both Id and user id are required.");
        }

        await workoutsService.deleteWorkout(id, userId);
        res.status(200).json({ message: 'Workout deleted successfully' });
    } catch (error) {
        handleErrors(error, res);
    }
};

const getWorkoutInfo = async (req, res) => {
    try {

        const workoutId = req.params.id
        const userId = req.user.id

        if(!workoutId || !userId) {
            throw new BadRequestError("Workout id and user id are required")
        }

        const workout = await workoutsService.getWorkoutInfo(workoutId, userId);
        res.status(200).json(workout);
    } catch (error) {
        handleErrors(error, res);
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
