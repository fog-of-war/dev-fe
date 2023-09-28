import { useLocation } from "react-router-dom";
import SearchResultPageComponent from "../components/Search/SearchResultPageComponent";

const SearchResultPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("query") ?? "";

  return <SearchResultPageComponent searchQuery={searchQuery} />;
};

export default SearchResultPage;
