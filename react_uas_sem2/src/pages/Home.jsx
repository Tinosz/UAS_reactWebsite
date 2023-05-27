import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import TrenSlider from "../components/TrenSlider";
import GenreBar from "../components/leftBar";
import Others from "../components/others";
import RecommendedSlider from "../components/RecommendedSlider";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const Home = () => {
  return (
    <Router>
      <NavigationBar />
      <GenreBar />
      <Banner />
      <TrenSlider />
      <RecommendedSlider />
      <Others />
      <Footer />
    </Router>
  );
};

export default Home;
