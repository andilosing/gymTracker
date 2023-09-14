import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/actions/authActions';
import { clearError } from '../redux/slices/authSlice';

function RegisterComponent() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { token, user, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && !error) {
      setUsername("")
      setEmail("");
      setPassword("");
      setPasswordConfirmation("")
      navigate("/start");
    }

  }, [user, error, navigate]);

  useEffect(() => {
    return () => {
        dispatch(clearError());
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password, passwordConfirmation }));
  };



  return (
    <div>
      <h2>Registrieren</h2>
      {error && <p className="error">{error.status} {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Benutzername: </label>
          <input 
            type="text"
            value={username} 
            onChange={e => {
              setUsername(e.target.value)
              dispatch(clearError())}}
             
          />
        </div>
        <div>
          <label>Email: </label>
          <input 
            type="email" 
            value={email} 
            onChange={e => {
              setEmail(e.target.value)
              dispatch(clearError())}}
             
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
             
          />
        </div>
        <div>
          <label>Passwort Bestätigen: </label>
          <input 
            type="password" 
            value={passwordConfirmation} 
            onChange={e => {
              setPasswordConfirmation(e.target.value)
              dispatch(clearError())}}
             
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
