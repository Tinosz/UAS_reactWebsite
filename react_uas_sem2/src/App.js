import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Axios from "axios";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomCursor from './components/Cursor/CustomCursor';

import HomePage from "./pages/HomePage";
import BookInfoPage from "./pages/BookInfoPage";
import BookshelfPage from "./pages/BooshelfPage";
import LandingPage from "./pages/LandingPage";
import AboutUsPage from "./pages/AboutUsPage";
import SearchPage from "./pages/SearchPage";
import GenreSearchPage from "./pages/GenreSearch";


function App() {
  const [username, setUsername] = useState(""); // Initialize username state

  useEffect(() => {
    const storedUsername = localStorage.getItem("username"); // Retrieve the username from local storage


    if (storedUsername) {
      setUsername(storedUsername); // Update the username state
    }
  }, []);

  const [apiUrl, setApiUrl] = useState("");

  const handleButtonClick = () => {
    // Set the apiUrl based on the button clicked in the navbar
    setApiUrl("https://openlibrary.org/trending/daily.json"); // Example: Set apiUrl for "Popular" button
    // setApiUrl("https://openlibrary.org/trending/yearly.json"); // Example: Set apiUrl for "Best Sellers" button
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <NavigationBar username={username} handleButtonClick={handleButtonClick}/>
              <Routes>
                <Route path="/Home" element={<HomePage />} />
                <Route path="/MyBookshelf" element={<BookshelfPage />} />
                <Route path="/Test" element={<BookInfoPage />} />
                <Route path="/BookInfo" element={<BookInfoPage />} />
                <Route path="/AboutUs" element={<AboutUsPage />} />
                <Route path="/Search" element={<SearchPage />} />
                <Route path="/GenreSearch" element={<GenreSearchPage />} />
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
