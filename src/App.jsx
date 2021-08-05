import React from 'react';
import './scss/main.scss';
import GeneralSection from './components/GeneralSection';
import Contact from './components/Contact';
import InfoSection from './components/InfoSection';

const App = () => (
  <div className="paper">
    <div className="general-section">
      <GeneralSection />
      <Contact />
    </div>
    <div className="info-experience-section">
      <div className="info-section">
        <InfoSection />
      </div>
      <div className="experience-section">
        <p>gess</p>
      </div>
    </div>
  </div>
);

export default App;
