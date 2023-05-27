import React, { useState } from "react";
import "../components/bookPageStyles/styles.css";

const BookInfo = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const book = {
    title: "Lorem Ipsum",
    author: "F. Scott Fitzgerald",
    image:
      "https://pe-images.s3.amazonaws.com/basics/cc/image-size-resolution/resize-images-for-print/image-cropped-8x10.jpg",
    rating: 4.5,
    description:
      "Lorem ipsum ."
  };

  const author = {
    name: "Lorem Ipsum",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Will_Ferrell_as_MegaMind_by_Gage_Skidmore.jpg/1200px-Will_Ferrell_as_MegaMind_by_Gage_Skidmore.jpg",
    book: "ica ica"
  };

  const handleButtonClick = () => {
    setShowInfo(!showInfo);
  };

  const handleClick = () => {
    setShowPopup(true);
  };

  const renderRatingStars = () => {
    const filledStars = Math.floor(book.rating);
    const hasHalfStar = book.rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i}>🌕</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">🌗</span>);
    }

    return stars;
  };

  return (
    <div>
      <button onClick={handleButtonClick}>
        {showInfo ? "Hide Book Info" : "Show Book Info"}
      </button>
      {showInfo && (
        <div className="container2">
          <div className="book-info">
            <img className="book-image" src={book.image} alt={book.title} />
            <div className="book-details">
              <h2>{book.title}</h2>
              <p>By Author: {book.author}</p>
              <p>Rating: {renderRatingStars()}</p>
              <div>
                <button className="asu-button" onClick={handleClick}>
                  +Add to bookshelf
                </button>
                {showPopup && (
                  <div className="popup">
                    <p>Added to bookmark!</p>
                    <button onClick={() => setShowPopup(false)}>Close</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="descbord">
            <h3 className="deschead">Description</h3>
            <p className="descbody">{book.description}</p>
          </div>
          <div className="recbord">
            <h3 className="rechead">Recommendation</h3>
            <p className="recbody">{book.description}</p>
          </div>
          <div className="author-container">
            <div className="author-info">
              <img
                className="author-image"
                src={author.image}
                alt={author.name}
              />
              <div className="author-details">
                <h2>Author</h2>
                <p>Author: {author.name}</p> {/* Removed 'By' from the text */}
                <p>Book Published: {author.book}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
