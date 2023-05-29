import React from "react";
import "./styles/footerStyles.css";

const Footer = () => {
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
        <div className="right-layer"></div>
      </div>

      <div className="container-footer">
        <div className="column">
          <h3 className="topic">About Us</h3>
          <a href="#">Valen</a>
          <a href="#">Axel</a>
          <a href="#">Damar</a>
          <a href="#">Daniel</a>
        </div>
        <div className="column">
          <h3 className="topic">Discover</h3>
          <a href="#">Home</a>
          <a href="#">Trending</a>
          <a href="#">Authors</a>
          <a href="#">Your Wishlist</a>
        </div>
        <div className="column">
          <h3 className="topic">Other Genres</h3>
          <a href="#">Romance</a>
          <a href="#">Fantasy</a>
          <a href="#">Coding</a>
          <a href="#">Fiction</a>
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
