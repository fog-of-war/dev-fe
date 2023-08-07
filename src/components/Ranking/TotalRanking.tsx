/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface TotalRankingProps {
  ranking: number;
  profileImage: string;
  nickname: string;
  flagIcon: string;
  badgeIcon: string;
  advanturePoint: number;
  badgeCount: number;
}

const TotalRanking = ({
  ranking,
  profileImage,
  nickname,
  flagIcon,
  badgeIcon,
  advanturePoint,
  badgeCount,
}: TotalRankingProps) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        borderBottom: "1px solid #f1f1f1",
        padding: "10px 0",
      }}
    >
      <div
        css={{
          width: "20px",
          height: "20px",
          color: "#ffffff",
          fontSize: "14px",
          fontWeight: "600",
          textAlign: "center",
          borderRadius: "5px",
          backgroundColor: colors.primary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {ranking}
      </div>
      <div
        css={{
          width: "50px",
          height: "50px",
          borderRadius: "100%",
          overflow: "hidden",
        }}
      >
        <img
          css={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={profileImage}
          alt="프로필 사진"
        />
      </div>
      <div
        css={{
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.secondary,
        }}
      >
        {nickname}
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3px",
          marginLeft: "auto",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexDirection: "row",
          }}
        >
          <img
            css={{
              width: "15px",
              height: "17px",
            }}
            src={flagIcon}
            alt="flag"
          />
          <p
            css={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#6F6F6F",
            }}
          >
            {advanturePoint.toLocaleString()}점
          </p>
        </div>
        <div
          css={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "5px",
            flexDirection: "row",
          }}
        >
          <img
            css={{
              width: "15px",
              height: "18px",
            }}
            src={badgeIcon}
            alt="badge"
          />
          <p
            css={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#6F6F6F",
            }}
          >
            {badgeCount}개
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalRanking;
