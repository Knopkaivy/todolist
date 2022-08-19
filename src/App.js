import * as React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import BgImage from './imgs/bg-lg.jpg';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';
import './styles/App.css';
import TodoList from './TodoList';

function App() {
  return (
    <div className="App">
      <div className="bg__container">
        <img src={BgImage} alt="decorative background" className="bg__image" />
      </div>
      <nav className="nav">
        <NavLink to="login" className="NavLink">
          Login
        </NavLink>
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
