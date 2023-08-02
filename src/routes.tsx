import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./components/Map/GoogleMap";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/map" Component={Map} />
    </Routes>
  );
};

export default AppRoutes;
