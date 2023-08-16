/** @jsxImportSource @emotion/react */

import BottomNavigation from "./BottomNavigation";

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
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "420px",
          background: "white",
          margin: "0 auto",
          paddingBottom: "65px",
        }}
      >
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Layout;
