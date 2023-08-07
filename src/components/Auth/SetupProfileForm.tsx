/** @jsxImportSource @emotion/react */

import { ReactNode } from "react";

interface SetupProfileFormProps {
  children: ReactNode;
}

const SetupProfileForm = ({ children }: SetupProfileFormProps) => {
  return (
    <div
      css={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        padding: "70px 20px 20px 20px",
        zIndex: 65,
      }}
    >
      {children}
    </div>
  );
};

export default SetupProfileForm;
