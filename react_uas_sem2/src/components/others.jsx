import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import "./styles/others.css";
import { useNavigate } from "react-router-dom"
import { saveAs } from 'file-saver';
import apiData from './API_data/apiData_Combination.json'; 

export default function Others() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [showAllGenres, setShowAllGenres] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [showAuthorSelect, setShowAuthorSelect] = useState(false)
  const navbarRef = useRef(null)
  const navigate = useNavigate
  const url = 'https://openlibrary.org/search.json?q=subject%3A(%22Romance%22+OR+%22Fantasy%22+OR+%22Action%22+OR+%22Thriller%22+OR+%22Drama%22)'

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        // Save the data as a file
        const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
        saveAs(blob, 'apiData.json');
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }
  

  const itemsPerPage = 20
  const totalPages = Math.ceil(slides.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalPages);
  };

  const handleClickPrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalPages) % totalPages);
  };

  const startIndex = currentSlide * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSlides = slides.slice(startIndex, endIndex);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  /* close navbar*/
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

/*search authors*/

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
  
    // Calculate the range of page numbers to display
    let start = Math.max(0, currentSlide - 3);
    let end = Math.min(totalPages - 1, start + 4);
  
    // Add page buttons
    for (let i = start; i <= end; i++) {
      buttons.push(
        <div
          key={i}
          className={`slider-buttonO page-button ${
            currentSlide === i ? "active" : ""
          }`}
          onClick={() => setCurrentSlide(i)}
        >
          {i + 1}
        </div>
      );
    }
  
    // Add '...' button if necessary
    if (end < totalPages - 1) {
      buttons.push(
        <div key={end + 1} className="slider-buttonO page-button">
          ...
        </div>
      );
    }
  
    return buttons;
  };
  

  return (
    <div className="main-box">
      {/* Header */}
      <div className="result-header">
        <div className="float-left">
          <h2 className="text-heading">Find books that you love</h2>
        </div>
      </div>

      {/* Filter section */}
      <div className="filter-box">
        <div className="AllFilters">
          {/* Navbar for filter */}
          <div className="filter-button">
            <button id="search-filter" onClick={toggleFilters}>
              <span className="filter-image"></span>
              <span className="filter-text">All Filters</span>
            </button>
          </div>
        </div>

        <div className="SortBy">
          {/* Navbar for sort by */}
          <div className="sort-button">
            <button id="search-sort">
              <span className="sort-image"></span>
              <span className="sort-text">Sort By</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="content-box">
      {currentSlides.map((slide, index) => (
        <div key={index} className="book-item C">
          <img src={slide.image} alt={slide.title} className="book-cover C" />
          <div className="book-details C">
            <p className="book-title C">{slide.title}</p>
            <p className="book-author C">Author: {slide.author}</p>
            <p className="book-ratings C">
              Ratings: {slide.ratingsAverage} (Total: {slide.ratingsCount})
            </p>
          </div>
        </div>
      ))}
    </div>


      {/* Page navigation */}
      <h6 className="muchmore">There's so much more for you to discover</h6>
      <div className="slider-buttonsO">
        <div
          className={`slider-buttonO slider-prev ${
            currentSlide === 0 ? "disabled" : ""
          }`}
          onClick={handleClickPrev}
        >
          <span>&lt;</span>
        </div>

        <div className="page-buttonsO">{renderPageButtons()}</div>

        
        <div
          className={`slider-buttonO slider-next ${
            currentSlide === totalPages - 1 ? "disabled" : ""
          }`}
          onClick={handleClickNext}
        >
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
}