import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './Blogs.styles.scss';

import firebase from '../../firebase';
import DOMPurify from 'dompurify';

const Blogs = () => {
    const user = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    // const [blogContent, setBlogContent] = useState('');

    useEffect(() => {
        // Fetch blogs from Firestore
        const fetchBlogs = async () => {
            try {
                const snapshot = await firebase.firestore().collection('blogs').get();
                const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
            }
        };

        fetchBlogs();
    }, []);

    // const getShortContent = (content) => {
    //     const words = content.split(' ');
    //     const trimmedContent = words.slice(0, 50).join(' ');
    //     return trimmedContent;
    // };

    const getSanitisedShortContent = (content) =>
    {
        const words = content.split(' ');
        const trimmedContent = words.slice(0, 50).join(' ');
        const sanitizedContent = DOMPurify.sanitize(trimmedContent); // Sanitize the HTML content
        return sanitizedContent;

    }

    return (<div className="blog-page-container">
        {
            user ?
                <div>
                    <div className="blogs-top-section">
                        <h2>List of Blogs</h2>
                    </div>
                    <div className="blog-list-container">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="blog-item">
                                <Link to={`/blog/${blog.id}`}>
                                    <h3 className="blog-title">{blog.title}</h3>
                                </Link>
                                <p className="blog-published-at">Published at: {blog.createdAt && blog.createdAt.toDate().toString()}</p>
                                {/* <div dangerouslySetInnerHTML={{ __html: blogContent }}>...<Link to={`/blog/${blog.id}`}>Read More</Link> </div> */}
                                {/* <p className="blog-content">{getShortContent(blog.content)}...<Link to={`/blog/${blog.id}`}>Read More</Link></p> */}
                                
                                <div dangerouslySetInnerHTML={{ __html: getSanitisedShortContent(blog.content) }} />
                                <p className="blog-topic">Topic: {blog.topic}</p>
                                
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