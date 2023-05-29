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
          <Route path="/BookInfo" element={<BookInfoPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
