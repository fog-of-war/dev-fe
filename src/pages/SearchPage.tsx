import { useLocation } from "react-router-dom";
import SearchPageComponent from "../components/Explore/Search/SearchPageComponent";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";

  return <SearchPageComponent searchQuery={searchQuery} />;
};

export default SearchPage;
