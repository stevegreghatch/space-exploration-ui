import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Missions = () => {
  const [programs, setPrograms] = useState([]);
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [crewType, setCrewType] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programsResponse = await axios.get('/programs');
        setPrograms(programsResponse.data.programs);

        const missionsResponse = await axios.get('/missions');
        setMissions(missionsResponse.data.missions);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleCrewTypeChange = (event) => {
    setCrewType(event.target.value);
  };

  const filterMissions = () => {
    return missions
      .filter((mission) => {
        if (selectedProgram && mission.program !== selectedProgram) {
          return false;
        }

        if (crewType === 'Crewed' && mission.astronauts.includes('uncrewed')) {
          return false;
        }

        if (crewType === 'Uncrewed' && !mission.astronauts.includes('uncrewed')) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(a.launchDateUtc) - new Date(b.launchDateUtc));
  };

  if (loading) {
    return <p>Loading missions...</p>;
  }

  return (
    <div className="missions-container">
      <div>
        <label htmlFor="program-select">Program: </label>
        <select id="program-select" className="select-dropdown" value={selectedProgram} onChange={handleProgramChange}>
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program.program}>{program.program}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="crew-type-select">Crew Type: </label>
        <select id="crew-type-select" className="select-dropdown" value={crewType} onChange={handleCrewTypeChange}>
          <option value="All">All Missions</option>
          <option value="Crewed">Crewed Missions</option>
          <option value="Uncrewed">Uncrewed Missions</option>
        </select>
      </div>
      <div className="image-grid">
        {filterMissions().map((mission, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{mission.mission}</div>
            <img 
              src={mission.imageUrl} 
              alt={mission.mission} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
                console.error(`Error loading image for mission: ${mission.mission}`); 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
