import React from 'react';

var VoteButton = function ({text, selected, handleClick}) {
  if (selected){
    return (<button onClick={handleClick} className="green darken-3 btn btn-small" style={{'padding':'2px 15px'}}>{text}</button>);
  }

  return (<button onClick={handleClick} className="green lighten-3 btn btn-small" style={{'padding':'2px 5px'}}>{text}</button>);
};

var BuddyVoteSlider = function ({bookmarkID, buddyVoteObj, updateBookmarkVote}) {
  // var socket = io();

  var vote = +buddyVoteObj.buddyVote;

  var updateVote = function(num) {

    var updatedBuddyVote =  {
      buddyName: buddyVoteObj.buddyName,
      buddyEmail: buddyVoteObj.buddyEmail,
      buddyVote: num
    }


    updateBookmarkVote(bookmarkID, updatedBuddyVote);
    // emit vote here
    // socket.emit('new vote', {
    //   bookmarkID: bookmarkID,
    //   buddyName: buddyVoteObj.buddyName,
    //   num: num
    // });
  };

  // new function to listen for vote
  // socket.on('new vote', function(data) {
  //   updateBookmarkVote(data.bookmarkID, data.buddyName, data.num);
  // });

  var voteYes = function() {
    updateVote(1);
  };

  var voteMaybe = function() {
    updateVote(0);
  };

  var voteNo = function() {
    updateVote(-1);
  };

  return (
    <div className='row'>
      <span className='col s3'>{buddyVoteObj.buddyName} : </span>
      <VoteButton className='col s2' text="I'm In!" selected={vote === 1} handleClick={voteYes} />
      <VoteButton className='col s2' text="Maybe" selected={vote === 0} handleClick={voteMaybe} />
      <VoteButton className='col s2' text="Not for Me" selected={vote === -1} handleClick={voteNo} />
    </div>
  );
};





module.exports = BuddyVoteSlider;
