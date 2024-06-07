import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AstronautDetail = ({ missions, setActiveTab }) => {
  const location = useLocation();
  const { astronaut } = location.state;
  const { astronautName } = useParams();

  // Additional state to hold the astronaut object and image URLs
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    // Concatenate first name and last name and fetch images
    const fullName = `${foundAstronaut.astronautFirstName} ${foundAstronaut.astronautLastName}`;
    fetchImages(fullName);
  }, [astronaut, astronautName]); // Include astronautName in the dependency array

  useEffect(() => {
    setActiveTab('Astronauts'); // Set active tab to 'Astronauts' when component mounts
  }, [setActiveTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imageUrls]);

  if (!selectedAstronaut) {
    return <p>No astronaut selected</p>;
  }

  // Filter missions based on whether they are in the astronaut's missions list
  const astronautMissionObjects = missions.filter((mission) => astronaut.missions.includes(mission.mission));

  // Group missions by year
  const missionsByYear = {};
  astronautMissionObjects.forEach((mission) => {
    const year = new Date(mission.launchDateUtc).getFullYear();
    if (!missionsByYear[year]) {
      missionsByYear[year] = [];
    }
    missionsByYear[year].push(mission);
  });

  // Sort missions within each year by launch date
  Object.keys(missionsByYear).forEach((year) => {
    missionsByYear[year].sort((a, b) => new Date(a.launchDateUtc) - new Date(b.launchDateUtc));
  });

  const handleMissionClick = (mission) => {
    setActiveTab('Missions');
  };

  return (
    <div className="detail-container">
      <div className="detail-section">
        <h2>{`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`}</h2>
        <img src={selectedAstronaut.imageUrl} alt={`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`} className="header-image" />
      </div>
      <div className="detail-section">
        <h3>Missions</h3>
        {Object.keys(missionsByYear).map((year) => (
          <div key={year} className="mission-year">
            <h4>{year}</h4>
            <div className="mission-list">
              {missionsByYear[year].map((mission, index) => (
                <Link
                  key={index}
                  to={`/missionDetail/${mission.mission.replace(/\s+/g, '-')}`}
                  state={{ mission }}
                  className="mission-item"
                  onClick={() => handleMissionClick(mission)}
                >
                  {mission.mission}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="detail-section">
        <h3>Slideshow</h3>
        {imageUrls.length > 0 && (
          <div className="slideshow-container">
            <img src={imageUrls[currentImageIndex]} alt="Slideshow" className="slideshow-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AstronautDetail;
