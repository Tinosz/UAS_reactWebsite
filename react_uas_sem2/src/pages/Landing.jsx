import React, {createContext, useState, useEffect} from "react";
import "./LandingStyle.css";
import HomePage from "./HomePage"
import { useNavigate } from "react-router-dom";
import background from "./LandingPhotos/bg.svg"
import avatar from "./LandingPhotos/avatar.svg"
import spoiler from "./LandingPhotos/SPOILER_wave.png"
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import {UsernameContext} from "./UsernameContext" 

const Landing = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState()
  const [showGenreSelection, setShowGenreSelection] = React.useState(false);
  const [selectedGenres, setSelectedGenres] = React.useState([]);
  const [showRecommendation, setShowRecommendation] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSaveUsername = () => {
    localStorage.setItem("username", username);
  };

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
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

  const handleNameSubmit = async e => {
    e.preventDefault();
    const user = { username };
    // send the username and password to the server
    const response = await axios.post(
      "http://xyz/login",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('username', response.data.username)
    console.log(response.data)
  };
  

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="body">
      
      <div className="container-landing">

      <div className="img-background">
        <div className="img-spoiler">
          <img className="headbox" src={spoiler} alt="headbox" />
        </div>
        <img src={background} alt="Background" />
      </div>


        <div className="login-content">
          {!showGenreSelection && (
            <UsernameContext.Provider value={username}>
            <form className="login-form" onSubmit={handleLoginSubmit}>
              {" "}
              {/* Menambahkan class name "login-form" pada elemen form */}
              <img src={avatar} alt="Avatar" />
              <h2 className="title">Selamat Datang di BOOK HUB</h2>
              <div className={`input-div-landing ${username ? "focus" : ""}`}>
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Username</h5>
                  <input
                    type="text"
                    className="input"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>
              <button className="btn-login-landing" type="submit" onClick={handleSaveUsername}>
                Login
              </button>
            </form>
            </UsernameContext.Provider>
          )}
          {showGenreSelection && (
            <div className="genre-selection">
              {showNotification && (
                <NotificationModal closeNotification={closeNotification} />
              )}
              <h2 className="title">Pilih Genre Buku</h2>
              <div className="genre-buttons">
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
                    selectedGenres.includes("Horror") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Horror")}
                >
                  Horror
                </button>
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Fantasy") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Fantasy")}
                >
                  Fantasy
                </button>
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Romance") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Romance")}
                >
                  Romance
                </button>
                <button
                  className={`genre-button ${
                    selectedGenres.includes("Humor") ? "selected" : ""
                  }`}
                  onClick={() => handleGenreSelect("Humor")}
                >
                  Humor
                </button>
              </div>
              <button
                className="btn get-recommendation-btn"
                onClick={(event) => {
                  handleSubmit(event);
                  if (selectedGenres.length >= 3) {
                    navigate('/Home');
                  }
                }}
              >
                Get Recommendation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NotificationModal = ({ closeNotification }) => {
  return (
    <div className="notification-container">
      <div className="notification-modal">
        <div className="notification-content">
          <p>Please select at least 3 genres</p>
          <button className="close-btn" onClick={closeNotification}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
