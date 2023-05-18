import React from "react";
import "./footerStyles.css";

const Footer = () => {
  return (
    <div className="box">
      <div className="content">
      <h1 className="heading">
        Discover the pages that unleash your potential.
      </h1>
      <div className="logo">
        <img src="../Assets/book.gif" alt="My Logo" />
      </div>
    </div>
      <div className="container">

        <div className="column">
          <h3 className="topic">About Us</h3>
          <a href="#">Valen</a>
          <a href="#">Axel</a>
          <a href="#">Damar</a>
          <a href="#">Daniel</a>
        </div>
        <div className="column">
          <h3 className="topic">Other Genres</h3>
          <a href="#">Romance</a>
          <a href="#">Fantasy</a>
          <a href="#">Coding</a>
          <a href="#">Fiction</a>
        </div>
        <div className="column">
          <h3 className="topic">Contact Us</h3>
          <a href="#">Uttar Pradesh</a>
          <a href="#">Ahemdabad</a>
          <a href="#">Indore</a>
          <a href="#">Mumbai</a>
        </div>
        <div className="column">
          <h3 className="topic">Social Media</h3>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
          <a href="#">Youtube</a>
          
        </div>
      </div>
      <p className="copyright">
        Copyright © 2023 Open Library |
        All rights reserved
      </p>
    </div>
   
    
  );
};

export default Footer;
