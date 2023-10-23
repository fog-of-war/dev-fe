/** @jsxImportSource @emotion/react */

interface NoSearchDataProps {
  children?: React.ReactNode;
}

const NoSearchData = ({
  children = "검색결과가 없습니다.",
}: NoSearchDataProps) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};

export default NoSearchData;
