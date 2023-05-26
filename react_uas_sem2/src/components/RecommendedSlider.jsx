import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './styles/bannerStyles.css';
import './styles/slider.css';

function RecommendedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef(null);
  const [data, setData] = useState(null);
  const url = 'https://openlibrary.org/trending/daily.json'; // Masukin url recommended sini

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const works = data?.works?.slice(0, 20) || [];

  const nextSlide = () => {
    const nextSlideIndex = currentSlide + 5;
    if (nextSlideIndex >= works.length) {
      // Reached the end of the slides
      // Add logic to handle "View More" action here
      console.log('View More');
    } else {
      setCurrentSlide(nextSlideIndex);
    }
  };
  
  const prevSlide = () => {
    const prevSlideIndex = currentSlide - 5;
    if (prevSlideIndex < 0) {
      return; // Do nothing if already on the first slide
    }
    setCurrentSlide(prevSlideIndex);
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

  const progress = ((currentSlide + 1) / works.length) * 100;

  return (
    <div className="slider-vase">
      <div className="upper-section">
        <div className="topic-box">
          <h2 className="case C">Trending Today</h2>
          <div className="redirect-button" onClick={nextSlide}>
            <span>&gt;</span>
          </div>
        </div>
        <div className="slider-buttons">
          <div className="slider-button slider-prev C" onClick={prevSlide}>
            <span className="C">&lt;</span>
          </div>
          <div className="slider-button slider-next C" onClick={nextSlide}>
            <span className="C">&gt;</span>
          </div>
        </div>
      </div>
      <div className="slider-box" ref={sliderRef}>
        <div className="slider-content">
        {works.slice(currentSlide, currentSlide + 5).map((work, index) => (
            <div key={work.key} className="slide C">
              <div className="cover-box C">
                <img
                  src={`https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`} //masukin work key
                  alt={work.title}
                  className="image-box C"
                />
              </div>
              <div className="title-box C">
                <h5 className="C">{work.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="progress-box">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

export default RecommendedSlider;
