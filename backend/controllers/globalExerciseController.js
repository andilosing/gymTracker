const globalExercisesService = require('../services/globalExerciseService');

const addExercise = async (req, res) => {
    try {
        const name = req.body.name
        const exercise = await globalExercisesService.addExercise(name);
        res.status(201).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const listExercises = async (req, res) => {
    try {
        const exercises = await globalExercisesService.listExercises();
        res.status(200).json(exercises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const editExercise = async (req, res) => {
    try {
        const name = req.body.name
        const id = req.params.id
        const exercise = await globalExercisesService.editExercise(id, name);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExercise = async (req, res) => {
    try {
        await globalExercisesService.deleteExercise(req.params.id);
        res.status(200).json({ message: 'Exercise deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addExercise,
    listExercises,
    editExercise,
    deleteExercise
};
