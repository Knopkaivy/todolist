import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import firebase from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [user, loading] = useAuthState(firebase.auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert('Please enter name');
    FirebaseAuthService.registerUser(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="container container__auth">
      <input
        type="text"
        className="inpt inpt__auth"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full Name"
      />
      <input
        type="text"
        className="inpt inpt__auth"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <input
        type="password"
        className="inpt inpt__auth"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="btn btn-green btn__auth" onClick={register}>
        Register
      </button>
      <button
        className="btn btn-red btn__auth"
        onClick={FirebaseAuthService.loginWithGoogle}
      >
        Login with Google
      </button>
      <div>
        Already have an account? <Link to="/login">Login</Link> now.
      </div>
    </div>
  );
};

export default Register;
