/** @jsxImportSource @emotion/react */

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  height?: number;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => Promise<void>;
}

const IconButton = ({ icon, height, onClick, ...props }: IconButtonProps) => {
  return (
    <div
      onClick={onClick}
      css={{
        cursor: "pointer",
      }}
      {...props}
    >
      <img src={icon} alt="icon" height={height ? height : 65} />
    </div>
  );
};

export default IconButton;
