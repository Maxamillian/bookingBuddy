////////////////////////////////////////
// Today, We connect all the vines!!!!
////////////////////////////////////////

// Vine #1
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// RegisterUser                                Client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - User logs in for the first time or is invited to first trip?
///////////////////////////////////////////////////////////
//Back End:
//    - Controller: usersContorller
//    - RouteHandler:  registerUser
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////













// Vine #2
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// createTrip                                Client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - Create New Trip form is submitted
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: tripsContorller
//    - RouteHandler:  createTrip
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//











// Vine #3
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// SendEmailInvite                                Client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - Send Email invite to all buddies invited to trip
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: usersContorller
//    - RouteHandler:  email
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//













// Vine #4
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// UserTrips                                  DB => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - When User First Navigates to Profile
//       (having already signed in)
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: usersContorller
//    - RouteHandler: userTripNames
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//




// Client => DB
// Example of object sent with Request from Client:

var userInfoRequestObj = {
  email: 'jesse.deoms@gmail.com'
};

// DB => client
// Example of object sent from DB to Client through the interwebs:

var tripsArray = [{
  tripId: '0001',
  name: '10 Year Reunion Trip',
  description: 'Can you believe its been ten years since we graduated??? We all want to get together, catch up, and have some fun together. Take a few minutes to throw your life info in Booking Buddies so that we can all get on the same page get something fun on the calendar together!'
}, {
  tripId: '0002',
  name: 'Weekend Trip to Cabo San Freude',
  description: 'Wow! We are finished HRR. Seems like just yesturday that we were all having our first tango with the floobits ghost! Lets find a time, place, and gameplan that works for everyone to get together for some grilling, bebidas, and hot tubn on Ryans rooftop!!!'
}];











// Vine #5
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// GetTripPreferences (initial)                DB => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In Profile view, the user clicks a trip card and then...
//    - User Clicks on MY TRIP PREFERENCES
//    - (for the first time for that user for that trip)
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: usersContorller
//    - RouteHandler: getTripPreferences
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//















// Vine #6
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// GetTripPreferences (update)                   DB => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In Profile view, the user clicks a trip card and then...
//    - User Clicks on MY TRIP PREFERENCES
//    - (to UPDATE their preferences for that trip)
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: usersContorller
//    - RouteHandler: getTripPreferences
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//
















// Vine #7
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// SubmitTripPreferences                       Client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - After completing trip prefernces form
//    - user clicks SUBMIT MY PREFERENCS
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: usersContorller
//    - RouteHandler: updateUserTripPreference
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//

















// Vine #8
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// GetTripData                                 DB => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In Profile view, the user clicks a trip card and then...
//    - User Clicks on VIEW TRIP ROOM
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: tripsContorller
//    - RouteHandler:  getTripData
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//




// Client => DB
// Example of object sent with Request from Client:

var tripDataRequestInfo = {
  tripId: 12312414
};

// DB => client
// Example of object sent from DB to Client through the interwebs:

var tripData  = {
  tripId: 12345,
  tripName: 'Hiking Trip',
  commonDates:  {
    beginning: '4/29/2017',
    duration: 4,
    ending: '5/12/2017'
  },
  commonTrips: [
    'Cabo San Fruede',
    'Bahamas'
  ],
  averageNightlyHotelBudget: 127.00,
  buddyList: [{
      name: 'Lou',
      email: 'formMasterLou@gmail.com',
    }, {
      name: 'Preston',
      email: 'gotYourBackPreston@gmail.com',
    }, {
      name: 'Nate',
      email: 'flexBoxFriday@gmail.com',
    }, {
      name: 'Max',
      email: 'mustLoveCoffee@gmail.com',
    }, {
      name: 'Jesse',
      email: 'seriouslySeriousAboutOldBay@gmail.com',
    }],
  bookmarks: [{
    bookmarkID: Date.now(),
    tripId: 23,
    bookmarkerName: 'Lou',
    boormarkerNote: 'stringComment',
    bookmarkedHotelId: 'expediaHotelString',
    bookmarkComments: [{
      buddyName: 'Lou',
      buddyEmail: 'formMasterLou@gmail.com',
      date: 1492888181571,
      comment: 'messageMadeUnderBookmark'}
    ],
    buddyVotes: [{
      buddyName: 'Lou',
      buddyEmail: 'formMasterLou@gmail.com',
      buddyVote: -1
    },{
      buddyName: 'Preston',
      buddyEmail: 'gotYourBackPreston@gmail.com',
      buddyVote: 1
    }, {
      buddyName: 'Nate',
      buddyEmail: 'flexBoxFriday@gmail.com',
      buddyVote: -1
    }, {
      buddyName: 'Max',
      buddyEmail: 'mustLoveCoffee@gmail.com',
      buddyVote: 0
    }, {
      buddyName: 'Jesse',
      buddyEmail: 'seriouslySeriousAboutOldBay@gmail.co',
      buddyVote: -1
    }]
  }]
}









