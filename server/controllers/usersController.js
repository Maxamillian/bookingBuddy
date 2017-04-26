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
  console.log("IN EMAIL!");
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
  console.log("In UpdateUserTrippreferences...");
  var obj = {};
  db.query('select * from dates where trip_number = ($1) and trip_id = (select id from userTrips where  trip_id = ($3) and user_id = (select id from users where email = ($2)))', [req.body.tripId, req.body.email, req.body.tripId], function(err, data) {
    if(data.rows.length === 0) {
      db.query('select id from userTrips where user_id = (select id from users where email = ($1))', [req.body.email], function(err, userData) {
        req.body.locations.forEach(function(item, ind, coll) {
          db.query('INSERT INTO \
                      locations(name, user_trip_id, trip_id) \
                      VALUES($1, $2, $3) RETURNING id',
                      [item, userData.rows[0].id, req.body.tripId], function(err, userResults) {
                        if (err) {
                          // res.send(err)
                        }
          });   
        });
        db.query('INSERT INTO \
                  budget(total, trip_id, flight, activitites) \
                  VALUES($1, $2, $3, $4) RETURNING id',
                  [req.body.hotelBudget, req.body.tripId, req.body.flightBudget, req.body.activitiesBudget], function(err, budgetResults) {
                    if (err) {
                      // res.send(err)
                    }
        });
        db.query('INSERT INTO \
                  dates(beging, ending, duration, trip_id, trip_number) \
                  VALUES($1, $2, $3, $4, $5) RETURNING id',
                  [req.body.beginDate.replace(/[-]/g, '/').slice(5)+'/'+req.body.beginDate.slice(0,4), req.body.endDate.replace(/[-]/g, '/').slice(5)+'/'+req.body.endDate.slice(0,4), req.body.duration, userData.rows[0].id, req.body.tripId], function(err, dateResults) {
                    if (err) {
                      // res.send(err)
                    }
        });
      });
    } else {
      db.query('select id from userTrips where user_id = (select id from users where email = ($1))', [req.body.email], function(err, userData) {
        obj.id = userData.rows[0].id;
        db.query('SELECT * FROM locations WHERE user_trip_id = (SELECT id FROM userTrips WHERE user_id = (SELECT id FROM users WHERE email = ($1)) and trip_id = ($2))', [req.body.email, req.body.tripId], function(err, data) {
          if (err) {
            console.log(err, 'ERR');
          }
          req.body.locations.forEach(function(location, ind, coll) {
            if (data.rows.find(function(item) { return item.name === location }) === undefined) {
              db.query('INSERT INTO \
                          locations(name, user_trip_id, trip_id) \
                          VALUES($1, $2, $3) RETURNING id',
                          [location, userData.rows[0].id, req.body.tripId], function(err, userResults) {
                            if (err) {
                              // res.send(err)
                            }
              });   
            };
          });
        });
        db.query('update dates set beging = ($1), ending = ($2), duration = ($3) where trip_id = (select id from userTrips where user_id = (select id from users where email = ($4)) and trip_id = ($5))', [req.body.beginDate.replace(/[-]/g, '/').slice(5)+'/'+req.body.beginDate.slice(0,4), req.body.endDate.replace(/[-]/g, '/').slice(5)+'/'+req.body.endDate.slice(0,4), req.body.duration, req.body.email, req.body.tripId], function(err, updateDates) {
            if (err) { 
              console.log("ERROR!!", err);
            }
        });
        db.query('update budget set total = ($1), flight = ($2), activitites = ($3) where trip_id = (select id from userTrips where user_id = (select id from users where email = ($4)) and trip_id = ($5))', [req.body.hotelBudget, req.body.flightBudget, req.body.activitiesBudget, req.body.email, req.body.tripId], function(err, data) {
          if (err) { 
            console.log("ERROR!", err);
          };
        });
      });
    };
  });
};

module.exports.userTripNames = function(req, res) {
  console.log(req.body);
  db.query('select * from trips INNER JOIN userTrips ON (trips.id = userTrips.trip_id AND userTrips.user_id = (SELECT id FROM users where email = ($1)))', [req.body.email],
    function(err, data) {
      data && res.send(data.rows);
  });
};
