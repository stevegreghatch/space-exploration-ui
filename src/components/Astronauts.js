import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Astronauts = ({ programs, missions, astronauts }) => {
  const [filteredAstronauts, setFilteredAstronauts] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedMission, setSelectedMission] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilteredAstronauts(astronauts);
    setLoading(false);
  }, [astronauts]);

  useEffect(() => {
    setSelectedMission('');
  }, [selectedProgram]);

  useEffect(() => {
    const filterAstronauts = () => {
      let filtered = astronauts;

      if (selectedProgram) {
        const selectedProgramMissions = missions.filter(mission => mission.program === selectedProgram);
        const astronautsFromProgram = selectedProgramMissions.flatMap(mission => mission.astronauts);
        filtered = filtered.filter(astronaut => {
          const fullName = `${astronaut.astronautFirstName} ${astronaut.astronautLastName}`;
          const firstNameOnly = astronaut.astronautLastName ? fullName : astronaut.astronautFirstName;
          return astronautsFromProgram.includes(firstNameOnly);
        });
      }

      if (selectedMission) {
        const astronautsFromMission = missions
          .find(mission => mission.mission === selectedMission)
          ?.astronauts || [];
        filtered = filtered.filter(astronaut =>
          astronautsFromMission.includes(`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`)
        );
      }

      setFilteredAstronauts(filtered);
    };

    filterAstronauts();
  }, [selectedProgram, selectedMission, missions, astronauts]);

  if (loading) {
    return <p>Loading astronauts...</p>;
  }

  // Sort the missions alphabetically
  const sortedMissions = missions.slice().sort((a, b) => a.mission.localeCompare(b.mission));

  return (
    <div className="missions-container">
      <div>
        <label htmlFor="program-select">Select Program: </label>
        <select id="program-select" value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program.program}>{program.program}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="mission-select">Mission: </label>
        <select id="mission-select" value={selectedMission} onChange={(e) => setSelectedMission(e.target.value)} disabled={!selectedProgram}>
          <option value="">All Missions</option>
          {sortedMissions.filter(mission => mission.program === selectedProgram).map((mission, index) => (
            <option key={index} value={mission.mission}>{mission.mission}</option>
          ))}
        </select>
      </div>

      <div className="image-grid">
        {filteredAstronauts.map((astronaut, index) => (
          <div key={index} className="image-container">
            <Link 
              to={`/astronautDetail/${astronaut.astronautFirstName.replace(/\s+/g, '-')}${astronaut.astronautLastName ? '-' + astronaut.astronautLastName.replace(/\s+/g, '-') : ''}`} 
              state={{ astronaut }} 
              className="hover-text">
              {`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`}
            </Link>
            <img
              src={astronaut.imageUrl}
              alt={`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Astronauts;
