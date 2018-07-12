import React, {Component} from 'react';

export default class ChatBar extends Component {

    constructor(){
        super();
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onUsernameUpdate = this.onUsernameUpdate.bind(this);
    }

    onKeyPress(event) {
        if (event.key === 'Enter'){
           const content = event.target.value;
           event.target.value=''
           this.props.onEnter(content)
        }
    }


    onUsernameUpdate(event) {
        const newUsername = (event.target.value.length === 0) ? {name: 'Anonymous' } : {name: event.target.value};
        this.props.onEnterUsername(newUsername);
    }

    render() {
        return (
        <footer className="chatbar">
            <input className="chatbar-username" placeholder="Your Name (Optional)" autoFocus name="currentUser" defaultValue={this.props.username} onBlur={ this.onUsernameUpdate }/>
            <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="content" onKeyPress={ this.onKeyPress }/>
        </footer>)
    }
}


