/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { css } from "@emotion/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";

import AppRoutes from "./routes";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <AppRoutes />
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
