import React from 'react';

const Programs = ({ programs }) => {
  if (programs.length === 0) {
    return <p>Loading programs...</p>;
  }

  return (
    <div className="App-main">
      <div className="image-grid">
        {programs.map((program, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{program.program}</div>
            <img 
              src={program.imageUrl} 
              alt={program.program} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
                console.error(`Error loading image: ${program.imageUrl}`); 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
