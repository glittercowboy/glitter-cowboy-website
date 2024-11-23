import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import PageTransition from './components/PageTransition';
import LandingPage from './components/LandingPage';
import StoryPage from './components/StoryPage';
import LabelPage from './components/LabelPage';
import ArtistsPage from './components/ArtistsPage';
import MerchPage from './components/MerchPage';
import AudioPlayer from './components/AudioPlayer';
import { AudioProvider } from './components/AudioContext';
import HeaderNav from './components/HeaderNav';
import NewsletterPopup from './components/NewsletterPopup';
import useScrollTrigger from './hooks/useScrollTrigger';

const MobileRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && location.pathname === '/') {
      navigate('/label');
    }
  }, [navigate, location]);

  return null;
};

const AppContent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const showPopup = useScrollTrigger(25);

  useEffect(() => {
    if (showPopup) {
      setIsPopupOpen(true);
    }
  }, [showPopup]);

  return (
    <div className="min-h-screen bg-[#EDDABE]">
      <MobileRedirect />
      <HeaderNav />
      <PageTransition>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/label" element={<LabelPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/merch" element={<MerchPage />} />
        </Routes>
      </PageTransition>
      <AudioPlayer />
      <NewsletterPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <AudioProvider>
          <AppContent />
        </AudioProvider>
      </CartProvider>
    </Router>
  );
}

export default App;