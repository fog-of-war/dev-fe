/** @jsxImportSource @emotion/react */

interface SearchPannelHeaderProps {
  title: string;
  rightSlot?: React.ReactNode;
}

const SearchPannelHeader = ({ title, rightSlot }: SearchPannelHeaderProps) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h4>{title}</h4>
      {rightSlot}
    </div>
  );
};

export default SearchPannelHeader;
