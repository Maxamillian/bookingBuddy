import React, { Component } from 'react';
import ChatDemo from './ChatDemo.jsx';

class ProcessStepsSection extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {}

  render() {
    return (
      <div className="section homepage-section homepage-process">
        <div className="container">
          {/* STEP 1 */}
          <div className="section">
            <div className="row">
              <div className="col s12 m6">
                <h4 className="green-text">Create Your Trip</h4>
              </div>
              <div className="col s12 m6">
                <img className="responsive-img" src="/styles/images/bookingbuddy-trip-creation.jpg"/>
              </div>
            </div>
          </div>
          <div className="divider"></div>

          {/* STEP 2 */}
          <div className="section">
            <div className="row">
              <div className="col s12 m6">
                <img className="responsive-img" src="/styles/images/bookingbuddy-trip-room.jpg"/>
              </div>
              <div className="col s12 m6">
                <h4 className="green-text">View Customized Results</h4>
              </div>
            </div>
          </div>
          <div className="divider"></div>

          {/* STEP 3 */}
          <div className="section">
            <div className="row">
              <div className="col s12 m6">
                <h4 className="green-text">Collaborate With Your Buddies</h4>
              </div>
              <div className="col s12 m6">
                <ChatDemo />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProcessStepsSection;