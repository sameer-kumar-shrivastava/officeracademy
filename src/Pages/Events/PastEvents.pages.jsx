import React, { useState, useEffect } from "react";
import './PastEvents.styles.scss';
import firebase from '../../firebase';
import Spinner from "../../Components/Spinner/Spinner.component";
import { Link } from "react-router-dom";

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        // Fetch upcoming events based on the current date
        const fetchPastEvents = async () => {
            try {
                const currentDate = new Date();

                const pastEventsSnapshot = await firebase
                    .firestore()
                    .collection('noticeboard')
                    .where('date', '<', currentDate) // Fetch events with dates greater than or equal to the current date
                    .orderBy('date')
                    .get();

                const pastEventsData = pastEventsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                    setLoading(false);
                setPastEvents(pastEventsData);
            } catch (error) {
                console.error('Error fetching past events:', error);
                setLoading(false);
            }
        };

        fetchPastEvents();

    }, []);


    return (<>

        <div>
        <div className="notice-top-section">
            <h2 className="notice-board-heading">Past Events</h2>
        </div>
        <div className='notices-cont'>
            <h2 className="notice-board-heading">Past Events</h2>
            <Link className="upcoming-events-link" to='/events'><h4>View Upcoming Events</h4></Link>
            {
             
          
                (loading) ?
                <>
                    <Spinner />
                  
                </>
      
                :
            pastEvents.map((event) => (
                <div key={event.id} className="notice-item">
                    <h3 className="notice-title">{event.title}</h3>
                    <p className="notice-date">Date: {event.date && event.date.toDate().toLocaleDateString()}</p>
                    <p>{event.id}</p>
                    {/* Display other event details */}
                </div>
            ))}
            </div>

         
        </div>

    </>);
};


export default PastEvents;
