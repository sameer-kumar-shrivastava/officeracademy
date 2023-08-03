// FacultyPage.js
import React,{useState,useEffect} from 'react';
import firebase from '../../firebase';
// import FacultyData from './FacultyData';
import './facultypage.styles.scss';

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
      // Fetch blogs from Firestore
      const fetchFaculty = async () => {
          try {
              const snapshot = await firebase.firestore().collection('faculties').get();
              const facultyList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
              setFaculty(facultyList);
          } catch (error) {
              console.error('Error fetching faculties:', error);
          }
      };
      // console.log(faculty);

      fetchFaculty();
  }, []);



  return (
    <div className="faculty-page">
      <h2>Faculty Members</h2>
      <div className="faculty-cards">
   
        {faculty.map((faculty) => (
          <div key={faculty.id} className="faculty-card">
             
            <img src={faculty.image} alt={"Profile"} />
            <h3>{faculty.name}</h3>
            <p>{faculty.designation}</p>
            {/* Add other details like email, phone, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyPage;
