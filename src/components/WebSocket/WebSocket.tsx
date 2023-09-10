import { set } from "lodash";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("ws://localhost:5000/v1/ws-react");

const WebSocketComponent: React.FC = () => {
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message: message });
  };

  return (
    <div>
      <input
        placeholder="message"
        type="text"
        value={message} // 입력 필드와 상태 변수를 연결
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
