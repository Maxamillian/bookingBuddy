import React, { Component } from 'react';
import BuddyVotesWindow from './BuddyVotesWindow.jsx';
import BookmarkComments from './BookmarkComments.jsx';

// TripRoom > TripBookmarksList > You Are Here (Bookmark)
//bookmark object passed in as props

var convertToFullImageUrl = function(thumbNailUrl){
  var fullImageUrl = 'http://media.expedia.com';
  fullImageUrl += thumbNailUrl;
  fullImageUrl = fullImageUrl.slice(0, fullImageUrl.length - 5) + 'b' + fullImageUrl.slice( fullImageUrl.length - 4);
  return fullImageUrl;
};



const BookmarkedHotelDisplay = ({hotelName, bookmarkerNote, image}) => (
  <div>
    <div className="row">
      <h5>{hotelName}</h5>
    </div>
    <div className="col s12 l5">
      <div className="row">
        <img src={image} style={{'maxHeight':'300px', 'maxWidth':'100%'}} alt="picture"/>
      </div>
      <div className="row">
          <p>{bookmarkerNote}</p>
      </div>
    </div>
  </div>
);



// props => bookmark, profile, expediaParams, updateBookmarkVote, addBookmarkComment
class Bookmark extends Component {

  constructor(props) {
    super(props);
    this.state= {
      hotelName: '',
      image: '',
      price: '',
      stars: '',
      description: 'This will be a decription of the hotel'
    }
  }

  componentDidMount(){
    // console.log('When rendering bookmarks, we will query expedia to get current hotel data using bookmarkedHotelId: ',
    //                this.props.bookmark);
    var expediaBookmarkQueryParams = {
      beginningDate : this.props.expediaParams.beginning,
      endingDate : this.props.expediaParams.ending,
      hotelIdList : this.props.bookmark.bookmarkedHotelId
    };

    var handleExpediaBookmarkQueryResults = function(expediaResults){
      // console.log('handling results from expedia', expediaResults);
      var returnedFromExpedia = expediaResults.HotelSummary;
      this.setState({
        hotelName: returnedFromExpedia.name,
        image: convertToFullImageUrl(returnedFromExpedia.thumbNailUrl),
        price: returnedFromExpedia.price,
        stars: returnedFromExpedia.stars,
        description: returnedFromExpedia.description
      });
    }.bind(this);

    $.ajax({
      type: 'POST',
      url: '/expedia-bookmarks',
      dataType: 'json',
      data: expediaBookmarkQueryParams,
      success: function(expediaResults) {
        handleExpediaBookmarkQueryResults(expediaResults);
      }.bind(this)
    });
  }

  render(){
    return (
      <li className="collection-item trip-bookmark">
        <div className="row bookmark-main">

          <BookmarkedHotelDisplay
            hotelName={this.state.hotelName}
            bookmarkerNote={this.props.bookmark.bookmarkerNote}
            image={this.state.image}
            />

          <div className="col s12 l7">
            <BuddyVotesWindow
              bookmarkID={this.props.bookmark.bookmarkID}
              buddyVotes={this.props.bookmark.buddyVotes}
              updateBookmarkVote={this.props.updateBookmarkVote}
            />
          </div>
        </div>


        <div className="row bookmark-comments">
          <div className="col s12">
            <BookmarkComments
              profile={this.props.profile}
              bookmark={this.props.bookmark}
              addBookmarkComment={this.props.addBookmarkComment}
            />
          </div>
        </div>
      </li>
    );
  }
}


module.exports = Bookmark;