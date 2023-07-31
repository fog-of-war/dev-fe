/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";
import BottomNavigation from "./components/Layout/BottomNavigation";
import AppRoutes from "./routes";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div
          css={css`
            width: 100%;
            height: 100vh;
            background-color: grey;
          `}
        >
          <AppRoutes />
        </div>
        <BottomNavigation />
      </ThemeProvider>
    </Router>
  );
}

export default App;
