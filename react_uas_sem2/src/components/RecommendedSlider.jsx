import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './styles/genSlider.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

function Recommended() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef(null);
  const [data, setData] = useState(null);
  const [descriptions, setDescriptions] = useState({});
  const url = 'https://openlibrary.org/search.json?q=subject%3A(Romance)';

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

  const works = data?.docs?.slice(0, 20) || [];

  const slideWidth = 20; // Adjust the slide width based on your CSS

  const nextSlide = () => {
    const numColumns = Math.min(Math.floor(window.innerWidth / 200), 4); // Maximum 5 columns
    const slideWidth = Math.floor(window.innerWidth / numColumns); // Width of each slide item
    const maxSlide = works.length - numColumns;
    if (currentSlide >= maxSlide) {
      // Reached the end of the slides
      // Add logic to handle "View More" action here
      console.log('View More');
    } else {
      setCurrentSlide((prevSlide) => prevSlide + numColumns);
    }
  };

  const prevSlide = () => {
    const numColumns = Math.min(Math.floor(window.innerWidth / 200), 4); // Maximum 5 columns
    const slideWidth = Math.floor(window.innerWidth / numColumns); // Width of each slide item
    if (currentSlide <= 0) {
      return; // Do nothing if already on the first slide
    }
    setCurrentSlide((prevSlide) => prevSlide - numColumns);
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

  const progress = (currentSlide / (works.length - Math.floor(window.innerWidth / 200))) * 100;
  const transformValue = `translateX(-${currentSlide * slideWidth}%)`;

  const fetchDescription = async (key) => {
    try {
      const response = await axios.get(`https://openlibrary.org${key}.json`);
      return response.data.description?.value || '';
    } catch (error) {
      console.log(error);
      return '';
    }
  };

  useEffect(() => {
    const fetchDescriptions = async () => {
      const descriptionsData = {};

      for (const work of works) {
        const description = await fetchDescription(work.key);
        descriptionsData[work.key] = description;
      }

      setDescriptions(descriptionsData);
    };

    fetchDescriptions();
  }, [works]);

  // Render the slides with the popup
  const renderSlides = () => {
    return works.map((work, index) => {
      const description = descriptions[work.key] || '';

      const handlePopupClick = (e) => {
        e.stopPropagation();
      };

      return (
        <div key={work.key} className="gen-slide">
          <div className="gen-cover-box C">
            <img
              src={`https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`}
              alt={work.title}
              className="gen-image-box C"
            />
          </div>
          <div className="gen-title-box C">
            <h5 className="C">{work.title}</h5>
            <div
              className="gen-slide-popup"
              onClick={handlePopupClick} // Stop click propagation to allow scrolling
            >
              <div className="gen-slide-popup-content" onClick={() => navigate('/BookInfo')}>
                <h5>{work.title}</h5>
                <h6>by {work.author_name?.[0]}</h6>
                <p>{description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <hr className="separator" />

      <div className="gen-slider-vase">
        <div className="gen-upper-section">
          <div className="gen-topic-box">
            <h2 className="gen-case C">Romance</h2>
          </div>
          <div className="gen-slider-buttons">
            <div className="gen-slider-button slider-prev C" onClick={prevSlide}>
              <span className="C">&lt;</span>
            </div>
            <div className="gen-slider-button slider-next C" onClick={nextSlide}>
              <span className="C">&gt;</span>
            </div>
          </div>
        </div>
        <div className="gen-slider-box" ref={sliderRef}>
          <div className="gen-slider-content" style={{ transform: transformValue }}>
            {renderSlides()}
          </div>
        </div>
        <div className="gen-progress-box">
          <div className="gen-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default Recommended;
