import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeAnimation from './components/WelcomeAnimation';
import MusicPlayer from './components/MusicPlayer';
import PopupModal from './components/PopupModal';
import Header from './components/Header';
import Hero from './components/Hero';
import Classes from './components/Classes';
import Mentors from './components/Mentors';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Registration from './components/Registration';
import Footer from './components/Footer';
import AdminDashboard from './admin/AdminDashboard';
import { trackPageView } from './services/firebaseService';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
    </Routes>
  );
}

function MainLayout() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [modalData, setModalData] = useState({ isOpen: false, type: '', data: {} });

  useEffect(() => {
    trackPageView('home');
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const openModal = (type: any, data: any) => {
    setModalData({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, type: '', data: {} });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      
      <PopupModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        type={modalData.type}
        data={modalData.data}
      />
      
      <Header />
      <Hero />
      <Classes onOpenModal={openModal} />
      <Mentors onOpenModal={openModal} />
      <Gallery onOpenModal={openModal} />
      <Testimonials />
      <Registration />
      <Footer />
      <MusicPlayer />
    </div>
  );
}

export default App;