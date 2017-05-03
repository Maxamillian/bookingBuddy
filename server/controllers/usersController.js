var pg = require('pg');
var validator = require('validator');
var nodemailer = require('nodemailer');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test7';

var db = new pg.Client(connectionString);
db.connect(function(err) {
  if (err) {
    throw err;
  }
});

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookingbuddy17@gmail.com',
    pass: 'Verizon7'
  }
});

//iterate over membersInvited array and ensure taht each buddy is inivited by email
//also ensure that list of membersInvited is trip specific
// ... i don't want ot have to deal with bobTheSwimmer when there isn't any water near by
// a function that does this for a single user
// that we can call multiple times for many membersInvited or a single time to add somebody to a trip

module.exports.email = function(obj) {
  // email error
  //
  console.log('IN EMAIL!', obj.body);
  if (obj.body.membersInvited !== undefined) {
    if (obj.body.membersInvited.length > 0) {
      setTimeout(function() {
        var checkEmail = obj.body.membersInvited[0].email;
        db.query(
          'SELECT id FROM users where namef = ($1)',
          [obj.body.membersInvited[0].name],
          function(err, results) {
            if (results.rows.length === 0) {
              obj.body.membersInvited.forEach(function(item, ind, coll) {
                db.query('SELECT id FROM trips WHERE name = ($1)', [obj.body.tripName], function(
                  err,
                  data
                ) {
                  db.query(
                    'INSERT INTO \
                          users(namef, namel, email) \
                          VALUES($1, $2, $3) RETURNING id',
                    [item.name, item.name, item.email],
                    function(err, userResults) {
                      if (err) {
                        console.log(err, 'ERROR!');
                      }

                      db.query(
                        'INSERT INTO \
                        userTrips(user_id, trip_id) \
                        VALUES($1, $2) RETURNING id, trip_id',
                        [userResults.rows[0].id, data.rows[0].id],
                        function(err, userTripsResults) {
                          if (err) {
                            console.log(err, 'ERROR!');
                          }

                          let mailOptions = {
                            from: '"Booking Buddy" <foo@blurdybloop.com>', // sender address
                            to: item.email, // list of receivers
                            subject: 'Hey ' +
                              item.name +
                              ', ' +
                              obj.body.name +
                              ' has invited you on an exclusive vacation!', // Subject line
                            text: 'Whatever we want to tell the db ', // plain text body
                            html: '<div style="background-color:#4CAF50; border-style: solid; border-width: 1px 1px 1px 1px; height:500px;"><h1 style="background-color:#006400; position:absolute; height:65px; font-size:22px; text-align: center; margin-top:0"><p style="text-align: center; color:white; position:absolute; top:91%">Congratulations ' +
                              item.name +
                              ',</p></h1><h3 style="margin-top:7px; margin-left: 10px">It\'s vacation time! Click the link below to plan your amazing group vacation!</h3> <a style="margin-left:10px" href="http://localhost:3000/profile">https://booking-buddy.herokuapp.com/</a><br><div><img style="margin-top: 1cm; max-height: 300px; max-width: 300px;" src="https://lh3.googleusercontent.com/EyMFheP3QVoDly3d1yRvtFSecqqSU62A14mYi2sUZZ9yaAGQIL_zoyJ5NMODheD48xgjahUo7j3iU40Jo6OLU71XjUQlLHWkzQW1J7lVMCX8MQXrgAbSDfvNRmFcqNeFzLt3HvyH-PVPT17kddBfgefFeU-txyDuYSBUCBmCO7GFtcSwe_5JnpSm8IW-9EaGt2z8PU1GkYnEqgh3FPisP1MNkUSBuMSr3NkDwdbfBgu6jT0BsGBqBCbKfsu1MX6VnYOtLRPaX7RembR7069dOvQ29YO3W2KJpfPepkjWwEIByEXaa9KtdxktfbK27yEGEOseaN5YUmdw0eoK9h7oJzPNMTC15bpmySJV9TX-_9gsg5EApyPg_ZzjDIhRkzsWjxNj3I_xk1xKwkNIKIQmEFidEQ8-FI6px9wvF_P2NgwIePzLI_r1MNoYjTD-elCXCpPS5zE-sHUj0wBm6suT4wIzz6eKzJgMvgObf34atISvC1XRR6e89LahDZg-KpKj1YzzTJa1Df7VXWKpjmswx4U2G2rll6HnKVKz_2sJZvXGSvv-AlzYs89Fxi5RoJuvf9onME00=w1318-h591"</div></div>'
                          };

                          transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                              return console.log(error);
                            }
                            console.log('Message %s sent: %s', info.messageId, info.response);
                          });
                        }
                      );
                    }
                  );
                });
              });
            }
          }
        );
      }, 500);
    }
  }
};

