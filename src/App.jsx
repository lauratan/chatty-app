import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: '',
        //   username: '',
        //   content: '',
        //   notification: ''
        //   colour: '{color: ''}'
        // }
      ],
      usersOnline: ''
    };

    this.onEnter = this.onEnter.bind(this);
    this.onEnterUsername = this.onEnterUsername.bind(this);
  }

  componentDidMount() {
    // setTimeout(() => {
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
    this.socket = new WebSocket(`ws://${window.location.hostname}:3001`); //${window.location.host}

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch(msg.type){
        case 'incomingNotification': {

        //Handle incomingNotifcation type: display Notication that user changed name in Message.jsx
        const messages = this.state.messages.concat(msg);
        this.setState({messages})
        break;
        }

        //Handle incomingMessage type: display the message in message 
        case 'incomingMessage':{
        const messages = this.state.messages.concat(msg);
        this.setState({messages})
        break;
        }

        //Handle incomingNumber of online users
        case 'incomingNumber': {
        this.setState({usersOnline: msg.content})
        break;
        }
      }
    }
  }


  //Gets content from ChatBar and sends it to socket server
  onEnter(content) {
    const newMessage = {  
      type: 'postMessage',
      username: this.state.currentUser.name, 
      content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  //Gets entered username from ChatBar and change the state of current user 
  onEnterUsername(newUsername){ 
    if (this.state.currentUser.name === '' || this.state.currentUser.name === newUsername.name){
      this.setState({currentUser: newUsername});
    }
   
    else {
      const notification = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has changed their name to ${newUsername.name}`
      }
      this.setState({currentUser: newUsername});
      this.socket.send(JSON.stringify(notification));
    }
  }
 
  render() {
    return (
      <div>
        <NavBar  count = { this.state.usersOnline }/>
        <MessageList messages = { this.state.messages } />
        <ChatBar 
          onEnter = { this.onEnter }
          username = { this.state.currentUser.name }
          onEnterUsername = { this.onEnterUsername }
        />
      </div>
    );
  }
}

