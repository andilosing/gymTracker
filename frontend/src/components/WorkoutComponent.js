import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts } from '../redux/actions/workoutActions';

const WorkoutComponent = () => {
  const dispatch = useDispatch();
  const workouts = useSelector(state => state.workouts.workouts);

  const handleFetchWorkouts = () => {
    dispatch(fetchWorkouts());
  };

  return (
    <div>
      <button onClick={handleFetchWorkouts}>Load Workouts</button>
      <ul>
        {workouts.map(workout => (
          <li key={workout.id}>{workout.id} {workout.duration}</li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutComponent;