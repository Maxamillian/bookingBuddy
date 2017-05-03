import React, { Component } from 'react';
import LocationCard from './TripPreferencesComponents/LocationCard.jsx';
import DurationsCard from './TripPreferencesComponents/DurationsCard.jsx';
import WhenCard from './TripPreferencesComponents/WhenCard.jsx';
import BudgetCard from './TripPreferencesComponents/BudgetCard.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import {worldCities} from '../../../../../worldcities.js'


const calculateTotalBudget = function(duration, hotel, activities, flight){
  return duration * (hotel + activities) + flight;
}

var convertDateFormat = function(mmddyyyy){
  var arr = mmddyyyy.split('/');
  var yyyymmdd = arr[2] + '-' + arr[0] + '-' + arr[1];
  return yyyymmdd;
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
    this.updateUserTripPreferences = this.updateUserTripPreferences.bind(this);
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
      friendsData: undefined
      //membersInvited: [],
      //tripName: '',
      //tripSummary: ''
    };
  }

  componentWillMount() {
    //this ajax request will get get the user's current preferences for this trip, if they exist
    // if this is the user's first time visiting the form then they will not have any prior preferences stored
      //in this case the server will send back ... ? undefined? 404? null? 'forget about it' ?

    this.getUserTripPreferences(this.props.userEmail, this.props.tripId);
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
         this.handleData(data);
      }.bind(this)
    });
  }

  handleData(data) {
    var name = this.props.profile.name;

    if(data[name]){

    var totalBudget = calculateTotalBudget(data[name].duration, data[name].hotelBudget, data[name].activitiesBudget, data[name].flightBudget);

      this.setState({
        locations: data[name].locations || [],
        hotelBudget: data[name].hotelBudget || 0,
        activitiesBudget: data[name].activitiesBudget || 0,
        flightBudget: data[name].flightBudget || 0,
        duration: data[name].duration || 1,
        beginDate: data[name].beginDate ? convertDateFormat(data[name].beginDate): '',
        endDate: data[name].endDate ? convertDateFormat(data[name].endDate): '',
        totalBudget: totalBudget || 0
      });
    }

    delete data[name];

    this.setState({
      friendsData: data
    });
  }

  stillNotFilledIn() {

    var incompleteFields = [];

    if(this.state.locations.length === 0){
      incompleteFields.push('Locations');
    }
    if(this.state.beginDate === '' || this.state.endDate === ''){
      incompleteFields.push('When');
    }

    return incompleteFields;
  }

  updateUserTripPreferences(e){
    var incompleteFields = this.stillNotFilledIn();
    if(incompleteFields.length){
      e.preventDefault();
      alert('Please finish completing the following sections first: ' + incompleteFields.join(', '));
    } else {
      var obj = this.state;
      obj.email = this.props.userEmail
      obj.tripId = this.props.tripId
      $.ajax({
        type: 'POST',
        url: '/updateUserTripPreferences',
        dataType: 'json',
        data: obj,
        success: function(data) {
          this.setState(data);
        }.bind(this)
      });
    }
  }


  updateUserTripPreferences(){
    //getPrefereces specific to a user and trip
      //data returned should follow formate of state
      var obj = this.state;
      obj.email = this.props.userEmail
      obj.tripId = this.props.tripId
      console.log("updateUserTripPreferences!!");
    $.ajax({
      type: 'POST',
      url: '/updateUserTripPreferences',
      dataType: 'json',
      data: obj,
      success: function(data) {
        console.log(data, "Updated User Preferences");
        this.setState(data);
        console.log(this.state);
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
    this.setState({
      beginDate: e.target.value,
    });
  }
  changeEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }


  componentDidUpdate() {
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
    }).bind(this)).bind(this);
  }

  render() {
    if(this.state.friendsData === undefined){
      return (<div>Loading...</div>);
    }
    return (
      <div className="container section">
        <div className="row">
          <ul className="collapsible popout" data-collapsible="accordion">

            <LocationCard friendsData={this.state.friendsData}
                          location={this.state.location}
                          locations={this.state.locations}
                          changeLocation={this.changeLocation}
                          addLocation={this.addLocation} />

            <DurationsCard friendsData={this.state.friendsData}
                           duration={this.state.duration}
                           changeDuration={this.changeDuration} />

            <WhenCard friendsData={this.state.friendsData}
                      changeBeginDate={this.changeBeginDate}
                      changeEndDate={this.changeEndDate}
                      beginDate={this.state.beginDate}
                      endDate={this.state.endDate} />


            <BudgetCard friendsData={this.state.friendsData}
                        activitiesBudget={this.state.activitiesBudget}
                        hotelBudget={this.state.hotelBudget}
                        flightBudget={this.state.flightBudget}
                        changeActivitiesBudget={this.changeActivitiesBudget}
                        changeHotelBudget={this.changeHotelBudget}
                        changeFlightBudget={this.changeFlightBudget}
                        totalBudget={this.state.totalBudget} />

          </ul>
          <div>
        </div>
        </div>
        <Link className="orange btn" onClick={this.updateUserTripPreferences} to="/profile">Update Preferences</Link>
      </div>
    );
  }
}


