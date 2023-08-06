import React from 'react';
import './Loader.styles.scss'; // Add your custom CSS for styling the loader

const Loader = ({ progress }) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loader-text">Loading {progress}%</div>
    </div>
  );
};

export default Loader;
