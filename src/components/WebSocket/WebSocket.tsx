import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:5000/v1/ws-react");

const WebSocketComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const [receive, setReceive] = useState<any[]>([]);

  const sendMessage = () => {
    socket.emit("send_message", message);
  };

  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
      setReceive((prevReceive) => [...prevReceive, data.message]);
    };
    socket.on("connect", () => {
      alert("Connected to server");
    });
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  return (
    <div>
      <div>
        {receive.map((receive, index) => (
          <div key={index}>{receive}</div>
        ))}
      </div>
      <input
        placeholder="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
