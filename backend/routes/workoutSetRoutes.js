const express = require('express')
const router = express.Router({mergeParams: true})
const workoutSetController = require('../controllers/workoutSetController')

router.post("/", workoutSetController.addSetToExercise)
router.delete("/:id", workoutSetController.deleteSetFromExercise)
router.get("/", workoutSetController.getAllSetsFromExercise)
router.put("/:id", workoutSetController.updateSetFromExercise)

module.exports = router;