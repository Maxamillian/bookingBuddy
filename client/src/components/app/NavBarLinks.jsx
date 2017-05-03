import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const LoginStatusDisplay = ({isLoggedIn, logInOrOut}) => (
  <NavLink to="/" onClick={logInOrOut} className='loginStatusDisplay'>
    {isLoggedIn ? 'Log Out' : 'Log In'}
  </NavLink>
);

$( document ).ready(function() {
  $(".button-collapse").dropdown();
});

// Navigation Menu
const NavBarLinks = ({isLoggedIn, logInOrOut}) => (
  <nav className="green lighten-1" role="navigation">
    <div className="nav-wrapper container">
      <NavLink id="logo-container" exact to="/" className="brand-logo">Booking Buddy</NavLink>
      <ul className="right hide-on-med-and-down">
        {
          isLoggedIn ?
              <li><NavLink to="/profile">My Profile</NavLink></li>
          :
            <span>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/about-us">About Us</NavLink></li>
            </span>
        }
        <li><LoginStatusDisplay isLoggedIn={isLoggedIn} logInOrOut={logInOrOut} /></li>
      </ul>

      <ul id="nav-mobile" className="side-nav">
        {
          isLoggedIn ?
              <li><NavLink to="/profile">My Profile</NavLink></li>
          :
            <span>
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/about-us">About Us</NavLink></li>
            </span>
        }
        <li><LoginStatusDisplay isLoggedIn={isLoggedIn} logInOrOut={logInOrOut} /></li>
      </ul>
      <a className="button-collapse" href="#" data-activates="nav-mobile"><i className="material-icons">menu</i></a>
    </div>
  </nav>
);

//<li><NavLink to="/postRegistration">PostRegistration^</NavLink></li>
//<li><NavLink to="/trip-room">TripRoom^</NavLink></li>

export default NavBarLinks;