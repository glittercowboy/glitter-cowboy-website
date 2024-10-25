import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageTransition from './components/PageTransition';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import LabelPage from './components/LabelPage';
import SchoolPage from './components/SchoolPage';
import MerchPage from './components/MerchPage';
import AudioPlayer from './components/AudioPlayer';
import { AudioProvider } from './contexts/AudioContext';

const App: React.FC = () => {
  return (
    <AudioProvider>
      <Router>
        <PageTransition>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/label" element={<LabelPage />} />
            <Route path="/school" element={<SchoolPage />} />
            <Route path="/merch" element={<MerchPage />} />
          </Routes>
        </PageTransition>
        <AudioPlayer />
      </Router>
    </AudioProvider>
  );
};

export default App;