import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import AuthPage from "./pages/auth/AuthPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";
import RankingPage from "./pages/RankingPage";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/search/SearchPage";
import EditRecentSearchPage from "./pages/search/EditRecentSearchPage";
import SearchResultPage from "./pages/search/SearchResultPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import BadgeListPage from "./pages/BadgeListPage";
import MapPage from "./pages/MapPage";
import GetBadgePage from "./pages/GetBadgePage";
import PhotoCertification from "./components/LocationCertification/PhotoCertification";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/profile_setup" Component={ProfileSetupPage} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/explore" Component={ExplorePage} />
      <Route path="/search" Component={SearchPage} />
      <Route path="/edit/search" Component={EditRecentSearchPage} />
      <Route path="/search/result" Component={SearchResultPage} />
      <Route path="/profile_edit" Component={ProfileEditPage} />
      <Route path="/map" Component={MapPage} />
      <Route path="/reviewList" Component={ReviewPage} />
      <Route path="/ranking" Component={RankingPage} />
      <Route path="/badgeList" Component={BadgeListPage} />
      <Route path="/getBadge" Component={GetBadgePage} />
      <Route path="/locationcertification" Component={PhotoCertification} />
    </Routes>
  );
};

export default AppRoutes;
