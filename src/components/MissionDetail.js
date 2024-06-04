import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const MissionDetail = () => {
  const location = useLocation();
  const { mission } = location.state;
  const { missionName } = useParams();

  // Additional state to hold the mission object
  const [selectedMission, setSelectedMission] = useState(null);

  useEffect(() => {
    // Find the mission object based on the mission name
    const foundMission = mission;
    setSelectedMission(foundMission);
  }, [mission, missionName]); // Include missionName in the dependency array

  if (!selectedMission) {
    return <p>No mission selected</p>;
  }

  return (
    <div className="mission-detail">
      <h2>{selectedMission.mission}</h2>
      <p><strong>Program:</strong> {selectedMission.program}</p>
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
      <p><strong>Astronauts:</strong> {selectedMission.astronauts ? selectedMission.astronauts.join(', ') : 'N/A'}</p>
    </div>
  );
};

export default MissionDetail;
