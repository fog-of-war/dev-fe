import { Routes, Route, Navigate } from "react-router-dom";

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
import useAuthQuery from "./hooks/useAuthQuery";
import NotificationsPage from "./pages/NotificationsPage";

const AppRoutes = () => {
  const { data: currentUser } = useAuthQuery();

  return (
    <Routes>
      {!!currentUser ? (
        <>
          <Route path="/profile_setup" element={<ProfileSetupPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<MyPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/edit/recent_search"
            element={<EditRecentSearchPage />}
          />
          <Route path="/search/result" element={<SearchResultPage />} />
          <Route path="/profile_edit" element={<ProfileEditPage />} />
          <Route path="/reviewList" element={<ReviewPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/badgeList" element={<BadgeListPage />} />
          <Route path="/getBadge" element={<GetBadgePage />} />
          <Route path="/crop_image" element={<CropImagePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/posting_complete" element={<PostingCompletePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/*" element={<Navigate to="/auth" />} />
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<AuthPage />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
