import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MissionDetail = ({ astronauts, programs, setActiveTab }) => {
  const location = useLocation();
  const { mission } = location.state;
  const [selectedMission, setSelectedMission] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageUrls]);

  useEffect(() => {
    setActiveTab('Missions');
  }, [setActiveTab]);

  if (!selectedMission) {
    return <p>No mission selected</p>;
  }

  return (
    <div className="detail-container">
      <div className="detail-section">
        <h2>{selectedMission.mission}</h2>
        <img src={selectedMission.imageUrl} alt={`Mission ${selectedMission.mission}`} className="header-image" />
      </div>
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
        {selectedMission.callSign !== 'n/a' && <p><strong>Call Sign:</strong> {selectedMission.callSign}</p>}
        <p><strong>Launch Date:</strong> {selectedMission.launchDateUtc}</p>
        <p><strong>Launch Mass (lbs):</strong> {selectedMission.launchMassLbs}</p>
        <p><strong>Launch Site:</strong> {selectedMission.launchSite}</p>
        <p><strong>Launch Vehicle:</strong> {selectedMission.launchVehicle}</p>
        <p><strong>Orbits:</strong> {selectedMission.orbits}</p>
        <p><strong>Apogee (nmi):</strong> {selectedMission.apogeeNmi}</p>
        <p><strong>Perigee (nmi):</strong> {selectedMission.perigeeNmi}</p>
        {selectedMission.landingDateUtc !== 'n/a' && <p><strong>Landing Date:</strong> {selectedMission.landingDateUtc}</p>}
        {selectedMission.landingSite !== 'n/a' && <p><strong>Landing Site:</strong> {selectedMission.landingSite}</p>}
        {selectedMission.recoveryShip !== 'n/a' && <p><strong>Recovery Ship:</strong> {selectedMission.recoveryShip}</p>}
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
        <h3>Mission Slideshow</h3>
        {imageUrls.length > 0 && (
          <div className="slideshow-container">
            <img src={imageUrls[currentImageIndex]} alt={`Mission ${selectedMission.mission}`} className="slideshow-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionDetail;
