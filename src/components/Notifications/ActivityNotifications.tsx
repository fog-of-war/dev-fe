/** @jsxImportSource @emotion/react */

import { useNavigate } from "react-router-dom";
import colors from "../../constants/colors";
import B2 from "../UI/B2";
import B3 from "../UI/B3";
import TimeAgo from "./TimeAgo";

import { Activity } from "./types"; // 타입을 types 폴더로 분리

const imageUrl = "images/dummyUserImage.png";

interface ActivityNotificationsProps {
  activities: Activity[]; // 활동 알림 데이터 배열
}

const ActivityNotifications: React.FC<ActivityNotificationsProps> = ({
  activities,
}) => {
  const navigate = useNavigate();

  // 알림 클릭 시, 해당 장소의 리뷰 목록으로 이동
  const handleNotificationClick = (commented_post_place_id: number) => {
    navigate(`/reviewList/${commented_post_place_id}`);
  };

  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (
    notificationId: number,
    event: React.MouseEvent
  ) => {
    event.stopPropagation(); // 클릭 이벤트 중단
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {activities.length === 0 ? ( // 알림이 없을 때
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
        activities.map((activity) => (
          <div
            key={activity.comment_id}
            css={{
              display: "flex",
              alignItems: "center",
              padding: 15,
              borderBottom: `1px solid ${colors.paleGrey}`,
            }}
            onClick={() =>
              handleNotificationClick(activity.commented_post_place_id)
            }
          >
            <div
              css={{
                width: "42px",
                height: "42px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "10px",
                border: `0.5px solid #EDEDED`,
              }}
            >
              <img
                src={imageUrl}
                alt="프로필 이미지"
                css={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div css={{ flex: 1 }}>
              <B2 css={{ color: colors.mediumGrey, fontWeight: 600 }}>
                <span style={{ color: colors.primary }}>
                  {activity.user_nickname}
                </span>
                님이 댓글을 남겼어요
              </B2>
              <br />
              <B3 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
                {activity.comment_text.length > 20
                  ? `${activity.comment_text.slice(0, 20)}...`
                  : activity.comment_text}{" "}
                <span style={{ color: colors.lightGrey }}>
                  <TimeAgo timestamp={activity.comment_created_at} />
                </span>
              </B3>
            </div>
            <img
              src="images/xIcon.png"
              alt="삭제 아이콘"
              onClick={(event) => handleDeleteClick(activity.comment_id, event)}
              css={{
                cursor: "pointer",
                width: 12,
                marginLeft: "auto",
                marginBottom: "35px",
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ActivityNotifications;
