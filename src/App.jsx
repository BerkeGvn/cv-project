import React, { useRef } from 'react';
import './scss/main.scss';
import ReactToPrint from 'react-to-print';
import GeneralSection from './components/GeneralSection';
import Contact from './components/Contact';
import Experience from './components/ExperienceSection';
import InfoSection from './components/InfoSection';
import Skills from './components/Skills';

const App = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="print-button button" type="button">PDF / Print</button>}
        content={() => componentRef.current}
      />
      <div id="divToPrint" ref={componentRef} className="paper">
        <div className="general-section">
          <GeneralSection />
          <Contact />
        </div>
        <div className="info-experience-section">
          <div className="info-section">
            <InfoSection />
          </div>
          <div className="experience-section">
            <Experience />
            <Skills />
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;
