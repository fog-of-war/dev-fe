/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";
import B2 from "../UI/B2";
import B3 from "../UI/B3";

const imageUrl = "images/placeImage.png";

const NoticeNotifications = () => {
  const notifications = [
    {
      id: 1,
      area: "강동구",
      place: "제이든 커피 강동점",
      timestamp: "1시간전",
    },
    {
      id: 2,
      area: "강남구",
      place: "뭐시기 놀이동산",
      timestamp: "2시간전",
    },
    {
      id: 3,
      area: "강서구",
      place: "갬성 카페",
      timestamp: "2시간전",
    },
  ];

  // 'x' 아이콘 클릭 시, 해당 알림 삭제
  const handleDeleteClick = (notificationId: number) => {
    console.log("지워!");
  };

  return (
    <div>
      <hr css={{ width: "100%", border: `0.5px solid ${colors.paleGrey}` }} />
      {notifications.map((notification) => (
        <div
          key={notification.id}
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
              src={imageUrl}
              alt="프로필 이미지"
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
              css={{ color: colors.mediumGrey, fontWeight: 600, fontSize: 15 }}
            >
              {notification.area}에 새로운 장소가 추가되었어요
            </B2>
            <br />
            <B2 css={{ color: colors.mediumGrey, fontWeight: 400 }}>
              <span style={{ color: colors.primary, fontWeight: 600 }}>
                {notification.place}
              </span>
              를 만나보세요
            </B2>
            <br />
            <B3 style={{ color: colors.lightGrey, fontWeight: 400 }}>
              {notification.timestamp}
            </B3>
          </div>
          <img
            src="images/xIcon.png"
            alt="삭제 아이콘"
            onClick={() => handleDeleteClick(notification.id)}
            css={{
              cursor: "pointer",
              width: 12,
              marginLeft: "auto",
              marginBottom: "55px",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NoticeNotifications;
