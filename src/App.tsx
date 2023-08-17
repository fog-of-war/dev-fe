/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";

import AppRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import { RecoilRoot } from "recoil";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingComponent from "./components/UI/LoadingComponent";
import { CropImageProvider } from "./context/CropImageContext";
import { CertifiedImageProvider } from "./context/CertifiedImageContext";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <CropImageProvider>
              <CertifiedImageProvider>
                <Layout>
                  <AppRoutes />
                  <LoadingComponent />
                </Layout>
              </CertifiedImageProvider>
            </CropImageProvider>
          </ThemeProvider>
        </LoadingProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
