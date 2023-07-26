import React from "react";
// import { AuthContext } from "../../AuthContext";
import "./Home.styles.scss";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Facebook from './facebook.png'
import Instagram from './instagram.png'
import Linkedin from './linkedin.png'
import Twitter from './twitter.png'
import Youtube from './youtube.png'

const Home = () => {
    // const user = useContext(AuthContext);

    return (
        <>
            (
                <div className="home-container">
                    <div className="top-section">
                        {/* Background image and other content */}
                        <h1>General Studies</h1>
                        <h2>सामान्य अध्ययन - for UPSC / BPSC, State PCS, NDA etc.</h2>
                        <h5>इतिहास से अर्थशास्त्र, भूगोल से नीतिशास्त्र, हम सब कुछ पढ़ाते हैं</h5>
                        <button className="home-page-top-section-button">Find Your Major | अपना पाठ्यक्रम चुनें</button>
                    </div>
                    <div className="middle-section">
                        <div className="left-half">
                            {/* Content for the left half of the middle section */}
                            <p>Content for the left half goes here</p>
                        </div>
                        <div className="right-half">
                            {/* Content for the right half of the middle section */}
                            <p>Content for the right half goes here</p>
                        </div>
                    </div>
                    <div className="bottom-section">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    src="https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YXBwbGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                                    alt="Sliderbackground"
                                />
                                {/* <Carousel.Caption>
                  This is the caption for image 1.
                </Carousel.Caption> */}
                                <div className="carousel-overlay">
                                    <h2 className="carousel-title-text">An Apple a Day</h2>
                                    <h6 className="carousel-title-text">Actually, one practice question a day keeps exam fears away</h6>
                                    <button className="carousel-button">Learn More</button>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1674582717488-500200d86129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                                    alt="Sliderbackground2"
                                />
                                <div className="carousel-overlay"></div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1674582717488-500200d86129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
                                    alt="Sliderbackground3"
                                />
                                <div className="carousel-overlay"></div>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="footer-section">
                        <div className="footer-divider"></div>
                        <div className="footer-section-content">
                        <h2 className="footer-logo">
                        <span className="word1">Officer</span> <span className="word2">Gateway</span>
                        </h2>
                        <div className="footer-titles">
                            {/* Titles and options */}
                            <h2>Explore</h2>
                            <ul>
                                <li>About Us</li>
                                <li>Programs</li>
                                <li>Events</li>
                                <li>Campuses</li>
                                {/* Add more options as needed */}
                            </ul>
                        </div>
                        <div className="footer-titles">
                            {/* Titles and options */}
                            <h2>Learn</h2>
                            <ul>
                                <li>Legal</li>
                                <li>Privacy</li>
                                <li>Careers</li>
                                {/* Add more options as needed */}
                            </ul>
                        </div>
                        <div className="footer-social">
                            {/* Social media links */}
                            <h2>Connect with Us</h2>
                            <div className="social-links">
                                <a href="facebook_url" target="_blank" rel="noopener noreferrer">
                                    <img className="social-icon" src={Facebook} alt="Facebook" />
                                </a>
                                <a href="twitter_url" target="_blank" rel="noopener noreferrer">
                                    <img className="social-icon" src={Twitter} alt="Facebook" />
                                </a>
                                <a href="linkedin_url" target="_blank" rel="noopener noreferrer">
                                    <img className="social-icon" src={Instagram} alt="Facebook" />
                                </a>
                                <a href="youtube_url" target="_blank" rel="noopener noreferrer">
                                    <img className="social-icon" src={Youtube} alt="Facebook" />
                                </a>

                                <a href="instagram_url" target="_blank" rel="noopener noreferrer">
                                    <img className="social-icon" src={Linkedin} alt="Facebook" />
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            ) 
        </>
    );
};

export default Home;
