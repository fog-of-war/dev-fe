/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface BadgePageHeaderProps {
  showAllBadges: boolean;
  handleToggleClick: () => void;
  acquiredBadgesCount: number;
}

const BadgePageHeader = ({
  showAllBadges,
  handleToggleClick,
  acquiredBadgesCount,
}: BadgePageHeaderProps) => {
  const BadgeToggleButton = () => (
    <div
      onClick={handleToggleClick}
      css={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "3.5rem",
        height: "2rem",
        borderRadius: "9999px",
        backgroundColor: showAllBadges ? "#D1D5DB" : colors.primary,
        padding: "0.25rem",
        cursor: "pointer",
      }}
    >
      <div
        css={{
          position: "absolute",
          width: "1.5rem",
          height: "1.5rem",
          backgroundColor: "#FFF",
          borderRadius: "50%",
          transition: "transform 0.2s",
          transform: showAllBadges ? "translateX(1.5rem)" : "translateX(0)",
        }}
      ></div>
    </div>
  );

  return (
    <>
      <div
        css={{
          display: "flex",
          width: "100%",
          maxWidth: "420px",
          height: "50px",
          alignItems: "center",
          position: "fixed",
          top: "0",
          backgroundColor: "#FFFFFF",
          zIndex: 1,
          padding: "0 20px",
          justifyContent: "space-between",
        }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            css={{
              paddingTop: "6px",
            }}
          >
            <img
              src="/images/badgeIcon.svg"
              alt="badge_icon"
              css={{
                width: "18px",
                height: "22px",
              }}
            />
          </div>
          <span
            css={{
              color: colors.primary,
              fontSize: "20px",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
          >
            {showAllBadges
              ? "전체 뱃지 목록"
              : `획득한 뱃지 ${acquiredBadgesCount}개`}
          </span>
        </div>
        <BadgeToggleButton />
      </div>
    </>
  );
};

export default BadgePageHeader;
