import Banner from "../components/banner";
import TrenSlider from "../components/TrenSlider";
import GenreBar from "../components/leftBar";
import Others from "../components/others";
import RecommendedSlider from "../components/RecommendedSlider";
import YearlySlider from "../components/YearlySlider";
import Thriller from "../components/ThrillerSlider";
import Landing from "./Landing";

import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
    return (
      <div>
        <Banner />
        <TrenSlider />
        <YearlySlider />
        <RecommendedSlider />
        <Thriller />
        <Others />
      </div>
    );
};

export default Home;