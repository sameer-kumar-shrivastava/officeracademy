import React, { useState } from 'react';
import firebase from '../../firebase';
import './AddBlogs.styles.scss';


const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [topic, setTopic] = useState('');
    const [image, setImage] = useState(null);

    const user = firebase.auth().currentUser;



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user) {
            try {
                // Upload image to Firebase Storage if an image is selected
                let imageUrl = null;
                if (image) {
                    const storageRef = firebase.storage().ref();
                    const imageRef = storageRef.child(`blog-images/${image.name}`);
                    await imageRef.put(image);
                    imageUrl = await imageRef.getDownloadURL();
                }

                // Add the blog data to Firestore
                await firebase.firestore().collection('blogs').add({
                    title,
                    content,
                    topic,
                    imageUrl,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    author: {
                        userId: user.uid,
                        name: user.displayName,
                        image: user.photoURL,
                    },

             
                });

                // Clear form fields after successful submission
                setTitle('');
                setContent('');
                setTopic('');
                setImage(null);
            } catch (error) {
                console.error('Error adding blog:', error);
            }
        }
        else {
            console.log('User not logged in.');
        }
    };

    return (
        <div className="add-blog-form">
            <h2 className="add-blog-heading">Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="form-textarea"
                />
                <input
                    type="text"
                    placeholder="Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-input"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="form-file-input"
                />
                <button type="submit" className="form-button">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
