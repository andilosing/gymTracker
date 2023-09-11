const express = require('express')
const router = express.Router()
const GlobalExerciseController = require('../controllers/globalExerciseController')

router.post("/add", GlobalExerciseController.addExercise)
router.delete("/delete/:id", GlobalExerciseController.deleteExercise)
router.put("/edit/:id", GlobalExerciseController.editExercise)
router.get("/list", GlobalExerciseController.listExercises)

module.exports = router;


