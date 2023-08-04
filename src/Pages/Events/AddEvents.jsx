import React, { useState } from 'react';
import firebase from '../../firebase';
import './AddEvents.styles.scss';

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
        <div className="add-notice-form">
            <h2 className="add-notice-heading">Add New Notice</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Venue:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">
                    Add Notice
                </button>
            </form>
        </div>
    );
};

export default AddNotice;
