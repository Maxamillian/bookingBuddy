import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StartPlanningButton from './StartPlanningButton.jsx';

var IntroMessageSection = function({logIn}) {

  var headingStyle = {
    fontWeight: "bold",
    textShadow: "1px 1px 0 rgba(0,0,0,.35)"
  };

  return(
    <div className="parallax-container homepage-intro homepage-section">
      <div className="container">
        <div className="parallax">
          <img src="/styles/images/bookingbuddy-homepage-intro.jpg" alt="photo" />
        </div>
        <div className="row center">
          <h1 className="header center orange-text" style={headingStyle}>Plan Group Travel</h1>
          <h5 className="header col s12 white-text">Make planning a trip with your friends fun and social</h5>
        </div>
        <div className="row center">
          <StartPlanningButton logIn={logIn} />
        </div>
      </div>
    </div>
  );
}

module.exports = IntroMessageSection;