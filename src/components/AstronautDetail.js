import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const AstronautDetail = () => {
  const location = useLocation();
  const { astronaut } = location.state;
  const { astronautName } = useParams();

  // Additional state to hold the astronaut object
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);

  useEffect(() => {
    // Find the astronaut object based on the astronaut name
    const foundAstronaut = astronaut;
    setSelectedAstronaut(foundAstronaut);
  }, [astronaut, astronautName]); // Include astronautName in the dependency array

  if (!selectedAstronaut) {
    return <p>No astronaut selected</p>;
  }

  return (
    <div className="astronaut-detail">
      <h2>{`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`}</h2>
      <img src={selectedAstronaut.imageUrl} alt={`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`} className="astronaut-image" />
      <h3>Missions:</h3>
      <ul className="missions-list">
        {selectedAstronaut.missions.map((mission, index) => (
          <li key={index} className="mission-item">{mission}</li>
        ))}
      </ul>
    </div>
  );
};

export default AstronautDetail;
