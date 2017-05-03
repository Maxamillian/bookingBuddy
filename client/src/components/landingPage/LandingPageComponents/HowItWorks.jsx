import React from 'react';

var HowItWorksSection = function() {

  return(
    <div className="section homepage-section">
      <div className="container">
        <div className="row">
          <h5 className="header col s12 center-align">We make it easy to find trips that your whole group can and wants to go on!</h5>
        </div>
        <div className="row">
          {/* BLOCK 1 */}
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center green-text darken-2"><i className="material-icons">location_on</i></h2>
              <h5 className="center">Location</h5>
              <p className="center"> Choose one or several destinations that you'd like to travel to. View your buddies' selections as you fill in your own. Agree with their ideas and throw out new ideas as well! Everyone can vote on their favorites and continue to add to this list at any time.</p>
            </div>
          </div>
          {/* BLOCK 2 */}
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center green-text darken-2"><i className="material-icons">today</i></h2>
              <h5 className="center">Date</h5>
              <p className="center"> Which dates are you available? When you and your buddies pick dates, the whole group can see them in order to figure out what works best for everyone. Are your dates not working out? We make it easy to sync up your calendars so you can start enjoying the fun parts of planning your vacation!</p>
            </div>
          </div>
          {/* BLOCK 3 */}
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center bling-header green-text darken-2">$</h2>
              <h5 className="center">Budget</h5>
              <p className="center"> We're all on a budget... but we're not always on the same budget. We'll take those awkward moments out of traveling with friends. Let us know how much you can spend and we'll find trip options that work for everyone, without breaking the bank.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = HowItWorksSection;