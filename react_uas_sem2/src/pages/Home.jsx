import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import TrenSlider from "../components/TrenSlider";
import GenreBar from "../components/leftBar";
import Others from "../components/others";
import RecommendedSlider from "../components/RecommendedSlider";

const Home = () => {
  return (
    <div>
      <GenreBar />
      <Banner />
      <TrenSlider />
      <RecommendedSlider />
      <Others />

    </div>
  );
};

export default Home;
