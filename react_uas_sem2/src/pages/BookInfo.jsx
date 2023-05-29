import React, { useState, useEffect, useRef } from "react";
import "./BookInfoStyles.css";
import axios from "axios";
import {
  faStar as faStarBold,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import DefaultProfile from "./DefaultProfile.jpg";

const BookInfo = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [showPopup, setShowPopup] = useState(false);
  const [pagesRead, setPagesRead] = useState(0);
  const [bookDescription, setBookDescription] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookImageURL, setBookImageURL] = useState("");
  const popupRef = useRef(null);
  const location = useLocation();
  const { thumbnailURL, key } = location.state || {};
  const [authorName, setAuthorName] = useState("");
  const [authorImageURL, setAuthorImageURL] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [bookRating, setBookRating] = useState(0);
  const [bookRatingCount, setBookRatingCount] = useState(0);

  const book = {
    title: bookTitle,
    author: "John Doe",
    image: bookImageURL,
    rating: bookRating,
    description: bookDescription,
    recommendation: "This book is highly recommended!",
    totalPages: 200, // Replace with the actual total number of pages
  };

  const author = {
    name: { authorName },
    image: authorImageURL || DefaultProfile,
    book: "The Book",
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddToBookshelf = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPagesRead(0);
  };

  const handleAddPagesRead = () => {
    // Update the state for pages read or perform any other required logic...
  };

  const renderRatingStars = () => {
    const filledStars = Math.floor(book.rating);
    const remainingStars = 5 - filledStars;
    const hasHalfStar = book.rating % 1 >= 0.5;
  
    const stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <span key={i}>
          <FontAwesomeIcon icon={faStarBold} />
        </span>
      );
    }
  
    if (hasHalfStar) {
      stars.push(
        <span key="half">
          <FontAwesomeIcon icon={faStarHalfStroke} />
        </span>
      );
    }
  
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={i + filledStars + 1}>
          <FontAwesomeIcon icon={faStarRegular} />
        </span>
      );
    }
  
    return stars;
  };
  
  useEffect(() => {
    const fetchBookDescription = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${key}.json`);
        const { description, title, covers, authors } = response.data;
        const modifiedDescription = description.replace(/\bhttp\S+/g, "");
        setBookDescription(modifiedDescription);
        setBookTitle(title);
        if (covers && covers.length > 0) {
          const coverURL = `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`;
          setBookImageURL(coverURL);
        }
    
        // Fetch author's name and image using author_key
        if (authors && authors.length > 0) {
          const authorKey = authors[0].author.key;
          const authorResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
          const authorName = authorResponse.data.name;
          setAuthorName(authorName);
    
          // Fetch author's image using author_key
          const authorImageKey = authorKey.split("/").pop();
          const authorImageURL = `https://covers.openlibrary.org/a/olid/${authorImageKey}-L.jpg`;
          setAuthorImageURL(authorImageURL);
    
          // Fetch author's bio
          const authorBioResponse = await axios.get(`https://openlibrary.org${authorKey}.json`);
          const authorBio = authorBioResponse.data.bio.value;
          setAuthorBio(authorBio);
        }
      } catch (error) {
        console.log("Error fetching book description:", error);
      }
    };

    const fetchBookRating = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${key}/ratings.json`);
        const { average, count } = response.data.summary;
        const roundedAverage = average.toFixed(1); // Round up to 1 decimal place
        setBookRating(parseFloat(roundedAverage));
        setBookRatingCount(count);
      } catch (error) {
        console.log("Error fetching book rating:", error);
      }
    };

    if (key || thumbnailURL) {
      fetchBookDescription();
      fetchBookRating();
    }
  }, [key, thumbnailURL]);

  // Axios interceptor to log requests
  axios.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    console.log("Axios Request Error:", error);
  });
  
  // Axios interceptor to log response data
  axios.interceptors.response.use((response) => {
    console.log("Axios Response Data:", response.data);
    return response;
  }, (error) => {
    console.log("Axios Response Error:", error);
    return Promise.reject(error);
  });

  return (
    <div className="book-info-page">
      <div className="book-info-container">
        <div className="book-info">
          <img
            className="book-image"
            src={thumbnailURL || book.image}
            alt={book.title}
          />
          <div className="book-details-info">
            <p className="book-info-title">{book.title}</p>
            <p className="book-info-author">{authorName}</p>
            <div className="book-info-rating-container">
              <p>{renderRatingStars()}</p>
              <p className="book-info-rating"> {book.rating} ( {bookRatingCount} )</p>
            </div>
            <div className="asu-box">
              <button className="asu-button" onClick={handleAddToBookshelf}>
                +Add to bookshelf
              </button>
            </div>
          </div>
        </div>
        <div className="tab-container">
          <div
            className={`deschead tab ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </div>
          <div
            className={`rechead tab ${
              activeTab === "recommendation" ? "active" : ""
            }`}
            onClick={() => handleTabClick("recommendation")}
          >
            Recommendation
          </div>
        </div>
        <div className="tab-content">
          {activeTab === "description" && (
            <div className="descbord">
              <p className="descbody">{book.description}</p>
            </div>
          )}
          {activeTab === "recommendation" && (
            <div className="recbord">
              <p className="recbody">{book.recommendation}</p>
            </div>
          )}
        </div>
        <div className="author-container">
          <div className="author-info">
            <img
              className="author-image"
              src={author.image}
              alt={author.name}
            />
            <div className="author-details">
              <h2>{authorName}</h2>
              <p>Book Published: {author.book}</p>
              <p className="book-info-author-description">{authorBio}</p>
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="bookshelf-popup" ref={popupRef}>
          <h2>Add to Bookshelf</h2>
          <h4>
            Pages read: {pagesRead}/{book.totalPages}
          </h4>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={handleAddPagesRead} className="popup-add">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
