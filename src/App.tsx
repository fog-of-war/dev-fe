/** @jsxImportSource @emotion/react */

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./constants/theme";
import AppRoutes from "./routes";
import Layout from "./components/Layout/Layout";
import { RecoilRoot } from "recoil";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingComponent from "./components/UI/LoadingComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import { CropImageProvider } from "./context/CropImageContext";
import ToasterContext from "./context/ToasterContext";
import { CertifiedImageProvider } from "./context/CertifiedImageContext";
import { PostingDataProvider } from "./context/PostingDataContext";
import { ReviewContextProvider } from "./context/ReviewContext";
import MapContexProvider from "./context/MapContext";
import AxiosNavigation from "./api/axiosNavigate";
import ModalProvider from "./provider/ModalProvider";
import AsyncBoundary from "./components/Common/AsyncBoudary";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <Router>
      <AxiosNavigation />
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <LoadingProvider>
            <ThemeProvider theme={theme}>
              <PostingDataProvider>
                <ReviewContextProvider>
                  <CropImageProvider>
                    <CertifiedImageProvider>
                      <MapContexProvider>
                        <Layout>
                          <ModalProvider />
                          <ToasterContext />
                          <AsyncBoundary suspenseFallback={<LoadingSpinner />}>
                            <AppRoutes />
                          </AsyncBoundary>
                          <LoadingComponent />
                        </Layout>
                      </MapContexProvider>
                    </CertifiedImageProvider>
                  </CropImageProvider>
                </ReviewContextProvider>
              </PostingDataProvider>
            </ThemeProvider>
          </LoadingProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
