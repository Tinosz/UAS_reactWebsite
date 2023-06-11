import React from "react";
import "./styles/footerStyles.css";
import { useNavigate } from "react-router-dom";
import logo from "./styles/Assets/book.gif";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="box">
      <div className="topBox">
        <div className="centered">
          <h1 className="heading">
            “A reader lives a thousand lives before he dies . . . The man who
            never reads lives only one.”
            <br />
            <br />- George R.R Martin -
          </h1>
        </div>
        <div className="right-layer">
          <img src={logo} alt="logo" className="footer-image-box"/>
        </div>
      </div>

      <div className="container-footer">
        <div className="column">
          <h3 className="topic">About Us</h3>
          <a href="#" onClick={() => navigate("/AboutUs")}>
            Valen
          </a>
          <a href="#" onClick={() => navigate("/AboutUs")}>
            Axel
          </a>
          <a href="#" onClick={() => navigate("/AboutUs")}>
            Damar
          </a>
          <a href="#" onClick={() => navigate("/AboutUs")}>
            Daniel
          </a>
        </div>
        <div className="column">
          <h3 className="topic">Discover</h3>
          <a href="#" onClick={() => navigate("/Home")}>
            Home
          </a>
          <a
            href="#"
            onClick={() => {
              const useLink = "https://openlibrary.org/trending/daily.json";
              navigate("/GenreSearch", { state: { useLink } });
            }}
          >
            Trending
          </a>
          <a
            href="#"
            onClick={() => {
              const useLink = "https://openlibrary.org/trending/yearly.json";
              navigate("/GenreSearch", { state: { useLink } });
            }}
          >
            Popular
          </a>
          <a href="#">Nowhere</a>
        </div>
        <div className="column">
          <h3 className="topic">Other Genres</h3>
          <a href="#" onClick={() => navigate("/Search")}>
            Romance
          </a>
          <a href="#" onClick={() => navigate("/Search")}>
            Fantasy
          </a>
          <a href="#" onClick={() => navigate("/Search")}>
            Coding
          </a>
          <a href="#" onClick={() => navigate("/Search")}>
            Fiction
          </a>
        </div>
        <div className="column">
          <h3 className="topic">Social Media</h3>
          <a href="#" className="social" id="facebook">
            Facebook
          </a>
          <a href="#" className="social" id="instagram">
            Instagram
          </a>
          <a href="#" className="social" id="twitter">
            <span>Twitter</span>
          </a>
          <a href="#" className="social" id="youtube">
            Youtube
          </a>
        </div>
      </div>
      <p className="copyright">
        Copyright © 2023 BookHaven | All rights reserved
      </p>
    </div>
  );
};

export default Footer;
