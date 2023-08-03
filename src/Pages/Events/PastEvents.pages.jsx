import React, { useState, useEffect } from "react";
import './PastEvents.styles.scss';
import firebase from '../../firebase';
import { Link } from "react-router-dom";

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);


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

                setPastEvents(pastEventsData);
            } catch (error) {
                console.error('Error fetching past events:', error);
            }
        };

        fetchPastEvents();

    }, []);


    return (<>

        <div>
            <h2 className="notice-board-heading">Past Events</h2>
            {pastEvents.map((event) => (
                <div key={event.id} className="notice-item">
                    <h3 className="notice-title">{event.title}</h3>
                    <p className="notice-date">Date: {event.date && event.date.toDate().toLocaleDateString()}</p>
                    <p>{event.id}</p>
                    {/* Display other event details */}
                </div>
            ))}

            <Link to='/events'><h4>View Upcoming Events</h4></Link>
        </div>

    </>);
};


export default PastEvents;
