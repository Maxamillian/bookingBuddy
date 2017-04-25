import React, { Component } from 'react';
import {hotelRecomendations} from '../data/tripRoomDummyData';
import TripRecomendationsCards from './newRecomendations/tripRecomendationsCards.jsx';
import GroupPreferencesBar from './groupPreferences/groupPreferencesBar.jsx';
import TripBookmarksList from './bookmarks/tripBookmarksList.jsx';
import TripRoomChat from './Chat/TripRoomChat.jsx';

//props: tripData, profile
class TripRoomComponents extends Component {

  constructor (props) {
    super(props);
    this.setLocation = this.setLocation.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.updateBookmarkVote = this.updateBookmarkVote.bind(this);
    this.addBookmarkComment = this.addBookmarkComment.bind(this);
    this.state = {
      bookmarks: props.tripData.bookmarks,
      hotelRecomendations: hotelRecomendations,
      locations: props.tripData.commonLocations,
      selectedLocation: props.tripData.commonLocations[0],
      beginning: props.tripData.commonDates.beginning ,
      duration: props.tripData.commonDates.duration,
      ending: props.tripData.commonDates.ending,
      averageNightlyHotelBudget: props.tripData.averageNightlyHotelBudget
    };
  }

  setLocation(event) {
    this.setState({
      selectedLocation: event.target.value
    });
  }

  getVoteTotal(bookmark){
    return bookmark.buddyVotes.reduce((sum,buddy)=>sum + buddy.buddyVote, 0);
  }

  sortBookmarks(bookmarksArray) {
    return bookmarksArray.slice().sort(function(bookmarkA, bookmarkB) {
      return this.getVoteTotal(bookmarkB) - this.getVoteTotal(bookmarkA);
    }.bind(this))
  }

  addBookmark(newBookmark) {

    //ensure that we do not repeat a hotel that has already been bookmarked
    for(var i=0; i< this.state.bookmarks.length; i++){
      if(this.state.bookmarks[i].bookmarkedHotelId === newBookmark.bookmarkedHotelId){
        console.log('ain\'t nobody got time for duplicate bookmarks');
      }
    }

    newBookmark['bookmarkID'] = Date.now();
    newBookmark['buddyVotes'] = this.props.tripData.buddyList.map((buddy) => ({
      buddyName: buddy.name,
      buddyEmail: buddy.email,
      buddyVote: 0
    }));
    newBookmark['tripId'] = this.props.tripData.tripId;
    newBookmark['bookmarkerName'] = this.props.profile.given_name;
    newBookmark['bookmarkComments']= [];

    //sort bookmarks array after adding new bookmark
    var newBookmarks = this.state.bookmarks.concat(newBookmark)
    newBookmarks = this.sortBookmarks(newBookmarks);

    this.setState({
      bookmarks: newBookmarks
    });

    this.addNewBookmarktoDB(newBookmark);

  }


