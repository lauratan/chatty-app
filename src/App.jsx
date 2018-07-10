import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 'hyvdw',
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
        },
        {
          id: '1kdho',
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
        }
      ]
    };

    this.onEnter = this.onEnter.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: 'Michelle', content: 'Hello there!'};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }
  
  // onEnter(event) {
  //   const newMessage = [{username: this.state.currentUser.name , content: event.target.value}];
  //   this.setState((prevState) => {
  //     return 
  //   })
  // }

  onEnter(event) {
    const newMessage = [{username: this.state.currentUser.name , content: event.target.value}];
    const messages = this.state.messages.concat(newMessage)
    if (event.key === 'Enter'){
      this.setState({messages: messages} , event.target.value='')
    }
  }
 
  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
        <MessageList messages = { this.state.messages }/>
        <ChatBar 
        currentUser = { this.state.currentUser } 
        onEnter = { this.onEnter }/>
      </div>
    );
  }
}

