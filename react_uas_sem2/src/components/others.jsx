import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import "./styles/others.css";
import { useNavigate } from "react-router-dom"

export default function Others() {
  



  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [showAllGenres, setShowAllGenres] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [showAuthorSelect, setShowAuthorSelect] = useState(false)
  const navbarRef = useRef(null)
  const navigate = useNavigate

  useEffect(() => {
    fetchData();
  }, []);

  const genres = ["romance", "action", "adventure", "fantasy", "drama"]
  const fetchData = () => { 
    const slidesData = []
  
    const fetchGenreData = (genre) => {
      const url = `https://openlibrary.org/search.json?q=subject%3A("${genre}")`
      axios
        .get(url)
        .then((response) => {
          const docs = response.data.docs;
          const genreSlides = docs
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
    
          slidesData.push(...genreSlides);
          setSlides(slidesData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
  
    genres.forEach((genre) => fetchGenreData(genre));
  };
  

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setShowAllGenres(value === "");
  };

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
    let end = Math.min(totalPages - 1, start + 5);
  
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

      {/* Left navbar for filters */}
      {showFilters && (
        <div ref={navbarRef} className={`left-navbar ${showFilters ? "show" : ""}`}>
          <h3>Filters</h3>
        
        {/* Filter by genre */}
        <div className="filter-section">
          <h5>Filter by Genre</h5>
          <select name="genre" id="genre-filter" onChange={handleSelectChange}>
            {showAllGenres && <option value="" selected disabled hidden>All Genres</option>}
            <option value="fantasy">Fantasy</option>
            <option value="sci-fi">Science Fiction</option>
            <option value="mystery">Mystery</option>
            <option value="romance">Romance</option>
            <option value="romance">Young Adult</option>
            <option value="romance">Historical Fiction</option>
            {/* Add more genre options as needed */}
          </select>
        </div>
      
        {/* Filter by authors (with search functionality) */}
        <div className="filter-section">
          <h5>Authors</h5>
          <div ref={navbarRef} className="select-menu">
            {showAuthorSelect ? (
              <div>
                <input
                  type="text"
                  value={selectedAuthor}
                  onChange={handleAuthorSelection}
                  className="text-input"
                  placeholder="Search by author"
                  autoFocus
                  list="authorOptions"
                />
                <datalist id="authorOptions">
                  {filteredSlides.map((slide, index) => (
                    <option key={index} value={slide.author} />
                  ))}
                </datalist>
              </div>
            ) : (
              <input
                type="text"
                value={selectedAuthor}
                onChange={handleAuthorSelection}
                className="text-input"
                placeholder="Search by author"
                onClick={handleSearchBarClick}
                readOnly
              />
            )}
          </div>
        </div>

        <div className="filter-section">
          <h5>Filter by ratings</h5>
          <div>
            <input type="radio" value="5 Stars" name="ratings" />
            <label htmlFor="5-stars" className="radio-text">4.5 ~ 5 Stars</label>
          </div>
          <div>
            <input type="radio"  value="4 Stars" name="ratings" />
            <label htmlFor="4-stars" className="radio-text">4 ~ 4.5 Stars</label>
          </div>
          <div>
            <input type="radio" value="3 Stars" name="ratings" />
            <label htmlFor="3-stars" className="radio-text">3 ~ 4 Stars</label>
          </div>
          
        </div>
      
        {/* Filter by last released */}
        <div className="filter-section">
          <h5>Last Released</h5>
          <div>
            <input type="radio" value="5 Stars" name="ratings" />
            <label htmlFor="5-stars" className="radio-text">Last 30 days</label>
          </div>
          <div>
            <input type="radio"  value="4 Stars" name="ratings" />
            <label htmlFor="4-stars" className="radio-text">Last 60 days</label>
          </div>
          <div>
            <input type="radio" value="3 Stars" name="ratings" />
            <label htmlFor="3-stars" className="radio-text">Last 90 days</label>
          </div>
        </div>
          
        <div className="filter-section">
          <h5>Trending</h5>
          <div>
            <input type="radio" value="5 Stars" name="ratings" />
            <label htmlFor="5-stars" className="radio-text">Weekly</label>
          </div>
          <div>
            <input type="radio"  value="4 Stars" name="ratings" />
            <label htmlFor="4-stars" className="radio-text">Monthly</label>
          </div>
          <div>
            <input type="radio" value="3 Stars" name="ratings" />
            <label htmlFor="3-stars" className="radio-text">Yearly</label>
          </div>
        </div>

        {/* Filter by book series */}
        <div className="filter-section">
          <h5>Book Series</h5>
          <div>
            <input type="radio" id="harry-potter" value="Harry Potter" name="book-series" />
            <label htmlFor="harry-potter" className="radio-text">Harry Potter</label>
          </div>
          <div>
            <input type="radio" id="game-of-thrones" value="Game of Thrones" name="book-series" />
            <label htmlFor="game-of-thrones" className="radio-text">Game of Thrones</label>
          </div>
          <div>
            <input type="radio" id="lord-of-the-rings" value="The Lord of the Rings" name="book-series" />
            <label htmlFor="lord-of-the-rings" className="radio-text">The Lord of the Rings</label>
          </div>
          <div>
            <input type="radio" id="hunger-games" value="The Hunger Games" name="book-series" />
            <label htmlFor="hunger-games" className="radio-text">The Hunger Games</label>
          </div>
          <div>
            <input type="radio" id="wheel-of-time" value="The Wheel of Time" name="book-series" />
            <label htmlFor="wheel-of-time" className="radio-text">The Wheel of Time</label>
          </div>
        <div>
          <input type="radio" id="millenium" value="The Millenium" name="book-series" />
          <label htmlFor="millenium" className="radio-text">The Millenium</label>
        </div>
      </div>


      <div className="filter-section">
        <h5>Language</h5>
        <div>
          <input type="radio" id="english" value="English" name="language" />
          <label htmlFor="english" className="radio-text">English</label>
        </div>
        <div>
          <input type="radio" id="francais" value="Francais" name="language" />
          <label htmlFor="francais" className="radio-text">Francais</label>
        </div>
        <div>
          <input type="radio" id="deutsch" value="Deutsch" name="language" />
          <label htmlFor="deutsch" className="radio-text">Deutsch</label>
        </div>
        <div>
          <input type="radio" id="japanese" value="Japanese" name="language" />
          <label htmlFor="japanese" className="radio-text">Japanese</label>
        </div>
        <div>
          <input type="radio" id="chinese" value="Chinese" name="language" />
          <label htmlFor="chinese" className="radio-text">Chinese</label>
        </div>
        <div>
          <input type="radio" id="bahasa" value="Bahasa" name="language" />
          <label htmlFor="bahasa" className="radio-text">Bahasa</label>
        </div>
      </div>


      </div>

      
      
      )}

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