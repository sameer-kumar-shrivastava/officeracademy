import React, { useState } from 'react';
import './Courses.styles.scss'; // Import your custom CSS for styling

const CoursePage = () => {
  // Placeholder data for subjects and syllabus (replace this with your actual data)
  const subjects = [
    { id: 1, name: 'History' },
    { id: 2, name: 'Geography' },
    { id: 3, name: 'Polity' },
    // Add more subjects here
  ];

  const syllabusData = {
    // Placeholder syllabus data for each subject (replace this with your actual data)
    History: 'History syllabus goes here...',
    Geography: 'Geography syllabus goes here...',
    Polity: 'Polity syllabus goes here...',
    // Add more syllabus data here
  };

  const [selectedSubject, setSelectedSubject] = useState(subjects[0].name);

  const handleSubjectClick = (subjectName) => {
    setSelectedSubject(subjectName);
  };

  return (<>
    <div className="courses-top-section">
    <h2 className="pdf-list-heading">Courses</h2>
</div>
    <div className="course-page">
       
      {/* Sidebar with subject links */}
      <div className="sidebar">
        <h2>Subjects</h2>
        <ul className="subject-list">
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className={subject.name === selectedSubject ? 'active' : ''}
              onClick={() => handleSubjectClick(subject.name)}
            >
              {subject.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content section */}
      <div className="main-content">
        <h1>{selectedSubject} Syllabus</h1>
        <div className="syllabus">
          {syllabusData[selectedSubject] ? (
            <p>{syllabusData[selectedSubject]}</p>
          ) : (
            <p>No syllabus available for {selectedSubject}.</p>
          )}
        </div>

        {/* Add related professors, events, calendars, etc. here */}
      </div>
    </div></>
  );
};

export default CoursePage;
