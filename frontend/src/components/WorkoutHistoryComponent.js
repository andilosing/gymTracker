import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkoutsHistory } from '../redux/actions/workoutActions';
import { fetchExercisesWorkoutHistory, deleteExerciseFromWorkout } from '../redux/actions/exerciseActions';
import { fetchSetsHistory, deleteSet } from '../redux/actions/setsActions';

const WorkoutHistoryComponent = () => {
  const dispatch = useDispatch();
  const workouts = useSelector(state => state.workouts.workoutHistory);
  const exercises = useSelector(state => state.exercises.workoutExercisesHistory);
  
  const sets = useSelector((state) => state.sets.setsWorkoutHistory)
  const { error } = useSelector(state => state.workouts);

  console.log('Current history exercises:', exercises);
  console.log("wokrouts in hisory: ", workouts)
  console.log("sets in workout history: " , sets)

  useEffect(() => {
    if (!workouts || !workouts.length) {
      dispatch(fetchWorkoutsHistory());
    }
  }, []); //dispatch, workouts
  
  useEffect(() => {
    if (!exercises || !exercises.length) {
      dispatch(fetchExercisesWorkoutHistory());
    }
  }, []); //dispatch, exercises
  
  useEffect(() => {
    if (!sets || !sets.length) {
      dispatch(fetchSetsHistory());
    }
  }, []); //dispatch, sets

  const handleDeleteSet = (workoutId, exerciseId, setId) => {
    dispatch(deleteSet(workoutId, exerciseId, setId));
  };

  const handleDeleteExercise = (workoutId, exerciseId) => {
    dispatch(deleteExerciseFromWorkout(workoutId, exerciseId));
  };

                    

  return (
    <div className="bg-gray-800 min-h-screen px-4 py-6 text-white">
      {error && <p className="error bg-red-500 p-4 rounded-md">{error.status} {error.message}</p>}
      
      <ul className="space-y-4">
        {workouts.map(workout => (
          <li key={workout.id} className="bg-gray-700 shadow-md rounded-md p-4">
            <details>
              <summary className="flex justify-between items-center font-medium text-xl mb-2">
                {workout.id} <span>{workout.duration}</span>
              </summary>
  
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Übungen</h2>
  
                <ul className="space-y-2">
                  {exercises
                    .filter(exercise => exercise.workout_id === workout.id)
                    .map((exercise) => (
                      <li key={exercise.workout_exercise_id} className="flex flex-col space-y-2">
                        <span>{exercise.exercise_name}</span>
                        <div className="flex space-x-4 text-sm">
                          <span>global exercise {exercise.global_exercise_id}</span>
                          <span>user exercise {exercise.user_exercise_id}</span>
                        </div>
  
                        {/* Button anzeigen, wenn es tatsächlich eine Übung gibt */}
                        {exercise.workout_exercise_id && (
                          <button 
                            onClick={() => handleDeleteExercise(workout.id, exercise.workout_exercise_id)}
                            className="btn btn-error btn-sm"
                          >
                            Übung Löschen
                          </button>
                        )}
  
                        <div className="mt-4">
                          <h3 className="text-md font-medium">Sets</h3>
                          <ul className="space-y-2 mt-2">
                            {sets
                                .filter(set => set.workout_exercise_id === exercise.workout_exercise_id)
                                .map((set) => (
                                  <li key={set.set_id} className="flex justify-between items-center text-sm">
                                    <span>Id: {set.set_number} Reps: {set.reps}, Gewicht: {set.weight}</span>
                                    <button 
                                      onClick={() => handleDeleteSet(workout.id, exercise.workout_exercise_id, set.set_id)}
                                      className="btn btn-error btn-sm"
                                    >
                                      Set Löschen
                                    </button>
                                  </li>
                              ))}
                          </ul>
                        </div>
                      </li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutHistoryComponent;
