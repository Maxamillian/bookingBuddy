import React, { Component } from 'react';
//import {friendsData} from '../../../tripRoom/data/friendsDummyData';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {worldCities} from '../../../../../../worldcities.js'

const FriendsLocationsList = ({friendsData}) => {
  console.log(friendsData,"friendsData!")
  var uniqueLocations = [];
  var friendsLocations;
  if (Object.keys(friendsData).length !== 0) {
    for (var key in friendsData) {
      if (friendsData[key].locations.length) {
        friendsLocations = friendsData[key].locations.map(
          (location, index) => {
          if (!uniqueLocations.includes(location)) {
            uniqueLocations.push(location);
          }
        });
      }  
    }
    var locations = uniqueLocations.map(
      (location, index) =>{
        return (
          <span className="checkbox" key={index}>
            <input type="checkbox" className="filled-in" id="filled-in-box" ></input>
            <label htmlFor="filled-in-box">{location}</label>
          </span>
        );
      });
    return (
      <div className="friendsBox"><p className="orange-text darken-2">These are the locations your friends have already selected:</p>
         <span>{locations}</span>
      </div>
    );
  } else {
    return null;
  }
};


const LocationsList = ({locations}) => {
  var locations = locations.map(
    (location, index) => {

    return (
      <span className="checkbox" key={index}>
        <input type="checkbox" className="filled-in" id="filled-in-box" checked="checked"></input>
        <label htmlFor="filled-in-box">{location}</label>
      </span>
    );
  });
  return (
     <div className="locationsList">
       {locations}
    </div>
  );
};


// class LocationCard extends Component {
//   constructor(props) {
//     super(props);
//     this.changeLocation = this.changeLocation.bind(this);
//     this.addLocation = this.addLocation.bind(this);
//   }

//   addLocation (e) {

//     e.preventDefault();

//     this.setState((prevState) => ({
//       locations: prevState.locations.concat(prevState.location),
//       location: ''
//     }));
//   }

  // addFriendsLocation (location) {

  //   this.setState((prevState) => ({
  //     locations: prevState.locations.concat(location),
  //   }));
  // }

  // changeLocation(e) {
  //   this.setState({
  //     location: e.target.value,
  //   });
  // }


var LocationCard = function({changeLocation, location, addLocation, locations, friendsData}) {
  return (
    <li className="locationAccordion">
      <div className="collapsible-header">
        <strong><i className="material-icons green-text darken-2">location_on</i>Location</strong>
      </div>
      <div className="collapsible-body">
        <div className="row">
          <div className="col s7">
            <div className="row locationInput">
              <div>
                <input type="text" id="autocomplete-input" className="autocomplete" placeholder="Tell us where you would like to go" onClick={changeLocation} onChange={changeLocation} value={location} />
              </div>
                  <button onClick={addLocation} className="btn btn-large orange">Add Location</button>
            </div>
            <LocationsList locations={locations} />
          </div>
          <div className="col s1">
          </div>
          <div className="col s4">
            <FriendsLocationsList friendsData={friendsData} />
          </div>
        </div>
      </div>
    </li>
  )
};

export default LocationCard;