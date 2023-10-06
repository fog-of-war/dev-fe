import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./styles.css";
const greenTextStyle = {
  color: "green",
};
const AlertContainer = {
  display: "grid",
};

const socketUrl = process.env.REACT_APP_SOCKET_URL as string;
const socket = io(socketUrl);

const AlertWebSocket: React.FC = () => {
  const [receive, setReceive] = useState<any[]>([]);

  // useEffect(() => {
  //   const handleReceiveMessage = (data: any) => {
  //     console.log("🐤", receive);
  //     if (data && data.message) {
  //       console.log("🐤", data.message);
  //       setReceive((prevReceive) => [...prevReceive, data.message]);
  //     }
  //   };

  //   socket.on("connect", () => {
  //     console.log("웹소켓서버연결성공");
  //   });
  //   socket.on("receive_post_alert", handleReceiveMessage);
  //   return () => {
  //     socket.off("receive_post_alert", handleReceiveMessage);
  //   };
  // }, [socket]);
  // 상태 업데이트 이후에 현재 상태 출력

  return (
    <div>
      <div>
        {receive.map((message, index) => (
          <div key={index} className="AlertContainer">
            <img
              className="image_container"
              src={message.post_image_url}
              alt={`${message.place_name} - ${message.post_id}`}
            />
            <h4>
              <span>{message.region_name}</span>에 새로운 장소 발견
            </h4>
            <h4>
              <span style={greenTextStyle}>{message.place_name}</span>를
              만나보세요
            </h4>
            <span>{message.post_created_at}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertWebSocket;
