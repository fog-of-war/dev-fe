/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";

import AppRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <Layout>
            <AppRoutes />
          </Layout>
        </ThemeProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
