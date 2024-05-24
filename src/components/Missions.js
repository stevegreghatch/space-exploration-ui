import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [selectedMission, setSelectedMission] = useState(null);

  // Function to fetch missions on page load
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get('/missions'); // Fetch all missions
        setMissions(response.data.missions); // Set the missions array from the response object
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  // Function to handle click on mission
  const handleMissionClick = (index) => {
    setSelectedMission(missions[index]);
  };

  return (
    <div className="App-main">
      <h1>Missions</h1>
      {/* Display mission data */}
      <div className="image-grid">
        {Array.isArray(missions) && missions.map((mission, index) => (
          <div key={index} className="image-container" onClick={() => handleMissionClick(index)}>
            <img src={mission.imageUrl} alt={mission.name} />
            <div className="mission-name">{mission.name}</div>
          </div>
        ))}
      </div>
      {/* Display selected mission's data */}
      {selectedMission && (
        <div className="selected-mission">
          <h2>{selectedMission.name}</h2>
          <p><strong>Astronaut:</strong> {selectedMission.astronaut}</p>
          <p><strong>Call Sign:</strong> {selectedMission.callSign}</p>
          <p><strong>Duration:</strong> {selectedMission.duration.days} days, {selectedMission.duration.hours} hours, {selectedMission.duration.minutes} minutes, {selectedMission.duration.seconds} seconds</p>
          <p><strong>Launch Site:</strong> {selectedMission.launchSite}</p>
          {/* Add more details about the selected mission here */}
          <img src={selectedMission.imageUrl} alt={selectedMission.name} />
        </div>
      )}
    </div>
  );
};

export default Missions;
