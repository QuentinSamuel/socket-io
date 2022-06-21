import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const END_POINT = "http://localhost:5000";

export default function Chat() {
  const [message, setMessage] = useState("");
  const chatList = [];

  useEffect(() => {
    const socket = socketIOClient(END_POINT);
    socket.on("ChatMessage", (msg) => {
      setMessage(msg);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      const socket = socketIOClient(END_POINT);
      socket.emit("FromFrontend", message);
      chatList.push(message);
      setMessage("");
    } else {
      alert("Please enter a message");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
