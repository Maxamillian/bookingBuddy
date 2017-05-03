import React from 'react';
import {tripData, hotelRecomendations} from '../../data/tripRoomDummyData';

//////////////////////////
// Add New Bookmark Bar //
//////////////////////////


class Bookmarker extends React.Component {
  constructor (props) {
    super(props);
    this.bookmarkThisOne = this.bookmarkThisOne.bind(this);
    this.changeBookmarkerNote = this.changeBookmarkerNote.bind(this);
    this.state = {
      bookmarkerNote: ''
    };
  }

  changeBookmarkerNote(e) {
    this.setState({
      bookmarkerNote: e.target.value
    });
  }

  bookmarkThisOne(e) {
    e.preventDefault();
    var bookmarkerNote = this.state.bookmarkerNote;
    this.props.bookmarkThisRec(bookmarkerNote);
    this.setState({
      bookmarkerNote: ''
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.bookmarkThisOne} >
          <textarea className="materialize-textarea" onChange={this.changeBookmarkerNote} placeholder="Want to stay here? Write a quick note to your buddies about why you like this one, then bookmark it to highlight this option for your friends to see!" value={this.state.bookmarkerNote} /> <br/>
          <button className="btn-large orange" type="submit">Add Bookmark!</button>
        </form>
      </div>
    );
  }

}

module.exports = Bookmarker;