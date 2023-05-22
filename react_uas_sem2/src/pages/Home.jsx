import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import TrenSlider from "../components/TrenSlider";
import GenreBar from "../components/genreBar";
import Others from "../components/others";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <GenreBar />
      <Banner />
      <TrenSlider />
      <Others />
      <Footer />
    </div>
  );
};

export default Home;
