/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";

import AppRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import { RecoilRoot } from "recoil";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingComponent from "./components/UI/LoadingComponent";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <Layout>
              <AppRoutes />
              <LoadingComponent />
            </Layout>
          </ThemeProvider>
        </LoadingProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
