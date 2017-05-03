import React, { Component } from 'react';
import TripMemberInvitesForm from './TripMemberInvitesForm.jsx';
import {worldCities} from '../../../../../worldcities.js'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const LocationsList = ({locations}) => {

  var locations = locations.map(
    (location, index) => {

    return (
      <div key={index}>
        <input type="checkbox" className="filled-in" id="filled-in-box" checked="checked"></input>
        <label htmlFor="filled-in-box">{location}</label>
      </div>
    );
  });
  return (
    <div>
       <span>{locations}</span>
    </div>
  );
};

class TripCreationForm extends Component {

  constructor(props) {
    super(props);
    this.changeTripName = this.changeTripName.bind(this);
    this.changeTripSummary = this.changeTripSummary.bind(this);
    this.changeLocation = this.changeLocation.bind(this);
    this.addLocation = this.addLocation.bind(this);
    this.changeHotelBudget = this.changeHotelBudget.bind(this);
    this.changeActivitiesBudget = this.changeActivitiesBudget.bind(this);
    this.changeFlightBudget = this.changeFlightBudget.bind(this);
    this.changeDuration = this.changeDuration.bind(this);
    this.changeBeginDate = this.changeBeginDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.submitNewTrip = this.submitNewTrip.bind(this);
    this.inviteNewBuddy = this.inviteNewBuddy.bind(this);
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
      membersInvited: [],
      tripName: '',
      tripSummary: ''
    };
  }

  addLocation (e) {

    e.preventDefault();

    this.setState((prevState) => ({
      locations: prevState.locations.concat(prevState.location),
      location: ''
    }));
  }

  preserveLocation() {
    tripData.locations = this.state.locations;
    console.log(tripData, "Adding Locations!");
  }


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

  inviteNewBuddy(buddy){
    var newInvites = this.state.membersInvited.slice();
    newInvites.push(buddy);
    console.log('newInvites in inviteBuddy method: ', newInvites);
    this.setState({
      membersInvited: newInvites
    });
  }


  changeTripName(e) {
    this.setState({
      tripName: e.target.value,
    });
  }

  changeTripSummary(e) {
    this.setState({
      tripSummary: e.target.value
    });
  }

  stillNotFilledIn() {

    var incompleteFields = [];

    if(this.state.tripName === '' || this.state.tripSummary === ''){
      incompleteFields.push('Trip Idea');
    }
    if(this.state.locations.length === 0){
      incompleteFields.push('Locations');
    }
    if(this.state.beginDate === '' || this.state.endDate === ''){
      incompleteFields.push('When');
    }

    return incompleteFields;
  }

  submitNewTrip(e) {
    var incompleteFields = this.stillNotFilledIn();
    if(incompleteFields.length){
      e.preventDefault();
      alert('Please finish completing the following sections first: ' + incompleteFields.join(', '));
    } else {
      var obj = this.state;
      obj.name = this.props.profile.name;
      obj.email = this.props.profile.email;
      console.log('sending this newTrip data to the db!', obj);
      $.ajax({
        type: 'POST',
        url: '/createTrip',
        dataType: 'json',
        data: obj,
        success: function(data) {
          $.ajax({
            type: 'POST',
            url: '/email',
            dataType: 'json',
            data: obj,
            success: function(data) {
              console.log('New trip created' , data);
            }.bind(this)
          });
        }.bind(this)
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <ul className="collapsible popout" data-collapsible="accordion">
            <li>
              <div className="collapsible-header">
                <strong>
                  <i className="material-icons green-text darken-2">info_outline</i>
                  Trip Idea
                </strong>
              </div>
              <div className="collapsible-body">
                <div className="input-field col s12">
                  <input placeholder="Trip Name" className="validate" onChange={this.changeTripName} value={this.state.tripName} /> <br />
                </div>
                <div className="input-field col s12">
                  <textarea className="materialize-textarea" placeholder="Trip Description" onChange={this.changeTripSummary} defaultValue={this.state.tripSummary}/>
                </div>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <strong>
                  <i className="material-icons green-text darken-2">perm_identity</i>
                  Invite Buddies
                </strong>
              </div>
              <div className="collapsible-body">
                <TripMemberInvitesForm inviteNewBuddy={this.inviteNewBuddy}/>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <strong><i className="material-icons green-text darken-2">location_on</i>Location</strong>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="col s8">
                    <input type="text" id="autocomplete-input" className="autocomplete" placeholder="Tell us where you would like to go" onClick={this.changeLocation} onChange={this.changeLocation} value={this.state.location} />
                  </div>
                  <div className="col s4">
                    <button onClick={this.addLocation} className="btn btn-large orange">Add Location</button>
                  </div>
                  <div>
                    <LocationsList locations={this.state.locations} />
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="collapsible-header">
                <strong><i className="material-icons green-text darken-2">schedule</i>Durations</strong>
              </div>
              <div className="collapsible-body">
                <div className="row">
                  <div className="input-field col s12">
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
                </div>
              </div>
            </li>
            <li>
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
            </li>
            <li>
              <div className="collapsible-header">
                <strong><p className="bling green-text darken-2">$</p>Budget</strong>
              </div>
              <div className="collapsible-body">
                <form action="#">
                  <p className="bling green-text darken-2">
                    <strong>Total Budget: ${this.state.totalBudget}</strong>
                  </p>
                </form>
                <span className="col s10">What's your nightly budget for <b>hotel</b> accommodations?</span>
                <span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.hotelBudget}</strong></span>
                <form action="#">
                  <p className="range-field">
                    <input type="range"  min="0" max="1500" step="25" onChange={this.changeHotelBudget} value={this.state.hotelBudget} />
                  </p>
                </form>
                <span className="col s10">How much can you spend on <b>flight</b> travel?</span><span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.flightBudget}</strong></span>
                <form action="#">
                  <p className="range-field">
                    <input type="range"  min="0" max="5000" step="100" onChange={this.changeFlightBudget} value={this.state.flightBudget}/>
                  </p>
                </form>
                <span className="col s10">What's your daily budget for <b>activities</b>?</span>
                <span id="totalBudget" className="bling green-text darken-2"><strong>${this.state.activitiesBudget}</strong></span>
                <form action="#">
                  <p className="range-field">
                    <input type="range" min="0" max="1000" step="10" onChange={this.changeActivitiesBudget} value={this.state.activitiesBudget}/>
                  </p>
                </form>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <Link className="orange btn" onClick={this.submitNewTrip} to="/profile"> Create Trip </Link>
        </div>
      </div>
    );
  }
}

export default TripCreationForm;