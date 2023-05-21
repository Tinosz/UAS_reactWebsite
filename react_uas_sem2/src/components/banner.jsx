import React, {useState} from 'react';
import "./styles/bannerStyles.css";
import umnImage from '../Assets/umn.jpeg';

function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Book 1',
      rating: '4.5',
      author: 'Author 1',
      genre: 'Genre 1',
      summary: 'Summary 1',
      image: umnImage,
    },
    {
      title: 'Book 2',
      rating: '4.2',
      author: 'Author 2',
      genre: 'Genre 2',
      summary: 'Summary 2',
      image: 'book2.jpg',
    },
    {
      title: 'Book 3',
      rating: '4.8',
      author: 'Author 3',
      genre: 'Genre 3',
      summary: 'Summary 3',
      image: 'book3.jpg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel-content">
        <div className="left-section">
          <h2>{slides[currentSlide].title}</h2>
          <p>Rating: {slides[currentSlide].rating}</p>
          <p>Author: {slides[currentSlide].author}</p>
          <p>Genre: {slides[currentSlide].genre}</p>
          <p>{slides[currentSlide].summary}</p>
        </div>
        <div className="right-section">
          <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="image-box" />
        </div>
      </div>
      <div className="carousel-buttons">
        <div className="carousel-button carousel-prev" onClick={prevSlide}>
          <span>&lt;</span>
        </div>  
        <div className="carousel-button carousel-next" onClick={nextSlide}>
          <span>&gt;</span>
        </div>
      </div>
    </div>
  );
}

export default Banner;