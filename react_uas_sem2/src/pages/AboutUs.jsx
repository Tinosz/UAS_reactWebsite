import React from "react";
import "./AboutUsStyle.css";
import Axel from "./Photos/axel1.jpg"
import Valen from "./Photos/valen2.jpg"
import Daniel from "./Photos/daniel2.jpg"
import Damar from "./Photos/damar1.jpg"

function AboutUs() {
  return (
    <div className="container3">
      <div className="about-banner">
        <h1>About Us</h1>
        <p>"Kerja Keras adalah Satu-satunya jalan."</p>
      </div>


      <div className="img-container3">
        <div className="img-holder3">
          <div className="about-row">
            <img
              src= {Axel}
              className="about-image"
            />
            <div className="biodesc">
              <h3>Axel</h3>
              <p>"Rumah ternyaman adalah ketika berada bersama teman."</p>
            </div>
          </div>

          <div className="about-row">
            <div className="biodesc">
              <h3>Valen</h3>
              <p>"Aku memang sechill itu bro."</p>
            </div>
            <img
              src={Valen}
              className="about-image"
            />
          </div>

          <div className="about-row">
            <img
              src={Daniel}
              className="about-image"
            />
            <div className="biodesc">
              <h3>Daniel</h3>
              <p>"Sekip aja dulu."</p>
            </div>
          </div>

          <div className="about-row">
            <div className="biodesc">
              <h3>Damar</h3>
              <p>"jika bisa dikerjakan nanti kenapa harus sekarang"</p>
            </div>
            <img
              src={Damar}
              className="about-image"
            />
          </div>

        </div>
      </div>
      <p>&copy; 2023 Valen's & Co. All rights reserved.</p>
    </div>
  );
}

export default AboutUs;