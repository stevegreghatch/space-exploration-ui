import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

const ProgramDetail = ({ missions, setActiveTab }) => {
  const location = useLocation();
  const { program } = location.state;

  useEffect(() => {
    setActiveTab('Programs'); // Set active tab to 'Programs' when component mounts
  }, [setActiveTab]);

  if (!program) {
    return <p>No program found</p>;
  }

  // Filter missions that belong to the selected program
  const programMissions = missions.filter(mission => mission.program === program.program);

  // Group missions by year
  const missionsByYear = {};
  programMissions.forEach(mission => {
    const year = new Date(mission.launchDateUtc).getFullYear();
    if (!missionsByYear[year]) {
      missionsByYear[year] = [];
    }
    missionsByYear[year].push(mission);
  });

  // Sort missions within each year by launch date
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
    </div>
  );
};

export default ProgramDetail;
