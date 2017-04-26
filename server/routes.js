var router = require('express').Router();
var db = require('./db/db');

var APIsController = require('./controllers/APIsController');
var tripsController = require('./controllers/tripsController');
var usersController = require('./controllers/usersController');

router.post('/expedia', APIsController.expediaAPI);
router.post('/hotwire', APIsController.hotwirePostRequest);

router.post('/getTripData', tripsController.getTripData);
router.post('/addNewBookmarktoDB', tripsController.addTripBookmark);
router.post('/updateBookmarkVote', tripsController.updateBookmarkVote);
router.post('/addCommentToBookmark', tripsController.addCommentToBookmark);

router.post('/updateUserTripPreferences', usersController.updateUserTripPreference);
router.post('/userTripNames', usersController.userTripNames);
router.post('/registerUser', usersController.registerUser);
router.post('/email', usersController.email);
router.post('/createTrip', tripsController.createTrip);
router.post('/getTripPreferences', tripsController.getTripPreferences);


module.exports = router;
