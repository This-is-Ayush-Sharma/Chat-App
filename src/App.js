// import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';

import io from 'socket.io-client';
// import { nanoid } from 'nanoid';
const socket = io.connect("https://chatting-test-api.herokuapp.com/"); 
// const socket = io.connect("http://172.32.0.26:5000");
// const userName = nanoid(4);
const userName = prompt("Enter your name", "Harry Potter");
function App() {

  const [message, setmessage] = useState("");
  const [chat, setchat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName })
    setmessage('');
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setchat([...chat, payload]);
    })
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat app By Ayush Sharma</h1>
        <div style={{height:"300px", width:"100%", overflowY:"scroll",backgroundColor:"black",margin:"20px",color:"white"}}>
        {chat.map((payload, index) => {
          return (
            <p key={index}><span>id:{payload.userName}</span>:-{payload.message}</p> 
          )
        })}
        </div>
        {/* {nanoid()} */}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            Autocomplete="off"
            placeholder='send text' value={message} onChange={(e) => {
              setmessage(e.target.value);
            }}>
          </input>
          <button type="submit" >Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;

