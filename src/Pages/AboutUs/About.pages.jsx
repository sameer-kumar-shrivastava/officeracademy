import React from "react";
import './AboutUs.styles.scss';

const About = () => {
    return (

        <div className="about-us-container">
            <div className="about-us-top-section">
                <h2>About US</h2>
            </div>


            <div className="about-page">
                <h2 className="about-heading">About Officer Academy</h2>
                <p className="about-description">
                    Officer Academy is a leading educational platform that aims to provide quality education
                    and guidance to aspiring civil service officers. Our mission is to empower students with
                    knowledge and skills required for cracking different competitive examinations and achieving success in
                    their career goals.
                </p>
                <p className="about-mission">
                    Our Mission:
                    <span className="mission-statement">
                        "To inspire and support students in their journey towards becoming future civil service
                        officers and leaders of our nation."
                    </span>
                </p>
                <p className="about-vision">
                    Our Vision:
                    <span className="vision-statement">
                        "To be the most trusted and preferred platform for different competitive exam preparation, known for
                        excellence, innovation, and student success."
                    </span>
                </p>
            </div>
        </div>);
}

export default About;