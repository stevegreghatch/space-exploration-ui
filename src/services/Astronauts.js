// Astronauts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'; // Import CSS file for shared styles

const formatString = (str) => {
  return str.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const Astronauts = () => {
  const [selectedMission, setSelectedMission] = useState('');
  const [astronauts, setAstronauts] = useState([]);
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);

  // Function to fetch astronauts based on the selected mission
  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await axios.get(`/astronauts/program?program=${selectedMission}`);
        setAstronauts(response.data);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    if (selectedMission) {
      fetchAstronauts();
    }
  }, [selectedMission]);

  // Function to handle dropdown change
  const handleDropdownChange = (e) => {
    setSelectedMission(e.target.value);
    setSelectedAstronaut(null); // Reset selected astronaut when mission changes
  };

  // Function to handle click on astronaut
  const handleAstronautClick = (index) => {
    setSelectedAstronaut(astronauts[index]);
  };

  return (
    <div className="App-main shared-container">
      <h1>Astronauts</h1>
      {/* Dropdown to select mission */}
      <select value={selectedMission} onChange={handleDropdownChange} className="shared-dropdown">
        <option value="">Select Mission</option>
        <option value="MERCURY">Mercury</option>
        <option value="GEMINI">Gemini</option>
        <option value="APOLLO">Apollo</option>
      </select>
      {/* Display astronaut data */}
      <div className="image-grid">
        {astronauts.map((astronaut, index) => (
          <div key={index} className="image-container" onClick={() => handleAstronautClick(index)}>
            <img src={astronaut.imageUrl} alt={`${astronaut.firstName} ${astronaut.lastName}`} />
            <div className="astronaut-name">{`${astronaut.firstName} ${astronaut.lastName}`}</div>
          </div>
        ))}
      </div>
      {/* Display selected astronaut's data */}
      {selectedAstronaut && (
        <div className="selected-astronaut">
          <h2>{`${selectedAstronaut.firstName} ${selectedAstronaut.lastName}`}</h2>
          <p>{`Programs: ${selectedAstronaut.programs.map(formatString).join(', ')}`}</p>
          <p>{`Missions: ${selectedAstronaut.missions.map(formatString).join(', ')}`}</p>
          <img src={selectedAstronaut.imageUrl} alt={`${selectedAstronaut.firstName} ${selectedAstronaut.lastName}`} />
        </div>
      )}
    </div>
  );
};

export default Astronauts;
