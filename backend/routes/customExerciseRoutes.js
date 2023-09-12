const express = require('express')
const router = express.Router()
const customExerciseController = require('../controllers/customExerciseController')

router.post("/add", customExerciseController.addExercise)
router.delete("/delete/:id", customExerciseController.deleteExercise)
router.put("/edit/:id", customExerciseController.editExercise)
router.get("/list", customExerciseController.listExercises)

module.exports = router;