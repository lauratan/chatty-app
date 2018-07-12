import React from 'react';

export default function Message(props){
    return (
    <div className="message">
      <span className="message-username">{props.user}</span>
      <span className="message-content">{props.content}</span>

    <div className="message system">
        {props.notification}
    </div> 

    </div>
    );

}