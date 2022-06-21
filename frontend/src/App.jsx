import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Chat from "./Chat";
import "./App.css";

const END_POINT = "http://localhost:5000";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(END_POINT);
    socket.on("Fromapi", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <Chat />
    </>
  );
}

export default App;
