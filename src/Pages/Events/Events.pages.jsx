import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import './Event.styles.scss';

const NoticeBoardList = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Fetch notices from Firestore
    const fetchNotices = async () => {
      const snapshot = await firebase.firestore().collection('noticeboard').get();
      const noticeList = snapshot.docs.map((doc) => doc.data());
      setNotices(noticeList);
    };

    fetchNotices();
  }, []);

  return (
    <div className="notice-board-container">
    <h2 className="notice-board-heading">Notice Board</h2>
    {notices.map((notice) => (
      <div key={notice.id} className="notice-item">
        <h3 className="notice-title">{notice.title}</h3>
        <p className="notice-content">{notice.content}</p>
        <p className="notice-date">Date: {notice.date && notice.date.toDate().toLocaleDateString()}</p>
      </div>
    ))}
  </div>
  );
};

export default NoticeBoardList;