module.exports.updateUserTripPreference = function(req, res) {
  console.log('In UpdateUserTrippreferences...', req.body);
  var obj = {};
  db.query(
    'select * from dates where trip_number = ($1) and trip_id = (select id from userTrips where  trip_id = ($3) and user_id = (select id from users where email = ($2)))',
    [req.body.tripId, req.body.email, req.body.tripId],
    function(err, data) {
      if (data.rows.length === 0) {
        db.query(
          'select id from userTrips where user_id = (select id from users where email = ($1))',
          [req.body.email],
          function(err, userData) {
            req.body.locations.forEach(function(item, ind, coll) {
              db.query(
                'INSERT INTO \
                      locations(name, user_trip_id, trip_id) \
                      VALUES($1, $2, $3) RETURNING id',
                [item, userData.rows[0].id, req.body.tripId],
                function(err, userResults) {
                  if (err) {
                    console.log('Error inserting into locations', err);
                  }
                }
              );
            });
            db.query(
              'INSERT INTO \
                  budget(total, trip_id, flight, activitites) \
                  VALUES($1, $2, $3, $4) RETURNING id',
              [
                req.body.hotelBudget,
                userData.rows[0].id,
                req.body.flightBudget,
                req.body.activitiesBudget
              ],
              function(err, budgetResults) {
                if (err) {
                  console.log('Error inserting into budget', err);
                }
              }
            );
            db.query(
              'INSERT INTO \
                  dates(beging, ending, duration, trip_id, trip_number) \
                  VALUES($1, $2, $3, $4, $5) RETURNING id',
              [
                req.body.beginDate.replace(/[-]/g, '/').slice(5) +
                  '/' +
                  req.body.beginDate.slice(0, 4),
                req.body.endDate.replace(/[-]/g, '/').slice(5) + '/' + req.body.endDate.slice(0, 4),
                req.body.duration,
                userData.rows[0].id,
                req.body.tripId
              ],
              function(err, dateResults) {
                if (err) {
                  console.log('Error inserting into dates', err);
                }
              }
            );
          }
        );
        setTimeout(function() {
          res.status(201);
        }, 500);
      } else {
        db.query(
          'select id from userTrips where user_id = (select id from users where email = ($1))',
          [req.body.email],
          function(err, userData) {
            obj.id = userData.rows[0].id;
            db.query(
              'SELECT * FROM locations WHERE user_trip_id = (SELECT id FROM userTrips WHERE user_id = (SELECT id FROM users WHERE email = ($1)) and trip_id = ($2))',
              [req.body.email, req.body.tripId],
              function(err, data) {
                if (err) {
                  console.log(err, 'ERR');
                }
                req.body.locations.forEach(function(location, ind, coll) {
                  if (
                    data.rows.find(function(item) {
                      return item.name === location;
                    }) === undefined
                  ) {
                    db.query(
                      'INSERT INTO \
                          locations(name, user_trip_id, trip_id) \
                          VALUES($1, $2, $3) RETURNING id',
                      [location, userData.rows[0].id, req.body.tripId],
                      function(err, userResults) {
                        if (err) {
                          console.log('Error inserting into locations', err);
                        }
                      }
                    );
                  }
                });
              }
            );
            db.query(
              'update dates set beging = ($1), ending = ($2), duration = ($3) where trip_id = (select id from userTrips where user_id = (select id from users where email = ($4)) and trip_id = ($5))',
              [
                req.body.beginDate.replace(/[-]/g, '/').slice(5) +
                  '/' +
                  req.body.beginDate.slice(0, 4),
                req.body.endDate.replace(/[-]/g, '/').slice(5) + '/' + req.body.endDate.slice(0, 4),
                req.body.duration,
                req.body.email,
                req.body.tripId
              ],
              function(err, updateDates) {
                if (err) {
                  console.log('ERROR!!', err);
                }
              }
            );
            db.query(
              'update budget set total = ($1), flight = ($2), activitites = ($3) where trip_id = (select id from userTrips where user_id = (select id from users where email = ($4)) and trip_id = ($5))',
              [
                +req.body.hotelBudget,
                +req.body.flightBudget,
                +req.body.activitiesBudget,
                req.body.email,
                req.body.tripId
              ],
              function(err, data) {
                if (err) {
                  console.log('ERROR!', err);
                }
                setTimeout(function() {
                  res.status(201);
                }, 1000);
              }
            );
          }
        );
      }
    }
  );
};

module.exports.userTripNames = function(req, res) {
  console.log(typeof req.body.name, 'USER TRIPS!');
  var name = req.body.email;
  db.query('select * from users where email = ($1)', [req.body.email], function(err, names) {
    if (err) {
      console.log(err, 'Error in userTripNames!');
    }
    if (names.rows.length !== 0) {
      console.log(names.rows[0].namef != req.body.name, 'BOOL!');
      if (names.rows[0].namef != req.body.name) {
        db.query(
          'update users set namef = ($1), namel = ($2) where email = ($3)',
          [req.body.name, req.body.name, req.body.email],
          function(err, confirm) {
            if (err) {
              console.log(err, 'Error updating user name!');
            }
          }
        );
      }
    }
  });

  db.query(
    'select * from trips INNER JOIN userTrips ON (trips.id = userTrips.trip_id AND userTrips.user_id = (SELECT id FROM users where email = ($1)))',
    [req.body.email],
    function(err, data) {
      setTimeout(function() {
        data && res.send(data.rows);
      }, 300);
    }
  );
};
