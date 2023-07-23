import React, { useState } from 'react';
import firebase from '../../firebase';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase.firestore().collection('noticeboard').add({
        title,
        content,
        date: new Date(date), // Convert date string to a JavaScript Date object
      });

      setTitle('');
      setContent('');
      setDate('');
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <div>
      <h2>Add New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button type="submit">Add Notice</button>
      </form>
    </div>
  );
};

export default AddNotice;
