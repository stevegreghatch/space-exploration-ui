import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/programs');
        setPrograms(response.data.programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return <p>Loading programs...</p>;
  }

  return (
    <div className="App-main">
      <div className="image-grid">
        {programs.map((program, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{program.program}</div>
            <img 
              src={program.imageUrl} 
              alt={program.program} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
                console.error(`Error loading image: ${program.imageUrl}`); 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
