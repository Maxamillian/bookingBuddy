import React from 'react';
import { Link } from 'react-router-dom';

const StartPlanningButton = ({logIn}) => (
  <Link to="/" onClick={logIn} className="btn-large waves-effect waves-light orange" >
    Start Planning!
  </Link>
);

module.exports = StartPlanningButton;