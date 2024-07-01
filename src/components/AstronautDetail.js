import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const AstronautDetail = ({ missions, setActiveTab }) => {
  const location = useLocation();
  const { astronaut } = location.state;
  const { astronautName } = useParams();
  const [selectedAstronaut, setSelectedAstronaut] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async (query) => {
      try {
        const response = await axios.get('/nasa/images', { params: { query } });
        setImagesData(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const foundAstronaut = astronaut;
    setSelectedAstronaut(foundAstronaut);

    const fullName = `${foundAstronaut.astronautFirstName} ${foundAstronaut.astronautLastName}`;
    fetchImages(fullName);
  }, [astronaut, astronautName]);

  useEffect(() => {
    setActiveTab('Astronauts');
  }, [setActiveTab]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [imagesData]);

  if (!selectedAstronaut) {
    return <p>No astronaut selected</p>;
  }

  const astronautMissionObjects = missions.filter((mission) => astronaut.missions.includes(mission.mission));

  const missionsByYear = {};
  astronautMissionObjects.forEach((mission) => {
    const year = new Date(mission.launchDateUtc).getFullYear();
    if (!missionsByYear[year]) {
      missionsByYear[year] = [];
    }
    missionsByYear[year].push(mission);
  });

  Object.keys(missionsByYear).forEach((year) => {
    missionsByYear[year].sort((a, b) => new Date(a.launchDateUtc) - new Date(b.launchDateUtc));
  });

  const handleMissionClick = (mission) => {
    setActiveTab('Missions');
  };

  return (
    <div className="detail-container">
      <div className="astronaut-info">
        <div className="detail-section">
          <h2>{`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`}</h2>
          <img src={selectedAstronaut.imageUrl} alt={`${selectedAstronaut.astronautFirstName} ${selectedAstronaut.astronautLastName}`} className="header-image" />
        </div>
        <div className="mission-list-container">
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
        </div>
      </div>
      <div className="detail-section">
        <h3>Slideshow</h3>
        {imagesData.length > 0 && (
          <div className="slideshow-container">
            <img src={imagesData[currentImageIndex].link} alt="Slideshow" className="slideshow-image" />
            <div className="slideshow-text">
              <h4>{imagesData[currentImageIndex].title}</h4>
              <p>{imagesData[currentImageIndex].description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AstronautDetail;
