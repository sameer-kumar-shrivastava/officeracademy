import React, { useState } from 'react';
import firebase from '../../firebase';


const BlogForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      });

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setTopic('');
      setImage(null);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
