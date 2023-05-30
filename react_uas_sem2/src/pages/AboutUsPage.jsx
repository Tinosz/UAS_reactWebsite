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
                    "Tidur tidak perlu, Begadang No.1 Jangan buang waktu-mu secara sukarela, tapi kalau TEKKEN dulu Boleh La"
                </p>
            </div>

        </div>
            <AboutUs />
        </div>
    )
}

export default AboutUsPage;