import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../App.css';

const ProgramDetail = ({ missions }) => {
    const location = useLocation();
    const { program } = location.state;

    if (!program) {
        return <p>No program found</p>;
    }

    const programMissionsSet = new Set(program.missions);
    const programMissionObjects = missions.filter(mission => programMissionsSet.has(mission.mission));

    return (
        <div className="detail-container">
            <div className="detail-section">
                <h2>{program.program}</h2>
            </div>
            <div className="detail-section">
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
                <ul className="missions-list">
                    {programMissionObjects.map((mission, index) => (
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
        </div>
    );
};

export default ProgramDetail;
