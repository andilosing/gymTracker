
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import RequireEmailConfirmation from './wrapper/requireEmailVerification';
import RequireAuth from './wrapper/requireAuthToken';


function App() {
  return (
    <Routes>
      <Route path="/" element={<><div>Hello</div><Outlet /></>}>
        <Route path='register' element={<RegisterComponent />} />
        <Route path="login" element={<LoginComponent />} />

        <Route element={<RequireEmailConfirmation />}>
          <Route element={<RequireAuth />}>
            <Route path='start' element={<div>Start</div>} />
          </Route>
        </Route>

      
      </Route>
    </Routes>
  );
}

export default App;
