import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import FirebaseAuthService from './FirebaseAuthService';
import './styles/Nav.css';

const Nav = ({ user }) => {
  let location = useLocation();
  return (
    <nav className="Nav">
      <div className="Nav__container">
        <div className="Nav__itemContainer">
          {location.pathname === '/' ? (
            <>
              {user ? (
                <>
                  <div className="Nav__item">{user.displayName}</div>
                  <button
                    type="button"
                    onClick={FirebaseAuthService.logoutUser}
                    className="btn btn__logout Nav__item Nav__item-hidden"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="login" className="Nav__item NavLink">
                  Login
                </NavLink>
              )}
            </>
          ) : (
            <NavLink to="/" className="Nav__item NavLink">
              Home
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
