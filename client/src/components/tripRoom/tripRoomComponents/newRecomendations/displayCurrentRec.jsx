import React, { Component } from 'react';

//////////////////////////////////
// Display Current Recomendations
//////////////////////////////////

var countStars = function(stars) {
  var string = '';

  for (var i = 0; i < Math.floor(stars); i++) {
    string += 'star ';
  }
  return string;
};

var hasRemainder = function(stars) {
  if (stars % 1 !== 0) {
    return '1/2'
  } else {
    return '';
  }
}

var convertToFullImageUrl = function(thumbNailUrl){
  var fullImageUrl = 'http://media.expedia.com';
  fullImageUrl += thumbNailUrl;
  fullImageUrl = fullImageUrl.slice(0, fullImageUrl.length - 5) + 'z' + fullImageUrl.slice( fullImageUrl.length - 4);
  return fullImageUrl;
};

var DisplayCurrentRec = function({currentRec}) {

  var imageContainerStyle = {
    width: '550px',
    maxWidth: '100%',
    height: '300px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + convertToFullImageUrl(currentRec.thumbNailUrl) + ')'
  };

  console.log('currendRec', currentRec);

  return (
    <div>
      <div className="card-image" style={imageContainerStyle}>
        <span className="card-title">{currentRec.name}</span>
      </div>
      <div className="card-content">
        <div>
          <span className='left-align'>
            <i className="material-icons orange-text">{countStars(currentRec.tripAdvisorRating)}</i>{hasRemainder(currentRec.tripAdvisorRating)}
          </span>
          <span className='right'> ${currentRec.lowRate} - ${currentRec.highRate} / night </span>
        </div>
        <p>{currentRec.locationDescription}</p>
      </div>
    </div>
  );
}

module.exports = DisplayCurrentRec;
