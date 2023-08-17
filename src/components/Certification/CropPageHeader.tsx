/** @jsxImportSource @emotion/react */

const CropPageHeader = () => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        maxWidth: "420px",
        height: "50px",
        position: "fixed",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        zIndex: 1,
      }}
    >
      <div>
        <h1
          css={{
            fontSize: "18px",
            fontWeight: "400",
          }}
        >
          사진 선택
        </h1>
      </div>
    </div>
  );
};

export default CropPageHeader;
