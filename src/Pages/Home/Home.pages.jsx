import React, { useState, useEffect } from "react";
// import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import firebase from '../../firebase';
import DOMPurify from 'dompurify';
import Loader from "../../Components/Loader/Loader.component";
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
    const [blogs, setBlogs] = useState([]);
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    

    // useEffect(() => {
    //     const fetchBlogs = async () => {
    //         try {
    //             const blogDocs = await firebase
    //                 .firestore()
    //                 .collection('blogs')
    //                 .orderBy('createdAt', 'desc') // Sort by date in descending order (latest first)
    //                 .limit(3) // Limit the results to 3
    //                 .get();

    //             const blogList = blogDocs.docs.map((doc) => doc.data());
    //             setBlogs(blogList);
    //         } catch (error) {
    //             console.error('Error fetching blogs:', error);
    //         }
    //     };

    //     fetchBlogs();
    // }, []);


    useEffect(() => {
        // Fetch blogs from Firestore
        const fetchBlogs = async () => {
            try {
              
                const snapshot = await firebase.firestore().collection('blogs').orderBy('createdAt', 'desc').limit(3).get();
                const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                // After fetching data, set the progress to 100%
                setProgress(100);
                setLoading(false); // Stop loading
                setBlogs(blogList);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const noticeDocs = await firebase
                    .firestore()
                    .collection('noticeboard')
                    .orderBy('date', 'desc') // Sort by date in descending order (latest first)
                    .limit(4) // Limit the results to 3
                    .get();

                const noticeList = noticeDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setNotices(noticeList);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchNotices();
    }, []);

    const getSanitisedShortContent = (content) => {
        const words = content.split(' ');
        const trimmedContent = words.slice(0, 50).join(' ');
        const sanitizedContent = DOMPurify.sanitize(trimmedContent); // Sanitize the HTML content
        return sanitizedContent;

    }


    return (
        <>
            <div className="home-container">
                <div className="top-section">
                    {/* Background image and other content */}
                    <h1>General Studies</h1>
                    <h2>सामान्य अध्ययन - for UPSC / BPSC, State PCS, NDA etc.</h2>
                    <h5>इतिहास से अर्थशास्त्र, भूगोल से नीतिशास्त्र, हम सब कुछ पढ़ाते हैं</h5>
                    <Link to='/courses'><button className="home-page-top-section-button">Find Your Major | अपना पाठ्यक्रम चुनें</button></Link>
                    {/* <button className="home-page-top-section-button">Find Your Major | अपना पाठ्यक्रम चुनें</button> */}
                </div>
                <div className="middle-section">
                    <div className="left-half1">
                        {/* <div className="blog-list-container-home-1"> */}
                        {/* <h2 className="blog-list-heading-home">Top 3 Events</h2> */}
                        {notices.map((notice) => (
                            <div key={notice.id} className="event-item-home">
                                <Link to='/events'><h3 className="blog-title">{notice.title}</h3></Link>

                                <p>Date: {notice.date && notice.date.toDate().toLocaleDateString()}</p>
                                {/* Add the venue information as a clickable link */}
                                <p>
                                    Venue:{" "}
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(notice.venue)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {notice.venue}
                                    </a>
                                </p>

                                {/* Other blog details */}
                            </div>
                        ))}
                        {/* </div> */}
                    </div>
                    <div className="right-half1">
                        {/* Conditionally display the Loader component based on the loading state */}
                        {loading ? <Loader progress={progress} /> : null}
                        <div className="blog-list-container-home1">
                            {/* <h2 className="blog-list-heading-home1">Top 3 Blogs</h2> */}
                            {blogs.map((blog) => (
                                <div key={blog.id} className="blog-item-home">
                                    <Link to={`/blog/${blog.id}`}>
                                        <h3 key={blog.id} className="blog-title">{blog.title}</h3>       </Link>

                                    <p>Posted on: {new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}</p>
                                    <p>By:{blog.author.name}</p>
                                    <div dangerouslySetInnerHTML={{ __html: getSanitisedShortContent(blog.content) }} />
                                    {/* <p>{getShortContent(blog.content)}...<Link to={`/blog/${blog.id}`}>Read More</Link></p> */}
                                    {/* Add a link to the full blog page */}

                                    {/* <p>{new Date(blog.createdAt.seconds*1000)}</p> */}

                                    {/* Other blog details */}
                                </div>
                            ))}
                        </div>
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
                                <li>Events</li>
                                <li>Contact Us</li>
                                {/* Add more options as needed */}
                            </ul>
                        </div>
                        <div className="footer-titles">
                            {/* Titles and options */}
                            <h2>Learn</h2>
                            <ul>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                                <li>Disclaimer</li>
                                <li>Job Opportunities</li>
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
        </>
    );
};

export default Home;
