import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExerciseToWorkout } from '../redux/actions/exerciseActions';
import { addSetToExerciseInWorkout } from '../redux/actions/setsActions';
import { beginWorkout, endWorkout } from '../redux/actions/workoutActions';
import { endWorkoutSlice } from '../redux/slices/workoutSlice';
import ExerciseListComponent from './ExerciseListComponent';
import { addExerciseToCurrentWorkout, removeExerciseFromCurrentWorkout, resetCurrentWorkoutExercises} from '../redux/slices/exerciseSlice';
import { addSetToCurrentWorkout, resetCurrentWorkoutSets, setSetsWorkoutHistory, removeSetFromCurrentWorkout, decrementSetNumber, updateSetInCurrentWorkout, updateSpecificSetValues } from '../redux/slices/setsSlice';


function CurrentWorkoutComponent() {
    const [workoutDuration, setWorkoutDuration] = useState(0); // Dauer in Sekunden
 

    const [isExerciseModalOpen, setExerciseModalOpen] = useState(false);
    const currentWorkoutExercises = useSelector(state => state.exercises.currentWorkoutExercises);

    const currentSets = useSelector(state => state.sets.currentWorkoutSets);

    


    //predifned sets
    const setsWorkoutHistory = useSelector(state => state.sets.setsWorkoutHistory)
    const globalExercises = useSelector(state => state.exercises.globalExercisesList);
    const customExercises = useSelector(state => state.exercises.customExercisesList);
    const exercisesWorkoutHistory = useSelector(state => state.exercises.workoutExercisesHistory);



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
        


        //predefined sets
        const lastSets = getLastSetsForExercise(exercise.id, exercise.type);

       
    
        if (isExerciseAlreadyAdded) {
            console.log("Übung bereits hinzugefügt! "); //hier ein error werfen und behandeln
            return;
        }
    
        dispatch(addExerciseToCurrentWorkout(exercise));
    
        for (let i = 0; i < 3; i++) {
            let defaultReps = 0;
            let defaultWeight = 0;
            
    
            if (lastSets[i]) {
                defaultReps = parseInt(lastSets[i].reps, 10);
                defaultWeight = parseFloat(lastSets[i].weight);
            }


            dispatch(addSetToCurrentWorkout({
                id: generateId(),
                reps: defaultReps, 
                weight: defaultWeight, 
                set_number: i + 1, 
                exerciseId: exercise.id,
                exerciseType: exercise.type,
                isLocked: false
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


    const handleAddSetClick = (exerciseId, exerciseType) => {
        const filteredSets = currentSets.filter(set => set.exerciseId === exerciseId);
        const maxSetNumber = filteredSets.reduce((max, set) => Math.max(max, set.set_number), 0)
        
        const lastSets = getLastSetsForExercise(exerciseId, exerciseType); // Füge den entsprechenden Übungstyp hinzu, wenn benötigt
        
        let defaultReps = 0;
        let defaultWeight = 0;
    
        // Überprüfen, ob der nächste Satz in lastSets vorhanden ist
        const matchingLastSet = lastSets.find(set => set.set_number === maxSetNumber + 1);
       
        if (matchingLastSet) {
            defaultReps = matchingLastSet.reps;
            defaultWeight = matchingLastSet.weight;
            
        }
    
        dispatch(addSetToCurrentWorkout({
            id: generateId(),
            reps: defaultReps, 
            weight: defaultWeight, 
            set_number: maxSetNumber + 1, 
            exerciseId: exerciseId, 
            exerciseType: exerciseType,
            isLocked: false
        }));
    };
    
    const handleRemoveSetClick = (setId) => {
        const setToRemoveIndex = currentSets.findIndex(set => set.id === setId);



        dispatch(removeSetFromCurrentWorkout(setId));


        // Aktualisieren Sie die Set-Nummern für die restlichen Sets
    for (let i = setToRemoveIndex; i < currentSets.length; i++) {
        const currentSet = currentSets[i];
        dispatch(updateSetInCurrentWorkout({
            id: currentSet.id,
            set_number: currentSet.set_number - 1,
        }));
    }
        // const setToRemoveIndex = currentSets.findIndex(set => set.id === setId);
        // 
        // if (setToRemoveIndex !== -1 && setToRemoveIndex !== currentSets.length - 1) {
        //     for (let i = setToRemoveIndex; i < currentSets.length; i++) {
               
        //         if (i === currentSets.length - 1) {
        //             // Den letzten Set entfernen
        //             dispatch(removeSetFromCurrentWorkout(currentSets[i].id));
        //         } else {
        //             // Aktualisieren Sie den aktuellen Set mit den Werten des nächsten Sets
        //             dispatch(updateSetInCurrentWorkout({
        //                 id: currentSets[i].id,
        //                 reps: currentSets[i + 1].reps || null,
        //                 weight: currentSets[i + 1].weight || null,
        //                 isLocked: currentSets[i + 1].isLocked || null,
        //                 newId: generateId(),
        //             }));
        //         }
        //     }
        // } else if (setToRemoveIndex === currentSets.length - 1) {
        //     // Wenn das zu entfernende Set das letzte ist, entfernen Sie es einfach
        //     dispatch(removeSetFromCurrentWorkout(setId));
        // }
    };
    const handleLockToggle = (setId) => {
        const setToToggle = currentSets.find(set => set.id === setId);
    
        if (setToToggle) {
            const repsInputElement = document.querySelector(`#reps-input-${setId}`);
            const weightInputElement = document.querySelector(`#weight-input-${setId}`);
    
            let updatedReps;
            let updatedWeight;
    
            // Wenn reps oder weight nicht gesetzt sind und der Platzhalter vorhanden ist, verwenden Sie den Platzhalterwert
            if (!repsInputElement.value && repsInputElement.placeholder) {
                updatedReps = parseInt(repsInputElement.placeholder);
                repsInputElement.value = updatedReps;
            } else {
                updatedReps = parseInt(repsInputElement.value);
            }
    
            if (!weightInputElement.value && weightInputElement.placeholder) {
                updatedWeight = parseInt(weightInputElement.placeholder);
                weightInputElement.value = updatedWeight;
            } else {
                updatedWeight = parseInt(weightInputElement.value);
            }
    
            // Überprüfen, ob die Wiederholungen gesetzt sind, bevor das Set geloggt wird
            if (isNaN(updatedReps) || updatedReps === 0) {
                console.log("Cannot log set with empty or zero reps ");
                return;
            }
    
            dispatch(updateSetInCurrentWorkout({
                id: setId,
                reps: updatedReps,
                weight: updatedWeight,
                isLocked: !setToToggle.isLocked
            }));
        }
    };
    
    
    
    const handleRepsInputChange = (setId, value) => {
        // Nur aktualisieren, wenn es eine gültige Zahl ist
        if (value && !isNaN(value)) {
          dispatch(updateSpecificSetValues({
            id: setId,
            reps: parseInt(value), // Konvertiere den Wert in eine Zahl
          }));
        }
      };
      
      const handleWeightInputChange = (setId, value) => {
        // Nur aktualisieren, wenn es eine gültige Zahl ist
        if (value && !isNaN(value)) {
          dispatch(updateSpecificSetValues({
            id: setId,
            weight: parseFloat(value), // Konvertiere den Wert in eine Zahl (da Gewicht Dezimalzahlen haben kann)
          }));
        }
      };



      const handleEndClick = async () => {  // Diese Funktion muss nun async sein
        try {
        
        const filteredSets = currentSets.filter(set => set.isLocked);
            filteredSets.sort((a, b) => a.exerciseId - b.exerciseId);
            
            const addedExercises = [];

            for (let exercise of currentWorkoutExercises) {
                const addedExercise = await dispatch(addExerciseToWorkout(currentWorkout.id, exercise.type, exercise.id));

                addedExercises.push(addedExercise);
            }

         

            for (let addedExercise of addedExercises) {
                // Hier überprüfen wir, ob die addedExercise eine globale oder benutzerdefinierte ID hat
             
                const correctExerciseId = addedExercise.global_exercise_id ? addedExercise.global_exercise_id : addedExercise.user_exercise_id;
                const exerciseType = addedExercise.global_exercise_id ? "global" : "custom"


                // Finde alle Sets, deren exerciseId mit der correctExerciseId übereinstimmt
                const matchingSets = filteredSets.filter(set => set.exerciseId === correctExerciseId && set.exerciseType === exerciseType);

         

                let currentSetNumber = 1;

                for (let set of matchingSets) {
                  
                    const currentExerciseId = addedExercise.workout_exercise_id;
           
                    const correctSetNumber  = currentSetNumber++;




                    dispatch(addSetToExerciseInWorkout(currentWorkout.id, addedExercise.workout_exercise_id, set.reps, set.weight, correctSetNumber));
                }
            }

            dispatch(endWorkout(currentWorkout.id))

            dispatch(endWorkoutSlice())
            dispatch(resetCurrentWorkoutSets())
            dispatch(resetCurrentWorkoutExercises())
            
                
                setWorkoutDuration(0);

        } catch (error) {
                    // Hier können Sie den Fehler behandeln und dem Benutzer eine Nachricht anzeigen oder entsprechend reagieren.
                    console.error("Ein Fehler ist aufgetreten: ", error);
                }
            };
            

    


    //addSetToExerciseInWorkout = (workoutId, exerciseId, reps, weight, set_number)


// predifine sets 
const getLastSetsForExercise = (exerciseId, exerciseType) => {
    // Bestimmen Sie die Übungsliste basierend auf dem Übungstyp (global oder custom)
    let validExercises = [];
    
    if (exerciseType === "global") {
        validExercises = globalExercises;
    } else if (exerciseType === "custom") {
        validExercises = customExercises;
    }

   

    // Überprüfen, ob die exerciseId in der validExercises Liste ist
    if (!validExercises.some(exercise => exercise.id === exerciseId)) {
        console.log(`The given exerciseId does not match any ${exerciseType} exercises.`);
        return [];
    }

    // Filtern Sie die Übungen aus exercisesWorkoutHistory basierend auf dem Übungstyp
    let matchingExercises = [];
    if (exerciseType === "global") {
        matchingExercises = exercisesWorkoutHistory.filter(exercise => exercise.global_exercise_id === exerciseId);
    } else if (exerciseType === "custom") {
        matchingExercises = exercisesWorkoutHistory.filter(exercise => exercise.user_exercise_id === exerciseId);
    }



    const workout_exercise_id = matchingExercises.map(exercise => exercise.workout_exercise_id);

    // Finden der höchsten workout_exercise_id
    const maxWorkoutExerciseId = Math.max(...workout_exercise_id);

    // Filtern der Sätze, die der höchsten workout_exercise_id entsprechen
    const latestSets = setsWorkoutHistory.filter(set => set.workout_exercise_id === maxWorkoutExerciseId);


    return latestSets;
};







    return (
        <div className="bg-gray-800 min-h-screen px-4 py-6 text-white space-y-4">
            {!currentWorkout ? (
                <button onClick={handleStartClick} className="btn btn-primary w-full">
                    Workout starten
                </button>
            ) : null}
    
            {currentWorkout && (
                <div className="bg-gray-700 shadow-md rounded-md p-4">
                    <p className="font-medium">
                        Dauer: {Math.floor(workoutDuration / 60)} Minuten {workoutDuration % 60} Sekunden
                    </p>
                </div>
            )}
    
            {currentWorkoutExercises && currentWorkoutExercises.map((exercise, index) => (
                <div key={index} className="bg-gray-700 shadow-md rounded-md p-4 space-y-4">
                    <p>{exercise.id} {exercise.name} {exercise.type}</p>
                    <div className="flex justify-between items-center">
                        <button onClick={() => handleRemoveExerciseClick(exercise.id)} className="btn btn-error btn-xs">
                            Übung entfernen
                        </button>
                        <button onClick={() => handleAddSetClick(exercise.id, exercise.type)} className="btn btn-success btn-xs">
                            + Set 
                        </button>
                    </div>
    
                    {currentSets.filter(set => set.exerciseId === exercise.id).map((set) => (
    <div key={set.id} className={`flex items-center space-x-2 mt-2 ${set.isLocked ? 'bg-green-500' : ''}`}>
        <span className="bg-gray-800 p-2 rounded-full">{set.set_number}</span>
        
        <input 
    id={`reps-input-${set.id}`}  // <-- Hinzufügen einer ID
    type="number" 
    onChange={e => handleRepsInputChange(set.id, e.target.value)}
    placeholder={set.reps > 0 ? set.reps : ''}  
    className={`bg-gray-800 p-2 rounded-md w-16 text-center ${set.isLocked ? 'bg-green-200' : ''}`} 
    maxLength="5" 
    disabled={set.isLocked}
/>
        <span>wdh</span>
        
        <input 
    id={`weight-input-${set.id}`} // <-- Hinzufügen einer ID
    type="number" 
    onChange={e => handleWeightInputChange(set.id, e.target.value)}
    placeholder={set.weight > 0 ? set.weight : ''}
    className={`bg-gray-800 p-2 rounded-md w-16 text-center ${set.isLocked ? 'bg-green-200' : ''}`} 
    maxLength="5"
    disabled={set.isLocked}
/>
        <span>kg</span>
        
        <button onClick={() => handleRemoveSetClick(set.id)} className="btn btn-error btn-xs">
            -
        </button>

        {/* Haken-Button zum Sperren/Entsperren der Eingabefelder */}
        <button onClick={() => handleLockToggle(set.id)} className="btn btn-outline btn-xs">
            {set.isLocked ? '❌' : '✅'}
        </button>
    </div>
))}
                </div>
            ))}
    
                 {currentWorkout ? (<button onClick={handleAddExerciseClick} className="btn btn-primary w-full">
                Übung hinzufügen
            </button>  ) : null}
    
            {isExerciseModalOpen && (
                <ExerciseListComponent 
                    onExerciseSelected={handleExerciseSelected} 
                    addedExercises={currentWorkoutExercises || []}
                />
            )}
    
            {currentWorkout ? (
                <button onClick={handleEndClick} className="btn btn-error w-full">
                    Workout beenden
                </button>
            ) : null}
        </div>
    );
    
    
    
}

export default CurrentWorkoutComponent;