export default TripPreferencesForm;





// const FriendsLocationsList = ({friendsData}) => {
//   var uniqueLocations = [];
//   var friendsLocations;
//   if (Object.keys(friendsData).length !== 0) {
//     for (var key in friendsData) {
//       friendsLocations = friendsData[key].locations.map(
//         (location, index) => {
//         if (!uniqueLocations.includes(location)) {
//           uniqueLocations.push(location);
//         }
//       });
//     }
//     var locations = uniqueLocations.map(
//       (location, index) =>{
//         return (
//           <span className="checkbox" key={index}>
//             <input type="checkbox" className="filled-in" id="filled-in-box" ></input>
//             <label htmlFor="filled-in-box">{location}</label>
//           </span>
//         );
//       });
//     return (
//       <div>
//         <p className="orange-text darken-2">These are the locations your friends have already selected:</p>
//         <span>{locations}</span>
//       </div>
//     );
//   }
// };

// const FriendNights = ({friendsData}) => {
//   //var friendsNights = function() {
//   var keys = Object.keys(friendsData);
//   if (keys.length !== 0) {
//     var lowest = friendsData[keys[0]].duration;
//     for (var i = 0; i < keys.length; i++) {
//       if(lowest > friendsData[keys[i]].duration) {
//           lowest = friendsData[keys[i]].duration;
//       }
//     }
//     var highest = friendsData[keys[0]].duration;
//     for (var i = 0; i < keys.length; i++) {
//       if(highest < friendsData[keys[i]].duration) {
//           highest = friendsData[keys[i]].duration;
//       }
//     }
//     return (
//       <div className="friendsBox col s5">
//         <p className="icon-block orange-text darken-2">Your friends chose between {lowest} and {highest} nights for their trip</p>
//       </div>
//     )
//   }
// };


// const FriendBudget = ({friendsData}) => {
//   var keys = Object.keys(friendsData);
//   if (keys.length !== 0) {
//     var lowest = friendsData[keys[0]].duration * (friendsData[keys[0]].hotelBudget + friendsData[keys[0]].activitiesBudget) + friendsData[keys[0]].flightBudget;
//     for (var i = 0; i < keys.length; i++) {
//       var currentL = friendsData[keys[i]].duration * (friendsData[keys[i]].hotelBudget + friendsData[keys[i]].activitiesBudget) + friendsData[keys[i]].flightBudget;
//       if(lowest > currentL) {
//         lowest = currentL;
//       }
//     }
//     var highest = friendsData[keys[0]].duration * (friendsData[keys[0]].hotelBudget + friendsData[keys[0]].activitiesBudget) + friendsData[keys[0]].flightBudget;
//     for (var i = 0; i < keys.length; i++) {
//       var currentH = friendsData[keys[i]].duration * (friendsData[keys[i]].hotelBudget + friendsData[keys[i]].activitiesBudget) + friendsData[keys[i]].flightBudget;
//       if(highest < currentH) {
//         highest = currentH;
//       }
//     }
//     return (
//       <div className="friendsBox orange-text darken-2">Your friends' total budgets are currently between ${lowest} and ${highest} for this trip</div>
//     )
//   }
// };


// const LocationsList = ({locations}) => {
//   var locations = locations.map(
//     (location, index) => {

//     return (
//       <span className="checkbox" key={index}>
//         <input type="checkbox" className="filled-in" id="filled-in-box" checked="checked"></input>
//         <label htmlFor="filled-in-box">{location}</label>
//       </span>
//     );
//   });
//   return (
//     <div className="locationsList">
//        {locations}
//     </div>
//   );
// };