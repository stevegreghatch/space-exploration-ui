import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  // Function to fetch programs on page load
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/programs'); // Fetch all programs
        setPrograms(response.data.programs); // Set the programs array from the response object
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div className="App-main">
      <h1>Programs</h1>
      {/* Display program data */}
      <div className="image-grid">
        {programs.map((program, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{program.program}</div>
            <img src={program.imageUrl} alt={program.program} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
