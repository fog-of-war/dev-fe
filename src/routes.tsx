import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import AuthPage from "./pages/auth/AuthPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";
// import MapPage from "./pages/MapPage";
import RankingPage from "./pages/RankingPage";
import ProfileEditPage from "./pages/ProfileEditPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/profile_setup" Component={ProfileSetupPage} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/profile_edit" Component={ProfileEditPage} />
      {/* <Route path="/map" Component={MapPage} /> */}
      <Route path="/reviewList" Component={ReviewPage} />
      <Route path="/ranking" Component={RankingPage} />
    </Routes>
  );
};

export default AppRoutes;
