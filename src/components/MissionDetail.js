import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import MissionMap from './MissionMap'; // eslint-disable-line

const MissionDetail = ({ astronauts, programs, setActiveTab }) => {
  const location = useLocation();
  const { mission } = location.state;
  const [selectedMission, setSelectedMission] = useState(null);
  const [imagesData, setImagesData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async (query) => {
      setLoadingImages(true);
      try {
        const response = await axios.get('/nasa/images', { params: { query } });
        setImagesData(response.data);
        setLoadingImages(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching images');
        setLoadingImages(false);
      }
    };

    if (mission) {
      setSelectedMission(mission);
      fetchImages(mission.mission);
    }
  }, [mission]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imagesData.length > 0) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [imagesData]);

  useEffect(() => {
    setActiveTab('Missions');
  }, [setActiveTab]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedMission) {
    return <p>No mission selected</p>;
  }

  const {
    mission: missionName,
    astronauts: missionAstronauts = [],
    program,
    callSign,
    imageUrl,
    launchDateUtc,
    launchMassLbs,
    launchSite,
    launchVehicle,
    duration,
    earthOrbit,
    targetOrbit,
    landingDateUtc,
    landingSite,
    recoveryShip,
  } = selectedMission;

  return (
    <div className="detail-container">
      <div className="mission-detail-container">
        <div className="mission-image">
          <h2>{missionName}</h2>
          <img src={imageUrl} alt={`Mission ${missionName}`} className="header-image" />
        </div>
        <div className="mission-details">
          <h2>Mission Details</h2>
          <p>
            <strong>Program: </strong>
            {program ? (
              <Link
                to={`/programDetail/${program.replace(/\s+/g, '-')}`}
                state={{ program: programs.find((p) => p.program === program) }}
              >
                {program}
              </Link>
            ) : (
              'N/A'
            )}
          </p>
          {callSign && callSign !== 'n/a' && <p><strong>Call Sign:</strong> {callSign}</p>}
          <p><strong>Launch Date:</strong> {launchDateUtc}</p>
          <p><strong>Launch Mass (lbs):</strong> {launchMassLbs}</p>
          <p><strong>Launch Site:</strong> {launchSite}</p>
          <p><strong>Launch Vehicle:</strong> {launchVehicle}</p>
          <div>
            <h3>Earth Orbit</h3>
            <p><strong>Orbits:</strong> {earthOrbit.orbits}</p>
            <p><strong>Apoapsis (km):</strong> {earthOrbit.apoapsisKm}</p>
            <p><strong>Periapsis (km):</strong> {earthOrbit.periapsisKm}</p>
            {earthOrbit.inclinationDeg !== 0 && <p><strong>Inclination (degrees):</strong> {earthOrbit.inclinationDeg}</p>}
            {earthOrbit.periodMin !== 0 && <p><strong>Period (minutes):</strong> {earthOrbit.periodMin}</p>}
          </div>
          <div>
            <h3>Target Orbit</h3>
            <p><strong>Orbits:</strong> {targetOrbit.orbits}</p>
            <p><strong>Apoapsis (km):</strong> {targetOrbit.apoapsisKm}</p>
            <p><strong>Periapsis (km):</strong> {targetOrbit.periapsisKm}</p>
            {targetOrbit.inclinationDeg !== 0 && <p><strong>Inclination (degrees):</strong> {targetOrbit.inclinationDeg}</p>}
            {targetOrbit.periodMin !== 0 && <p><strong>Period (minutes):</strong> {targetOrbit.periodMin}</p>}
          </div>
          {landingDateUtc && landingDateUtc !== 'n/a' && <p><strong>Landing Date:</strong> {landingDateUtc}</p>}
          {landingSite && landingSite !== 'n/a' && <p><strong>Landing Site:</strong> {landingSite}</p>}
          {recoveryShip && recoveryShip !== 'n/a' && <p><strong>Recovery Ship:</strong> {recoveryShip}</p>}
          <p><strong>Duration:</strong> {`${duration ? duration.days : 0} days ${duration ? duration.hours : 0} hours ${duration ? duration.minutes : 0} minutes ${duration ? duration.seconds : 0} seconds`}</p>
          <p><strong>Astronauts: </strong>
            {missionAstronauts.length > 0 ?
              missionAstronauts.map((astronaut, index) => (
                astronaut.toLowerCase() !== "uncrewed" ? (
                  <span key={index}>
                    {index > 0 && ', '}
                    <Link to={`/astronautDetail/${astronaut.replace(/\s+/g, '-')}`} state={{ astronaut: astronauts.find(a => `${a.astronautFirstName} ${a.astronautLastName}` === astronaut) }}>
                      {astronaut}
                    </Link>
                  </span>
                ) : (
                  <span key={index}>{astronaut}</span>
                )
              ))
              : 'N/A'
            }
          </p>
        </div>
      </div>
      <div className="detail-section">
        <h3>Slideshow</h3>
        {loadingImages ? (
          <p>Loading images...</p>
        ) : imagesData.length > 0 && (
          <div className="slideshow-container">
            <img src={imagesData[currentImageIndex].link} alt={`Mission ${missionName}`} className="slideshow-image" />
            <div className="slideshow-text">
              <h4>{imagesData[currentImageIndex].title}</h4>
              <p>{imagesData[currentImageIndex].description}</p>
            </div>
          </div>
        )}
      </div>
      {/* <div className="detail-section">
        <h3>Map</h3>
        <MissionMap mission={mission.mission} />
      </div> */}
    </div>
  );
};

export default MissionDetail;
