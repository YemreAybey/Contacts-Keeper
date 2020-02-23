import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authCOntext';
import ContactContext from '../../context/contact/contactContext';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li onClick={onLogout}>
        <a href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
        {'  '}
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
