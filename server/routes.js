var router = require('express').Router();
var db = require('./db/db');

var APIsController = require('./controllers/APIsController');
var tripsController = require('./controllers/tripsController');
var usersController = require('./controllers/usersController');

router.post('/expedia', APIsController.expediaAPI);
router.post('/hotwire', APIsController.hotwirePostRequest);

// router.post('/commonTripDates', tripsController.commonTripDates);
router.post('/getTripData', tripsController.getTripData);
router.post('/addNewBookmarktoDB', tripsController.addTripBookmark);
router.post('/viewTripBookmark', tripsController.viewTripBookmark);
router.post('/updateBookmarkVote', tripsController.updateBookmarkVote);
router.post('/addCommentToBookmark', tripsController.addCommentToBookmark);

router.post('/updateUserTripPreferences', usersController.updateUserTripPreference);
router.post('/userTripNames', usersController.userTripNames);
router.post('/userLocations', usersController.getUserLocations);
router.post('/registerUser', usersController.registerUser);
router.post('/email', usersController.email);
router.post('/createTrip', tripsController.createTrip);
router.post('/getTripPreferences', tripsController.getTripPreferences);


var getUserDates = function(key) {
  //gets a single users date preferences based on trip id
    //key references some data specific to user, can be an object
  db.query('SELECT * FROM dates WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($1))', [key], function(err, data) {
    if (err) {
      res.send(404);
      console.log(err, 'ERR');
    }
    console.log(data.rows);
  });
};
// getUserDates(14);

var getUserBudget = function(key) {
  //gets a single users budget based on trip id
  //key references some data specific to user, can be an object
  db.query('SELECT * FROM budget WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($1))', [key], function(err, data) {
    if (err) {
      res.send(404);
      console.log(err, 'ERR');
    }
    console.log(data.rows);
  });
};
// getUserBudget(14);

var updateUserBudget = function(key) {
//updates a single users budget based on a passed in amount, user_id, and trip_id
  //key should be an object
  db.query('UPDATE budget SET total = ($1) WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($2) AND trip_id = ($3))', [key.total, key.id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      // console.log(data);
    });
};
// updateUserBudget({total:9900, id:14, trip_id:11});

var updateUserDates = function(key) {
//updates a single users begin and end dates based on a passed in user_id, trip_id, new begin and/or end dates
  //key should be an object
  db.query('UPDATE dates SET beging = ($1) WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($2) AND trip_id = ($3))', [key.beginning, key.id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      // console.log(data);
    });
  db.query('UPDATE dates SET ending = ($1) WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($2) AND trip_id = ($3))', [key.ending, key.id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      // console.log(data);
    });
};
// updateUserDates({beginning:'02/20/2017', ending:'12/12/2017', id:1, trip_id:1});

var updateDuration = function(key) {
//updates a single users begin and end dates based on a passed in user_id, trip_id, new begin and/or end dates
  //key should be an object
  db.query('UPDATE dates SET duration = ($1) WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = ($2) AND trip_id = ($3))', [key.duration, key.user_id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      // console.log(data);
    });
};
// updateDuration({user_id:14, trip_id:11, duration:'12'});

var addUserLocation = function(key) {
//updates a single users location based on a passed in location, user_id, and trip_id
  //key should be an object
  db.query('SELECT id FROM userTrips WHERE user_id = ($1) AND trip_id = ($2)', [key.user_id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      console.log(data.rows[0].id);
      var id = data.rows[0].id;
      db.query('INSERT INTO \
                    locations(name, trip_id) \
                    VALUES($1, $2) RETURNING id',
                    [key.name, id], function(err, userResults) {
                      if (err) {
                        // res.send(err)
                      }
                    });
    });
};
// addUserLocation({user_id:14, trip_id:11, name:'Oakland'});

var deleteUserLocation = function(key) {
//delete a single users location based on a passed in locaiton name, user_id, and trip_id
  //key should be an object
  db.query('SELECT id FROM userTrips WHERE user_id = ($1) AND trip_id = ($2)', [key.user_id, key.trip_id],
    function(err, data) {
      if (err) {
        // res.send(404);
        console.log(err, 'ERR');
      }
      console.log(data.rows[0].id);
      var id = data.rows[0].id;
      db.query('DELETE FROM locations WHERE name = ($1) AND trip_id = ($2)', [key.name, id],
        function(err, userResults) {
          if (err) {
          // res.send(err)
          }
          //comment
        });
    });
};
// deleteUserLocation({user_id:14, trip_id:11, name:'Oakland'});


module.exports = router;
