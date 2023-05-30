import AboutUs from "./AboutUs"
import Bareng1 from "./Photos/bareng1.jpg"
import Bareng2 from "./Photos/bareng4.jpg"

const AboutUsPage = () => {
    return (
        <div className="about-body">
            <div className="about-banner">
            <img src={Bareng2} className="banner-image" alt="About Us" />
            <div className="banner-content">
                <div className="damar-popup">
                    <img src={Bareng1} className="popup-image" alt="Popup Image" />
                </div>
                <h1>Groupe Valentino</h1>
                <p>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                </p>
            </div>

        </div>
            <AboutUs />
        </div>
    )
}

export default AboutUsPage;