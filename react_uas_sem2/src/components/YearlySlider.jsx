import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './styles/trenSlider.css';
import { useNavigate } from 'react-router-dom';
import apiData from "./API_data/apiData_Yearly.json"

function YearlySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const sliderRef = useRef(null);
  const [data, setData] = useState(null);
  const [descriptions, setDescriptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = 'https://openlibrary.org/trending/yearly.json';

  useEffect(() => {
    setData(apiData);
}, []);

  function fetchData() {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        // Save the data as a file
        const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
        //saveAs(blob, 'apiData.json');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const works = data?.works?.slice(0, 20) || [];

  const slideWidth = 20; // Adjust the slide width based on your CSS

  const nextSlide = () => {
    const numColumns = Math.min(Math.floor(window.innerWidth / 200), 4); // Maximum 4 columns
    const slideWidth = Math.floor(window.innerWidth / numColumns); // Width of each slide item
    const maxSlide = works.length - numColumns;
    if (currentSlide >= maxSlide) {
      // Reached the end of the slides
      // Add logic to handle "View More" action here
      console.log("View More");
    } else {
      setCurrentSlide((prevSlide) => prevSlide + numColumns);
    }
  };
  
  const prevSlide = () => {
    const numColumns = Math.min(Math.floor(window.innerWidth / 200), 4); // Maximum 4 columns
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


  useEffect(() => {
    const fetchDescriptions = async () => {
      const descriptionsData = {};
  
      const fetchDescriptionsParallel = async () => {
        const promises = works.map(async (work) => {
          try {
            const response = await axios.get(`https://openlibrary.org${work.key}.json`);
            const description = response.data.description?.value || '';
            return { key: work.key, description };
          } catch (error) {
            console.log(error);
            return { key: work.key, description: '' };
          }
        });
  
        const descriptions = await Promise.all(promises);
        descriptions.forEach(({ key, description }) => {
          descriptionsData[key] = description;
        });
  
        setDescriptions(descriptionsData);
      };
  
      if (works.length > 0) {
        fetchDescriptionsParallel();
      }
    };
  
    fetchDescriptions();
  }, [works]);
  


  const renderSlides = () => {
    return works.map((work, index) => {
      const description = descriptions[work.key] || '';

      const handlePopupClick = (e) => {
        e.stopPropagation();
      };

      return (
        <div key={work.key} className="slide">
          <div className="cover-box C">
            <img
              src={`https://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`}
              alt={work.title}
              className="image-box C"
            />
          </div>
          <div className="title-box C">
            <h5 className="C">{work.title}</h5>
            <div
              className="slide-popup"
              onClick={handlePopupClick} // Stop click propagation to allow scrolling
            >
              <div className="slide-popup-content" onClick={() => navigate('/BookInfo')}>
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

      <div className="slider-vase">
        <div className="upper-section">
          <div className="topic-box">
            <h2 className="case C">Trending This Year</h2>
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
          <div className="slider-content" style={{ transform: transformValue }}>
            {renderSlides()}
          </div>
        </div>
        <div className="progress-box">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default YearlySlider;
