/** @jsxImportSource @emotion/react */

interface BottomNavButtonProps {
  src: string;
  alt: string;
  onClick: () => void;
  height?: number;
}

const BottomNavIcon = ({
  src,
  alt,
  onClick,
  height,
  ...props
}: BottomNavButtonProps) => {
  return (
    <div
      onClick={onClick}
      css={{
        textDecoration: "none",
        padding: 14,
      }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        css={{
          height: height ? height : 24,
        }}
      />
    </div>
  );
};

export default BottomNavIcon;
