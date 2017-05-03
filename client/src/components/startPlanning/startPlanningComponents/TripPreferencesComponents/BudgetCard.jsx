import React, { Component } from 'react';
// import {friendsData} from '../../../tripRoom/data/friendsDummyData';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const FriendBudget = ({friendsData}) => {
  console.log("friendsData!", friendsData);
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
    if (keys.length < 2) {
      return (
         <div className="friendsBox orange-text darken-2">Your friend's total budget is currently  ${highest} for this trip</div>
      )
    }  
  return (
       <div className="friendsBox orange-text darken-2">Your friends' total budgets are currently between ${lowest} and ${highest} for this trip</div>
  )
  } else {
    return null;
  }
};

// class BudgetCard extends Component {
//   constructor(props) {
//     super(props);
//     this.changeHotelBudget = this.changeHotelBudget.bind(this);
//     this.changeActivitiesBudget = this.changeActivitiesBudget.bind(this);
//     this.changeFlightBudget = this.changeFlightBudget.bind(this);
//   }

//   changeHotelBudget(e) {
//     var updatedBudget = this.state.duration * (parseInt(e.target.value) + this.state.activitiesBudget) + this.state.flightBudget;
//     this.setState({
//       totalBudget: updatedBudget,
//       hotelBudget: parseInt(e.target.value),
//     });
//   }

//   changeActivitiesBudget(e) {
//     var updatedBudget = this.state.duration * (this.state.hotelBudget + parseInt(e.target.value)) + this.state.flightBudget;
//     this.setState({
//       totalBudget: updatedBudget,
//       activitiesBudget: parseInt(e.target.value),
//     });
//   }

//   changeFlightBudget(e) {
//     var updatedBudget = this.state.duration * (this.state.hotelBudget + this.state.activitiesBudget) + parseInt(e.target.value);
//     this.setState({
//       totalBudget: updatedBudget,
//       flightBudget: parseInt(e.target.value),
//     });
//   }


var BudgetCard = function ({totalBudget, hotelBudget, changeHotelBudget, flightBudget, changeFlightBudget, activitiesBudget, changeActivitiesBudget, friendsData}) {
  return (
     <li className="budgetAccordion">
      <div className="collapsible-header">
        <strong><p className="bling green-text darken-2">$</p>Budget</strong>
      </div>
      <div className="collapsible-body">
        <form action="#">
          <p className="bling green-text darken-2"><strong>Total Budget: ${totalBudget}</strong>
          </p>
        </form>
        <div className="row">
          <div className="col s9">
            <span>What's your nightly budget for <b>hotel</b> accommodations?</span><span id="totalBudget" className="bling green-text darken-2"><strong>${hotelBudget}</strong></span>
              <form action="#">
                <p className="range-field">
                <input type="range"  min="0" max="1500" step="25" onChange={changeHotelBudget} value={hotelBudget} />
                </p>
              </form>
            <span>How much can you spend on <b>flight</b> travel?</span><span id="totalBudget" className="bling green-text darken-2"><strong>${flightBudget}</strong></span>
              <form action="#">
                <p className="range-field">
                <input type="range"  min="0" max="5000" step="100" onChange={changeFlightBudget} value={flightBudget}/>
                </p>
              </form>
              <span>What's your daily budget for <b>activities</b>?</span><span id="totalBudget" className="bling green-text darken-2"><strong>${activitiesBudget}</strong></span>
              <form action="#">
                <p className="range-field">
                <input type="range" min="0" max="1000" step="10" onChange={changeActivitiesBudget} value={activitiesBudget}/>
                </p>
              </form>
            </div>
            <div className="col s3">
              <FriendBudget friendsData={friendsData} />
            </div>
          </div>
        </div>
    </li>
  )
};


export default BudgetCard;