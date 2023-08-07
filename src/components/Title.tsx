/** @jsxImportSource @emotion/react */

import colors from "../constants/colors";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string;
  size?: "small" | "medium" | "large";
  icon?: string;
}

const Title = ({ text, size = "medium", icon, ...props }: TitleProps) => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      {icon && <img src={icon} alt={icon} height={22} />}
      <h2
        css={{
          color: colors.primary,
          fontWeight: "bold",
          ...TYPE_SIZES[size],
        }}
        {...props}
      >
        {text}
      </h2>
    </div>
  );
};

export default Title;

const TYPE_SIZES = {
  small: {
    fontSize: "14px",
  },
  medium: {
    fontSize: "18px",
  },
  large: {
    fontSize: "26px",
  },
};
