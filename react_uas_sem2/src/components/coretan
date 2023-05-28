import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import "./styles/bannerStyles.css";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import { AppContext } from "../store";
import { useNavigate } from "react-router-dom";


function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(null);
  const { trendingBooks, setTrendingBooks } = useContext(AppContext);
  const carouselContainerRef = useRef(null);
  const imageBoxRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleTransitionEnd = () => {
      setDirection(null); // Reset direction after slide animation is completed
    };

    const imageBox = imageBoxRef.current;

    if (imageBox) {
      imageBox.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (imageBox) {
        imageBox.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, []);

  const preloadImages = () => {
    trendingBooks.forEach((book) => {
      const img = new Image();
      img.src = book.thumbnailUrl;
    });
  };

  useEffect(() => {
    preloadImages();
  }, [trendingBooks]);

  const fetchBookInfoFromGoogleBooks = async (title, author, infoType) => {
    try {
      const apiKey = process.env.REACT_APP_API_KEY;
      const query = `${title} ${author}`;
      const encodedQuery = encodeURIComponent(query);
      const languages = [
        "en", // English
        "es", // Spanish
        "fr", // French
        "de", // German
        "it", // Italian
        "pt", // Portuguese
        "nl", // Dutch
        "sv", // Swedish
        "da", // Danish
        "no", // Norwegian
        "fi", // Finnish
        "el", // Greek
        "ru", // Russian
        "zh-CN", // Chinese (Simplified)
        "zh-TW", // Chinese (Traditional)
        "ja", // Japanese
        "ko", // Korean
        "ar", // Arabic
        "tr", // Turkish
        "he", // Hebrew
        "hi", // Hindi
        "id", // Indonesian
      ];
      // Specify the languages you want to try

      for (const lang of languages) {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&langRestrict=${lang}&key=${apiKey}`
        );

        const bookInfo = response.data.items?.[0]?.volumeInfo;

        if (bookInfo) {
          if (infoType === "thumbnail") {
            return bookInfo?.imageLinks?.thumbnail || "";
          } else if (infoType === "summary") {
            return bookInfo?.description || "";
          }
        }
      }

      return "";
    } catch (error) {
      console.error(
        "Error fetching book information from Google Books:",
        error
      );
      return "";
    }
  };

  const fetchBookInfoFromOpenLibrary = async (
    key,
    coverEditionKeys,
    title,
    author
  ) => {
    try {
      let thumbnailUrl = null;
      let summary = "";

      for (const editionKey of coverEditionKeys) {
        thumbnailUrl = `https://covers.openlibrary.org/b/OLID/${editionKey}-L.jpg`;
        const url = `https://openlibrary.org${key}.json`;
        console.log("Fetching data from Open Library:", url);
        const response = await axios.get(url);
        const bookInfo = response.data;

        if (bookInfo.description && bookInfo.description.value) {
          summary = bookInfo.description.value;
          break;
        } else if (bookInfo.description) {
          summary = bookInfo.description;
          break;
        }
      }

      if (!thumbnailUrl || !summary) {
        const googleBooksSummary = await fetchBookInfoFromGoogleBooks(
          title,
          author,
          "summary"
        );
        if (googleBooksSummary) {
          summary = googleBooksSummary;
        }

        if (!thumbnailUrl) {
          thumbnailUrl = await fetchBookInfoFromGoogleBooks(
            title,
            author,
            "thumbnail"
          );
        }
      }

      summary = summary.replace(/(^|\s)http\S+/gi, "");

      return { summary, thumbnailUrl: thumbnailUrl || null };
    } catch (error) {
      console.error(
        "Error fetching book information from Open Library:",
        error
      );
      return { summary: "", thumbnailUrl: null };
    }
  };

  const fetchTrendingBooks = async () => {
    try {
      if (trendingBooks.length > 0) {
        return;
      }

      const url = "https://openlibrary.org/trending/weekly.json";
      console.log("Fetching trending books:", url);
      const response = await axios.get(url);
      const trendingWorks = response.data.works.slice(0, 6);
      const trendingBooksData = await Promise.all(
        trendingWorks.map(async (work) => {
          const { title, author_name, key, cover_edition_key, edition_key } =
            work;
          const coverEditionKeys = cover_edition_key ? [cover_edition_key] : [];
          if (edition_key) {
            coverEditionKeys.push(...edition_key);
          }
          const { summary, thumbnailUrl } = await fetchBookInfoFromOpenLibrary(
            key,
            coverEditionKeys,
            title,
            author_name[0]
          );
          return {
            title,
            author: author_name[0],
            key,
            summary,
            thumbnailUrl,
          };
        })
      );
      setTrendingBooks(trendingBooksData);
    } catch (error) {
      console.error("Error fetching trending books:", error);
    }
  };

  useEffect(() => {
    fetchTrendingBooks();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (trendingBooks.length > 0) {
        setDirection("slide-left");
        setTimeout(() => {
          setCurrentSlide((prevSlide) =>
            prevSlide === trendingBooks.length - 1 ? 0 : prevSlide + 1
          );
          setDirection(null);
        }, 300);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, trendingBooks]);

  const memoizedFetchTrendingBooks = useMemo(() => fetchTrendingBooks, []);

  const truncateSummary = (summary) => {
    const words = summary.split(" ");
    if (words.length > 100) {
      const truncatedWords = words.slice(0, 100);
      const truncatedSummary = truncatedWords.join(" ");
      const summaryWithEllipsis =
        truncatedSummary.replace(/(?:\r\n|\r|\n)/g, " ") + "...";
      return summaryWithEllipsis;
    }
    return summary;
  };

  const prevSlide = () => {
    if (trendingBooks.length > 0) {
      setDirection("slide-right");
      setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === 0 ? trendingBooks.length - 1 : prevSlide - 1
        );
        setDirection(null);
      }, 300);
    }
  };

  const nextSlide = () => {
    if (trendingBooks.length > 0) {
      setDirection("slide-left");
      setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === trendingBooks.length - 1 ? 0 : prevSlide + 1
        );
        setDirection(null);
      }, 300);
    }
  };

  useEffect(() => {
    const handleTransitionEnd = () => {
      setDirection(null); // Reset direction after slide animation is completed
    };

    const imageBox = imageBoxRef.current;

    if (imageBox) {
      imageBox.addEventListener("transitionend", handleTransitionEnd);
    }

    return () => {
      if (imageBox) {
        imageBox.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, []);

  return (
    <div ref={carouselContainerRef} className="carousel-container">
      {trendingBooks.length > 0 ? (
        <div
          className="carousel-content"
          onClick={() => {
            const { thumbnailUrl, key } = trendingBooks[currentSlide];
            const modifiedThumbnailUrl = thumbnailUrl.replace(
              "-L.jpg",
              "-M.jpg"
            );
            console.log("Modified Thumbnail URL:", modifiedThumbnailUrl);
            console.log("Key:", key);
            navigate("/Test", {
              state: { thumbnailUrl: modifiedThumbnailUrl, key: key },
            });
          }}
        >
          <div className="background-tint-overlay"></div>
          <div
            className="background-image-container"
            style={{
              opacity: direction ? 0 : 1, // Apply initial opacity and transition only when changing slides
              transition: "opacity 0.5s ease-in-out", // Transition effect on opacity property
            }}
          >
            <img
              src={trendingBooks[currentSlide].thumbnailUrl}
              className="background-image"
            />
          </div>
          <div className="carousel-overlay"></div>
          <div className="centered-content">
            <div className="left-section">
              <h2>{trendingBooks[currentSlide].title}</h2>
              <h4>{trendingBooks[currentSlide].author}</h4>
              <p className="book-summary">
                {truncateSummary(trendingBooks[currentSlide].summary)}
              </p>
            </div>
            <div className="right-section">
              <img
                src={trendingBooks[currentSlide].thumbnailUrl}
                alt={trendingBooks[currentSlide].title}
                className={`image-box ${
                  direction === "slide-left"
                    ? "slide-in"
                    : direction === "slide-right"
                    ? "slide-out"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        <p className="Loading">Loading trending books...</p>
      )}
      <div className="carousel-buttons">
        <div className="carousel-button carousel-prev" onClick={prevSlide}>
          <span>&lt;</span>
        </div>
        <div className="carousel-button carousel-next" onClick={nextSlide}>
          <span>&gt;</span>
        </div>
      </div>
      <div className="carousel-dots">
        {trendingBooks.map((book, index) => (
          <div
            key={index}
            className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
