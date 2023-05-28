import Banner from "../components/banner";
import TrenSlider from "../components/TrenSlider";
import GenreBar from "../components/leftBar";
import Others from "../components/others";
import RecommendedSlider from "../components/RecommendedSlider";

import { useContext } from 'react';
import { MouseContext } from '../components/Cursor/mouse-context';
import CustomCursor from '../components/Cursor/CustomCursor';

const Home = () => {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (
    <div>
      <CustomCursor cursorType={cursorType} />
      <Banner />
      <TrenSlider />
      <RecommendedSlider />
      <Others />
    </div>
  );
};

export default Home;
