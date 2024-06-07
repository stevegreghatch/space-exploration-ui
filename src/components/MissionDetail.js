import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MissionDetail = ({ astronauts, programs }) => {
  const location = useLocation();
  const { mission } = location.state;
  const [selectedMission, setSelectedMission] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async (query) => {
      try {
        const response = await axios.get('/nasa/images', { params: { query } });
        setImageUrls(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    setSelectedMission(mission);
    fetchImages(mission.mission);
  }, [mission]);

  if (!selectedMission) {
    return <p>No mission selected</p>;
  }

  return (
    <div className="detail-container">
      <h2>{selectedMission.mission}</h2>
      <div className="detail-section">
        <h3>Mission Details</h3>
        <p><strong>Program: </strong> 
          {selectedMission.program ? 
            <Link to={`/programDetail/${selectedMission.program.replace(/\s+/g, '-')}`} state={{ program: programs.find(p => p.program === selectedMission.program) }}>
              {selectedMission.program}
            </Link>
            : 'N/A'
          }
        </p>
        <p><strong>Call Sign:</strong> {selectedMission.callSign}</p>
        <p><strong>Launch Date:</strong> {selectedMission.launchDateUtc}</p>
        <p><strong>Launch Mass (lbs):</strong> {selectedMission.launchMassLbs}</p>
        <p><strong>Launch Site:</strong> {selectedMission.launchSite}</p>
        <p><strong>Launch Vehicle:</strong> {selectedMission.launchVehicle}</p>
        <p><strong>Orbits:</strong> {selectedMission.orbits}</p>
        <p><strong>Apogee (nmi):</strong> {selectedMission.apogeeNmi}</p>
        <p><strong>Perigee (nmi):</strong> {selectedMission.perigeeNmi}</p>
        <p><strong>Landing Date:</strong> {selectedMission.landingDateUtc}</p>
        <p><strong>Landing Site:</strong> {selectedMission.landingSite}</p>
        <p><strong>Recovery Ship:</strong> {selectedMission.recoveryShip}</p>
        <p><strong>Duration:</strong> {`${selectedMission.duration ? selectedMission.duration.days : 0} days ${selectedMission.duration ? selectedMission.duration.hours : 0} hours ${selectedMission.duration ? selectedMission.duration.minutes : 0} minutes ${selectedMission.duration ? selectedMission.duration.seconds : 0} seconds`}</p>
        <p><strong>Astronauts: </strong> 
          {selectedMission.astronauts ? 
            selectedMission.astronauts.map((astronaut, index) => (
              <Link key={index} 
                to={`/astronautDetail/${astronaut.replace(/\s+/g, '-')}`}
                state={{ astronaut: astronauts.find(a => `${a.astronautFirstName} ${a.astronautLastName}` === astronaut) }} 
              >
                {index > 0 && ', '}{astronaut}
              </Link>
            )) 
            : 'N/A'
          }
        </p>
      </div>
      <div className="detail-section">
        <h3>Mission Images</h3>
        <div className="image-gallery">
          {imageUrls.map((url, index) => (
            <div key={index} className="image-container">
              <img src={url} alt={`Mission ${selectedMission.mission}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
