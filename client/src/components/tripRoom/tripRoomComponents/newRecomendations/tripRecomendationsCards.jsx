import React from 'react';
import DisplayCurrentRec from './displayCurrentRec.jsx';
import Bookmarker from './bookmarker.jsx';

/////////////////////////
// Trip Recomendations Cards
/////////////////////////


class TripRecomendationsCards extends React.Component {
  constructor (props) {
    super(props);
    this.bookmarkThisRec = this.bookmarkThisRec.bind(this);
    this.advanceToNextRec = this.advanceToNextRec.bind(this);
    this.state = {
      currentRecIndex: 0
    };
  }

  advanceToNextRec() {
    var numberOfRecs = this.props.hotelRecomendations.length;
    var nextIndex;
    if (this.state.currentRecIndex < numberOfRecs - 1) {
      nextIndex = this.state.currentRecIndex + 1;
    } else {
      nextIndex = 0;
    }
    this.setState({
      currentRecIndex: nextIndex
    });
  }

  bookmarkThisRec(bookmarkerNote) {
    var bookmarkedHotelObject = this.props.hotelRecomendations[this.state.currentRecIndex];
    var newBookmark = {
      bookmarkedHotelId: bookmarkedHotelObject.hotelId,
      bookmarkerNote: bookmarkerNote
    };
    this.props.addBookmark(newBookmark);
  }

  render() {
    return (

      <div className="section">
        <div className="row">
          <DisplayCurrentRec
            currentRec={this.props.hotelRecomendations[this.state.currentRecIndex]}
            className="card-action"
          />
          <div className="card-action">
            <div className="right-align">
              <a onClick={this.advanceToNextRec}>Next</a>
            </div>
          </div>
        </div>
        <Bookmarker bookmarkThisRec={this.bookmarkThisRec}/>
      </div>
    );
  }

}

module.exports = TripRecomendationsCards;