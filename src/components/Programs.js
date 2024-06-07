import React from 'react';
import { Link } from 'react-router-dom';

const Programs = ({ programs }) => {
  if (programs.length === 0) {
    return <p>Loading programs...</p>;
  }

  return (
    <div className="App-main">
      <div className="image-grid">
        {programs.map((program, index) => (
          <div key={index} className="image-container">
            <Link to={`/programDetail/${program.program.replace(/\s+/g, '-')}`} state={{ program }} className="hover-text">
              {program.program}
            </Link>
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
