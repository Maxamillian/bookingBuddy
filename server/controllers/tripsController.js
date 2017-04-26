var gets = require('../db/db');
var db = gets.db;
var create = gets.tripMaster;
var additionalTrips = gets.moreTrips;

module.exports.createTrip = function(req, res, next) {
  console.log("Creating new trip data...");
  var make = req.body;
  make.beginDate = make.beginDate.replace(/[-]/g, '/');
  make.endDate = make.endDate.replace(/[-]/g, '/');
  db.query('SELECT id FROM users WHERE email = ($1)', [make.email], function(err, data) { 
    // console.log(data, "data");
    if(data.rows.length === 0) {
      create({ email : make.email,  
        activitiesBudget : parseInt(make.activitiesBudget),
        flightBudget : parseInt(make.flightBudget),
        hotelBudget : parseInt(make.hotelBudget),
        description : make.tripSummary,
        locations : make.locations,
        buddies : make.buddies,
        beginDate : make.beginDate.replace(/[-]/g, '/'),
        duration : make.duration, 
        tripName : make.tripName,
        endDate : make.endDate.replace(/[-]/g, '/'),
        name : make.name
      });
    } else {
      make.id = data.rows[0].id;
      additionalTrips({ email : make.email, 
        activitiesBudget : parseInt(make.activitiesBudget),
        flightBudget : parseInt(make.flightBudget),
        hotelBudget : parseInt(make.hotelBudget),
        description : make.tripSummary,
        locations : make.locations,
        buddies : make.buddies,
        beginDate : make.beginDate.replace(/[-]/g, '/'),
        duration : make.duration, 
        tripName : make.tripName,
        endDate : make.endDate.replace(/[-]/g, '/'),
        name : make.name,
        id : make.id
      });
    }
    res.send({tripId : make.id});
});
}

module.exports.getTripPreferences = function(req, res, next) {
  console.log(req.body, "PREFERENCES!");
  //get all budgets, end and begin dates and user locations
  var obj = {tripLocations : [] };
  db.query('select distinct name from locations INNER JOIN userTrips ON(locations.user_trip_id = userTrips.id and userTrips.trip_id = ($1))', [req.body.tripId], function(err, data) {
    data.rows.forEach(function(item , index, coll) {
    //change to array of strings
      obj.tripLocations.push(item.name);
    });
  });

  db.query('select namef FROM users INNER JOIN userTrips ON (users.id = userTrips.user_id AND userTrips.trip_id = ($1))', [req.body.tripId], function(err, data) {
    data.rows.forEach(function(item, index, coll) {
      var name = item.namef;
      obj[name] = {locations:[]};
      console.log(item, "NAMEF!")
        db.query('select name from locations where user_trip_id = (select id from userTrips where user_id = (select id from users where namef = ($1)))', [name], function(err, location) { 
          if(location !== undefined) {
            console.log(location, "LOCATION!")
            location.rows.forEach(function(item, ind, coll) {
              obj[name].locations.push(item.name);
            });
          };
        });
          
        db.query('select * from dates where trip_id = (select id from userTrips where user_id = (select id from users where namef = ($1)))', [name], function(err, dates) {
          if(dates !== undefined) {
            if(dates.rows.length > 0) {
              obj[name].beginDate = dates.rows[0].beging;
              obj[name].endDate = dates.rows[0].ending;
              obj[name].duration = parseInt(dates.rows[0].duration);
            };
          };
        });
        db.query('select * from budget where trip_id = (select id from userTrips where user_id = (select id from users where namef = ($1)))', [name], function(err, budget) {
          if (budget !== undefined) { 
            if (budget.rows.length > 0) {
              obj[name].hotelBudget = parseInt(budget.rows[0].total);
              obj[name].activitiesBudget = parseInt(budget.rows[0].activitites);
              obj[name].flightBudget = parseInt(budget.rows[0].flight); 
            }; 
          };
        });
    });
    setTimeout(function() {
      res.send(obj);
    },500);
  });
};

