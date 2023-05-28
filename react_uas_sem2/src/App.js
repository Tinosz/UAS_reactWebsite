import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useContext } from 'react';
import { MouseContext } from './components/Cursor/mouse-context';
import CustomCursor from './components/Cursor/CustomCursor';

import HomePage from "./pages/HomePage";
import TestPage from "./pages/BookInfoPage";
import BookshelfPage from "./pages/BooshelfPage";
import AboutUsPage from "./pages/AboutUsPage";
import SearchPage from "./pages/SearchPage";
import SearchResultPage from "./pages/Search";

function App() {
  const { cursorType, cursorChangeHandler } = useContext(MouseContext);

  return (

    <div>
      <Router>
        <NavigationBar />
        <CustomCursor cursorType={cursorType} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/MyBookshelf" element={<BookshelfPage />} />
          <Route path="/Test" element={<TestPage />} />
          <Route path="/BookInfo" element={<TestPage />} />
          <Route path="/AboutUs" element={<AboutUsPage />} />
          <Route path="/Search" element={<SearchResultPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
