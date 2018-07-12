import React from 'react';

export default function Message(props){
    return (
    <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="usercount"> {props.count}  </span>
    </nav>
    );

}