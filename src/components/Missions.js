import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Missions = ({ missions, programs }) => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [filter, setFilter] = useState('');
  const [sortedMissions, setSortedMissions] = useState([]);

  useEffect(() => {
    const sorted = [...missions].sort((a, b) => new Date(a.launchDateUtc) - new Date(b.launchDateUtc));
    setSortedMissions(sorted);
  }, [missions]);

  const handleProgramChange = (event) => {
    setSelectedProgram(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMissions = sortedMissions.filter((mission) => {
    if (filter === 'crewed') {
      return !mission.astronauts.includes('uncrewed');
    } else if (filter === 'uncrewed') {
      return mission.astronauts.includes('uncrewed');
    } else {
      return true;
    }
  });

  const displayedMissions = selectedProgram
    ? filteredMissions.filter((mission) => mission.program === selectedProgram)
    : filteredMissions;

  return (
    <div className="missions-container">
      <div>
        <label htmlFor="program-select">Program: </label>
        <select id="program-select" value={selectedProgram} onChange={handleProgramChange}>
          <option value="">All Programs</option>
          {programs.map((program, index) => (
            <option key={index} value={program.program}>
              {program.program}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="crew-type-select">Crew Type: </label>
        <select id="crew-type-select" value={filter} onChange={handleFilterChange}>
          <option value="">All Crew Types</option>
          <option value="crewed">Crewed</option>
          <option value="uncrewed">Uncrewed</option>
        </select>
      </div>
      <div className="image-grid">
        {displayedMissions.map((mission, index) => (
          <div key={index} className="image-container">
            <Link to={`/missionDetail/${mission.mission.replace(/\s+/g, '-')}`} state={{ mission }} className="hover-text">
              {mission.mission}
            </Link>
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
