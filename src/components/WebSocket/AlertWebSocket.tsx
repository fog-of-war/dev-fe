import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:5000/v1/ws-react");

const AlertWebSocket: React.FC = () => {
  const [receive, setReceive] = useState<any[]>([]);

  useEffect(() => {
    socket.emit("send_alert", "hey");

    const handleReceiveMessage = (data: any) => {
      console.log(data);
      if (data && data.message) {
        setReceive((prevReceive) => [...prevReceive, data.message]);
      }
      console.log(receive);
    };

    socket.on("connect", () => {
      console.log("웹소켓서버연결성공");
    });
    socket.on("receive_alert", handleReceiveMessage);

    return () => {
      socket.off("receive_alert", handleReceiveMessage);
    };
  }, [socket]);
  // 상태 업데이트 이후에 현재 상태 출력

  return (
    <div>
      <div>
        {receive.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default AlertWebSocket;
