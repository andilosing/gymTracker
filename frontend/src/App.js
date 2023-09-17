
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RequireEmailConfirmation from './wrapper/requireEmailVerification';
import RequireAuth from './wrapper/requireAuthToken';
import WorkoutHistoryComponent from './components/WorkoutHistoryComponent';
import ExerciseListComponent from './components/ExerciseListComponent';
import CurrentWorkoutComponent from './components/CurrentWorkoutComponent';


function App() {
  return (
    <Routes>
      <Route path="/" element={<><div>Hello</div><Outlet /></>}>
        <Route path='register' element={<RegisterComponent />} />
        <Route path="login" element={<LoginComponent />} />

        <Route element={<RequireAuth />}>
          <Route element={<RequireEmailConfirmation />}>
            <Route path='/workouts' element={ <WorkoutHistoryComponent />} />
            <Route path='/exercise-list' element={ <ExerciseListComponent />} />
            <Route path='/current-workout' element={ <CurrentWorkoutComponent />} />


            
          </Route>
        </Route>

      
      </Route>
    </Routes>
  );
}

export default App;
