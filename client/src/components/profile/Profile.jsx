import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import 'materialize-css';
import $ from 'jquery';
//import {tripsArray} from '../tripRoom/data/tripRoomDummyData';


import ProfileUserInfo from './ProfileUserInfo.jsx';
import ProfileTripsList from './ProfileTripsList.jsx';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tripsArray: [],
    };
  }

  componentWillMount() {
  //this ajax request will get all trips assiciated with any user according to thier email address
    //only thing that will change is the email address from the data object below
    var email = this.props.profile.email;
    var name = this.props.profile.name;
    var getTrips = this.getTripNames;
    getTrips = getTrips.bind(this);
    setTimeout(()=>{getTrips(email, name)}, 1000);
  }

  getTripNames(email, name){

    $.ajax({
      type: 'POST',
      url: '/userTripNames',
      dataType: 'json',
      data: { email : email,
              name: name },
      success: function(data) {
        this.setState({tripsArray:data});
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="Profile section">
        <div className="container">
          <div className="row">
            <div className="col m4">
              <ProfileUserInfo profile={this.props.profile} />
            </div>
            <div className="col m8">
              <div className="ProfileTrips">
                <h2 className="header orange-text">Current Trips</h2>
                <ProfileTripsList userTripsArr={this.state.tripsArray} selectTrip={this.props.selectTrip} />
                <div className="divider"></div>
                <div className="section center-align">
                  <Link className="orange btn" to="/trip-create">CREATE NEW TRIP</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;