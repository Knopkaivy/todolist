import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../FirebaseConfig';
import FirebaseAuthService from '../FirebaseAuthService';

const Reset = () => {
  const [email, setEmail] = useState('');
  const [user, loading] = useAuthState(firebase.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <div className="container container__auth">
      <input
        type="text"
        className="inpt inpt__auth"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail Address"
      />
      <button
        className="btn btn-green btn__auth"
        onClick={() => FirebaseAuthService.sendPasswordReset(email)}
      >
        Send password reset email
      </button>
      <div>
        Don't have an account? <Link to="/register">Register</Link> now.
      </div>
    </div>
  );
};

export default Reset;
