import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ProgramDetail = ({ missions, setActiveTab }) => {
  const location = useLocation();
  const { program } = location.state;
  const [imagesData, setImagesData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setActiveTab('Programs');
    fetchImages(program.program);
  }, [program, setActiveTab]);

  const fetchImages = async (query) => {
    try {
      const response = await axios.get('/nasa/images', { params: { query } });
      setImagesData(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [imagesData]);

  if (!program) {
    return <p>No program found</p>;
  }

  const programMissions = missions.filter(mission => mission.program === program.program);

  const missionsByYear = {};
  programMissions.forEach(mission => {
    const year = new Date(mission.launchDateUtc).getFullYear();
    if (!missionsByYear[year]) {
      missionsByYear[year] = [];
    }
    missionsByYear[year].push(mission);
  });

  Object.keys(missionsByYear).forEach(year => {
    missionsByYear[year].sort((a, b) => new Date(a.launchDateUtc) - new Date(b.launchDateUtc));
  });

  const handleMissionClick = (mission) => {
    setActiveTab('Missions');
  };

  return (
    <div className="detail-container">
      <div className="detail-section">
        <h2>{program.program}</h2>
        <div className="image-container">
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
      </div>
      <div className="detail-section">
        <h3>Missions</h3>
        {Object.keys(missionsByYear).map(year => (
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
        <div className="slideshow-container">
          {imagesData.length > 0 && (
            <>
              <img
                src={imagesData[currentImageIndex].link}
                alt={`Program Slideshow`}
                className="slideshow-image"
              />
              <div className="slideshow-text">
                <h4>{imagesData[currentImageIndex].title}</h4>
                <p>{imagesData[currentImageIndex].description}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
