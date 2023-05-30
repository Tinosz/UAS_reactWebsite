import React, { useState, useEffect, useRef } from "react";
import "./BookshelfStyle.css";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { parse } from "@fortawesome/fontawesome-svg-core";

const Bookshelf = () => {
  const storedActiveTab = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(storedActiveTab || "all");
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [books, setBooks] = useState({
    all: [],
    planToRead: [],
    reading: [],
    completed: [],
  });
  const editPopupRef = useRef(null);
  const location = useLocation();
  const book = JSON.parse(sessionStorage.getItem("bookData"));
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const navigate = useNavigate();
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  useEffect(() => {
    const bookData = sessionStorage.getItem("BookData");
    if (bookData) {
      const parsedBookData = JSON.parse(bookData);
      setBooks(parsedBookData);
    }
  }, []);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const openEditButton = (bookData) => {
    setSelectedBook(bookData);
    console.log(bookData);
    setIsEditPopupVisible(!isEditPopupVisible);
  };

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

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const handleBookUpdate = () => {
    const {
      key,
      title,
      thumbnailUrl,
      selectedStatus: currentSelectedStatus,
    } = selectedBook;
    const selectedStatus = document.querySelector(".edit-popup-select").value;
    let pageInput = document.querySelector(".page-input").value;

    if (pageInput === "") {
      pageInput = 0;
    }

    if (selectedStatus === "planToRead") {
      pageInput = "Not Read";
    } else if (selectedStatus === "completed") {
      pageInput = "Finished Reading";
    }

    const bookData = {
      key,
      title,
      thumbnailUrl,
      selectedStatus:
        selectedStatus === "current" ? currentSelectedStatus : selectedStatus,
      pageInput,
    };

    let storedData = sessionStorage.getItem("bookData");
    let parsedData = [];

    try {
      parsedData = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }

    const existingBookIndex = parsedData.findIndex((book) => book.key === key);

    if (existingBookIndex !== -1) {
      parsedData[existingBookIndex] = bookData;
    } else {
      parsedData.push(bookData);
    }

    sessionStorage.setItem("bookData", JSON.stringify(parsedData));
  };

  const handleDeleteButtonClick = () => {
    const { key } = selectedBook;

    // Remove the book from the session storage
    let storedData = sessionStorage.getItem("bookData");
    let parsedData = [];

    try {
      parsedData = storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }

    const updatedData = parsedData.filter((book) => book.key !== key);
    sessionStorage.setItem("bookData", JSON.stringify(updatedData));

    // Reset the selected book and status
    setSelectedBook(null);
    setSelectedStatus("");
  };

  const handleApplyButtonClick = () => {
    const selectedStatus = document.querySelector(".edit-popup-select").value;
    let pageInput = document.querySelector(".page-input").value;

    // Check if pageInput is empty or not
    if (pageInput === "") {
      pageInput = 0; // Set pageInput to 0 if it's empty
    }
    console.log("Retrieved Book arrayssss:", selectedBook);
    const bookData = {
      key: selectedBook.key,
      title: selectedBook.title,
      thumbnailUrl: selectedBook.thumbnailUrl,
      selectedStatus,
      pageInput,
    };

    handleBookUpdate(bookData);
    setIsEditPopupVisible(false);
  };

  const closeEditButton = () => {
    setIsEditPopupVisible(!isEditPopupVisible);
  };

  const readingCount = books.reading.length;
  const planToReadCount = books.planToRead.length;
  const completedCount = books.completed.length;

  const bookInfo = book && book.length > 0 ? book : [];

  const getBooksForTab = (tab) => {
    let statusContainerClass = "status-container";
    let statusText = "Unknown";

    if (tab === "planToRead") {
      statusContainerClass += " status-container-plan";
      statusText = "Plan To Read";
    } else if (tab === "reading") {
      statusContainerClass += " status-container-reading";
      statusText = "Reading";
    } else if (tab === "completed") {
      statusContainerClass += " status-container-completed";
      statusText = "Completed";
    }

    let filteredBooks = [];

    if (tab === "all") {
      filteredBooks = books.planToRead.concat(books.reading, books.completed);
    } else {
      filteredBooks = bookInfo.filter(
        (bookData) => bookData.selectedStatus === tab
      );
    }

    return filteredBooks.map((bookData, index) => (
      <div className="books" key={index}>
        <div className="top-section">
          <div className={statusContainerClass}>
            <p className="book-status">{statusText}</p>
          </div>
          <img
            src={bookData.thumbnailUrl}
            className="bookshelf-cover"
            alt={bookData.title}
            onClick={() => {
              console.log("BookData Key sent:", bookData.key);
              console.log("Book Image sent:", bookData.thumbnailUrl);
              navigate("/BookInfo", {
                state: {
                  key: bookData.key,
                  thumbnailUrl: bookData.thumbnailUrl,
                },
              });
            }}
          />
          <div
            className="edit-button-container"
            onClick={() => openEditButton(bookData, index)} // Pass bookData and index as arguments
          >
            <FontAwesomeIcon icon={faPenToSquare} className="edit-button" />
          </div>
        </div>
        <div className="books-info">
          <p className="books-title">{bookData.title}</p>
          {tab !== "all" && (
            <p className="page-read">Pages: {bookData.pageInput}</p>
          )}
        </div>
      </div>
    ));
  };

  // Preload images from thumbnailUrl
  useEffect(() => {
    if (bookInfo && bookInfo.length > 0) {
      bookInfo.forEach((bookData) => {
        const img = new Image();
        img.src = bookData.thumbnailUrl;
      });
    }
  }, [bookInfo]);

  const filteredBooks = bookInfo.filter(
    (bookInfo) => bookInfo.selectedStatus === activeTab
  );

  const renderBooks =
    filteredBooks.length > 0 ? (
      getBooksForTab(activeTab)
    ) : (
      <p>No books currently on this list</p>
    );

  return (
    <div className="my-bookshelf-page">
      <div className="main-bookshelf-container">
        <div className="bookshelf-title">
          <h1 className="text-title">My Bookshelf</h1>
        </div>
        <div className="navbar-container">
          <div className="navbar">
            <div
              className={`navbar-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => handleActiveTabChange("all")}
            >
              All
            </div>
            <div
              className={`navbar-tab ${
                activeTab === "planToRead" ? "active" : ""
              }`}
              onClick={() => handleActiveTabChange("planToRead")}
            >
              Plan to Read
            </div>
            <div
              className={`navbar-tab ${
                activeTab === "reading" ? "active" : ""
              }`}
              onClick={() => handleActiveTabChange("reading")}
            >
              Reading
            </div>
            <div
              className={`navbar-tab ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => handleActiveTabChange("completed")}
            >
              Completed
            </div>
          </div>
        </div>
        <div className="bookShelf-container">
          <div className="book-container">{renderBooks}</div>
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
                  <option value="current">Current</option>
                  <option value="planToRead">Plan to read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="page-input-container">
                <p className="edit-page">Pages:</p>
                <div className="page-input-row">
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
            </div>
            <div className="edit-popup-button-container">
              <p
                className="delete-popup-button"
                onClick={() => handleDeleteButtonClick()}
              >
                Delete Book
              </p>
              <button
                className="edit-popup-button"
                onClick={() => handleApplyButtonClick()}
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

export default Bookshelf;
