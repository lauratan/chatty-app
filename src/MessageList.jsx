import React, {Component} from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react';

class MessageList extends Component {
    render(){
        let messages = this.props.messages.map(message => {
            return <Message 
            key={message.id}
            username={message.username}
            content={message.content}
            notification={message.notification}
            color={message.color}
            />
        })
        return (
            <main className="messages">
                {messages}
            </main>
        );
    }
}

export default autoscroll(MessageList)