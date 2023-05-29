import React, { useEffect, useState, useRef } from "react";
import axios from "axios"
import "./styles/others.css";

export default function Others() {
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [showAuthorSelect, setShowAuthorSelect] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const genres = ["romance", "historical", "fantasy", "drama"];
  const fetchData = () => {
    const slidesData = [];

    const fetchGenreData = (genre) => {
      const url = `https://openlibrary.org/search.json?q=${genre}`;
      axios
        .get(url)
        .then((response) => {
          const docs = response.data.docs;
          const genreSlides = docs
            .map((doc) => ({
              title: doc.title || "Unknown Title",
              author: doc.author_name?.[0] || "Unknown Author",
              rating: doc.rating?.average || "N/A",
              image: doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : null,
            }))
            .filter((slide) => slide.title && slide.author && slide.image !== null);

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

  const itemsPerPage = 20;

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