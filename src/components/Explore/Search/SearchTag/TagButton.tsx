/** @jsxImportSource @emotion/react */

import colors from "../../../../constants/colors";

interface TagButtonProps extends React.HTMLAttributes<HTMLLIElement> {
  children?: React.ReactNode;
  icon?: string;
}

const TagButton = ({ icon, children, ...props }: TagButtonProps) => {
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
        cursor: "pointer",
      }}
      {...props}
    >
      <div
        css={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "16px",
          height: "16px",
        }}
      >
        <img
          src={icon}
          alt="tag_icon"
          css={{
            height: "16px",
          }}
        />
      </div>
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
