import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL as string;
const socket = io(socketUrl);

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
    socket.on("connect", () => {});
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
