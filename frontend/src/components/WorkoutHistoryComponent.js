import React, { useEffect, useState } from 'react';
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

  const [openedWorkouts, setOpenedWorkouts] = useState([]);

  const toggleWorkoutDetails = (workoutId) => {
    if (openedWorkouts.includes(workoutId)) {
      setOpenedWorkouts((prev) => prev.filter(id => id !== workoutId));
    } else {
      setOpenedWorkouts((prev) => [...prev, workoutId]);
    }
  };

  const [editingWorkoutId, setEditingWorkoutId] = useState(null);

  const toggleEditMode = (workoutId) => {
    if (editingWorkoutId === workoutId) {
      setEditingWorkoutId(null);
    } else {
      setEditingWorkoutId(workoutId);
    }
  };



                    

  return (
    <div className="bg-gray-900 min-h-screen px-4 py-6 text-white">
      {error && (
        <div className="bg-red-600 p-4 rounded-md text-center mb-4">
          <p>{error.status}</p>
          <p>{error.message}</p>
        </div>
      )}

      <ul className="space-y-6">
        {workouts.slice().sort((a, b) => b.id - a.id).map(workout => (
          <li key={workout.id} className="bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <details
              open={openedWorkouts.includes(workout.id)}
              onToggle={() => toggleWorkoutDetails(workout.id)}
              className="details details-primary"
            >
              <summary className="flex justify-between items-center cursor-pointer outline-none group">
                <span className="text-xl font-semibold">{workout.id}</span>
                <span className="flex items-center">
                  <span className="text-gray-400 mr-2">{workout.duration}</span>
                  <span className="transform transition-transform duration-200 text-2xl font-bold hover:text-gray-400">
                    {openedWorkouts.includes(workout.id) ? '−' : '+'}
                  </span>
                </span>
              </summary>

              {openedWorkouts.includes(workout.id) && (
                <div className="flex justify-end mb-4 mt-2">
                  <button
                    onClick={() => toggleEditMode(workout.id)}
                    className="btn btn-outline btn-xs text-gray-400 hover:text-gray-300"
                  >
                    {editingWorkoutId === workout.id ? 'Schließen' : 'Edit'}
                  </button>
                </div>
              )}

              <div className="mt-4 space-y-4">
                {exercises.filter(exercise => exercise.workout_id === workout.id).length > 0 && (
                  <h2 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4">Übungen</h2>
                )}

                <ul className="space-y-4">
                  {exercises
                    .filter(exercise => exercise.workout_id === workout.id)
                    .map(exercise => (
                      <li key={exercise.workout_exercise_id} className="bg-gray-750 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.exercise_name}</span>
                          {exercise.workout_exercise_id && editingWorkoutId === workout.id && (
                            <button 
                              onClick={() => handleDeleteExercise(workout.id, exercise.workout_exercise_id)}
                              className="btn btn-error btn-xs"
                            >
                              Übung Löschen
                            </button>
                          )}
                        </div>

                        <div className="flex space-x-4 text-sm text-gray-400">
                          <span>global exercise {exercise.global_exercise_id}</span>
                          <span>user exercise {exercise.user_exercise_id}</span>
                        </div>

                        <div className="mt-4">
                          {sets.filter(set => set.workout_exercise_id === exercise.workout_exercise_id).length > 0 && (
                            <h3 className="text-md font-semibold border-b border-gray-700 pb-2 mb-2">Sets</h3>
                          )}
                          <ul className="space-y-2">
                            {sets
                              .filter(set => set.workout_exercise_id === exercise.workout_exercise_id)
                              .map(set => (
                                <li key={set.set_id} className="flex justify-between items-center text-sm bg-gray-700 rounded p-2">
                                  <span>Id: {set.set_number} Reps: {set.reps}, Gewicht: {set.weight}</span>
                                  {editingWorkoutId === workout.id && (
                                    <button 
                                      onClick={() => handleDeleteSet(workout.id, exercise.workout_exercise_id, set.set_id)}
                                      className="btn btn-error btn-xs"
                                    >
                                      Set Löschen
                                    </button>
                                  )}
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
