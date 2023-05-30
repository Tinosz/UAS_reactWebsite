import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomCursor from './components/Cursor/CustomCursor';

import HomePage from "./pages/HomePage";
import BookInfoPage from "./pages/BookInfoPage";
import BookshelfPage from "./pages/BooshelfPage";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import SearchPage from "./pages/SearchPage";


function App() {
  const [username, setUsername] = useState(""); // Initialize username state

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Retrieve the username from local storage


    if (storedUsername) {
      setUsername(storedUsername); // Update the username state
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <NavigationBar username={username} />
              <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path="/MyBookshelf" element={<BookshelfPage />} />
                <Route path="/Test" element={<BookInfoPage />} />
                <Route path="/BookInfo" element={<BookInfoPage />} />
                <Route path="/AboutUs" element={<AboutUsPage />} />
                <Route path="/Search" element={<SearchPage />} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
