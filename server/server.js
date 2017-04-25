var express = require('express'); var app = express();
var path = require('path');
var routes = require('./routes');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var socket = require('socket.io');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '../client')));

app.get('/*', function(req,res) {
  res.redirect('/');
});

app.use(routes);

var server = app.listen(port, function() {
  console.log('listening on', port);
});

// Socket stuff
var io = socket(server);

io.on('connection', function (socket) {

  socket.on('room', function(tripRoomChat) {
    console.log('user joined:', tripRoomChat);
    if(socket.tripRoomChat){
      socket.leave(socket.tripRoomChat);
    }
    socket.join(tripRoomChat);
    socket.tripRoomChat = tripRoomChat;
  });

  // Used in LandingPage and TripRoom
  socket.on('new message', function(data) {
    console.log(data.text, ' heard in: ', socket.tripRoomChat);
    socket.broadcast.in(socket.tripRoomChat).emit('new message', {
      name: data.name,
      text: data.text,
      color: data.color
    });
  });

  // Used in buddyVoteSlider
  socket.on('new vote', function (data) {
    socket.broadcast.emit('new vote', {
      bookmarkId: data.bookmarkId,
      buddyName: data.buddyName,
      num: data.num
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});


module.exports = app;
