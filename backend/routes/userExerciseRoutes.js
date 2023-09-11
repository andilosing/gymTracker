const express = require('express')
const router = express.Router()
const UserExerciseController = require('../controllers/userExerciseController')

router.post("/add", UserExerciseController.addExercise)
router.delete("/delete/:id", UserExerciseController.deleteExercise)
router.put("/edit/:id", UserExerciseController.editExercise)
router.get("/list", UserExerciseController.listExercises)

module.exports = router;