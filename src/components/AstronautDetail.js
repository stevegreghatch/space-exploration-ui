import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AstronautDetail = ({ missions }) => {
  const location = useLocation();
  const { astronaut } = location.state;
  const { astronautName } = useParams();

  // Additional state to hold the astronaut object and image URLs
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [missionsSet, setMissionsSet] = useState(new Set());

  useEffect(() => {
    const fetchImages = async (query) => {
      try {
        // You may need to adjust this API endpoint and parameters based on your backend setup
        const response = await axios.get('/nasa/images', { params: { query } });
        setImageUrls(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    // Find the astronaut object based on the astronaut name
    const foundAstronaut = astronaut;
    setSelectedAstronaut(foundAstronaut);
    
    // Convert astronaut's missions to a Set for faster lookup
    const astronautMissionsSet = new Set(foundAstronaut.missions);

    // Set the missions Set for filtering
    setMissionsSet(astronautMissionsSet);
    
    // Concatenate first name and last name and fetch images
    const fullName = `${foundAstronaut.astronautFirstName} ${foundAstronaut.astronautLastName}`;
    fetchImages(fullName);
  }, [astronaut, astronautName]); // Include astronautName in the dependency array

  if (!selectedAstronaut) {
    return <p>No astronaut selected</p>;
  }

  // Filter missions based on whether their mission names are in the astronaut's missions Set
  const astronautMissionObjects = missions.filter(mission => missionsSet.has(mission.mission));

  return (
    <div className="detail-container">
      <div className="detail-section">
        <h2>{`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`}</h2>
        <img src={selectedAstronaut.imageUrl} alt={`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`} className="astronaut-image" />
      </div>
      <div className="detail-section">
        <h3>Missions</h3>
        <ul className="missions-list">
          {astronautMissionObjects.map((mission, index) => (
            <li key={index} className="mission-item">
              <Link
                to={`/missionDetail/${mission.mission.replace(/\s+/g, '-')}`}
                state={{ mission }}
              >
                {mission.mission}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="detail-section">
        <h3>Images</h3>
        <div className="image-gallery">
          {imageUrls.map((url, index) => (
            <div key={index} className="image-container">
              <img src={url} alt={`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AstronautDetail;
