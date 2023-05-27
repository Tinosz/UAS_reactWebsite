import React, { useState, useEffect, useRef } from "react";
import "./BookshelfStyle.css";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bookshelf = () => {
  const storedActiveTab = localStorage.getItem("activeTab");
  const [activeTab, setActiveTab] = useState(storedActiveTab || "all");
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const editPopupRef = useRef(null);

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

  const readingCount = 3;
  const planToReadCount = 2;
  const completedCount = 0;

  const books = getBooksForTab(activeTab);

  function getBooksForTab(tab) {
    switch (tab) {
      case "all":
        return Array.from(
          { length: readingCount + planToReadCount + completedCount },
          (_, index) => {
            let statusContainerClass = "status-container";
            let statusText = "Unknown";

            if (index < planToReadCount) {
              statusContainerClass += " status-container-plan";
              statusText = "Plan To Read";
            } else if (index < planToReadCount + readingCount) {
              statusContainerClass += " status-container-reading";
              statusText = "Reading";
            } else {
              statusContainerClass += " status-container-completed";
              statusText = "Completed";
            }

            return (
              <div className="books" key={index}>
                <div className="top-section">
                  <div className={statusContainerClass}>
                    <p className="book-status">{statusText}</p>
                  </div>
                  <div
                    className="edit-button-container"
                    onClick={openEditButton}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="edit-button"
                    />
                  </div>
                </div>
                <div className="books-info">
                  <p className="books-title">Book Title</p>
                </div>
              </div>
            );
          }
        );
      case "planToRead":
        return Array.from({ length: planToReadCount }, (_, index) => (
          <div className="books" key={index}>
            <div className="top-section">
              <div className="status-container-plan">
                <p className="book-status">Plan To Read</p>
              </div>
              <div className="edit-button-container" onClick={openEditButton}>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-button" />
              </div>
            </div>
            <div className="books-info">
              <p className="books-title">Book Title</p>
              <p className="page-read">Pages: (number of pages) /9999</p>
            </div>
          </div>
        ));
      case "reading":
        return Array.from({ length: readingCount }, (_, index) => (
          <div className="books" key={index}>
            <div className="top-section">
              <div className="status-container-reading">
                <p className="book-status">Reading</p>
              </div>
              <div className="edit-button-container" onClick={openEditButton}>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-button" />
              </div>
            </div>
            <div className="books-info">
              <p className="books-title">Book Title</p>
              <p className="page-read">Pages: (number of pages) /9999</p>
            </div>
          </div>
        ));
      case "completed":
        return Array.from({ length: completedCount }, (_, index) => (
          <div className="books" key={index}>
            <div className="top-section">
              <div className="status-container-completed">
                <p className="book-status">Completed</p>
              </div>
              <div className="edit-button-container" onClick={openEditButton}>
                <FontAwesomeIcon icon={faPenToSquare} className="edit-button" />
              </div>
            </div>
            <div className="books-info">
              <p className="books-title">Book Title</p>
              <p className="page-read">Pages: (number of pages) /9999</p>
            </div>
          </div>
        ));
      default:
        return [];
    }
  }

  const renderBooks =
    books.length > 0 ? books : <p>No books currently on this list</p>;

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
            <div className="edit-popup-edit">
              <p>Status: </p>
              <select>
                <option value="#">Plan to read</option>
                <option value="#">Reading</option>
                <option value="#">Completed</option>
              </select>
              <p>Pages: (number of pages) / 9999</p>
            </div>
            <button>Apply</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookshelf;
