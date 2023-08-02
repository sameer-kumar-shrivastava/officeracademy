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

    return (<div className="blog-page-container">
        {
            user ?
                <div className="blog-list-container">
                    <h2>List of Blogs</h2>
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blog-item">
                            <Link to={`/blog/${blog.id}`}>
                            <h3 className="blog-title">{blog.title}</h3>
                            </Link>
                            <p className="blog-published-at">Published at: {blog.createdAt && blog.createdAt.toDate().toString()}</p>
                            <p className="blog-content">{blog.content}</p>
                            <p className="blog-topic">Topic: {blog.topic}</p>
                            {blog.imageUrl && <img className="blog-image" src={blog.imageUrl} alt={blog.title} />}
                        </div>
                    ))}
                </div>

                :

                <>
                    <h1>Please Login To Continue</h1>
                    <button><Link to='/login'>Login</Link></button>
                </>
        }</div>);
}

export default Blogs;