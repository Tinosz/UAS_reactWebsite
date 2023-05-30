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
import { useNavigate } from "react-router-dom";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const BookInfo = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [showPopup, setShowPopup] = useState(false);
  const [pagesRead, setPagesRead] = useState(0);
  const [bookDescription, setBookDescription] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookImageURL, setBookImageURL] = useState("");
  const popupRef = useRef(null);
  const location = useLocation();
  const { thumbnailUrl, key } = location.state || {};
  const [authorName, setAuthorName] = useState("");
  const [authorImageURL, setAuthorImageURL] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [bookRating, setBookRating] = useState(0);
  const [bookRatingCount, setBookRatingCount] = useState(0);
  const [extractedSubjects, setExtractedSubjects] = useState([]);
  const [booksWithCovers, setBooksWithCovers] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const editPopupRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [title, setTitle] = useState(""); // Provide an initial value for the title state variable


  const handleApplyButtonClick = () => {
    const selectedStatus = document.querySelector(".edit-popup-select").value;
    let pageInput = document.querySelector(".page-input").value;
  
    // Check if pageInput is empty or not
    if (pageInput === "") {
      pageInput = 0; // Set pageInput to 0 if it's empty
    }
  
    const bookData = {
      key,
      title,
      thumbnailUrl,
      selectedStatus,
      pageInput
    };
  
    let storedData = sessionStorage.getItem("bookData");
    let parsedData = [];
  
    try {
      parsedData = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  
    const existingBookIndex = parsedData.findIndex(book => book.key === key);
  
    if (existingBookIndex !== -1) {
      parsedData[existingBookIndex] = bookData;
    } else {
      parsedData.push(bookData);
    }
  
    sessionStorage.setItem("bookData", JSON.stringify(parsedData));
  };
  
  
  
  
  

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    sessionStorage.setItem("selectedStatus", selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editPopupRef.current &&
        !editPopupRef.current.contains(event.target)
      ) {
        setIsEditPopupVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const [userInput, setUserInput] = useState({
    coverImage: "",
    title: "",
    key: "",
    status: "",
    pages: 0,
  });
  const [bookshelfData, setBookshelfData] = useState([]);

  const handleAddToBookshelf = () => {
    const newBook = {
      title: bookTitle,
      pages: pagesRead,
    };

    // Add the new book to the bookshelf data array
    setBookshelfData((prevBookshelfData) => [...prevBookshelfData, newBook]);

    // Reset the input fields
    setBookTitle("");
    setPagesRead(0);
  };

  if (!authorImageURL) {
    author.image = DefaultProfile;
  }

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const openEditButton = () => {
    setIsEditPopupVisible(!isEditPopupVisible);
  };

  const closeEditButton = () => {
    setIsEditPopupVisible(!isEditPopupVisible);
  };

  useEffect(() => {
    const fetchBookDescription = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org${key}.json`);
        const { description, title, covers, authors, subjects } = response.data;

        setTitle(title);

        let bookDescription = "";
        if (description) {
          if (typeof description === "string") {
            bookDescription = description;
          } else if (typeof description.value === "string") {
            bookDescription = description.value;
          }
        }

        const modifiedDescription = bookDescription.replace(/\bhttp\S+/g, "");
        setBookDescription(modifiedDescription);
        setBookTitle(title);
        if (covers && covers.length > 0) {
          const coverURL = `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`;
          setBookImageURL(coverURL);
        }

        // Fetch author's name and image using author_key
        if (authors && authors.length > 0) {
          const authorKey = authors[0].author.key;
          const authorResponse = await axios.get(
            `https://openlibrary.org${authorKey}.json`
          );
          const authorName = authorResponse.data.name;
          setAuthorName(authorName);

          // Fetch author's image using author_key
          let authorImageURL = "";
          if (
            authorResponse.data.photos &&
            authorResponse.data.photos.length > 0
          ) {
            const authorImageKey = authorKey.split("/").pop();
            authorImageURL = `https://covers.openlibrary.org/a/olid/${authorImageKey}-L.jpg`;
          }

          setAuthorImageURL(authorImageURL || DefaultProfile);

          // Fetch author's bio
          const authorBioResponse = await axios.get(
            `https://openlibrary.org${authorKey}.json`
          );
          let authorBio = "";
          if (authorBioResponse.data.bio) {
            if (typeof authorBioResponse.data.bio === "string") {
              authorBio = authorBioResponse.data.bio;
            } else if (typeof authorBioResponse.data.bio.value === "string") {
              authorBio = authorBioResponse.data.bio.value;
            }
          }
          setAuthorBio(authorBio);

          let extractedSubjects = "";
          if (subjects && subjects.length > 0) {
            extractedSubjects = subjects.slice(0, 3);
            setExtractedSubjects(extractedSubjects);

            // Fetch recommended books after subjects are fetched
            await fetchRecommendedBooks(extractedSubjects);
          }

          console.log("Location State:", location.state);
          console.log("Book Key:", key);
          console.log("Thumbnail URL:", thumbnailUrl);
          console.log("Book Description:", modifiedDescription);
          console.log("Book Title:", title);
          console.log("Book Covers:", covers);
          console.log("Authors:", authors);
          console.log("Author Name:", authorName);
          console.log("Author Image URL:", authorImageURL);
          console.log("Author Bio:", authorBio);
          console.log("Book Subjects:", subjects);
          console.log("Extracted Book Subjects:", extractedSubjects);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Error fetching book description:", error);
      }
    };

    const fetchBookRating = async () => {
      try {
        const response = await axios.get(
          `https://openlibrary.org${key}/ratings.json`
        );
        const { average, count } = response.data.summary;
        const roundedAverage = average.toFixed(1); // Round up to 1 decimal place
        setBookRating(parseFloat(roundedAverage));
        setBookRatingCount(count);
      } catch (error) {
        console.log("Error fetching book rating:", error);
      }
    };

    const fetchRecommendedBooks = async (extractedSubjects) => {
      try {
        const subjectQuery = extractedSubjects
          .map((subject) => `("${subject}")`)
          .join("+OR+");
        const searchURL = `https://openlibrary.org/search.json?q=subject%3A${subjectQuery}`;
        const response = await axios.get(searchURL);
        console.log(searchURL);
        console.log("Search Books Recommended", searchURL.data);
        console.log("Books Recommended:", response.data);

        const recommendedBooks = response.data.docs;
        const filteredBooks = recommendedBooks.filter(
          (book) => book.cover_edition_key
        );

        setBooksWithCovers(filteredBooks);
        console.log("Books with Covers:", filteredBooks);
      } catch (error) {
        console.log("Error fetching search results:", error);
      }
    };

    if (key) {
      setIsLoading(true);
      fetchBookDescription();
      fetchBookRating();
    }
  }, [key]);

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

  const renderRecommendationSlider = () => {
    // Check if subjects are available
    if (extractedSubjects.length === 0) {
      return (
        <p className="false-recommendation-info">
          No recommendation is available for this book
        </p>
      );
    }

    const numItems = 8; // Number of items (book covers)
    const itemWidth = 180; // Width of each item in pixels
    const itemHeight = 280; // Height of each item in pixels
    const sliderWidth = numItems * itemWidth; // Total width of the slider

    const sliderStyle = {
      width: `${sliderWidth}px`,
    };

    const itemStyle = {
      width: `${itemWidth}px`,
      height: `${itemHeight}px`,
    };

    // Generate book covers with actual images
    console.log("Books that are sent in the Slider:", booksWithCovers);
    const bookCovers = booksWithCovers.slice(0, numItems).map((book, index) => {
      const imageUrl = `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}-M.jpg`;
      const thumbnailUrl = `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}-L.jpg`;
      const key = book.key;
      console.log("Book Thumbnail Url Sent:", thumbnailUrl);
      console.log("Book Key sent:", key);

      const handleClick = () => {
        navigate("/BookInfo", {
          state: {
            thumbnailUrl: thumbnailUrl,
            key: key,
          },
        });
      };

      return (
        <div
          className="recbody-item"
          style={itemStyle}
          key={index}
          onClick={handleClick}
        >
          <img src={imageUrl} alt={`Book ${index + 1}`} />
        </div>
      );
    });

    // Return the book covers within the slider
    return (
      <div className="recbord" style={sliderStyle}>
        {bookCovers}
      </div>
    );
  };

  return (
    <div className="book-info-page">
      <div className="book-info-container">
        <div className="book-info">
          <img
            className="book-image"
            src={thumbnailUrl || book.image}
            alt={book.title}
          />
          <div className="book-details-info">
            <p className="book-info-title">{book.title}</p>
            <p className="book-info-author">{authorName}</p>
            <div className="book-info-rating-container">
              <p>{renderRatingStars()}</p>
              <p className="book-info-rating">
                {" "}
                {book.rating} ( {bookRatingCount} )
              </p>
            </div>
            <div>
              <button className="asu-button" onClick={openEditButton}>
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
            <div className="recbord">{renderRecommendationSlider()}</div>
          )}
        </div>
        <div className="author-container">
          <div>
            <h1 className="book-info-about-author">About the Author</h1>
          </div>
          <div className="author-info">
            <img
              className="author-image"
              src={author.image}
              alt={author.name}
            />
            <div className="author-details">
              <h2>{authorName}</h2>
              <p className="book-info-author-description">
                {authorBio || "Currently there is no biography for this Author"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isEditPopupVisible && (
        <div className="edit-popup">
          <div className="edit-popup-container" ref={editPopupRef}>
            <h4 className="edit-popup-title">Edit Book</h4>
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="edit-popup-close"
              onClick={closeEditButton}
            />
            <div className="edit-popup-edit">
              <div className="edit-popup-status">
                <p className="edit-status">Status: </p>
                <select
                  className="edit-popup-select"
                  onChange={handleStatusChange}
                >
                  <option value="planToRead">Plan to read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="page-input-row">
                <p className="edit-page">Pages:</p>
                <input
                  className="page-input"
                  disabled={
                    selectedStatus === "planToRead" ||
                    selectedStatus === "completed"
                  }
                  placeholder={
                    selectedStatus === "planToRead"
                      ? "No Page Read"
                      : selectedStatus === "completed"
                      ? "Finished"
                      : ""
                  }
                ></input>
              </div>
            </div>
            <div className="edit-popup-button-container">
              <button
                className="edit-popup-button"
                onClick={() => {
                  setIsEditPopupVisible(false);
                  handleApplyButtonClick();
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
