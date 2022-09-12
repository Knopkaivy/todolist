import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from './FirebaseConfig';
// import { auth, logInWithEmailAndPassword, signInWithGoogle } from './firebase';
import FirebaseAuthService from './FirebaseAuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(firebase.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/');
  }, [user, loading]);
  return (
    <div className="container__auth">
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
      <button
        className="btn btn-green btn__auth"
        onClick={() => FirebaseAuthService.loginUser(email, password)}
      >
        Login
      </button>
      <button
        className="btn btn-red btn__auth"
        onClick={FirebaseAuthService.loginWithGoogle}
      >
        Login with Google
      </button>
      <div>
        <Link to="/reset">Forgot Password</Link>
      </div>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
};

export default Login;
