
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RequireEmailConfirmation from './wrapper/requireEmailVerification';
import RequireAuth from './wrapper/requireAuthToken';
import WorkoutHistoryComponent from './components/WorkoutHistoryComponent';
import ExerciseListComponent from './components/ExerciseListComponent';
import CurrentWorkoutComponent from './components/CurrentWorkoutComponent';
import BottomNavComponent from './components/BottomNavComponent';



function App() {
  return (
    <div className="flex flex-col min-h-screen pb-16">
    <div className="flex-grow">
    <Routes>
      <Route path="/" element={<Outlet />}>
      
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
    </div>

     <BottomNavComponent />
     </div>
   
  );
}

export default App;
