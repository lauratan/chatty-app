import React from 'react';

export default function Message(props){
    return (<main className="messages">
    <div className="message">
      <span className="message-username">{props.user}</span>
      <span className="message-content">{props.content}</span>
    </div>
    {/* <div className="message system">
      Anonymous1 changed their name to nomnom.
    </div> */}
  </main>);
}