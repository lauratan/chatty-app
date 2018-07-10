import React, {Component} from 'react';
import Message from './Message.jsx'

export default class MessageList extends Component {
    render(){
        // return <Message/>
        let messages = this.props.messages.map(message => {
            return <Message 
            key={message.id}
            user={message.username}
            content={message.content}
            />
        })
        return (
            <section>
                {messages}
            </section>
        );
    }
}