  addNewBookmarktoDB(newBookmark) {
    // this might gonna need some work....

    var dataToSent = newBookmark;

    console.log('send AJAX request to ADD NEW BOOKMARK to DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //fire off ajax requests to add new bookmark to our DB by uncommenting function below
      //DONE! - Inserting Bookmark and Buddy Votes To DB - P.M.
    $.ajax({
      type: 'POST',
      url: '/addNewBookmarktoDB',
      dataType: 'json',
      data: newBookmark,
      success: function(data) {
        console.log('Bookmark Added');
      }.bind(this)
    });
  }

  updateBookmarkVote(bookmarkID, updatedBuddyVote) {

    var updatedBookmarks = this.state.bookmarks.map((bookmark) => {
      if (bookmark.bookmarkID === bookmarkID) {
        bookmark.buddyVotes.forEach( (buddyVoteObj) => {
          if(buddyVoteObj.buddyName === updatedBuddyVote.buddyName) {
            buddyVoteObj.buddyVote = updatedBuddyVote.buddyVote;
          }
        });
      }
      return bookmark;
    });

    //sort bookmarks array after updating a bookmark vote
    updatedBookmarks = this.sortBookmarks(updatedBookmarks);

    this.setState({
      bookmarks: updatedBookmarks
    });

    this.updateBookmarkVoteInDb(bookmarkID, updatedBuddyVote)
  }


  //fire off ajax requests to update bookmark votes
  updateBookmarkVoteInDb(bookmarkID, updatedBuddyVote){

    var dataToSent = {
      bookmarkID: bookmarkID,
      updatedBuddyVote : updatedBuddyVote
    };

    console.log('send AJAX request to UPDATE BOOKMARK VOTE in DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //uncommenting function below to fire off ajax requests to update a bookmark vote in DB
    //DONE - Updated Buddy Votes In DB - P.M.
    $.ajax({
      type: 'POST',
      url: '/updateBookmarkVote',
      dataType: 'json',
      data: dataToSent,
      success: function(data) {
        console.log('Update Vote', data);
      }.bind(this)
    });
  }

  addBookmarkComment(bookmarkID, newComment){
    var updatedBookmarks = this.state.bookmarks.map((bookmark) => {
      if (bookmark.bookmarkID === bookmarkID) {
        bookmark.bookmarkComments.push(newComment);
      }
      return bookmark;
    });

    this.setState({
      bookmarks: updatedBookmarks
    });

    this.addCommentToBookmarkInDb(bookmarkID, newComment)
  }

  //fire off ajax requests to update bookmark comments
  addCommentToBookmarkInDb(bookmarkID, newComment){
    var dataToSent = {
      bookmarkID: bookmarkID,
      commentObj: newComment
    };

    console.log('send AJAX request to ADD BOOKMARK COMMENT in DB');
    console.log(dataToSent);

    //@back_end_magicician_preston
    //uncommenting function below to fire off ajax requests to add a new comment to a bookmark in DB
    //Done! - Adding comment to database - P.M.
    $.ajax({
      type: 'POST',
      url: '/addCommentToBookmark',
      dataType: 'json',
      data: dataToSent,
      success: function(data) {
        console.log('Update Vote');
      }.bind(this)
    });
  };


  componentDidMount() {

    var expediaQueryParams = {
      beginningDate : this.state.beginning,
      endingDate : this.state.ending,
      location : this.state.selectedLocation
    };

    var handleResults = function(expediaResults){
      expediaResults = expediaResults.HotelSummary;
      console.log(expediaResults);
      this.setState({
        hotelRecomendations: expediaResults
      });
    }.bind(this);

    $.ajax({
      type: 'POST',
      url: '/expedia',
      dataType: 'json',
      data: expediaQueryParams,
      success: function(expediaResults) {
        console.log(expediaResults, "expediaResults");
        handleResults(expediaResults);
      }
    });
  }


  render() {

    return (
      <div>

        <div className="row">
          <div className="col s12 m7 l8 tripRoomMainContentContainer">
              <h1 className="orange-text darken-2">'Hiking Trip'</h1>
              <GroupPreferencesBar
                      averageNightlyHotelBudget={this.state.averageNightlyHotelBudget}
                      beginning={this.state.beginning}
                      ending={this.state.ending}
                      locations={this.state.locations}
                      selectedLocation={this.state.selectedLocation}
                      setLocation={this.setLocation}
                />
              <TripRecomendationsCards
                hotelRecomendations={this.state.hotelRecomendations}
                addBookmark={this.addBookmark}
                />
              <TripBookmarksList
                bookmarks={this.state.bookmarks}
                profile={this.props.profile}
                expediaParams={this.state}
                updateBookmarkVote={this.updateBookmarkVote}
                addBookmarkComment={this.addBookmarkComment}
              />
          </div>
          <div className="tripRoomChatContainer col s12 m5 offset-m7 l4 offset-l8 pinned card-panel green lighten-3 hide-on-small-only" style={{'height':'100%'}}>
            <h4>Booking Buddies</h4>
            <ul>
              <li>Lou</li>
              <li>Max</li>
              <li>Preston</li>
              <li>Nate</li>
              <li>Jesse</li>
            </ul>
            <TripRoomChat />
          </div>
        </div>
      </div>
    );
  }
};

export default TripRoomComponents;