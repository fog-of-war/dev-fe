/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import B2 from "../UI/B2";
import TimeAgo from "./TimeAgo";

import { Notification } from "./types"; // 타입을 types 폴더로 분리

interface NoticeNotificationsProps {
  notifications: Notification[]; // 알림 데이터 배열
}

const NoticeNotifications: React.FC<NoticeNotificationsProps> = ({
  notifications,
}) => {
  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (notificationId: number) => {
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {notifications.length === 0 ? ( // 알림이 없을 때
        <div
          css={{
            display: "flex",
            alignItems: "center",
            padding: 15,
            borderBottom: `1px solid ${colors.paleGrey}`,
          }}
        >
          <img
            src="images/explorerIcon.png"
            alt="아이콘"
            css={{
              width: 70,
              height: 70,
              marginRight: 10,
            }}
          />
          <div css={{ flex: 1 }}>
            <B2
              css={{
                color: colors.mediumGrey,
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              새로운 알림이 없습니다.
            </B2>
          </div>
        </div>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.post_id}
            css={{
              display: "flex",
              alignItems: "center",
              padding: 15,
              borderBottom: `1px solid ${colors.paleGrey}`,
            }}
          >
            <div
              css={{
                width: "70px",
                height: "70px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                display: "inline-block",
                marginRight: "10px",
                border: `0.5px solid #EDEDED`,
              }}
            >
              <img
                src={notification.post_image_url}
                alt="장소 이미지"
                css={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div css={{ flex: 1 }}>
              <B2
                css={{
                  color: colors.mediumGrey,
                  fontWeight: 600,
                  fontSize: 15,
                }}
              >
                {notification.region_name}에 탐험 장소가 추가되었어요
              </B2>
              <br />
              <B2 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
                <span style={{ color: colors.primary, fontWeight: 600 }}>
                  {notification.place_name}
                </span>
                를 만나보세요
              </B2>
              <br />
              <TimeAgo timestamp={notification.post_created_at} />
            </div>
            <img
              src="images/xIcon.png"
              alt="삭제 아이콘"
              onClick={() => handleDeleteClick(notification.post_id)}
              css={{
                cursor: "pointer",
                width: 12,
                marginLeft: "auto",
                marginBottom: "55px",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default NoticeNotifications;
