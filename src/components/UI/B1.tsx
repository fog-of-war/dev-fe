/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";
import colors from "../../constants/colors";

interface B1Props extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const B1 = ({ children, ...props }: B1Props) => {
  return (
    <span
      css={{
        fontSize: "16px",
        fontWeight: "600",
        color: colors.darkGrey,
      }}
      {...props}
    >
      {children}
    </span>
  );
};

export default B1;
