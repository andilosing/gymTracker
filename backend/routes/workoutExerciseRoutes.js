const express = require('express')
const router = express.Router({mergeParams: true})
const workoutsExerciseController = require('../controllers/workoutExerciseController')

router.post("/", workoutsExerciseController.addExerciseToWorkout)
router.delete("/:id", workoutsExerciseController.deleteExerciseFromWorkout)
router.get("/", workoutsExerciseController.getAllExercisesFromWorkout)
router.get("/all", workoutsExerciseController.getAllExercisesFromWorkoutFromUser)

module.exports = router;