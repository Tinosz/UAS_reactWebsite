import React, { useEffect, useState } from "react";
import "./styles/others.css";

export default function Others() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Book 1",
      rating: "4.5",
      author: "Author 1",
      genre: "Genre 1",
      summary: "Summary 1",
      image: "book1.jpg",
    },
    {
      title: "Book 2",
      rating: "4.2",
      author: "Author 2",
      genre: "Genre 2",
      summary: "Summary 2",
      image: "book2.jpg",
    },
    {
      title: "Book 3",
      rating: "4.8",
      author: "Author 3",
      genre: "Genre 3",
      summary: "Summary 3",
      image: "book3.jpg",
    },
    {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },

      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
      {
        title: "Book 3",
        rating: "4.8",
        author: "Author 3",
        genre: "Genre 3",
        summary: "Summary 3",
        image: "book3.jpg",
      },
    // Add more books to the 'slides' array as needed
  ];

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
            <button id="search-filter">
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
          <div key={index} className="book-item">
            <img src={slide.image} alt={slide.title} className="book-cover" />
            <div className="book-details">
              <h3 className="book-title">{slide.title}</h3>
              <p className="book-author">Author: {slide.author}</p>
              <p className="book-rating">Rating: {slide.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Page navigation */}
      <h6 className="muchmore">There's so much more for you to discover</h6>
        <div className="slider-buttonsO">
            
        <div
            className={`slider-buttonO slider-prev ${currentSlide === 0 ? "disabled" : ""}`}
            onClick={handleClickPrev}
        >
            <span>&lt;</span>
        </div>
        <div className="page-buttonsO">
            {Array.from({ length: totalPages }, (_, index) => (
            <div
                key={index}
                className={`slider-buttonO page-button ${currentSlide === index ? "active" : ""}`}
                onClick={() => setCurrentSlide(index)}
            >
                {index + 1}
            </div>
            ))}
        </div>
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
