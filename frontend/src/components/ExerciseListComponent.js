import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGlobalExercises, fetchCustomExercises } from '../redux/actions/exerciseActions';  

function ExerciseListComponent({ onExerciseSelected, addedExercises }) {
    const dispatch = useDispatch();
    
   
 

    const globalExercises = useSelector(state => state.exercises.globalExercisesList);
    const customExercises = useSelector(state => state.exercises.customExercisesList);

    

    useEffect(() => {
        dispatch(fetchGlobalExercises());
        dispatch(fetchCustomExercises());
    }, [dispatch]);



    const combinedExercises = [
        ...(Array.isArray(globalExercises) ? globalExercises : []),
        ...(Array.isArray(customExercises) ? customExercises : [])
      ];

      const availableExercises = combinedExercises.filter(
        exercise => !addedExercises?.some(addedExercise => addedExercise.id === exercise.id)
    );

    availableExercises.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="exercise-list-container">
            <h2>Übungsliste</h2>
            <ul>
                {availableExercises.map(exercise => (
                    <li key={exercise.id}>
                        {exercise.name} - {exercise.type}
                        <button onClick={() => onExerciseSelected(exercise)}>Auswählen</button>
                        {exercise.type === 'custom' && (
                            <button>Edit Custom Exercise</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExerciseListComponent;
