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
import ToasterContext from "./context/ToasterContext";

function App() {
  return (
    <Router>
      <RecoilRoot>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <CropImageProvider>
              <Layout>
                <ToasterContext />
                <AppRoutes />
                <LoadingComponent />
              </Layout>
            </CropImageProvider>
          </ThemeProvider>
        </LoadingProvider>
      </RecoilRoot>
    </Router>
  );
}

export default App;
