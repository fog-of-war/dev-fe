/** @jsxImportSource @emotion/react */

const MainCard = () => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        margin: "auto",
        borderRadius: 25,
        width: "95%",
        backgroundColor: "#E4F6ED",
        padding: 20,
      }}
    >
      <div
        css={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: "#53AF7B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          color: "#FFFFFF",
          fontWeight: "bold",
          marginRight: 10,
        }}
      >
        여
      </div>
      <span css={{ fontSize: 22, color: "#53AF7B", fontWeight: "bold" }}>
        여러분과함께라면행복해
      </span>
    </div>
  );
};

export default MainCard;
