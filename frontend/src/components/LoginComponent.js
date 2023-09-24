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
      navigate("/current-workout");
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
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      {error && <div className="alert alert-error mb-4">{error.status} {error.message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Email:</label>
          <input 
            type="text" 
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              dispatch(clearError());
            }}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Passwort:</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => {
              setPassword(e.target.value);
              dispatch(clearError());
            }}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-full mt-4">Einloggen</button>
        </div>
      </form>
    </div>
  );
}


export default LoginComponent;
