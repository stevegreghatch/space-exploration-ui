import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Astronauts = () => {
  const [programs, setPrograms] = useState([]);
  const [missions, setMissions] = useState([]);
  const [allAstronauts, setAllAstronauts] = useState([]);
  const [filteredAstronauts, setFilteredAstronauts] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedMission, setSelectedMission] = useState('');
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingMissions, setLoadingMissions] = useState(false);
  const [loadingAstronauts, setLoadingAstronauts] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const programsResponse = await axios.get('/programs');
        setPrograms(programsResponse.data.programs);

        const missionsResponse = await axios.get('/missions');
        setMissions(missionsResponse.data.missions);

        const astronautsResponse = await axios.get('/astronauts');
        setAllAstronauts(astronautsResponse.data.astronauts);
        setFilteredAstronauts(astronautsResponse.data.astronauts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingPrograms(false);
        setLoadingMissions(false);
        setLoadingAstronauts(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedMission('');
  }, [selectedProgram]);

  useEffect(() => {
    const filterAstronauts = () => {
      let filteredAstronauts = allAstronauts;

      if (selectedProgram) {
        const selectedProgramMissions = missions.filter(mission => mission.program === selectedProgram);
        const astronautsFromProgram = selectedProgramMissions.flatMap(mission => mission.astronauts);
        filteredAstronauts = filteredAstronauts.filter(astronaut =>
          astronautsFromProgram.includes(`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`)
        );
      }

      if (selectedMission) {
        const astronautsFromMission = missions
          .find(mission => mission.mission === selectedMission)
          ?.astronauts || [];
        filteredAstronauts = filteredAstronauts.filter(astronaut =>
          astronautsFromMission.includes(`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`)
        );
      }

      setFilteredAstronauts(filteredAstronauts);
    };

    filterAstronauts();
  }, [selectedProgram, selectedMission, missions, allAstronauts]);

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
        <label htmlFor="mission-select">Select Mission: </label>
        <select id="mission-select" value={selectedMission} onChange={(e) => setSelectedMission(e.target.value)} disabled={!selectedProgram}>
          <option value="">All Missions</option>
          {missions.filter(mission => mission.program === selectedProgram).map((mission, index) => (
            <option key={index} value={mission.mission}>{mission.mission}</option>
          ))}
        </select>
      </div>

      {loadingAstronauts ? (
        <p>Loading astronauts...</p>
      ) : (
        <div className="image-grid">
          {filteredAstronauts.map((astronaut, index) => (
            <div key={index} className="image-container">
              <div className="hover-text">{`${astronaut.astronautFirstName} ${astronaut.astronautLastName}`}</div>
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
      )}
    </div>
  );
};

export default Astronauts;
