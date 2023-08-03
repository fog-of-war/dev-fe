/** @jsxImportSource @emotion/react */

interface IconButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
  onClick: () => void;
  height?: number;
}

const IconButton = ({ icon, onClick, height, ...props }: IconButtonProps) => {
  return (
    <div onClick={onClick} {...props}>
      <img src={icon} alt="o_auth_icon" height={height ? height : 45} />
    </div>
  );
};

export default IconButton;
