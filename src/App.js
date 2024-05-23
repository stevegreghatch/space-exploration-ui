import React, { useState } from 'react';
import './App.css';
import Astronauts from './services/Astronauts';
import Missions from './services/Missions';

function App() {
  const [activeTab, setActiveTab] = useState('Astronauts');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Space Exploration</h1>
      </header>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === 'Astronauts' ? 'active' : ''}`}
          onClick={() => handleTabClick('Astronauts')}
        >
          Astronauts
        </div>
        <div
          className={`tab ${activeTab === 'Missions' ? 'active' : ''}`}
          onClick={() => handleTabClick('Missions')}
        >
          Missions
        </div>
      </div>
      <main>
        {activeTab === 'Astronauts' && <Astronauts />}
        {activeTab === 'Missions' && <Missions />}
      </main>
      <footer>
        <p>© 2024 Space Exploration</p>
      </footer>
    </div>
  );
}

export default App;
