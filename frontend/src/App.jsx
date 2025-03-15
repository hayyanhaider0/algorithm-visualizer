import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router";
import MainLayout from "./components/common/MainLayout";
import Home from "./pages/Home";
import Algorithms from "./pages/Algorithms";

import { useEffect } from "react";
import { algorithmsData } from "./data/algorithmsData";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithms" element={<Algorithms />} />
          {algorithmsData.map((algorithm, index) => (
            <Route
              key={index}
              path={`/algorithms/${algorithm.name.replace(/ /g, "-")}`}
              element={<algorithm.component />}
            />
          ))}
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
