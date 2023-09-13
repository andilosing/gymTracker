import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { registerUser } from '../redux/actions/authActions';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const dispatch = useDispatch();
  const { isAuthenticated, token, user } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sie können hier eine Validierung für password und passwordConfirmation hinzufügen
    if (password !== passwordConfirmation) {
      console.error("Passwörter stimmen nicht überein");
      return;
    }
    dispatch(registerUser({ username, email, password, passwordConfirmation }));
  };

  if (user) {
    return (
      <div>
        <p>Sie sind registriert!</p>
        <p></p>
        <p>User: {user.username}</p> 
      </div>
    );
  }

  return (
    <div>
      <h2>Registrieren</h2>
      <div>isAuthenticated: {String(isAuthenticated)}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername: </label>
          <input 
            type="text"
            value={username} 
            onChange={e => setUsername(e.target.value)}
            required 
          />
        </div>
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
          <label>Passwort Bestätigen: </label>
          <input 
            type="password" 
            value={passwordConfirmation} 
            onChange={e => setPasswordConfirmation(e.target.value)}
            required 
          />
        </div>
        <div>
          <button type="submit">Registrieren</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterComponent;
