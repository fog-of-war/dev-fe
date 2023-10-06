/** @jsxImportSource @emotion/react */
import colors from "../../constants/colors";
import { UserData, UserRank } from "../../types/types";

interface ProfileStatProps {
  type: "exploration" | "badge" | "rank";
  data: UserData | null;
  rankData: UserRank | null;
  onClick?: () => void;
}

const ProfileStat = ({ type, data, rankData, onClick }: ProfileStatProps) => {
  const statTypes = {
    exploration: {
      typeImg: "./images/flagIcon.png",
      label: "탐험",
      value: data?.user_level,
      unit: "Lv",
    },
    badge: {
      typeImg: "./images/badgeIcon.svg",
      label: "뱃지",
      value: data?.user_badges.length,
      unit: "개",
    },
    rank: {
      typeImg: "./images/starIcon.png",
      label: "순위",
      value: rankData?.rank,
      unit: "위",
    },
  };

  const stat = statTypes[type];

  return (
    <div
      css={{
        color: colors.primary,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
      onClick={type === "rank" ? onClick : undefined}
    >
      <img
        src={stat.typeImg}
        alt={`${stat.label}Icon`}
        css={{
          width: "17px",
          height: "18px",
        }}
      />
      <p
        css={{
          color: colors.secondary,
          fontSize: "16px",
        }}
      >
        {stat.label}
      </p>
      <p css={{ fontSize: "15px" }}>
        <span>{stat.value}</span>
        <span css={{ marginLeft: "10px" }}>{stat.unit}</span>
      </p>
    </div>
  );
};

export default ProfileStat;
