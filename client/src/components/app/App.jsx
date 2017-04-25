import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  NavLink
} from 'react-router-dom';
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN
} from '../../../../env.config.js';

// Components
import NavBarLinks from './NavBarLinks.jsx';
import Profile from '../profile/Profile.jsx';
import LandingPage from '../landingPage/LandingPage.jsx';
import StartPlanning from '../startPlanning/StartPlanning.jsx';
import TripRoom from '../tripRoom/TripRoom.jsx';
import TripCreationForm from '../startPlanning/startPlanningComponents/TripCreationForm.jsx';
import TripPreferencesForm from '../startPlanning/startPlanningComponents/TripPreferencesForm.jsx';
import PostRegistration from '../authentication/PostRegistration.jsx';
import AboutUs from '../AboutUs.jsx';

// Auth
import AuthService from '../../auth/AuthService';

class App extends Component {

  constructor (props) {
    super(props);
    this.logInOrOut = this.logInOrOut.bind(this);
    this.selectTrip = this.selectTrip.bind(this);
    this.state = {
      isLoggedIn: false,
      profile: {},
      trip_id:''
    };

    this.auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN);

    this.auth.on('profile_updated', (newProfile) => {
      this.setState({
        profile: newProfile,
        isLoggedIn: true
      });
    });
  }

  logInOrOut() {
    if (!this.state.isLoggedIn) {
      this.auth.login();
    } else {
      this.auth.logout();
      this.setState({
        profile: {},
        isLoggedIn: false
      });
    }
  }

  selectTrip(tripId) {
    this.setState({
      trip_id: tripId
    });
  }

  render() { return (
    <div className="App">
      <Router>
        <div>
          <div className="navbar-fixed">
            <NavBarLinks isLoggedIn={this.state.isLoggedIn} logInOrOut={this.logInOrOut}/>
          </div>
          <div>
            <Route exact path="/"
              render={() =>
                !this.state.isLoggedIn ? <LandingPage /> : <Redirect to='/profile' />
            } />
            <Route path="/profile"
              render={() => <Profile profile={this.state.profile} selectTrip={this.selectTrip} /> }
            />
            <Route exact path="/landingPage" render={() => <LandingPage />} />
            <Route path="/start-planning"
              render={() => <StartPlanning profile={this.state.profile} userEmail={this.state.profile.email} tripId={this.state.trip_id} /> } />
            <Route path="/trip-room"
              render={() => <TripRoom profile={this.state.profile} tripId={this.state.trip_id} /> } />
            <Route path="/about-us" component={AboutUs} />
          </div>
        </div>
      </Router>
    </div>
  )};
};

//<Route path="/postRegistration" component={PostRegistration}/>

// Export module
export default App;