import React, { Component } from 'react';

var colors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo',
  'blue', 'cyan', 'teal', 'green',
  'amber', 'orange', 'deep-orange'
];

var randomColor = colors[Math.floor(Math.random() * (colors.length - 1))] + '-text';

var ChatMessages = function({name, text, color}) {
  return (
    <div>
      <p className={color}>{name}</p>
      <div className='chatMessageContainer'>
        <div className={color}>
          {text}
        </div>
      </div>
    </div>
  );
};



class TripRoomChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      socket: io(),
    };

    this.state.socket.on('connect', function() {
      this.state.socket.emit('room', this.props.tripId);
    }.bind(this));

    this.state.socket.on('new message', function(data) {
      this.setState({
      messages: this.state.messages.concat(
        {
          name: data.name,
          text: data.text,
          color: data.color
        })
      });
    }.bind(this));
  }

  sendMessage() {
    var text = $('#chatTextField').val();
    this.setState({
      messages: this.state.messages.concat(
        {
          name: 'You',
          text: text,
          color: randomColor
        })
    });
    $('#chatTextField').val('');

    this.state.socket.emit('new message', {
      name: 'Someone',
      text: text,
      color: randomColor
    });
  }

  updateMessage(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div>

        <div className="col s12">
          <div className="chat card grey lighten-4">
            <div className="card-content">
              <div>
                <p className="blue-text">Preston</p>
                <div className="chatMessageContainer blue-text">
                  Hey guys looks like we all are free to travel in a few weeks...
                </div>
              </div>

              <div>
                <p className="green-text">Nate</p>
                <div className="chatMessageContainer green-text">
                  Yeah that looks like the best time! Where do you guys want to go? Looks like we had a lot of overlap
                </div>
              </div>

              <div>
                <p className="red-text">Max</p>
                <div className="chatMessageContainer red-text">
                  Personally, the carribean would be my top choice!
                </div>
              </div>

              {this.state.messages.map((message, index) =>
                <ChatMessages name={message.name} text={message.text} color={message.color} key={index} />
                )}

            </div>
            <div className="card-action">
              <input id="chatTextField" placeholder="type a message..." type="text" onKeyUp={this.updateMessage.bind(this)} />
              <a className="btn-floating halfway-fab waves-effect waves-light orange" onClick={this.sendMessage.bind(this)} ><i className="material-icons">add</i></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


module.exports = TripRoomChat;
