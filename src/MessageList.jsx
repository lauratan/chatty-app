import React, {Component} from 'react';
import Message from './Message.jsx';
import autoscroll from 'autoscroll-react';

// const styles = {
//     overflowY: 'scroll',
//     height: '800px'
// };

class MessageList extends Component {
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
            <main className="messages">
                {messages}
            </main>
        );
    }
}

export default autoscroll(MessageList)