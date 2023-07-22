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

    return (<>
        {
            user ?
                <>
                    <div>
                        <h2>List of Blogs</h2>
                        {blogs.map((blog) => (
                            <div key={blog.id}>
                                <h3>{blog.title}</h3>
                                <p>Published at: {blog.createdAt && blog.createdAt.toDate().toString()}</p>
                                {/* <p>{blog.createdAt}</p> */}
                                <p>{blog.content}</p>
                                <p>Topic: {blog.topic}</p>
                                {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
                            </div>
                        ))}
                    </div>
                </>

                :

                <>
                    <h1>Please Login To Continue</h1>
                    <button><Link to='/login'>Login</Link></button>
                </>
        }</>);
}

export default Blogs;