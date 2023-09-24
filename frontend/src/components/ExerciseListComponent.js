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
        <div className="bg-gray-800 min-h-screen px-4 py-6 text-white">
            <h2 className="text-2xl font-bold mb-6">Übungsliste</h2>
            <ul className="space-y-4">
                {availableExercises.map(exercise => (
                    <li key={exercise.id} className="bg-gray-700 shadow-md rounded-md p-4 flex justify-between items-center">
                        <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm">{exercise.type}</p>
                        </div>
                        <div className="space-x-2">
                            <button 
                                onClick={() => onExerciseSelected(exercise)}
                                className="btn btn-primary btn-sm"
                            >
                                Auswählen
                            </button>
                            {exercise.type === 'custom' && (
                                <button className="btn btn-secondary btn-sm">
                                    Edit Custom Exercise
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExerciseListComponent;
