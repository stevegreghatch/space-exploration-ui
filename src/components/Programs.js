import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Programs = ({ onProgramSelect }) => {
  const [programs, setPrograms] = useState([]);
  const [loadingMissions, setLoadingMissions] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/programs');
        setPrograms(response.data.programs);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const handleImageClick = async (program) => {
    const programName = program.program;
    setLoadingMissions(true);
    try {
      const response = await axios.get(`/missions/${programName}`);
      const missions = response.data.missionsByProgram;
      const programWithMissions = { ...program, missions };
      onProgramSelect(programWithMissions); // Notify parent component
    } catch (error) {
      console.error('Error fetching missions:', error);
    } finally {
      setLoadingMissions(false);
    }
  };

  return (
    <div className="App-main">
      {loadingMissions && <p>Loading missions...</p>}
      <div className="image-grid">
        {programs.map((program, index) => (
          <div key={index} className="image-container" onClick={() => handleImageClick(program)}>
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
