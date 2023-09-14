import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../redux/slices/authSlice';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { token, user, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (token && !error) {
      setEmail("");
      setPassword("");
      navigate("/workouts");
    }

  
  }, [token, error, navigate]);

  useEffect(() => {
    return () => {
        dispatch(clearError());
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };



  return (
    <div>
      <h2>Login</h2>
       {error && <p className="error">{error.status} {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={e => {
              setEmail(e.target.value)
              dispatch(clearError())}}
            required 
          />
        </div>
        <div>
          <label>Passwort: </label>
          <input 
            type="password" 
            value={password} 
            onChange={e => {
              setPassword(e.target.value)
              dispatch(clearError())}}
            required 
          />
        </div>
        <div>
          <button type="submit">Einloggen</button>
        </div>
      </form>
    </div>
  );
}

export default LoginComponent;
