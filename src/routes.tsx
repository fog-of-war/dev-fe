import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import Map from "./components/Map/GoogleMap";
import AuthPage from "./pages/auth/AuthPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/profile_setup" Component={ProfileSetupPage} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/map" Component={Map} />
      <Route path="/reviewList" Component={ReviewPage} />
    </Routes>
  );
};

export default AppRoutes;
