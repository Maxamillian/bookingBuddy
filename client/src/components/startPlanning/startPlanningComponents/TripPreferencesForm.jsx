import React, { Component } from 'react';
import LocationCard from './TripPreferencesComponents/LocationCard.jsx';
import DurationsCard from './TripPreferencesComponents/DurationsCard.jsx';
import WhenCard from './TripPreferencesComponents/WhenCard.jsx';
import BudgetCard from './TripPreferencesComponents/BudgetCard.jsx';
import {tripData} from '../../tripRoom/data/tripRoomDynamicData';
import {friendsData} from '../../tripRoom/data/friendsDummyData';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import {worldCities} from '../../../../../worldcities.js'

const FriendsLocationsList = ({friendsData}) => {
  console.log(friendsData,"friendsData!")
  var uniqueLocations = [];
  var friendsLocations;
  if (Object.keys(friendsData).length !== 0) {
    for (var key in friendsData) {
      friendsLocations = friendsData[key].locations.map(
        (location, index) => {
        if (!uniqueLocations.includes(location)) {
          uniqueLocations.push(location);
        }
      });
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
      <div>
        <p className="orange-text darken-2">These are the locations your friends have already selected:</p>
        <span>{locations}</span>
      </div>
    );
  }
};

const FriendNights = ({friendsData}) => {
  //var friendsNights = function() {
  console.log(friendsData);
  var keys = Object.keys(friendsData);
  if (keys.length !== 0) {
    var lowest = friendsData[keys[0]].duration;
    for (var i = 0; i < keys.length; i++) {
      if(lowest > friendsData[keys[i]].duration) {
          lowest = friendsData[keys[i]].duration;
      }
    }
    var highest = friendsData[keys[0]].duration;
    for (var i = 0; i < keys.length; i++) {
      if(highest < friendsData[keys[i]].duration) {
          highest = friendsData[keys[i]].duration;
      }
    }
    return (
      <div className="friendsBox col s5">
        <p className="icon-block orange-text darken-2">Your friends chose between {lowest} and {highest} nights for their trip</p>
      </div>
    )
  }
};


