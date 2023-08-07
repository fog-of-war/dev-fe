/** @jsxImportSource @emotion/react */

import colors from "../../constants/colors";

interface TagButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  icon?: string;
}

const TagButton = ({ icon, children }: TagButtonProps) => {
  return (
    <li
      css={{
        display: "flex",
        width: "fit-content",
        alignItems: "center",
        padding: "5px 12px",
        gap: "4px",
        borderRadius: "20px",
        boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 0.3)",
        background: "#fff",
      }}
    >
      <img
        src={icon}
        alt="tag_icon"
        css={{
          height: "16px",
        }}
      />
      <span
        css={{
          fontSize: "14px",
          fontWeight: "600",
          letterSpacing: "-0.5px",
          color: colors.mediumGrey,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </li>
  );
};

export default TagButton;
