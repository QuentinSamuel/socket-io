import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const END_POINT = "http://localhost:5000";

export default function Chat() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();

  useEffect(() => {
    const newSocket = socketIOClient(END_POINT);
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((oldMessages) => [...oldMessages, message]);
      });
    }
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = messageRef.current.value;
    if (message.length > 0) {
      socket.emit("message", message);
      setMessages((oldMessages) => [...oldMessages, message]);
      messageRef.current.value = "";
    } else {
      console.warn("Please enter a message");
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      {messages.map((message, index) => (
        <p key={[index]}>{message}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input type="text" ref={messageRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
