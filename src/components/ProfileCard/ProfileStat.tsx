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
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
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
          color: colors.secondary,
          fontSize: "16px",
        }}
      >
        {type}
      </p>
      <p css={{ fontSize: "15px" }}>
        {level ? (
          <>
            <span>{level}</span>
            <span css={{ marginLeft: "10px" }}>Lv</span>
          </>
        ) : badge ? (
          <>
            <span>{badge}</span>
            <span css={{ marginLeft: "10px" }}>개</span>
          </>
        ) : rank ? (
          <>
            <span>{rank}</span>
            <span css={{ marginLeft: "10px" }}>위</span>
          </>
        ) : null}
      </p>
    </div>
  );
};

export default ProfileStat;
