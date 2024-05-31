import React, { useState } from 'react';
import './App.css';
import Programs from './components/Programs';
import Missions from './components/Missions';
import Astronauts from './components/Astronauts';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('Programs');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Space Exploration</h1>
      </header>
      <div className="tab-container">
        <button
          className={`tab ${activeTab === 'Programs' ? 'active' : ''}`}
          onClick={() => handleTabClick('Programs')}
        >
          Programs
        </button>
        <button
          className={`tab ${activeTab === 'Missions' ? 'active' : ''}`}
          onClick={() => handleTabClick('Missions')}
        >
          Missions
        </button>
        <button
          className={`tab ${activeTab === 'Astronauts' ? 'active' : ''}`}
          onClick={() => handleTabClick('Astronauts')}
        >
          Astronauts
        </button>
      </div>
      <main className="App-main">
        {activeTab === 'Programs' && <Programs />}
        {activeTab === 'Missions' && <Missions />}
        {activeTab === 'Astronauts' && <Astronauts />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
