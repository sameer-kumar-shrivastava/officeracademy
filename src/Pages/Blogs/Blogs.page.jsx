import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './Blogs.styles.scss';
import Spinner from "../../Components/Spinner/Spinner.component";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import firebase from '../../firebase';
import DOMPurify from 'dompurify';

const Blogs = () => {
    const user = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [blogContent, setBlogContent] = useState('');

    useEffect(() => {
        // Fetch blogs from Firestore
        const fetchBlogs = async () => {
            try {
                const snapshot = await firebase.firestore().collection('blogs').orderBy('createdAt', 'desc').get();
                const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setLoading(false);
                setBlogs(blogList);

                // if (blogList.exists) {
                //     const rawContent = blogList.data().content;
                //     const sanitizedContent = DOMPurify.sanitize(rawContent); // Sanitize the HTML content
                //     setBlogContent(sanitizedContent);
                //   } else {
                //     console.error('Blog not found');
                //   }

            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // const getShortContent = (content) => {
    //     const words = content.split(' ');
    //     const trimmedContent = words.slice(0, 50).join(' ');
    //     return trimmedContent;
    // };

    const getSanitisedShortContent = (content) => {
        const words = content.split(' ');
        const trimmedContent = words.slice(0, 50).join(' ');
        const sanitizedContent = DOMPurify.sanitize(trimmedContent); // Sanitize the HTML content
        return sanitizedContent;

    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long', // Use full month name (e.g., July)
            day: 'numeric', // Use numeric day (e.g., 20)
            year: 'numeric', // Use numeric year (e.g., 2023)
        });
    };

    return (<div className="blog-page-container">
        {
            user ?
                <div>
                    <div className="blogs-top-section">
                        <h2>BLOGS</h2>
                    </div>
                    <div className="blog-list-container">
                        {
                             (loading) ?
                             <>
                                 <Spinner />
                               
                             </>
                   
                             :
                        
                        blogs.map((blog) => (
                            <div key={blog.id} className="blog-item">
                                <Link className="blogs-link-item" to={`/blog/${blog.id}`}>
                                    <div className='blog-items-topic-container'>
                                        {blog.topic}
                                    </div>
                                    <h3 className="blog-title">{blog.title}</h3>
                                    <div className='blog-items-details-container'>
                                        <div className='blog-items-details'>{blog.author.image && <img className='single-blog-author-image' src={blog.author.image} alt={blog.author.name} />} {blog.author.name}</div>
                                        <div className='blog-items-details'><AccessTimeIcon style={{ marginRight: "10px" }} /> {blog.createdAt && formatDate(blog.createdAt.toDate())}</div>

                                        {/* <div className='singleblog-items-details'><PlayLessonIcon style={{ marginRight: "10px" }} /> {readTime} minute(s)</div> */}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: getSanitisedShortContent(blog.content) }} />
                                </Link>
                                {/* <p className="blog-published-at">Published at: {blog.createdAt && blog.createdAt.toDate().toString()}</p> */}
                                {/* <div dangerouslySetInnerHTML={{ __html: blogContent }}>...<Link to={`/blog/${blog.id}`}>Read More</Link> </div> */}
                                {/* <p className="blog-content">{getShortContent(blog.content)}...<Link to={`/blog/${blog.id}`}>Read More</Link></p> */}

                                {/* <div dangerouslySetInnerHTML={{ __html: getSanitisedShortContent(blog.content) }} /> */}

                            </div>
                        ))}
                    </div>
                </div>

                :

                <>
                    <h1>Please Login To Continue</h1>
                    <button><Link to='/login'>Login</Link></button>
                </>
        }</div>);
}

export default Blogs;