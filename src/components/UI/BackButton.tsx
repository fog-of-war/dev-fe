/** @jsxImportSource @emotion/react */

interface BackButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const BackButton = ({ size, ...props }: BackButtonProps) => {
  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      {...props}
    >
      <img
        src="/images/backBtn.png"
        alt="back_button"
        height={size ? size : 24}
      />
    </div>
  );
};

export default BackButton;
