import React, { useState, useRef, useEffect } from 'react';
import "./styles/bannerStyles.css";
import "./styles/slider.css"
import umnImage from '../Assets/umn.jpeg';

function TrenSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef(null);

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
    // Add more slides here
    {
      title: 'Book 4',
      rating: '4.0',
      author: 'Author 4',
      genre: 'Genre 4',
      summary: 'Summary 4',
      image: 'book4.jpg',
    },
    {
      title: 'Book 5',
      rating: '4.7',
      author: 'Author 5',
      genre: 'Genre 5',
      summary: 'Summary 5',
      image: 'book5.jpg',
    },
    {
      title: 'Book 6',
      rating: '4.3',
      author: 'Author 6',
      genre: 'Genre 6',
      summary: 'Summary 6',
      image: 'book6.jpg',
    },
  ];

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      // Reached the end of the slides
      // Add logic to handle "View More" action here
      console.log("View More");
    } else {
      setCurrentSlide((prevSlide) => prevSlide + 1);
    }
  };


  const prevSlide = () => {
    if (currentSlide === 0) {
      return; // Do nothing if already on the first slide
    }
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const touchEnd = e.touches[0].clientX;
    const touchDiff = touchStart - touchEnd;
    const sliderWidth = sliderRef.current.offsetWidth;

    if (touchDiff > 0 && touchDiff > sliderWidth / 4) {
      nextSlide();
    } else if (touchDiff < 0 && touchDiff < -(sliderWidth / 4)) {
      prevSlide();
    }
  };

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className='slider-vase'>
      <div className='upper-section'>

        <div className='topic-box'>
          <h2 className='case'>Recommended For You</h2>
          <div className="redirect-button" onClick={nextSlide}>
            <span>&gt;</span>
          </div>
        </div>


        <div className="slider-buttons">
          <div className="slider-button slider-prev" onClick={prevSlide}>
            <span>&lt;</span>
          </div>
          <div className="slider-button slider-next" onClick={nextSlide}>
            <span>&gt;</span>
          </div>
        </div>
      </div>

      <div className="slider-box" ref={sliderRef}>
        <div className="slider-content">
          {slides.slice(currentSlide, currentSlide + 5).map((slide, index) => (
            <div key={index} className="slide">
              <div className="cover-box">
                <img src={slide.image} alt={slide.title} className="image-box" />
              </div>
              <div className="title-box">
                <h2>{slide.title}</h2>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      <div className='progress-box'>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default TrenSlider;