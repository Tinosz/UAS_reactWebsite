import React from "react";
import "./LandingStyle.css";
import HomePage from "./HomePage"

const Landing = () => {
  const [username, setUsername] = React.useState("");
  const [showGenreSelection, setShowGenreSelection] = React.useState(false);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [showRecommendation, setShowRecommendation] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setShowGenreSelection(true);
  };

  const handleGenreSelect = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedGenres.length >= 3) {
      setShowNotification(false);
      setShowRecommendation(true);
    } else {
      setShowNotification(true);
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <img className="landing-headbox" src="#" alt="headbox" />
      <div className="landing-container">
        <div className="landing-img">
          <img src="#" alt="Background" className="landing-page-image"/>
        </div>
        <div className="landing-login-content">
          {!showGenreSelection && (
            <form onSubmit={handleLoginSubmit}>
              <img src="#" alt="Avatar" className="landing-page-img"/>
              <h2 className="landing-title">Welcome to Book Haven</h2>
              <div className={`input-div ${username ? "focus" : ""}`}>
                <div className="landing-i">
                  <i className="landing-fas fa-user"></i>
                </div>
                <div className="landing-div">
                  <h5>Username</h5>
                  <input
                    type="text"
                    className="landing-input"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <button className="landing-btn" type="submit">
                Login
              </button>
            </form>
          )}
          {showGenreSelection && (
            <div className="landing-genre-selection">
              {showNotification && (
                <NotificationModal closeNotification={closeNotification} />
              )}
              <h2 className="landing-title">What's Your Favorite Genres</h2>
              <div className="landing-genre-buttons">
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Fiction") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Fiction")}
                >
                  Fiction
                </button>
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Non-Fiction") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Non-Fiction")}
                >
                  Non-Fiction
                </button>
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Sci-Fi") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Sci-Fi")}
                >
                  Sci-Fi
                </button>
              </div>
              <button
                className="landing-btn get-recommendation-btn"
                onClick={handleSubmit}
              >
                Get Recommendation
              </button>
            </div>
          )}
          {showRecommendation && (
            <HomePage selectedGenres={selectedGenres} />
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationModal = ({ closeNotification }) => {
  return (
    <div className="landing-notification-container">
      <div className="landing-notification-modal">
        <div className="landing-notification-content">
          <p>Mohon pilih setidaknya 3 genre</p>
          <button className="landing-close-btn" onClick={closeNotification}>
            <i className="landing-fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