module.exports.getTripData = function(req, res, next) {
  console.log( "tripData");
  var dat = { bookmarks:[], buddyList : [] };
  var sum = 0;
  var commonTrips = [];
  var len;

  db.query('select * from userTrips where trip_id = ($1)',[req.body.tripId], function(err, data) {
    len = data.rows.length;
    dat.tripId = req.body.tripId;
    if( err ) {
      console.log("userTrips Error", err);
    }
    data.rows.forEach(function(item, index, coll) {
      var obj = {};
      db.query('SELECT * FROM users WHERE id = ($1)', [item.user_id], function(err, data) {
        if( err ) {
          console.log("users Error", err);
        }
        obj.name = data.rows[0].namef;
        obj.email = data.rows[0].email;
      });
      dat.buddyList.push(obj);
    });
  });


  db.query('SELECT * FROM bookmarks WHERE trip_id = (SELECT id FROM trips WHERE name = ($1))', [req.body.tripId],
    function(err, data) {
      if( err ) {
        console.log("Bookmarks Error", err);
      }
      data.bookmarks = data.rows;
  });

  var commonDateObj = {beginning: '', ending: '', duration: ''};

  db.query('SELECT beging FROM dates WHERE trip_number = ($1)', [req.body.tripId], function(err, data) {
    var begHighMon = [];
    var begHighDay = [];
    var begHighYear = [];

    for (var i = 0; i < data.rows.length; i++) {
      begHighMon.push(parseInt(data.rows[i].beging.slice(0, 2)));
      begHighDay.push(parseInt(data.rows[i].beging.slice(3, 5)));
      begHighYear.push(parseInt(data.rows[i].beging.slice(6, 10)));
    }
    commonDateObj.beginning += Math.max(...begHighMon) + '/';
    commonDateObj.beginning += Math.max(...begHighDay) + '/';
    commonDateObj.beginning += Math.max(...begHighYear);

    db.query('SELECT ending FROM dates WHERE trip_number = ($1)', [req.body.tripId], function(err, data) {
      var endHighMon = [];
      var endHighDay = [];
      var endHighYear = [];
      for (var i = 0; i < data.rows.length; i++) {
        endHighMon.push(parseInt(data.rows[i].ending.slice(0, 2)));
        endHighDay.push(parseInt(data.rows[i].ending.slice(3, 5)));
        endHighYear.push(parseInt(data.rows[i].ending.slice(6, 10)));
      }
      commonDateObj.ending += Math.min(...endHighMon) + '/';
      commonDateObj.ending += Math.min(...endHighDay) + '/';
      commonDateObj.ending += Math.min(...endHighYear);
      db.query('SELECT duration FROM dates WHERE trip_number = ($1)', [req.body.tripId], function(err, data) {
        commonDateObj.duration = parseInt(data.rows[0].duration);
        dat.commonDates = commonDateObj;
      });
    });
  });
  
  db.query('SELECT name FROM trips WHERE id = ($1)', [req.body.tripId], function(err, data) {
    dat.tripName = data.rows[0].name;
  });

  db.query('SELECT total FROM budget INNER JOIN userTrips ON(budget.trip_id = userTrips.user_id and userTrips.trip_id = ($1))', [req.body.tripId], function(err, data) {
    data.rows.forEach(function(item, ind, coll) {
      sum += parseInt(item.total);
      if(ind === coll.length-1) {
        setTimeout(function() {
          dat.averageNightlyHotelBudget = Math.round(parseInt(sum)/parseInt(commonDateObj.duration));
        }, 500);
      }
    });
  }); 

  db.query('SELECT name FROM locations WHERE trip_id = ($1)', [req.body.tripId], function(err, dataa) {
    // console.log(req.body.tripId, "TRIP ID!!!!!", dataa, "LOCATIONS!")
    var counter = {};
    dataa.rows.forEach(function(item, ind, coll) {
      if(counter[item.name] === undefined) {
        counter[item.name] = 1;
      } else {
        counter[item.name]++;
      }
    });
    for(var key in counter) {
      if(counter[key] > 0) {
        commonTrips.push(key);
      }
    }
    dat.commonTrips = commonTrips;
  });

  db.query('SELECT * FROM bookmarks WHERE trip_id = ($1)', [req.body.tripId], function(err, data) {
    if(data.rows.length > 0) {
      data.rows.forEach(function(item, ind, coll) {
        var obj = { bookmarkComments : [], buddyVotes : [] };
        obj.bookmarkID = item.bookmark_id;
        obj.tripId = req.body.tripId;
        obj.bookmarkerName = item.name;
        obj.bookmarkerNote = item.bookmark;
        obj.bookmarkedHotelId = "";
        db.query('SELECT * FROM comments where bookmark_id = ($1)', [item.bookmark_id], function(err, comment) {
      
          comment.rows.forEach(function(item, ind, coll) {
            var obj2 = {};
            obj2.buddyName = item.name;
            obj2.buddyEmail = item.email;
            obj2.date = item.bookmark_id;
            obj2.comment = item.comment;
            obj.bookmarkComments.push(obj2);
          });
          db.query('SELECT * FROM votes WHERE bookmark_id = ($1)', [item.bookmark_id], function(err, vote) {
            
            vote.rows.forEach(function(item, ind, coll) {
              var obj2 = {};
              obj2.buddyName = item.name;
              obj2.buddyEmail = item.email;
              obj2.buddyVote = item.vote;
              obj.buddyVotes.push(obj2);          

            });
            dat.bookmarks.push(obj);
          });
        });
      });
    };
    setTimeout(function() {
      res.send(dat);
    }, 500);
  });
};