// Vine #9
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ExpediaHotelRecomendations              Server => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - Loading Trip Room & after applying trip-room filters
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: APIsContorller
//    - RouteHandler:  expediaAPI
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//



// Client => Server => Expedia
// Example of Object sent form Client to Server to Expedia:

var expediaQueryParams = {
  beginningDate : '5/01/2017',
  endingDate : '5/12/2017',
  location : 'Baltimore',
};


// Expedia => Server => Client
// Example of Array of Objects sent form Expedia to Server to Client:
// Note: other properties available for use in each object

var hotelRecomendations = [{
  hotelId: 12345,
  name: 'Villa La Estancia Beach Resort & Spa',
  lowRate: 121.21,
  highRate: 250.91,
  tripAdvisorRating: 5,
  locationDescription: 'Paradise meets comfort at Villa La Estancia',
  thumbNailUrl: 'hotels/2000000/1690000/1681600/1681571/1681571_149_z.jpg'
}, {
  hotelId: 12345,
  name: 'Villa La Estancia Beach Resort & Spa',
  lowRate: 121.21,
  highRate: 250.91,
  tripAdvisorRating: 5,
  locationDescription: 'Paradise meets comfort at Villa La Estancia',
  thumbNailUrl: 'hotels/2000000/1690000/1681600/1681571/1681571_149_z.jpg'
}];














// Vine #10
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ExpediaHotelInfoForBookmarks            Server => client
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - Loading Trip Room & After adding new bookmark
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: APIsContorller
//    - RouteHandler:  ?
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//















// Vine #11
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// AddTripBookmark                             client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In trip room, the user clicks ADD NEW BOOKMARK...
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: tripsContorller
//    - RouteHandler:  addTripBookmark
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//



// Client => DB
// Example of Object sent form Client to DB:

var newBookmarkObj = {
  bookmarkID: 1243132412321,
  tripId: 12311,
  bookmarkerName: 'Max',
  bookmarkComments: [{
    buddyName: 'Nate',
    buddyEmail: 'nateTheGreat@china.com',
    date: 1231231231231,
    comment: 'This hotel looks phenominal',
  },{
    buddyName: 'Lou',
    buddyEmail: 'loulouman@yahoo.com',
    date: 1231231731231,
    comment: 'This hotel looks wonderful. Definitely in the lead for me',
  }],
  bookmarkedHotelId: 123124,
  bookmarkerNote: '',
  buddyVotes: [{
      buddyName: 'Lou',
      buddyEmail: 'formMasterLou@gmail.com',
      buddyVote: 0
    },{
      buddyName: 'Preston',
      buddyEmail: 'gotYourBackPreston@gmail.com',
      buddyVote: 0
    }, {
      buddyName: 'Nate',
      buddyEmail: 'flexBoxFriday@gmail.com',
      buddyVote: 0
    }, {
      buddyName: 'Max',
      buddyEmail: 'mustLoveCoffee@gmail.com',
      buddyVote: 0
    }, {
      buddyName: 'Jesse',
      buddyEmail: 'seriouslySeriousAboutOldBay@gmail.co',
      buddyVote: 0
    }]
}







// Vine #12
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// UpdateBookmarkVote                          client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In a bookmark card in the trip room,
//    - the user clicks 'I'm In!', 'Maybe', or 'Not For Me'...
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: tripsContorller
//    - RouteHandler:  updateBookmarkVote
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//














// Vine #13
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// AddCommentToBookmark                        client => DB
///////////////////////////////////////////////////////////
////////////////////////////////// Swing Safety Rating: ?
// Safefly Swung on this vine: (Y/N)
//    - Jesse:
//    - Preston:
//    - Max:
//    - Lou:
//    - Nate:
///////////////////////////////////////////////////////////
// UI:
//    - In trip room, the user clicks ADD NEW BOOKMARK...
///////////////////////////////////////////////////////////
// Back End:
//    - Controller: tripsContorller
//    - RouteHandler:  addCommentToBookmark
///////////////////////////////////////////////////////////
// Questions / Concerns:
//
//


















