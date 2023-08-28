/** @jsxImportSource @emotion/react */

import BackButton from "../UI/BackButton";

const SetupProfileHeader = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        top: "20px",
        left: "20px",
        height: "40px",
        width: "100%",
      }}
    >
      <BackButton onClick={onClick} />
    </div>
  );
};

export default SetupProfileHeader;
