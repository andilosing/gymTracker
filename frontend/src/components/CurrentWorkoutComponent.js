import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { beginWorkout } from '../redux/actions/workoutActions';
import ExerciseListComponent from './ExerciseListComponent';
import { addExerciseToCurrentWorkout, removeExerciseFromCurrentWorkout } from '../redux/slices/exerciseSlice';
import { addSetToCurrentWorkout, removeSetFromCurrentWorkout, decrementSetNumber } from '../redux/slices/setsSlice';


function CurrentWorkoutComponent() {
    const [workoutDuration, setWorkoutDuration] = useState(0); // Dauer in Sekunden

    const [isExerciseModalOpen, setExerciseModalOpen] = useState(false);
    const currentWorkoutExercises = useSelector(state => state.exercises.currentWorkoutExercises);

    const currentSets = useSelector(state => state.sets.currentWorkoutSets);


    const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 5);


   

    const dispatch = useDispatch();
    const currentWorkout = useSelector(state => state.workouts.currentWorkout);
    const startTime = currentWorkout ? currentWorkout.startTime : null;

    useEffect(() => {
        if (currentWorkout) {
            const intervalId = setInterval(() => {
                const currentTime = Date.now();
                const diffInSeconds = Math.floor((currentTime - new Date(startTime).getTime()) / 1000);
                setWorkoutDuration(diffInSeconds);
            }, 1000);

            return () => clearInterval(intervalId); // Intervall aufräumen
        }
    }, [currentWorkout, startTime]);

    const handleStartClick = () => {
        dispatch(beginWorkout());
    };

    const handleAddExerciseClick = () => {
        setExerciseModalOpen(true);
    };

    const handleExerciseSelected = (exercise) => {
        const isExerciseAlreadyAdded = currentWorkoutExercises.some(e => e.id === exercise.id);
    
        if (isExerciseAlreadyAdded) {
            console.log("Übung bereits hinzugefügt! "); //hier ein error werfen und behandeln
            return;
        }
    
        dispatch(addExerciseToCurrentWorkout(exercise));
    
        for (let i = 0; i < 3; i++) {
            dispatch(addSetToCurrentWorkout({
                id: generateId(),
                reps: 0, 
                weight: 0, 
                set_number: i + 1, 
                exerciseId: exercise.id
            }));

            
        }
    
        setExerciseModalOpen(false);
    };

    const handleRemoveExerciseClick = (exerciseId) => {

        const setsAssociatedWithExercise = currentSets.filter(set => set.exerciseId === exerciseId);

        // 2. Lösche alle diese Sets.
        setsAssociatedWithExercise.forEach(set => {
            dispatch(removeSetFromCurrentWorkout(set.id));
        });
        
        dispatch(removeExerciseFromCurrentWorkout(exerciseId));  
    };


    const handleAddSetClick = (exerciseId) => {
        const filteredSets = currentSets.filter(set => set.exerciseId === exerciseId);
        const maxSetNumber = filteredSets.reduce((max, set) => Math.max(max, set.set_number), 0)
        dispatch(addSetToCurrentWorkout({
            id: generateId(),
            reps: 0, 
            weight: 0, 
            set_number: maxSetNumber + 1, 
            exerciseId: exerciseId
        }));
    };
    
    const handleRemoveSetClick = (setId) => {
        const setToRemove = currentSets.find(set => set.id === setId);
        if (setToRemove) {
            const higherSets = currentSets.filter(set => 
                set.exerciseId === setToRemove.exerciseId && set.set_number > setToRemove.set_number
            );
            higherSets.forEach(set => {
                dispatch(decrementSetNumber(set.id));
            });
        }
    
        dispatch(removeSetFromCurrentWorkout(setId));
    };
    




    const handleEndClick = () => {
        // Hier logische Implementierung zum Beenden des Workouts, z.B.:
        // dispatch(endWorkout());
        // Optional: Dauer zurücksetzen
        setWorkoutDuration(0);
    };

    return (
        <div>
            {!currentWorkout ? (
                <button onClick={handleStartClick}>Workout starten</button>
            ) : null}

            <div>
                {currentWorkout ? (
                    <p>Dauer: {Math.floor(workoutDuration / 60)} Minuten {workoutDuration % 60} Sekunden</p>
                ) : null}
            </div>

            <ul>
                {currentWorkoutExercises && currentWorkoutExercises.map((exercise, index) => (
                    <li key={index}>
                        {exercise.id} {exercise.name} {exercise.type}
                        <button onClick={() => handleRemoveExerciseClick(exercise.id)}>Übung entfernen</button>
                        
                        <ul>
                            {currentSets.filter(set => set.exerciseId === exercise.id)
                            .map((set, idx) => (
                                <li key={idx}>
                                    Set {set.set_number}: {set.reps} Wiederholungen mit {set.weight}kg
                                    <button onClick={() => handleRemoveSetClick(set.id)}>Set entfernen</button>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => handleAddSetClick(exercise.id)}>Set hinzufügen</button>
                    </li>
                ))}
            </ul>


            <button onClick={handleAddExerciseClick}>Übung hinzufügen</button>

            {isExerciseModalOpen && (
                <ExerciseListComponent onExerciseSelected={handleExerciseSelected} 
                addedExercises={currentWorkoutExercises || []}/>
            )}

          



            {currentWorkout ? (
                <button onClick={handleEndClick}>Workout beenden</button>
            ) : null}
        </div>
    );
}

export default CurrentWorkoutComponent;
