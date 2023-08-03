import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import MyPage from "./pages/MyPage";
import Map from "./components/Map/GoogleMap";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/map" Component={Map} />
    </Routes>
  );
};

export default AppRoutes;