module.exports.addTripBookmark = function(req, res, next) {
  console.log("Adding Trip Bookmark!");
  db.query('SELECT * FROM bookmarks WHERE bookmark_id = ($1)', [req.body.bookmarkID], function(err, data){
    if(data.rows.length === 0) {
      db.query('INSERT INTO \
                    bookmarks(hotel_id, bookmark, bookmark_id, trip_id, name) \
                    VALUES($1, $2, $3, $4, $5) RETURNING bookmark',
                    [req.body.bookmarkedHotelId, req.body.bookmarkerNote, req.body.bookmarkID, req.body.tripId, req.body.bookmarkerName], function(err, userResults) {
                      if (err) {
                        console.log("Bookmarks error", err);
                      }
        req.body.buddyVotes.forEach(function(item, ind, coll) {
          db.query('INSERT INTO \
                        votes(vote, name, email, bookmark_id, trip_id) \
                        VALUES($1, $2, $3, $4, $5) RETURNING id',
                        [item.buddyVote, item.buddyName, item.buddyEmail, req.body.bookmarkID, req.body.tripId], function(err, userResults) {
                          if (err) {
                            console.log("Votes Error", err);
                          }

          });
        });
      });
    };
  });
}

module.exports.updateBookmarkVote = function(req, res, next) {
  console.log( "updateBookmarkVote!");
  var voteInfo = req.body;
  db.query('UPDATE votes SET vote = ($1) WHERE email = ($2) AND bookmark_id = ($3)', [voteInfo.updatedBuddyVote.buddyVote, voteInfo.updatedBuddyVote.buddyEmail, voteInfo.bookmarkID], function(err, data) {
    if (err) {
      console.log("Update Vote Error", err);
    }
  });
};

module.exports.addCommentToBookmark = function(req, res, next) {
  console.log("Adding Comment TO Bookmark");
  var comment = req.body;
  db.query('SELECT * FROM comments WHERE client_id = ($1) AND email = ($2)', [comment.commentObj.date, comment.commentObj.buddyEmail], function(err, data) { 
      if (data.rows.length === 0) {
      db.query('INSERT INTO \
                    comments(email, comment, bookmark_id, name, client_id) \
                    VALUES($1, $2, $3, $4, $5) RETURNING id',
                    [comment.commentObj.buddyEmail, comment.commentObj.comment, comment.bookmarkID, comment.commentObj.buddyName, comment.commentObj.date], function(err, userResults) {
                      if (err) {
                        console.log("Bookmarks error", err);
                      }
                    });
    };
  });
};