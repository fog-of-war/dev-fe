/** @jsxImportSource @emotion/react */

import React, { useEffect, useState } from "react";
import colors from "../../constants/colors";
import NoticeNotifications from "./NoticeNotifications";
import ActivityNotifications from "./ActivityNotifications";
import B2 from "../UI/B2";
import { getUserId } from "./utils";
import { Activity, Notification } from "./types";
import { io } from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL as string;

const accessToken = localStorage.getItem("accessToken");
const sanitizedToken = accessToken ? accessToken.replace(/"/g, "") : undefined;

const currentUserString = localStorage.getItem("currentUser");
const userId = getUserId(currentUserString);

const Notifications = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState("활동");

  useEffect(() => {
    let socket = null;

    if (currentUserString && accessToken) {
      try {
        socket = io(socketUrl + "-" + userId, {
          withCredentials: true,
          extraHeaders: {
            Authorization: `Bearer ${sanitizedToken}`,
          },
        });

        socket.on("connect", () => {
          console.log("웹 소켓 서버 연결 성공");
        });

        socket.on("activity", (data) => {
          try {
            // console.log("받은 활동 알림:", data);
            // 활동 알림 데이터를 처리하고 activities 상태를 업데이트
            const newActivity = {
              alerted_user_id: data.alerted_user_id,
              comment_created_at: data.comment_created_at,
              comment_id: data.comment_id,
              comment_text: data.comment_text,
              user_image_url: data.user_image_url,
              user_nickname: data.user_nickname,
            };
            setActivities((prevActivities) => [newActivity, ...prevActivities]);
          } catch (error) {
            console.error("알림을 처리하는 동안 오류가 발생했습니다:", error);
          }
        });

        socket.on("notification", (data) => {
          try {
            // console.log("받은 공지 알림:", data);
            // 공지 알림 데이터를 처리하고 notifications 상태를 업데이트
            const newNotification = {
              place_id: data.place_id,
              place_name: data.place_name,
              post_id: data.post_id,
              post_image_url: data.post_image_url,
              region_name: data.region_name,
              post_created_at: data.post_created_at,
            };
            setNotifications((prevNotifications) => [
              newNotification,
              ...prevNotifications,
            ]);
          } catch (error) {
            console.error("알림을 처리하는 동안 오류가 발생했습니다:", error);
          }
        });
      } catch (error) {
        console.error("WebSocket 연결 중 오류 발생:", error);
      }
    }
  }, []);

  // 탭 클릭 시, 활성화된 탭을 업데이트
  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <B2
          onClick={() => handleTabClick("활동")}
          style={{
            cursor: "pointer",
            color: activeTab === "활동" ? colors.primary : colors.mediumGrey,
            fontSize: "15px",
            fontWeight: activeTab === "활동" ? "bold" : 400,
            flex: "1",
            textAlign: "center",
            borderBottom:
              activeTab === "활동"
                ? `2px solid ${colors.primary}`
                : `1px solid ${colors.paleGrey}`,
            paddingBottom: "10px",
          }}
        >
          활동 알림
        </B2>
        <B2
          onClick={() => handleTabClick("공지")}
          style={{
            cursor: "pointer",
            color: activeTab === "공지" ? colors.primary : colors.mediumGrey,
            fontSize: "15px",
            fontWeight: activeTab === "공지" ? "bold" : 400,
            flex: "1",
            textAlign: "center",
            borderBottom:
              activeTab === "공지"
                ? `2px solid ${colors.primary}`
                : `1px solid ${colors.paleGrey}`,
            paddingBottom: "10px",
          }}
        >
          공지사항
        </B2>
      </div>
      <div css={{ display: "flex" }}>
        <div
          css={{
            display: activeTab === "활동" ? "block" : "none",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <ActivityNotifications activities={activities} />
        </div>
        <div
          css={{
            display: activeTab === "공지" ? "block" : "none",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <NoticeNotifications notifications={notifications} />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
