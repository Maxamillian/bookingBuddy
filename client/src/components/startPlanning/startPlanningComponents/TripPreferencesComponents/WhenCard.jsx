import React, { Component } from 'react';

// class WhenCard extends Component {
//   constructor(props) {
//     super(props);
//     this.changeBeginDate = this.changeBeginDate.bind(this);
//     this.changeEndDate = this.changeEndDate.bind(this);
//   }

//   changeBeginDate(e) {
//     console.log(e.target.value);
//     this.setState({
//       beginDate: e.target.value,
//     });
//   }
//   changeEndDate(e) {
//     this.setState({
//       endDate: e.target.value,
//     });
//   }

var WhenCard = function ({changeBeginDate, changeEndDate, beginDate, endDate}) {
  return (
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
              <input type="date" className="datepicker" placeholder="Select a start date:" onChange={changeBeginDate} value={beginDate}></input>
            </div>
            </form>
            <form action="#">
            <div className="col s6">
              <input type="date" className="datepicker" placeholder="Select an end date:" onChange={changeEndDate} value={endDate}></input>
            </div>
            </form>
          </div>
        </div>
    </li>
  )
};

export default WhenCard;