import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Registrieren</h2>
      
      {error && <div className="alert alert-error mb-4">{error.status} {error.message}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-semibold mb-2">Benutzername:</label>
          <input 
            type="text" 
            value={username} 
            onChange={e => {
              setUsername(e.target.value);
              dispatch(clearError());
            }}
            className="input input-bordered w-full "
          />
        </div>
  
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
          <label className="block text-sm font-semibold mb-2">Passwort Bestätigen:</label>
          <input 
            type="password" 
            value={passwordConfirmation} 
            onChange={e => {
              setPasswordConfirmation(e.target.value);
              dispatch(clearError());
            }}
            className="input input-bordered w-full"
          />
        </div>
  
        <div>
          <button type="submit" className="btn btn-primary w-full mt-4">Registrieren</button>
        </div>
      </form>
      <div className="mt-4 text-center">
  Schon registriert? <Link to="/login" className="underline">Hier einloggen</Link>
</div>
    </div>
  );
  
}

export default RegisterComponent;
