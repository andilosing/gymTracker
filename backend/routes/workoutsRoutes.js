const express = require('express')
const router = express.Router()
const workoutsController = require('../controllers/workoutsController')

router.post("/", workoutsController.addWorkout)
router.delete("/:id", workoutsController.deleteWorkout)
router.put("/:id", workoutsController.endWorkout)
router.get("/:id/info", workoutsController.getWorkoutInfo)

router.get("/:id", workoutsController.getWorkout)

module.exports = router;