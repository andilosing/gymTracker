import { createSlice } from '@reduxjs/toolkit';

const initialSetsState = {
  setsWorkoutHistory: [],
  currentWorkoutSets: [],
  error: null
};

const setsSlice = createSlice({
  name: 'sets',
  initialState: initialSetsState,
  reducers: {
    fetchData: (state, action) => {
      state.setsWorkoutHistory = action.payload;
    },
    setSetsWorkoutHistory: (state, action) => {
      console.log("set in slice hinzugügen: ", action.payload)
      state.setsWorkoutHistory.push(action.payload)
      //= [...state.setsWorkoutHistory, action.payload];
      console.log("state workout set history: ", state.setsWorkoutHistory);



    },

    
    removeSet: (state, action) => {
      state.setsWorkoutHistory = state.setsWorkoutHistory.filter(set => set.set_id !== action.payload);
    },    

    addSetToCurrentWorkout: (state, action) => {
      state.currentWorkoutSets.push(action.payload);
    
    }, 
    removeSetFromCurrentWorkout: (state, action) => {
        state.currentWorkoutSets = state.currentWorkoutSets.filter(set => set.id !== action.payload);
        console.log("removed set: ", state.currentWorkoutSets)
    },
    decrementSetNumber: (state, action) => {
      const setToDecrement = state.currentWorkoutSets.find(set => set.id === action.payload);
      if (setToDecrement) {
        setToDecrement.set_number -= 1;
      }
    },
    updateSetInCurrentWorkout: (state, action) => {
      console.log("ich wurde geklickt: ")
      const setIndex = state.currentWorkoutSets.findIndex(set => set.id === action.payload.id);
      if (setIndex !== -1) {
        const currentSet = state.currentWorkoutSets[setIndex];
        
        const updatedSet = { ...currentSet };
    

         // Aktualisiere `reps`, falls vorhanden, sonst setze es auf einen leeren Wert (z.B. null)
         if(action.payload.hasOwnProperty("reps")) {
          updatedSet.reps = action.payload.reps
         }

         if(action.payload.hasOwnProperty("weight")) {
          updatedSet.weight = action.payload.weight
         }

        
        // Wenn Sie auch das isLocked-Feld aktualisieren möchten:
        if (action.payload.hasOwnProperty("isLocked")) {
          updatedSet.isLocked = action.payload.isLocked;
        }

        if (action.payload.hasOwnProperty("set_number")) {
          updatedSet.set_number = action.payload.set_number;
      }

      
    
       // Aktualisieren Sie die ID, wenn sie im payload vorhanden ist
        if (action.payload.hasOwnProperty("id")) {
          updatedSet.id = action.payload.id;
        }
    
        state.currentWorkoutSets = [
          ...state.currentWorkoutSets.slice(0, setIndex),
          updatedSet,
          ...state.currentWorkoutSets.slice(setIndex + 1),
        ];
    
        console.log("nach update: ", state.currentWorkoutSets);
      }
    },
    updateSpecificSetValues: (state, action) => {
   

      console.log("ich wurde geklickt: ")
      const setIndex = state.currentWorkoutSets.findIndex(set => set.id === action.payload.id);
      if (setIndex !== -1) {
        const currentSet = state.currentWorkoutSets[setIndex];
        const updatedSet = { ...currentSet };
    
        // Überprüfen Sie, ob reps oder weight im payload sind und aktualisieren Sie sie
        if (action.payload.hasOwnProperty("reps")) {
          updatedSet.reps = action.payload.reps;
        }
        if (action.payload.hasOwnProperty("weight")) {
          updatedSet.weight = action.payload.weight;
        }

        
        
    
        state.currentWorkoutSets = [
          ...state.currentWorkoutSets.slice(0, setIndex),
          updatedSet,
          ...state.currentWorkoutSets.slice(setIndex + 1),
        ];
    
        console.log("nach update: ", state.currentWorkoutSets);
      }
    },resetCurrentWorkoutSets: (state) => {
      state.currentWorkoutSets = [];
    },
    
    



    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null
    }
  }
});

export const { fetchData, setSetsWorkoutHistory, resetCurrentWorkoutSets, setError, clearError, removeSet, addSetToCurrentWorkout, updateSpecificSetValues, removeSetFromCurrentWorkout, decrementSetNumber, updateSetInCurrentWorkout} = setsSlice.actions;
export default setsSlice.reducer;
