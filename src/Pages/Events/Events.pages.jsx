import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import './Event.styles.scss';
import Spinner from '../../Components/Spinner/Spinner.component';
import { Link } from 'react-router-dom';

const NoticeBoardList = () => {
  // const [notices, setNotices] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   // Fetch notices from Firestore
  //   const fetchNotices = async () => {
  //     const snapshot = await firebase.firestore().collection('noticeboard').get();
  //     const noticeList = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(), 
  //     }));
  //     setNotices(noticeList);
  //   };

  //   fetchNotices();
  // }, []);

  useEffect(() => {
    // Fetch upcoming events based on the current date
    const fetchUpcomingEvents = async () => {
      try {
        const currentDate = new Date();

        const upcomingEventsSnapshot = await firebase
          .firestore()
          .collection('noticeboard')
          .where('date', '>=', currentDate) // Fetch events with dates greater than or equal to the current date
          .orderBy('date')
          .get();

        const upcomingEventsData = upcomingEventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLoading(false);

        setUpcomingEvents(upcomingEventsData);
      } catch (error) {
        console.error('Error fetching upcoming events:', error);
        setLoading(false);
      }
    };

    fetchUpcomingEvents();

  }, []);

  return (
    <div className="notice-board-container">
      <div className="notice-top-section">
        <h2 className="notice-board-heading">Upcoming Events</h2>
      </div>
      <div className='notices-cont'>
        <h2 className="notice-board-heading">Upcoming Events</h2>
        <Link className='past-events-link' to='/past-events'><h4>View Past Events</h4></Link>
        {
          
          (loading) ?
          <>
              <Spinner />
            
          </>

          :
          (
          
        upcomingEvents.map((event, index) => (
          <div key={event.id} className="notice-item">
            <h3 className="notice-title">{event.title}</h3>
            <p className="notice-date">Date: {event.date && event.date.toDate().toLocaleDateString()}</p>
            {/* <p>{event.id}</p> */}
            {/* Display other event details */}
          </div>
        )))
        
        }

      </div>



    </div>
  );
};

export default NoticeBoardList;
