import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');

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

  useEffect(() => {
    const fetchMissions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(selectedProgram ? `/missions/${selectedProgram}` : '/missions');
        setMissions(response.data.missions || response.data.missionsByProgram);
      } catch (error) {
        console.error('Error fetching missions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, [selectedProgram]);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  if (loading) {
    return <p>Loading missions...</p>;
  }

  return (
    <div className="missions-container">
      <div>
        <label htmlFor="program-select">Select Program: </label>
        <select id="program-select" value={selectedProgram} onChange={handleProgramChange}>
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program.program}>{program.program}</option>
          ))}
        </select>
      </div>
      <div className="image-grid">
        {missions.map((mission, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{mission.mission}</div>
            <img 
              src={mission.imageUrl} 
              alt={mission.mission} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
                console.error(`Error loading image: ${mission.imageUrl}`); 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
