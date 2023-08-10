/** @jsxImportSource @emotion/react */
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";

interface ReviewListHeaderProps {
  placeName: string;
  reviewCount?: number;
}

const ReviewListHeader = ({
  placeName,
  reviewCount,
}: ReviewListHeaderProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        maxWidth: "420px",
        height: "50px",
        position: "fixed",
        top: "0",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        css={{
          width: "10px",
          height: "20px",
          paddingLeft: "30px",
        }}
      >
        <BackButton onClick={handleBackButtonClick} />
      </div>
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          gap: "5px",
          alignItems: "center",
        }}
      >
        <div>
          <h1
            css={{
              fontSize: "17px",
              fontWeight: "400",
            }}
          >
            {placeName}
          </h1>
        </div>
        <div>
          <p>({reviewCount})</p>
        </div>
      </div>
      <div
        css={{
          paddingRight: "30px",
        }}
      />
    </div>
  );
};

export default ReviewListHeader;
