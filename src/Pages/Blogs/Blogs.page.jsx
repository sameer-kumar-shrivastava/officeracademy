import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import './Blogs.styles.scss';

import firebase from '../../firebase';

const Blogs = () => {
    const user = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Fetch blogs from Firestore
        const fetchBlogs = async () => {
            try {
                const snapshot = await firebase.firestore().collection('blogs').get();
                const blogList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogList);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const getShortContent = (content) => {
        const words = content.split(' ');
        const trimmedContent = words.slice(0, 50).join(' ');
        return trimmedContent;
    };

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
                                <p className="blog-content">{getShortContent(blog.content)}...<Link to={`/blog/${blog.id}`}>Read More</Link></p>
                                <p className="blog-topic">Topic: {blog.topic}</p>
                                {blog.imageUrl && <img className="blog-image" src={blog.imageUrl} alt={blog.title} />}
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