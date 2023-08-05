import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';

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
                        {blog.imageUrl ? (
                            <img className="single-blog-image" src={blog.imageUrl} alt={blog.title} />
                        ) : (
                            <img className="single-blog-image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ0a1txzbLfe5z9288AACnkUEB63kxa1NDow&usqp=CAU" alt="Default Image" />
                        )}
                        <div className='blog-all-container'>
                            
                            <h2 className="blog-title">{blog.title}</h2>
                            
                            <div className='singleblog-items-details-container'>
                                <div className='singleblog-items-details'><VisibilityIcon style={{ marginRight: "10px" }} /> {blog.views * 1}</div>
                                <div className='singleblog-items-details'>{blog.author.image && <img className='single-blog-author-image' src={blog.author.image} alt={blog.author.name} />} By {blog.author.name}</div>
                                <div className='singleblog-items-details'><AccessTimeIcon style={{ marginRight: "10px" }} /> {blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}</div>
                                <div className='singleblog-items-details'><PlayLessonIcon style={{ marginRight: "10px" }} /> {readTime} minute(s)</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='singleblog-div'>
                        {/* <h2>{blog.title}</h2> */}

                        {/* <p>Views: {blog.views * 1}</p> */}
                        {/* <p>Read Time: {readTime} minute(s)</p> */}
                        {/* Display other blog details */}
                        {/* <p>{blog.content}</p> */}
                        {/* {blog.imageUrl && <img className="blog-image" src={blog.imageUrl} alt={blog.title} />} */}
                        <div className='singleblog-items-topic-container'>
                                {blog.topic}
                            </div>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        {/* <p>Date: {blog.createdAt && blog.createdAt.toDate().toLocaleDateString()}</p> */}
                        {/* <p>Topic: {blog.topic}</p> */}

                        {/* Display author's name and image
                        {blog.author && (
                            <div>
                                <p>Author: {blog.author.name}</p>
                                {blog.author.image && <img src={blog.author.image} alt={blog.author.name} />}
                            </div>
                        )} */}




                        {/* Display comments */}
                        {/* <div className='singleblog-comments-section'>
                            <h3>Comments</h3>
                            {comments.map((comment) => (
                                <div className='comments' key={comment.id}>
                                    <p className='commentor-name'>{comment.name}</p>
                                    <p className='comment-content' style={{ color: "orange" }}>{comment.content}</p>
                                </div>
                            ))}
                        </div> */}



                        <div className="singleblog-comments-section comment-block">
                            <h3>Comments</h3>
                            {comments.map((comment) => (
                                <div className='comments' key={comment.id}>
                                    <img
                                        className="comment-image"
                                        src="https://avatars0.githubusercontent.com/u/12679778?v=4&s=90"
                                        alt=""
                                    />
                                    <div className="comment-dialog">
                                        <h4 className="username">{comment.name}</h4>
                                        <p className="text">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Comment form */}

                        {/* <div className='comment-form-container'>
                            <form onSubmit={handleCommentSubmit}>
                                <div className='comment-form-input-label-container'>
                                    <label>Name:</label>
                                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className='comment-form-input-label-container'>
                                    <label>Email:</label>
                                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                </div>
                                <div className='comment-form-input-label-container'>
                                    <label>Comment:</label>
                                    <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} />
                                </div>
                                <button type="submit">Submit Comment</button>
                            </form>
                        </div> */}



                        {/* <div class="single-blog-comment-box-container h-screen bg-gray-800 justify-center items-center"> */}
                        <div class="comment-form-container single-blog-comment-box bg-white p-2 pt-4 rounded shadow-lg">
                            <form onSubmit={handleCommentSubmit}>
                                <div class="single-blog-comment-box-container mx-3">
                                    <div class="mr-3">
                                        <img src="http://picsum.photos/50" alt="" class="rounded-full" />
                                    </div>
                                    <div>
                                        <h1 class="font-semibold">{user.displayName}</h1>
                                        <p class="text-xs text-gray-500">2 seconds ago</p>
                                    </div>
                                </div>

                                <div class="p-3 w-full">
                                    <textarea rows="3" class="single-blog-textarea border p-2 rounded w-full" placeholder="Write something..." value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                                </div>

                                <div class="comment-button-submit-div mx-3">
                                    <button class="px-4 py-1 bg-gray-800 text-white rounded font-light hover:bg-gray-700 comment-button-submit">Submit</button>
                                </div>
                            </form>

                        </div>

                        {/* </div> */}



                        {/* Display related blogs */}
                        {relatedBlogs.length > 0 && (
                            <div className="related-blogs-container">
                                <h3>Related Blogs</h3>
                                <div className='related-blogs'>
                                    {relatedBlogs.map((relatedBlog, index) => (
                                        <div className='each-related-blog' key={index}>
                                            <Link to={`/blog/${relatedBlog.id}`}>
                                                <div className="related-blog-container">
                                                    {relatedBlog.imageUrl && <img className="related-blog-image" src={relatedBlog.imageUrl} alt={relatedBlog.title} />}

                                                    <h4 className="related-blog-title"><div className='relatedblog-items-topic-container'>
                                                        {relatedBlog.topic}
                                                    </div>{relatedBlog.title}</h4>
                                                    {/* <div className='related-blog-other-details'>
                                                    <h4 className="related-blog-author">{relatedBlog.author.image && <img className='single-blog-author-image' src={relatedBlog.author.image} alt={relatedBlog.author.name} />} {relatedBlog.author.name}</h4>
                                                    <h4 className="related-blog-created-time"><AccessTimeIcon style={{ marginRight: "2px" }} /> {relatedBlog.createdAt && relatedBlog.createdAt.toDate().toLocaleDateString()}</h4>
                                                    </div> */}
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}



                        {/* Display "You Missed" blogs */}
                        {youMissedBlogs.length > 0 && (
                            <div className="related-blogs-container">
                                <h3>You Missed</h3>
                                <div className='related-blogs'>
                                    {youMissedBlogs.map((blog) => (
                                        <div className='each-related-blog' key={blog.id}>
                                            <Link to={`/blog/${blog.id}`}>
                                                <div className="related-blog-container">
                                                    {blog.imageUrl && <img className="related-blog-image" src={blog.imageUrl} alt={blog.title} />}

                                                    <h4 className="related-blog-title"><div className='relatedblog-items-topic-container'>
                                                        {blog.topic}
                                                    </div>{blog.title}</h4>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
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