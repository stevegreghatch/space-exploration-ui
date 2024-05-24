import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formatString = (str) => {
  return str.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const Astronauts = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);

  // Function to fetch all astronauts on page load
  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await axios.get('/astronauts'); // Fetch all astronauts
        setAstronauts(response.data.astronauts); // Set the astronauts array from the response object
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      }
    };

    fetchAstronauts();
  }, []);

  // Function to handle click on astronaut
  const handleAstronautClick = (index) => {
    setSelectedAstronaut(astronauts[index]);
  };

  return (
    <div className="App-main">
      <h1>Astronauts</h1>
      {/* Display astronaut data */}
      <div className="image-grid">
        {Array.isArray(astronauts) && astronauts.map((astronaut, index) => (
          <div key={index} className="image-container" onClick={() => handleAstronautClick(index)}>
            <div className="hover-text">{`${astronaut.firstName} ${astronaut.lastName}`}</div>
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
