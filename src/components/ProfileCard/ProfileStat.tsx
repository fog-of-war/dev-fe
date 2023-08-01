/** @jsxImportSource @emotion/react */
import React from "react";
import colors from "../../constants/colors";

interface ProfileStatProps {
  typeImg: string;
  type: string;
  level?: number;
  rank?: number;
  badge?: number;
}

const ProfileStat = ({
  typeImg,
  type,
  level,
  rank,
  badge,
}: ProfileStatProps) => {
  return (
    <div
      css={{
        color: colors.primary,
        fontWeight: 400,
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={typeImg}
        alt={`${type}Icon`}
        css={{
          width: "17px",
          height: "18px",
        }}
      />
      <p
        css={{
          padding: "0px 5px",
        }}
      >
        {type}
      </p>
      <p css={{ paddingLeft: "5px" }}>
        {level
          ? `${level} Lv`
          : badge
          ? `${badge} 개`
          : rank
          ? `${rank} 위`
          : null}
      </p>
    </div>
  );
};

export default ProfileStat;
