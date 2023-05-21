import Axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Banner from "../components/banner";
import Footer from "../components/footer";
import TrenSlider from "../components/TrenSlider";

const Home = () => {
  return (
    <div>
      <NavigationBar />
      <Banner />
      <TrenSlider />
      <Footer />
    </div>
  );
};

export default Home;
