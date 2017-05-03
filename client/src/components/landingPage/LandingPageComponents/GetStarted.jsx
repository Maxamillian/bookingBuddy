import React, { Component } from 'react';
import StartPlanningButton from './StartPlanningButton.jsx';

var GetStartedSection = function({logIn}) {

  return(
    <div className="parallax-container homepage-cta homepage-section">
      <div className="parallax">
        <img src="/styles/images/bookingbuddy-get-started.jpg" alt="photo" />
      </div>
      <div className="row center">
        <h4 className="header col s12 white-text">What are you waiting for?</h4>
      </div>
      <div className="row center">
        <StartPlanningButton logIn={logIn} />
      </div>
    </div>
  );
}

module.exports = GetStartedSection;