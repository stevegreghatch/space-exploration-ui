import React, { useState } from 'react';
import './App.css';
import Astronauts from './components/Astronauts';
import Programs from './components/Programs'; 
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
        <div
          className={`tab ${activeTab === 'Programs' ? 'active' : ''}`}
          onClick={() => handleTabClick('Programs')}
        >
          Programs
        </div>
        <div
          className={`tab ${activeTab === 'Astronauts' ? 'active' : ''}`}
          onClick={() => handleTabClick('Astronauts')}
        >
          Astronauts
        </div>
      </div>
      <main>
        {activeTab === 'Programs' && <Programs />}
        {activeTab === 'Astronauts' && <Astronauts />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
