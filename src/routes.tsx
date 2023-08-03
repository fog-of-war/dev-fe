import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/Auth";
import MyPage from "./pages/MyPage";
import Map from "./components/Map/GoogleMap";
import ReviewList from "./pages/ReviewList";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/map" Component={Map} />
      <Route path="/reviewList" Component={ReviewList} />
    </Routes>
  );
};

export default AppRoutes;
