import React, { Component } from 'react';

var QuoteSection = function() {

  return(
    <div className="parallax-container homepage-intro homepage-section">
      <div className="parallax">
        <img src="http://aweinclusive.com/wp-content/uploads/2013/03/Beachchairs.jpg" alt="photo" />
      </div>
      <div className="row center">
        <h4 className="header col s12">"The social way to plan group travel"</h4>
        <h5 className="header col s12">- Cara</h5>
      </div>
    </div>
  );
}

module.exports = QuoteSection;