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
  return stars % 1 !== 0;
}

var convertToFullImageUrl = function(thumbNailUrl){
  var fullImageUrl = 'http://media.expedia.com';
  fullImageUrl += thumbNailUrl;
  fullImageUrl = fullImageUrl.slice(0, fullImageUrl.length - 5) + 'b' + fullImageUrl.slice( fullImageUrl.length - 4);
  return fullImageUrl;
};

var DisplayCurrentRec = function({currentRec}) {

  var imageContainerStyle = {
    minHeight: '300px',
    overflow: 'hidden',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: 'url(' + convertToFullImageUrl(currentRec.thumbNailUrl) + ')'
  };

  // console.log('currendRec', currentRec);

  return (
    <div className="recommendation-card card horizontal">
      <div className="card-image" style={imageContainerStyle}>
        <span className="card-title">{currentRec.name}</span>
      </div>
      <div className="card-stacked">
        <div className="card-content">
          <div className="row">
            <div className="col s6">
              <span className='left-align'>
                <i className="material-icons orange-text main-stars">{countStars(currentRec.tripAdvisorRating)}</i>
                {hasRemainder(currentRec.tripAdvisorRating) ?
                  <i className="material-icons orange-text half-star"> star</i> : null
                }

              </span>
            </div>
            <div className="col s6">
              <span className='right'>${currentRec.lowRate} - ${currentRec.highRate} / night</span>
            </div>
          </div>
          <div className="divider"></div>
          <div className="row">
            <p>{currentRec.locationDescription}</p>
            <p>{($('<p>'+currentRec.shortDescription+'</p>').text()).replace(/<\/?[^>]+(>|$)/g, "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = DisplayCurrentRec;
