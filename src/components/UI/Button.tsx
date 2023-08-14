/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "textOnly";
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  isFullWidth,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      css={{
        fontFamily: "inherit",
        outline: "none",
        borderRadius: "10px",
        transition: "all .4s ease",
        width: isFullWidth ? "100%" : "auto",
        cursor: disabled ? "not-allowed" : "pointer",
        filter: disabled ? "opacity(0.5)" : "none",
        ...TYPE_VARIANTS[variant],
        ...TYPE_SIZES[size],
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

const TYPE_VARIANTS = {
  primary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: colors.primary,
    color: "white",
    "@media (min-width: 768px)": {
      "&:hover": {
        backgroundColor: colors.secondary,
      },
    },
  },
  secondary: {
    border: `1px solid ${colors.primary}`,
    backgroundColor: "transparent",
    color: colors.primary,
    "@media (min-width: 768px)": {
      "&:hover": {
        backgroundColor: colors.primary,
        color: "white",
      },
    },
  },
  textOnly: {
    border: "1px solid transparent",
    backgroundColor: "transparent",
    color: colors.primary,
    "@media (min-width: 768px)": {
      "&:hover": {
        border: `1px solid ${colors.primary}`,
      },
    },
  },
};

const TYPE_SIZES = {
  small: {
    fontSize: "13px",
    padding: "3px 9px",
    fontWeight: "500",
    lineHeight: "18px",
  },
  medium: {
    fontSize: "16px",
    padding: "9px 16px",
    fontWeight: "600",
    lineHeight: "20px",
  },
  large: {
    fontSize: "22px",
    padding: "10px 20px",
    fontWeight: "700",
    lineHeight: "24px",
  },
};
