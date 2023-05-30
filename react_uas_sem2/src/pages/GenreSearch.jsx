import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./SearchStyles.css";
import nophoto from "./Photos/nophoto.jpg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const GenreSearchPage = ({ apiURL }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAllGenres, setShowAllGenres] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [showAuthorSelect, setShowAuthorSelect] = useState(false);
  const location = useLocation();
  const { useLink } = location.state || {};
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  let thumbnailUrl;

  console.log("useLink gotten:", useLink);

  useEffect(() => {
    fetchData();
  }, [useLink]);

  const fetchData = () => {
    const slidesData = [];

    Axios.get(useLink)
      .then((response) => {
        const works = response.data.works;
        const genreSlides = works
          .map((work) => {
            const key = work.key; // Store the key in a variable
            return {
              key: key, // Assign the key value to the 'key' property
              title: work.title || "Unknown Title",
              author: work.author_name?.[0] || "Unknown Author",
              rating: work.rating?.average || "N/A",
              image: work.cover_i
                ? `https://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg`
                : null,
            };
          })
          .filter((slide) => slide.title && slide.author && slide.image !== null);

        slidesData.push(...genreSlides);
        setSlides(slidesData);
      })
      .catch((error) => {
        console.log(error);
      });
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
          <div
            key={index}
            className="book-item C"
            onClick={() => {
              console.log("Thumbnail URL:", slide.image);
              console.log("Key:", slide.key);
              navigate("/BookInfo", {
                state: { thumbnailUrl: slide.image, key: slide.key },
              });
            }}
          >
            <img src={slide.image} alt={slide.title} className="book-cover C" />
            <div className="book-details C">
              <p className="book-title C">{slide.title}</p>
              <p className="book-author C">Author: {slide.author}</p>
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
};

export default GenreSearchPage;
