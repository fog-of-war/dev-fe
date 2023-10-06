/** @jsxImportSource @emotion/react */

const ReviewStarPoint = ({ rating }: { rating: number }) => {
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
          src="/images/starPointIcon.png"
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
          {rating}
        </p>
      </div>
    </div>
  );
};

export default ReviewStarPoint;
