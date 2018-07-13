// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv1 = require('uuid/v1');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });


// Broadcast to all.
wss.broadcast = (data) => {
  wss.clients.forEach( (client) => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {

  console.log('client connected', wss.options.server._connections)


  let onlineUser = {
    type: 'incomingNumber',
    content: `${wss.options.server._connections} user(s) online`
  }
  console.log(onlineUser);
  wss.broadcast(JSON.stringify(onlineUser));

  // const colours = ['blue']
  // function getColour(){
  //   let colour = {color: colours[0]};
  //   console.log(colour);
  //   return  colour;
  // }

  ws.on('message', (data) => {
    let incomingData = JSON.parse(data);
    //check postNotif or postMessage
    if (incomingData.type === 'postMessage') {
      const message = {
        type: 'incomingMessage',
        id: incomingData.id = uuidv1(),
        username: incomingData.username,
        content: incomingData.content
      }
      wss.broadcast(JSON.stringify(message));
    }
    //If it is postNotification, send incomingNotification back to App to be displayed 
    if (incomingData.type === 'postNotification') {
      console.log(incomingData.content);
      const message = {
        type: 'incomingNotification',
        id: incomingData.id = uuidv1(),
        username: '',
        content: '',
        notification: incomingData.content
        // colour: getColour() //{color:''}
      }
      console.log(message);
      wss.broadcast(JSON.stringify(message));
    }

    // console.log(`User ${message.username} says ${message.content} and ${message.id}`);
  })
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
  // console.log('client disconnected')
  let onlineUser = {
    type: 'incomingNumber',
    content: `${wss.options.server._connections} user(s) online`
  }
  wss.broadcast(JSON.stringify(onlineUser));
  })

});