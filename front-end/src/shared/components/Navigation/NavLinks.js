import React, { useContext, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../context/auth-context';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to='/' exact>
          All Users
        </NavLink>
      </li>

      {auth.isLoggedIn && (
        <Fragment>
          <li>
            <NavLink to='/u1/places' exact>
              My Places
            </NavLink>
          </li>
          <li>
            <NavLink to='/places/new' exact>
              Add Place
            </NavLink>
          </li>
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        </Fragment>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to='/auth' exact>
            Authenticate
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
