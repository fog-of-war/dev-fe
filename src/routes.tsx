import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import AuthPage from "./pages/auth/AuthPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";
import MapPage from "./pages/MapPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/profile_setup" Component={ProfileSetupPage} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/map" Component={MapPage} />
      <Route path="/reviewList" Component={ReviewPage} />
    </Routes>
  );
};

export default AppRoutes;
