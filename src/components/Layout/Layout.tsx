/** @jsxImportSource @emotion/react */

import BottomNavigation from "./BottomNavigation";
import GlobalModal from "../UI/GlobalModal";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: "grey",
      }}
    >
      <div
        css={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          maxWidth: "420px",
          background: "white",
          margin: "0 auto",
          paddingBottom: "65px",
        }}
      >
        {children}
        <GlobalModal />
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
