import React, {Component} from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react';

class MessageList extends Component {
    render(){
        let messages = this.props.messages.map(message => {
            return <Message 
            key={message.id}
            user={message.username}
            content={message.content}
            />
        })
        return (
            <main className="messages">
                {messages}
                {this.props.notification}
            </main>
        );
    }
}

export default autoscroll(MessageList)