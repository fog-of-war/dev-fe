/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface ReviewProfileProps {
  profileImage: string;
  nickname: string;
  date: string;
}

const ReviewProfile = ({
  profileImage,
  nickname,
  date,
}: ReviewProfileProps) => {
  return (
    <div
      css={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        padding: "0 20px",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <div
        css={{
          width: "40px",
          maxWidth: "40px",
          heigth: "40px",
          maxHeight: "40px",
          overflow: "hidden",
          borderRadius: "100%",
        }}
      >
        <img
          css={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          src={profileImage}
          alt="profileImage"
        />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <div>
          <p
            css={{
              fontSize: "16px",
              color: colors.subFont,
            }}
          >
            {nickname}
          </p>
        </div>
        <div>
          <p
            css={{
              fontSize: "13px",
              color: "#AAAAAA",
            }}
          >
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewProfile;
