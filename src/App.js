import * as React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import {
  app,
  auth,
  db,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firestore from './FirebaseConfig';
import FirebaseAuthService from './FirebaseAuthService';
import BgImage from './imgs/bg-lg.jpg';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import './styles/App.css';
import TodoList from './TodoList';

function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="App">
      <div className="bg__container">
        <img src={BgImage} alt="decorative background" className="bg__image" />
      </div>
      <nav className="nav">
        {user ? (
          <>
            <div className="NavLink">{user.displayName}</div>
            <button type="button" onClick={FirebaseAuthService.logoutUser}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="login" className="NavLink">
            Login
          </NavLink>
        )}
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="reset" element={<Reset />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
