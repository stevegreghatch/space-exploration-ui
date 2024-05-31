import React from 'react';

const Missions = ({ program, onMissionSelect }) => {
  return (
    <div className="missions-container">
      <h2>{program.program} Missions</h2>
      <div className="image-grid">
        {program.missions.map((mission, index) => (
          <div key={index} className="image-container" onClick={() => onMissionSelect(mission)}>
            <img 
              src={mission.imageUrl} 
              alt={mission.mission} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
              }} 
            />
            <div className="hover-text">{mission.mission}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
