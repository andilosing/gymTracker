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

  useEffect(() => {
    if (!workouts || !workouts.length) {
        console.log("dispatch workouts laden")
      dispatch(fetchWorkoutsHistory());
    }
  }, []); //dispatch, workouts
  
  useEffect(() => {
    if (!exercises || !exercises.length) {
      console.log("dispatch exercises laden");
      dispatch(fetchExercisesWorkoutHistory());
    }
  }, []); //dispatch, exercises
  
  useEffect(() => {
    if (!sets || !sets.length) {
      console.log("dispatch sets laden");
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
    <div>
      {error && <p className="error">{error.status} {error.message}</p>}
      <ul>
      {workouts.map(workout => (
        <li key={workout.id}>
          {workout.id} {workout.duration}
          <div>
            <h2>Übungen</h2>
            <ul>
              {exercises
                .filter(exercise => exercise.workout_id === workout.id)
                .map((exercise) => (
                  <li key={exercise.workout_exercise_id}>
                    {exercise.exercise_name}
                    
                    {/* Button anzeigen, wenn es tatsächlich eine Übung gibt */}
                    {exercise.workout_exercise_id && (
                      <button onClick={() => handleDeleteExercise(workout.id, exercise.workout_exercise_id)}>Übung Löschen</button>
                    )}

                    <div>
                      <h3>Sets</h3>
                      <ul>
                        {sets
                            .filter(set => set.workout_exercise_id === exercise.workout_exercise_id)
                            .map((set) => (
                              <li key={set.set_id}>
                                Id: {set.set_number} Reps: {set.reps}, Gewicht: {set.weight}
                                <button onClick={() => handleDeleteSet(workout.id, exercise.workout_exercise_id, set.set_id)}>Set Löschen</button>
                              </li>
                          ))}
                      </ul>
                    </div>

                  </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default WorkoutHistoryComponent;
