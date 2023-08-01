/** @jsxImportSource @emotion/react */
import ProfileStat from "./ProfileStat";

const DUMMY_DATA = [
  {
    typeImg: "./images/flagIcon.png",
    type: "탐험",
    level: 3,
  },
  {
    typeImg: "./images/badgeIcon.svg",
    type: "뱃지",
    badge: 34,
  },
  {
    typeImg: "./images/starIcon.png",
    type: "순위",
    rank: 58,
  },
];

const ProfileInfo = () => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "350px",
        height: "20px",
        backgroundColor: "white",
      }}
    >
      {DUMMY_DATA.map((stat, index) => (
        <ProfileStat key={index} {...stat} />
      ))}
    </div>
  );
};

export default ProfileInfo;
