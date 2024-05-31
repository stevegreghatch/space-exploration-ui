import React from 'react';

const Astronauts = ({ mission }) => {
  return (
    <div className="astronauts-container">
      <h2>{mission.program} Astronauts</h2>
      <div className="image-grid">
        {mission.astronauts.map((astronaut, index) => (
          <div key={index} className="image-container">
            <img 
              src={astronaut.imageUrl} 
            //   alt={astronaut.name} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
              }} 
            />
            {/* <div className="hover-text">{astronaut.name}</div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Astronauts;
