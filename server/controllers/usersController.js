var gets = require('../db/db');
var db = gets.db;
var nodemailer = require('nodemailer');
var validator = require('validator');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookingbuddy17@gmail.com',
    pass: 'Verizon7'
  }
});

module.exports.registerUser = function(req, res, next) {
  db.query('INSERT INTO \
                    users(namef, namel, email) \
                    VALUES($1, $2, $3) RETURNING id',
                    [req.body.nameB, req.body.nameL, req.body.email], function(err, userResults) {
                      if (err) {
                        console.log(err, "ERROR!");
                      };
                      res.send(userResults.rows[0]);
  });
};


module.exports.email = function(obj) {
  console.log("IN EMAIL!", obj.body);
  if(obj.body.buddies.length > 0) {
    console.log("IN THERE!")
    setTimeout(function(){
      var checkEmail = obj.body.buddies[0].email;
      db.query('SELECT id FROM users where namef = ($1)', [obj.body.buddies[0].name], function(err, results) {
        if(results.rows.length === 0) {
          obj.body.buddies.forEach(function(item, ind, coll) {
            db.query('SELECT id FROM trips WHERE name = ($1)', [obj.body.tripName], function(err, data) {

              db.query('INSERT INTO \
                        users(namef, namel, email) \
                        VALUES($1, $2, $3) RETURNING id',
                        [item.name, item.name, item.email], function(err, userResults) {
                          if (err) {
                            console.log(err, "ERROR!");
                          };

                db.query('INSERT INTO \
                      userTrips(user_id, trip_id) \
                      VALUES($1, $2) RETURNING id, trip_id',
                      [userResults.rows[0].id, data.rows[0].id], function(err, userTripsResults) {
                        if (err) {
                          console.log(err, "ERROR!");
                        };

                  let mailOptions = {
                    from: '"Booking Buddy" <foo@blurdybloop.com>', // sender address
                    to: item.email, // list of receivers
                    subject: 'Hey ' + item.name + ', '+obj.body.name+ ' has invited you on an exclusive vacation!', // Subject line
                    text: 'Whatever we want to tell the db ', // plain text body
                    html: '<h1>Its vacation time! Go to the following link to plan your group vacation.</h1>' + ' http://localhost:3000/profile<br><div><img src="http://charnos.pl/wp-content/uploads/2015/08/wakacje.jpg"</div>' // html body
                  };

                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return console.log(error);
                    };
                  console.log('Message %s sent: %s', info.messageId, info.response);
                  });
                });
              });
            });  
          });
        };
      });
    }, 500);
  };
};

module.exports.updateUserTripPreference = function(req, res) {
  console.log(req.body, "Preferences object!");


}

module.exports.userTripNames = function(req, res) {
  console.log(req.body);
  db.query('select * from trips INNER JOIN userTrips ON (trips.id = userTrips.trip_id AND userTrips.user_id = (SELECT id FROM users where email = ($1)))', [req.body.email],
    function(err, data) {
      data && res.send(data.rows);
  });
};

module.exports.getUserLocations = function(req, res) {
  //gets a single users location preferences based on trip id
    //key references some data specific to user, can be an object
  db.query('SELECT * FROM locations WHERE trip_id = (SELECT id FROM userTrips WHERE user_id = (SELECT id FROM users WHERE email = ($1)))', [req.body.email], function(err, data) {
    if (err) {
      res.send(404);
      console.log(err, 'ERR');
    }
    console.log(data.rows);
    res.send(data.rows);
  });
};