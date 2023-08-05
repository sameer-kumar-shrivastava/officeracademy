import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

import './SingleBlog.styles.scss';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [youMissedBlogs, setYouMissedBlogs] = useState([]);
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
        // Fetch the top 3 related blogs with the same topic as the given blog
        if (blog && blog.topic) {
            const fetchRelatedBlogs = async () => {
                const relatedBlogsSnapshot = await firebase.firestore()
                    .collection('blogs')
                    .where('topic', '==', blog.topic)
                    .limit(3)
                    .get();

                // const relatedBlogsData = relatedBlogsSnapshot.docs.map((doc) => doc.data());
                const relatedBlogsData = relatedBlogsSnapshot.docs.map((doc) => ({
                    id: doc.id, // Include the ID in the blog object
                    ...doc.data(), // Include other blog data
                }));

                // Filter out the current blog from the list of related blogs
                const filteredRelatedBlogs = relatedBlogsData.filter((relatedBlog) => relatedBlog.id !== id);


                // Set the first 3 filtered blogs as relatedBlogs
                setRelatedBlogs(filteredRelatedBlogs.slice(0, 3));
            };

            fetchRelatedBlogs();
        }
    }, [blog, id]);





    useEffect(() => {
        // Fetch the top 3 blogs based on view count (excluding the current blog) from Firestore
        const fetchYouMissedBlogs = async () => {
            try {
                const currentBlogDoc = await firebase.firestore().collection('blogs').doc(id).get();
                const currentBlogViews = currentBlogDoc.data().views;

                const youMissedBlogsSnapshot = await firebase
                    .firestore()
                    .collection('blogs')
                    .where('views', '>', currentBlogViews) // Using inequality filter
                    .orderBy('views') // Using __name__ as the first argument for orderBy()
                    .limit(3)
                    .get();

                const youMissedBlogsData = youMissedBlogsSnapshot.docs.map((doc) => ({
                    id: doc.id, // Include the ID in the blog object
                    ...doc.data(), // Include other blog data
                }));

                setYouMissedBlogs(youMissedBlogsData);
            } catch (error) {
                console.error('Error fetching "You Missed" blogs:', error);
            }
        };

        fetchYouMissedBlogs();
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
        <div className='SingleBlog-container'>
            {blog ? (
                <div className='singleblog-div-main'>

                    <div className="single-blogs-top-section">
                        {/* { if({blog.imageUrl}) */}
                            <img className="single-blog-image" src={blog.imageUrl} alt={blog.title} />
                        {/* // }  */}
                        {/* // else{ */}
                        {/* //     <img className="single-blog-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0a1txzbLfe5z9288AACnkUEB63kxa1NDow&usqp=CAU" alt="Blog Cover" />
                        // } } */}

                        {/* ({ blog.imageUrl }=={blog.imageUrl}) ? <h1>image url present</h1> : <h1>Image url absent</h1> */}
                        {/* <h1>{blog.imageUrl}</h1> */}


                    </div>
                    <div className='singleblog-div'>
                        <h2>{blog.title}</h2>
                        <p>Views: {blog.views * 1}</p>
                        <p>Read Time: {readTime} minute(s)</p>
                        {/* Display other blog details */}
                        {/* <p>{blog.content}</p> */}
                        {/* {blog.imageUrl && <img className="blog-image" src={blog.imageUrl} alt={blog.title} />} */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        <p>Date: {blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}</p>
                        <p>Topic: {blog.topic}</p>

                        {/* Display author's name and image */}
                        {blog.author && (
                            <div>
                                <p>Author: {blog.author.name}</p>
                                {blog.author.image && <img src={blog.author.image} alt={blog.author.name} />}
                            </div>
                        )}




                        {/* Display comments */}
                        <div className='singleblog-comments-section'>
                            <h3>Comments</h3>
                            {comments.map((comment) => (
                                <div className='comments' key={comment.id}>
                                    <p className='commentor-name'>{comment.name}</p>
                                    <p className='comment-content' style={{ color: "orange" }}>{comment.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* Comment form */}

                        <div className='comment-form-container'>
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
                        </div>


                        {/* Display related blogs */}
                        {relatedBlogs.length > 0 && (
                            <div className="related-blogs-container">
                                <h3>Related Blogs</h3>
                                {relatedBlogs.map((relatedBlog, index) => (

                                    <div key={index}>
                                        <Link to={`/blog/${relatedBlog.id}`}>

                                            <h4>{relatedBlog.title}</h4>

                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}



                        {/* Display "You Missed" blogs */}
                        {youMissedBlogs.length > 0 && (
                            <div className="you-missed-blogs-container">
                                <h3>You Missed</h3>
                                {youMissedBlogs.map((blog) => (
                                    <div key={blog.id}>
                                        <Link to={`/blog/${blog.id}`}>
                                            <h4>{blog.title}</h4>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </div>









            ) : (
                <p>Loading</p>
            )}
        </div>
    );
};

export default SingleBlog;