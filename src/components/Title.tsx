/** @jsxImportSource @emotion/react */

interface TitleProps {
  text: string;
  icon: string;
}

const Title = ({ text, icon }: TitleProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      <img src={icon} alt={icon} height={22} />
      <h2
        css={{
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        {text}
      </h2>
    </div>
  );
};

export default Title;
