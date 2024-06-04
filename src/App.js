import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Programs from './components/Programs';
import Missions from './components/Missions';
import Astronauts from './components/Astronauts';
import Footer from './components/Footer';
import MissionDetail from './components/MissionDetail';
import AstronautDetail from './components/AstronautDetail'; // Import AstronautDetail component

function App() {
  const [activeTab, setActiveTab] = useState('Programs');
  const [missions, setMissions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [astronauts, setAstronauts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [programsResponse, missionsResponse, astronautsResponse] = await Promise.all([
          axios.get('/programs'),
          axios.get('/missions'),
          axios.get('/astronauts')
        ]);
        setPrograms(programsResponse.data.programs);
        setMissions(missionsResponse.data.missions);
        setAstronauts(astronautsResponse.data.astronauts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Space Exploration</h1>
        </header>
        <div className="tab-container">
          <Link to="/" className={`tab ${activeTab === 'Programs' ? 'active' : ''}`} onClick={() => handleTabClick('Programs')}>
            Programs
          </Link>
          <Link to="/missions" className={`tab ${activeTab === 'Missions' ? 'active' : ''}`} onClick={() => handleTabClick('Missions')}>
            Missions
          </Link>
          <Link to="/astronauts" className={`tab ${activeTab === 'Astronauts' ? 'active' : ''}`} onClick={() => handleTabClick('Astronauts')}>
            Astronauts
          </Link>
        </div>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Programs programs={programs} />} />
            <Route path="/missions" element={<Missions missions={missions} programs={programs} />} />
            <Route path="/astronauts" element={<Astronauts programs={programs} missions={missions} astronauts={astronauts} />} />
            <Route path="/missionDetail/:missionName" element={<MissionDetail missions={missions} />} />
            <Route path="/astronautDetail/:astronautName" element={<AstronautDetail />} /> {/* Use astronaut's name in the route path */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
