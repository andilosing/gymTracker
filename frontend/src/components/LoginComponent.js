import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/authActions';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (isAuthenticated) {
    return (
      <div>
        <p>Sie sind eingeloggt!</p>
        <p>Token: {token}</p>
        <p>User: {user.username}</p> 
      </div>
    );
  }

  return (
    <div>
      <h2>Login</h2>
      <div>isAuthenticated: {String(isAuthenticated)}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required 
          />
        </div>
        <div>
          <label>Passwort: </label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
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
