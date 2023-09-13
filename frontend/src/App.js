
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom'
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
      <div>Hello</div>
      <Outlet />
      </>
      
      }>
        <Route path='register' element={<RegisterComponent />} />
       <Route path="login" element={<LoginComponent />} />
      
        {/* <Route index element={<Public />} />
       

       
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route> */}

      </Route>
    
     
    </Routes>
  );
}

export default App;
