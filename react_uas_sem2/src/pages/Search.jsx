import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchStyles.css";
import nophoto from "./Photos/nophoto.jpg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state?.searchData;
  const searchQuery = location.state?.searchQuery;

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log(searchData); // Check the structure of searchData
    if (searchData && searchData.docs) {
      const formattedResults = searchData.docs
        .slice(0, 20) // Limit the number of displayed books to 20
        .map((book) => ({
          title: book.title,
          author: book.author_name ? book.author_name[0] : "Unknown Author",
          publicationYear: book.publish_year ? book.publish_year[0] : "Unknown Year",
          editionKey: book.edition_key ? book.edition_key[0] : null,
          description: book.description ? book.description.value : "No Description Available",
          key: book.key,
        }));
      setSearchResults(formattedResults);
      console.log(formattedResults);
    }
  }, [searchData]);

  const handleImageError = (e) => {
    e.target.onerror = null; // Remove the error handler to prevent an infinite loop
    e.target.src = nophoto; // Set the default image source as nophoto
  };

  const fetchSearchResults = (apiUrl) => {
    Axios.get(apiUrl)
      .then((response) => {
        const searchData = response.data;
        // Update search results based on the fetched data
        if (searchData && searchData.docs) {
          const formattedResults = searchData.docs
            .slice(0, 20) // Limit the number of displayed books to 20
            .map((book) => ({
              // ...
            }));
          setSearchResults(formattedResults);
        }
      })
      .catch((error) => {
        console.log("Error fetching search results:", error);
      });
  };

  const handlePopularClick = () => {
    const apiUrl = "https://openlibrary.org/trending/daily";
    fetchSearchResults(apiUrl);
  };

  const handleBestSellersClick = () => {
    const apiUrl = "https://openlibrary.org/trending/yearly";
    fetchSearchResults(apiUrl);
  };

  return (
    <div className="search-results-page">
      <div className="search-result-box">
        <div className="search-results-container">
          <div className="search-title">
            {searchQuery && <span className="query-box">"{searchQuery}"</span>}
          </div>
          {searchResults.length === 0 ? (
            // Display a default book if no search results are available
            <div className="search-book-container">
              <div className="search-book-cover">No Results</div>
              <div className="search-book-details">
                <div className="search-book-title">No Results Found</div>
                <div className="search-book-author">Unknown Author</div>
                <div className="search-book-year">Unknown Year</div>
              </div>
            </div>
          ) : (
            // Render search results
            searchResults.map((book) => (
              <div
                className="search-book-container"
                key={book.key}
                onClick={() => {
                  console.log("Thumbnail URL:", book.editionKey);
                  console.log("Key:", book.key);
                  navigate("/Test", {
                    state: { thumbnailUrl: `https://covers.openlibrary.org/b/OLID/${book.editionKey}-M.jpg`, key: book.key },
                  });
                }}
              >
                <div className="search-book-cover">
                  {book.editionKey && book.editionKey !== "nophoto" ? (
                    <img
                      src={`https://covers.openlibrary.org/b/OLID/${book.editionKey}-M.jpg`}
                      alt="Book Cover"
                      onError={handleImageError}
                      className="search-book-image"
                    />
                  ) : (
                    <img
                      src={nophoto}
                      alt="No Book Cover"
                      className="no-cover-available"
                    />
                  )}
                </div>
                <div className="search-book-details">
                  <div className="search-book-title">
                    <h2>{book.title}</h2>
                  </div>
                  <div className="search-book-author">
                    <h6>{book.author}</h6>
                  </div>
                  <div className="search-book-year">{book.publicationYear}</div>
                  <div className="search-book-description">
                    {book.description}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;