const FriendBudget = ({friendsData}) => {
  var keys = Object.keys(friendsData);
  if (keys.length !== 0) {
    var lowest = friendsData[keys[0]].duration * (friendsData[keys[0]].hotelBudget + friendsData[keys[0]].activitiesBudget) + friendsData[keys[0]].flightBudget;
    for (var i = 0; i < keys.length; i++) {
      var currentL = friendsData[keys[i]].duration * (friendsData[keys[i]].hotelBudget + friendsData[keys[i]].activitiesBudget) + friendsData[keys[i]].flightBudget;
      if(lowest > currentL) {
        lowest = currentL;
      }
    }
    var highest = friendsData[keys[0]].duration * (friendsData[keys[0]].hotelBudget + friendsData[keys[0]].activitiesBudget) + friendsData[keys[0]].flightBudget;
    for (var i = 0; i < keys.length; i++) {
      var currentH = friendsData[keys[i]].duration * (friendsData[keys[i]].hotelBudget + friendsData[keys[i]].activitiesBudget) + friendsData[keys[i]].flightBudget;
      if(highest < currentH) {
        highest = currentH;
      }
    }
    return (
      <div className="friendsBox orange-text darken-2">Your friends' total budgets are currently between ${lowest} and ${highest} for this trip</div>
    )
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


class TripPreferencesForm extends Component {
  constructor(props) {
    super(props);
    this.changeLocation = this.changeLocation.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.changeHotelBudget = this.changeHotelBudget.bind(this);
    this.changeActivitiesBudget = this.changeActivitiesBudget.bind(this);
    this.changeFlightBudget = this.changeFlightBudget.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeBeginDate = this.changeBeginDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.handleData = this.handleData.bind(this);
    this.state = {
      locations: [],
      hotelBudget: 0,
      activitiesBudget: 0,
      flightBudget: 0,
      duration: 1,
      beginDate: '',
      endDate: '',
      location: '',
      totalBudget: 0,
      friendsLocations: [],
      friendsData: friendsData
      //membersInvited: [],
      //tripName: '',
      //tripSummary: ''
    };
  }

  componentWillMount() {
    //this ajax request will get get the user's current preferences for this trip, if they exist
    // if this is the user's first time visiting the form then they will not have any prior preferences stored
      //in this case the server will send back ... ? undefined? 404? null? 'forget about it' ?
    console.log('getting current tripPreferences for user ' + this.props.userEmail + ' for trip # ' + this.props.tripId);

    this.getUserTripPreferences(this.props.userEmail, this.props.tripId);
    console.log("profile:", this.props.profile)
  }

  getUserTripPreferences(email, tripId){
    //getPrefereces specific to a user and trip
      //data returned should follow formate of state
    $.ajax({
      type: 'POST',
      url: '/getTripPreferences',
      dataType: 'json',
      data: { email : email,
              tripId : tripId
            },
      success: function(data) {
        console.log(data, "User Trip Preferences");
         //this.setState(data);
         this.handleData(data);
      }.bind(this)
    });
  }

  handleData(data) {
    //var profile = this.props.profile;
    var name = this.props.profile.name;
    this.setState({
      locations: data[name].locations,
      hotelBudget: data[name].hotelBudget,
      activitiesBudget: data[name].activitiesBudget,
      flightBudget: data[name].flightBudget,
      duration: data[name].duration,
      beginDate: data[name].beginDate,
      endDate: data[name].endDate
    })
  }

  // getFriendsTripPreferences(email, tripId){
  //   //getPrefereces specific to a user and trip
  //     //data returned should follow formate of state
  //   $.ajax({
  //     type: 'POST',
  //     url: '/getTripPreferences',
  //     dataType: 'json',
  //     data: { email : email,
  //             tripId : tripId
  //           },
  //     success: function(data) {
  //       console.log(data, "TP");
  //       // this.setState(data);
  //     }.bind(this)
  //   });
  // }

  // submitTripPreferences(email, tripId){
  //  var UpdatedDataObject = {
  //    locations: [],
      // hotelBudget: this.state.hotelBudget,
      // activitiesBudget: this.state.activitiesBudget,
      // flightBudget: 0,
      // duration: 1,
      // beginDate: '',
      // endDate: '',}
  //   //getPrefereces specific to a user and trip
  //     //data returned should follow formate of state
  //   $.ajax({
  //     type: 'POST',
  //     url: '/getTripPreferences',
  //     dataType: 'json',
  //     data: { email : email,
  //             tripId : tripId
  //           },
  //     success: function(data) {
  //       console.log(data, "TP");
  //       // this.setState(data);
  //     }.bind(this)
  //   });
  // }


  updateUserTripPreferences(email, tripId, state){
    //getPrefereces specific to a user and trip
      //data returned should follow formate of state
      state.email = email;
      state.tripId = tripId;
    $.ajax({
      type: 'POST',
      url: '/updateUserTripPreferences',
      dataType: 'json',
      data: state,
      success: function(data) {
        console.log(data, "Updated User Preferences");
        // this.setState(data);
      }.bind(this)
    });
  }


  addLocation (e) {

    e.preventDefault();

    this.setState((prevState) => ({
      locations: prevState.locations.concat(prevState.location),
      location: ''
    }));
  }

  addFriendsLocation (location) {

    this.setState((prevState) => ({
      locations: prevState.locations.concat(location),
    }));
  }

  // preserveLocation() {
  //   tripData.locations = this.state.locations;
  //   console.log(tripData, "Adding Locations!");
  // }

  // preserveFriendsLocation() {
  //   friendsData.locations = this.state.friendslocations;
  //   console.log(friendsData, "Adding Locations!");
  // }


  changeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  changeDuration(e) {
    var updatedBudget = parseInt(e.target.value) * (this.state.hotelBudget + this.state.activitiesBudget) + this.state.flightBudget;
    this.setState({
      totalBudget: updatedBudget,
      duration: parseInt(e.target.value),
    });
  }

  changeHotelBudget(e) {
    var updatedBudget = this.state.duration * (parseInt(e.target.value) + this.state.activitiesBudget) + this.state.flightBudget;
    this.setState({
      totalBudget: updatedBudget,
      hotelBudget: parseInt(e.target.value),
    });
  }

  changeActivitiesBudget(e) {
    var updatedBudget = this.state.duration * (this.state.hotelBudget + parseInt(e.target.value)) + this.state.flightBudget;
    this.setState({
      totalBudget: updatedBudget,
      activitiesBudget: parseInt(e.target.value),
    });
  }

  changeFlightBudget(e) {
    var updatedBudget = this.state.duration * (this.state.hotelBudget + this.state.activitiesBudget) + parseInt(e.target.value);
    this.setState({
      totalBudget: updatedBudget,
      flightBudget: parseInt(e.target.value),
    });
  }

  changeBeginDate(e) {
    console.log(e.target.value);
    this.setState({
      beginDate: e.target.value,
    });
  }
  changeEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }


  componentDidMount() {
    $(document).ready((function() {
      $('.collapsible').collapsible();
      $('select').material_select();
      $('input.autocomplete').autocomplete({
        data: worldCities,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: (function(val) {
          this.setState({location: val});
          // Callback function when value is autcompleted.
        }).bind(this),
        minLength: 3, // The minimum length of the input for the autocomplete to start. Default: 1.
      }).bind(this);
      // $('.datepicker').pickadate({
      //   selectMonths: true, // Creates a dropdown to control month
      //   selectYears: 15 // Creates a dropdown of 15 years to control year
      // }).on("submit", this.changeBeginDate);
    }).bind(this)).bind(this);
  }

  render() {
    return (
      <div className="section">
        <div className="row">
          <ul className="collapsible popout" data-collapsible="accordion">
            {/* LOCATIONS 
            <li className="locationAccordion">
              <div className="collapsible-header">
                <strong><i className="material-icons green-text darken-2">location_on</i>Location</strong>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="col s7">
                    <div className="row locationInput">
                      <div>
                        <input type="text" id="autocomplete-input" className="autocomplete" placeholder="Tell us where you would like to go" onClick={this.changeLocation} onChange={this.changeLocation} value={this.state.location} />
                      </div>
                      <button onClick={this.addLocation} className="btn btn-large orange">Add Location</button>
                    </div>
                    <LocationsList locations={this.state.locations} />
                  </div>
                  <div className="col s1">
                  </div>
                  <div className="friendsBox col s4">
                    <FriendsLocationsList friendsData={this.state.friendsData} />
                  </div>
                </div>
              </div>
            </li>*/}

            <LocationCard friendsData={this.state.friendsData}  location={this.state.location} locations={this.state.locations} changeLocation={this.changeLocation} addLocation={this.addLocation} />


            {/* DURATIONS 

            <li className="durationsAccordion">
              <div className="collapsible-header">
                <strong><i className="material-icons green-text darken-2">schedule</i>Durations</strong>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="input-field col s7">
                    <p>Tell us how many nights you want to spend on your getaway?</p>
                      <form action="#">
                        <p id="totalNights" className="bling green-text darken-2"><strong>Nights: {this.state.duration} </strong></p>
                      </form>
                      <form action="#">
                      <p className="range-field">
                      <input type="range" min="1" max="28" onChange={this.changeDuration} value={this.state.duration} />
                      </p>
                      </form>
                    </div>

                        <FriendNights friendsData={this.state.friendsData}/>

                  </div>
                </div>
              </li> */}

             

              <DurationsCard friendsData={this.state.friendsData}  duration={this.state.duration} changeDuration={this.changeDuration} />

              {/* WHEN 

              <li className="whenAccordion">
                <div className="collapsible-header">
                <strong><i className="material-icons green-text darken-2">today</i>When</strong>
                </div>
                <div className="collapsible-body">
                  <div className="row">
                    <div className="col s12">
                      <p>Tell us when you would like to go on your trip?</p>
                    </div>
                  </div>
                  <div className="row">
                    <form action="#">
                    <div className="col s6">
                      <input type="date" className="datepicker" placeholder="Select a start date:" onChange={this.changeBeginDate} value={this.state.beginDate}></input>
                    </div>
                    </form>
                    <form action="#">
                    <div className="col s6">
                      <input type="date" className="datepicker" placeholder="Select an end date:" onChange={this.changeEndDate} value={this.state.endDate}></input>
                    </div>
                    </form>
                  </div>
                </div>
            </li>  */}

            <WhenCard friendsData={this.state.friendsData} changeBeginDate={this.changeBeginDate}changeEndDate={this.changeEndDate} beginDate={this.state.beginDate} endDate={this.state.endDate} />


             {/* BUDGET 

            <li className="budgetAccordion">
              <div className="collapsible-header">
                <strong><span className="bling green-text darken-2">$</span>Budget</strong>
              </div>
              <div className="collapsible-body">
                <form action="#">
                  <p className="bling green-text darken-2">
                    <strong>Total Budget: ${this.state.totalBudget}</strong>
                  </p>
                </form>
                <div className="row">
                  <div className="col s9">
                    <span>What's your nightly budget for <strong>hotel</strong> accommodations?</span>
                    <span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.hotelBudget}</strong></span>
                    <form action="#">
                      <p className="range-field">
                      <input type="range"  min="0" max="1500" step="25" onChange={this.changeHotelBudget} value={this.state.hotelBudget} />
                      </p>
                    </form>
                    <span>How much can you spend on <strong>flight</strong> travel?</span>
                    <span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.flightBudget}</strong></span>
                    <form action="#">
                      <p className="range-field">
                      <input type="range"  min="0" max="5000" step="100" onChange={this.changeFlightBudget} value={this.state.flightBudget}/>
                      </p>
                    </form>
                    <span>What's your daily budget for <strong>activities</strong>?</span>
                    <span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.activitiesBudget}</strong></span>
                    <form action="#">
                      <p className="range-field">
                      <input type="range" min="0" max="1000" step="10" onChange={this.changeActivitiesBudget} value={this.state.activitiesBudget}/>
                      </p>
                    </form>
                  </div>
                  <div className="col s3">
                    <FriendBudget friendsData={this.state.friendsData} />
                  </div>
                </div>
              </div>
            </li> */}

            <BudgetCard friendsData={this.state.friendsData} activitiesBudget={this.state.activitiesBudget} hotelBudget={this.state.hotelBudget} flightBudget={this.state.flightBudget} changeActivitiesBudget={this.changeActivitiesBudget} changeHotelBudget={this.changeHotelBudget} changeFlightBudget={this.changeFlightBudget} totalBudget={this.state.totalBudget}/>
          </ul>
        </div>
      </div>
    );
  }

}

// const TripPreferencesForm = () => (
//   <h2>Trip Preferences Form</h2>
// );
export default TripPreferencesForm;