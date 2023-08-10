import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyPage from "./pages/MyPage";
import AuthPage from "./pages/auth/AuthPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import ReviewPage from "./pages/ReviewPage";
import RankingPage from "./pages/RankingPage";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/search/SearchPage";
import EditRecentSearchPage from "./pages/search/EditRecentSearchPanel";
import SearchResultPage from "./pages/search/SearchResultPage";

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
      <Route path="/reviewList" Component={ReviewPage} />
      <Route path="/ranking" Component={RankingPage} />
    </Routes>
  );
};

export default AppRoutes;
