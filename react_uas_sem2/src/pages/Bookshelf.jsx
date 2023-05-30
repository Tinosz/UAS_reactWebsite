import React, { useState, useEffect, useRef } from "react";
import "./BookshelfStyle.css";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

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
  //const { userInput } = location.state;
  const book = JSON.parse(sessionStorage.getItem('bookData'))


  //console.log(userInput);

  useEffect(() => {
    const bookData = sessionStorage.getItem("BookData");
    if (bookData) {
      const parsedBookData = JSON.parse(bookData);
      setBooks(parsedBookData);
      console.log(parsedBookData);
    }
  }, []);

  const handleActiveTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const openEditButton = () => {
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

  const handleBookUpdate = (bookIndex, newStatus) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks };
      const currentTabBooks = updatedBooks[activeTab];
      const selectedTabBooks = updatedBooks[newStatus];

      const movedBook = currentTabBooks.splice(bookIndex, 1)[0];
      selectedTabBooks.push(movedBook);

      return updatedBooks;
    });
  };

  const readingCount = books.reading.length;
  const planToReadCount = books.planToRead.length;
  const completedCount = books.completed.length;

  const bookInfo = 
  console.log("Book's gotten status:", book.selectedStatus);
  

  console.log(book)
  if (book && book.length > 0) {
    const selectedStatus = book[0].selectedStatus;
    console.log("Book's 0's status:",selectedStatus);
  }
  const getBooksForTab = (tab) => {
    const booksWithSelectedStatus = books.all.filter(
      (book) => book.selectedStatus === tab
    );
  
    return booksWithSelectedStatus.map((book, index) => {
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

        return (
          <div className="books" key={index}>
            <div className="top-section">
              <div className={statusContainerClass}>
                <p className="book-status">{statusText}</p>
              </div>
              <div className="edit-button-container" onClick={openEditButton}>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-button" />
              </div>
            </div>
            <div className="books-info">
              <p className="books-title">{book.title}</p>
              {tab !== "all" && (
                <p className="page-read">Pages: {book.pageInput} / 9999</p>
              )}
            </div>
          </div>
        );
      });
  };

  const renderBooks =
    books.all.filter((book) => book.selectedStatus == activeTab).length > 0 ? (
      getBooksForTab(activeTab)
    ) : (
      <p>No books currently on this list</p>
    );

  return (
    <div className="my-bookshelf-page">
      <div className="main-bookshelf-container">
        <div className="bookshelf-title">
          <h1 className="text-title">My Bookshelf</h1>
          <input
            type="text"
            className="title-input"
            placeholder="Enter Title"
          />
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
            />
            <div className="edit-popup-edit">
              <div className="edit-popup-status">
                <p className="edit-status">Status: </p>
                <select className="edit-popup-select">
                  <option value="current">Current</option>
                  <option value="planToRead">Plan to read</option>
                  <option value="reading">Reading</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <p className="edit-page">Pages:</p>
              <div className="page-input-row">
                <input className="page-input"></input>
                <p>/9999</p>
              </div>
            </div>
            <div className="edit-popup-button-container">
              <button
                className="edit-popup-button"
                onClick={() => {
                  const newStatus =
                    document.querySelector(".edit-popup-select").value;
                  handleBookUpdate(0, newStatus); // Assuming book index 0, modify it as needed
                  setIsEditPopupVisible(false);
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

export default Bookshelf;
