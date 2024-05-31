import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axios.get('/missions');
        setMissions(response.data.missions);
      } catch (error) {
        console.error('Error fetching missions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  if (loading) {
    return <p>Loading missions...</p>;
  }

  return (
    <div className="missions-container">
      <div className="image-grid">
        {missions.map((mission, index) => (
          <div key={index} className="image-container">
            <div className="hover-text">{mission.mission}</div>
            <img 
              src={mission.imageUrl} 
              alt={mission.mission} 
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300'; 
                console.error(`Error loading image: ${mission.imageUrl}`); 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Missions;
