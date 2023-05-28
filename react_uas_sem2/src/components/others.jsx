import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./styles/others.css";
import { useNavigate } from "react-router-dom";

export default function Others() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [showAuthorSelect, setShowAuthorSelect] = useState(false);
  const navbarRef = useRef(null);
  const navigate = useNavigate();

  const genres = ["romance", "action", "adventure", "fantasy", "drama"];
  const itemsPerPage = 20;
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [cachedData, setCachedData] = useState({}); // Cached data object

  useEffect(() => {
    fetchData(0); // Fetch initial data for the first page
  }, []);

  const fetchData = async (page) => {
    try {
      // Check if data already exists in cache
      if (cachedData[page]) {
        setSlides(cachedData[page]);
      } else {
        const slidesData = await Promise.all(
          genres.map(async (genre) => {
            const url = `https://openlibrary.org/search.json?q=subject%3A("${genre}")&page=${page}`;
            const response = await axios.get(url);
            const docs = response.data.docs;

            return docs
              .map((doc) => ({
                title: doc.title || "Unknown Title",
                author: doc.author_name?.[0] || "Unknown Author",
                ratingsAverage: doc.ratings_average,
                ratingsCount: doc.ratings_count,
                image: doc.cover_i
                  ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                  : null,
              }))
              .filter(
                (slide) =>
                  slide.title &&
                  slide.author &&
                  slide.ratingsCount > 0 &&
                  slide.image !== null
              );
          })
        );

        const allSlides = slidesData.flat();
        setSlides(allSlides);

        // Update the cached data object
        setCachedData((prevCachedData) => ({
          ...prevCachedData,
          [page]: allSlides,
        }));

        // Update total pages
        const totalPages = Math.ceil(allSlides.length / itemsPerPage);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickNext = () => {
    const nextPage = currentSlide + 1;
    setCurrentSlide(nextPage);
    fetchData(nextPage);
  };

  const handleClickPrev = () => {
    const prevPage = currentSlide - 1;
    setCurrentSlide(prevPage);
  };

  const startIndex = currentSlide * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSlides = slides.slice(startIndex, endIndex);

  const toggleFilters = () => {
    setShowFilters((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        showFilters
      ) {
        setShowFilters(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFilters]);

  const filteredSlides = slides.filter((slide) =>
    slide.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAuthorSelection = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleSearchBarClick = () => {
    setShowAuthorSelect(true);
  };

  const renderPageButtons = () => {
    const buttons = [];

    const start = Math.max(0, currentSlide - 2);
    const end = Math.min(totalPages - 1, start + 4);

    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={`page-button ${i === currentSlide ? "active" : ""}`}
          onClick={() => setCurrentSlide(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  const navigateToDetails = (slide) => {
    navigate(`/details/${slide.author}/${slide.title}`);
  };

  return (
    <div className="others-container">
      <div className="navbar" ref={navbarRef}>
        <h1 className="navbar-title">Others</h1>
        <div className="navbar-icons">
          <button className="icon-btn" onClick={toggleFilters}>
            <i className="fas fa-filter"></i>
          </button>
          <div className={`filters ${showFilters ? "active" : ""}`}>
            <input
              type="text"
              className="search-bar"
              placeholder="Search author..."
              value={searchQuery}
              onChange={handleSearch}
              onClick={handleSearchBarClick}
            />
            {showAuthorSelect && (
              <select
                className="author-select"
                value={selectedAuthor}
                onChange={handleAuthorSelection}
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
      <div className="slides-container">
        {currentSlides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            onClick={() => navigateToDetails(slide)}
          >
            <img src={slide.image} alt="book cover" className="slide-image" />
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-author">{slide.author}</p>
              <div className="slide-ratings">
                <i className="fas fa-star"></i>
                <span className="ratings-average">{slide.ratingsAverage}</span>
                <span className="ratings-count">
                  ({slide.ratingsCount} ratings)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-btn"
          disabled={currentSlide === 0}
          onClick={handleClickPrev}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className="pagination-btn"
          disabled={currentSlide === totalPages - 1}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
