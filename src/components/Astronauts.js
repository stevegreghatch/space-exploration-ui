import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Astronauts = () => {
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const response = await axios.get('/astronauts');
        setAstronauts(response.data.astronauts);
      } catch (error) {
        console.error('Error fetching astronauts:', error);
      } finally {
        setLoading(false);
      }
    }; 

    fetchAstronauts();
  }, []);

  if (loading) {
    return <p>Loading astronauts...</p>;
  }

  return (
    <div className="astronauts-container">
      <div className="image-grid">
        {astronauts.map((astronaut, index) => (
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
    </div>
  );
};

export default Astronauts;
