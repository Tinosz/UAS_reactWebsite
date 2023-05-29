import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*import { useContext } from 'react';*/
/*import { MouseContext } from './components/Cursor/mouse-context';*/
import CustomCursor from './components/Cursor/CustomCursor';

import HomePage from "./pages/HomePage";
import BookInfoPage from "./pages/BookInfoPage";
import BookshelfPage from "./pages/BooshelfPage";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import SearchPage from "./pages/SearchPage";

function App() {
  /*const { cursorType, cursorChangeHandler } = useContext(MouseContext);*/

  return (

    <div>
      <Router>
        <NavigationBar />
        {/*<CustomCursor cursorType={cursorType} />*/}
        <Routes>
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/MyBookshelf" element={<BookshelfPage />} />
          <Route path="/Test" element={<BookInfoPage />} />
          <Route path="/BookInfo" element={<BookInfoPage />} />
          <Route path="/AboutUs" element={<AboutUsPage />} />
          <Route path="/Search" element={<SearchPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
