/** @jsxImportSource @emotion/react */

interface ReviewStarPointProps {
  starPoint: number;
  icon: string;
}

const ReviewStarPoint = ({ starPoint, icon }: ReviewStarPointProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        gap: "5px",
        alignItems: "center",
      }}
    >
      <div
        css={{
          width: "17px",
          height: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          css={{
            width: "100%",
            height: "100%",
          }}
          src={icon}
          alt="starIcon"
        />
      </div>
      <div>
        <p
          css={{
            fontSize: "14px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {starPoint}
        </p>
      </div>
    </div>
  );
};

export default ReviewStarPoint;
