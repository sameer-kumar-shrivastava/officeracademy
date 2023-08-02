import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../firebase';

import './SingleBlog.styles.scss';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [readTime, setReadTime] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogDoc = await firebase.firestore().collection('blogs').doc(id).get();
                if (blogDoc.exists) {
                    setBlog(blogDoc.data());

                    // Calculate read time
                    const wordCount = blogDoc.data().content.split(' ').length;
                    const averageWPM = 200; // Assume an average reading speed of 200 words per minute
                    const estimatedReadTime = Math.ceil(wordCount / averageWPM);
                    setReadTime(estimatedReadTime);

                    // Increment views count
                    firebase.firestore().collection('blogs').doc(id).update({
                        views: firebase.firestore.FieldValue.increment(1),
                    });

                } else {
                    console.error('Blog not found');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);


    useEffect(() => {
        // Fetch comments for the current blog from Firestore
        const fetchComments = async () => {
            const commentsSnapshot = await firebase
                .firestore()
                .collection('comments')
                .where('id', '==', id)
                .orderBy('timestamp', 'desc')
                .get();
            const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
            setComments(commentsData);
        };

        fetchComments();
    }, [id]);


    useEffect(() => {
        // Check if user is signed in
        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);



    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        // Get the commenter's name and email
        const commenterName = user ? user.displayName : userName;
        const commenterEmail = user ? user.email : userEmail;

        // Add the comment to Firestore
        await firebase.firestore().collection('comments').add({
            id,
            name: commenterName,
            email: commenterEmail,
            content: commentContent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // Clear the comment content field after submission
        setCommentContent('');
    };




    return (
        <div className='SingleBlog'>
            {blog ? (
                <div>
                    <h2>{blog.title}</h2>
                    <p>Views: {blog.views * 1}</p>
                    <p>Read Time: {readTime} minute(s)</p>
                    {/* Display other blog details */}
                    <p>{blog.content}</p>
                    <p>Date: {blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}</p>
                    <p>Topic: {blog.topic}</p>

                    {/* Display author's name and image */}
                    {blog.author && (
                        <div>
                            <p>Author: {blog.author.name}</p>
                            {blog.author.image && <img src={blog.author.image} alt={blog.author.name} />}
                        </div>
                    )}



                    {/* Comment form */}

                    <>
                        <form onSubmit={handleCommentSubmit}>
                            <div>
                                <label>Name:</label>
                                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            <div>
                                <label>Comment:</label>
                                <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                            </div>
                            <button type="submit">Submit Comment</button>
                        </form>
                    </>


                    {/* Display comments */}
                    <h3>Comments</h3>
                    {comments.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.name}</p>
                            <p>{comment.content}</p>
                        </div>
                    ))}

                </div>









            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};

export default SingleBlog;