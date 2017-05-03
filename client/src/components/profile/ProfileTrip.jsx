import React, { Component} from 'react';
import { Link } from 'react-router-dom';

var ProfileTrip = function({trip, selectTrip}) {
  var handleClick = function(){
    selectTrip(trip.trip_id);
  }

  return (
    <li>
      <h5 onClick={handleClick} className="collapsible-header">
        {trip.name}
      </h5>
      <div className="collapsible-body center-align">
        <p className="center-align flow-text">{trip.description}</p>
        <Link className="orange btn" to="/trip-room">View Trip Room</Link>
        <Link className="orange btn" to="/trip-preferences">My Trip Preferences</Link>
      </div>
    </li>
  );
};

export default ProfileTrip;