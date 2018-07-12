import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: '',
        //   username: '',
        //   content: ''
        // }
      ]
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
    // console.log('Connected to server', window.location.host)

    this.socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      const messages = this.state.messages.concat(msg);
      this.setState({messages: messages})
      
    }
  }

  onEnter(content) {
    console.log(content);
    const newMessage = { username: this.state.currentUser.name, content};

   
    this.socket.send(JSON.stringify(newMessage));
    
  }

  onEnterUsername(newUsername){ 
    this.setState({currentUser: newUsername});
  }
 
  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages = { this.state.messages }/>
        <ChatBar 
          onEnter = { this.onEnter }
          username = { this.state.currentUser.name }
          onEnterUsername = { this.onEnterUsername }
        />
      </div>
    );
  }
}

