import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import AuthPage from "./pages/AuthPage";
import ProfileSetupPage from "./pages/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";
import RankingPage from "./pages/RankingPage";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import EditRecentSearchPage from "./pages/EditRecentSearchPage";
import SearchResultPage from "./pages/SearchResultPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import BadgeListPage from "./pages/badge/BadgeListPage";
import GetBadgePage from "./pages/badge/GetBadgePage";
import UploadPage from "./pages/posting/UploadPage";
import CropImagePage from "./pages/posting/CropImagePage";
import PostingCompletePage from "./pages/posting/PostingCompletePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" Component={AuthPage} />
      <Route path="/profile_setup" Component={ProfileSetupPage} />
      <Route path="/" Component={Home} />
      <Route path="/profile" Component={MyPage} />
      <Route path="/explore" Component={ExplorePage} />
      <Route path="/search" Component={SearchPage} />
      <Route path="/edit/recent_search" Component={EditRecentSearchPage} />
      <Route path="/search/result" Component={SearchResultPage} />
      <Route path="/profile_edit" Component={ProfileEditPage} />
      <Route path="/reviewList/:placeId" Component={ReviewPage} />
      <Route path="/ranking" Component={RankingPage} />
      <Route path="/badgeList" Component={BadgeListPage} />
      <Route path="/getBadge" Component={GetBadgePage} />
      <Route path="/crop_image" Component={CropImagePage} />
      <Route path="/upload" Component={UploadPage} />
      <Route path="/posting_complete" Component={PostingCompletePage} />
    </Routes>
  );
};

export default AppRoutes;
