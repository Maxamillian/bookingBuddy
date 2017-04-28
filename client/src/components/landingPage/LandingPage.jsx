import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import GetStartedSection from './LandingPageComponents/GetStarted.jsx';
import HowItWorksSection from './LandingPageComponents/HowItWorks.jsx';
import IntroMessageSection from './LandingPageComponents/IntroMessage.jsx';
import QuoteSection from './LandingPageComponents/Quote.jsx';
import ProcessStepsSection from './LandingPageComponents/ProcessSteps.jsx';

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $(document).ready(function() {
      $('.parallax').parallax();
    });
  }

  render() {
    return (
      <div>
        <div className="no-pad-bot" id="index-banner">
          {/* INTRO */}
          <IntroMessageSection />

          {/* How */}
          <HowItWorksSection />

          {/* QUOTE */}
          <QuoteSection />

          {/* PROCESS */}
          <ProcessStepsSection />

          {/* GET STARTED */}
          <GetStartedSection />

          {/* FOOTER */}
          <footer className="page-footer orange">
            <div className="footer-copyright">
              <div className="container">
              <span className="orange-text text-lighten-3">&copy; BookingBuddy</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default LandingPage;