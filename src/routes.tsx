import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" Component={Home} />
    </Routes>
  );
};

export default AppRoutes;
