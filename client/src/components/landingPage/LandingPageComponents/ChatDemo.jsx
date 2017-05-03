import React, { Component } from 'react';
import {
  colors,
  randomColor,
  getBuddyFromGroup,
  weekendBuddies,
  familyBuddies,
  bachBuddies,
  summerBuddies,
  getWeekendMessage,
  getFamilyMessage,
  getBachMessage,
  getSummerMessage,
} from './chatDemoData';


var ChatMessages = function({name, text, color}) {
  return (
    <div>
      <p className={color}>{name}</p>
      <div className="chatMessageContainer">
        <div className={color}>
          {text}
        </div>
      </div>
    </div>
  );
};

class ChatDemo extends Component {
  constructor(props) {
    super(props);
    this.updateScrollPosition = this.updateScrollPosition.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.loadNextMessage = this.loadNextMessage.bind(this);
    this.state = {
      messages: [],
      counter: 0,
      activeRoom: 'Weekend Getaway',
      chatInterval: null
    };
  }

  updateScrollPosition() {
    var $chatMessages = this.refs.chatWindow;
    var isScrolledToBottom = $chatMessages.scrollHeight - $chatMessages.clientHeight <= $chatMessages.scrollTop + 1;

    if (!isScrolledToBottom) {
      $chatMessages.scrollTop = $chatMessages.scrollHeight - $chatMessages.clientHeight;
    }
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
  }

  updateMessage(event) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  handleRoomChange(event) {
    this.setState({
      activeRoom: event.target.value,
      messages: [],
      counter: 0
    });
  }

  loadNextMessage(){
    var room = this.state.activeRoom;
    var counter = this.state.counter;
    var nextText = '';
    var nextName = '';

    //get next message from room
    if(room === "Weekend Getaway"){
      nextText = getWeekendMessage(counter)
      nextName = getBuddyFromGroup(weekendBuddies);
    } else if(room === "Family Reunion"){
      nextText = getFamilyMessage(counter)
      nextName = getBuddyFromGroup(familyBuddies);
    } else if(room === "Bachelorette Party"){
      nextText = getBachMessage(counter)
      nextName = getBuddyFromGroup(bachBuddies);
    } else if(room === "Summer Vacation"){
      nextText = getSummerMessage(counter)
      nextName = getBuddyFromGroup(summerBuddies);
    }

    if (nextText){
      var nextMessage = {
          name: nextName,
          text: nextText,
          color: colors[Math.floor(Math.random() * (colors.length - 1))] + '-text'
        }

      this.setState({
        messages: this.state.messages.concat(nextMessage),
        counter: ++counter
      });
    }
  }

  componentDidMount() {
    $(document).ready(function() {
      $('select').material_select();
    });

    var chatInterval = setInterval(this.loadNextMessage, 2000);

    this.setState({
      chatInterval: chatInterval
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.chatInterval);
  }


  render() {
    return (
      <div className="section white homepage-data">
        <div className="input-field">
          <select className="browser-default" value={this.state.activeRoom} onChange={this.handleRoomChange.bind(this)}>
            <option value="Weekend Getaway">Weekend Getaway</option>
            <option value="Family Reunion">Family Reunion</option>
            <option value="Bachelorette Party">Bachelorette Party</option>
            <option value="Summer Vacation">Summer Vacation</option>
          </select>
        </div>

        <div className="col s12">
          <div className="chat card grey lighten-4">
            <div className="card-content chat-window" ref="chatWindow">

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
    );
  }
}

export default ChatDemo;