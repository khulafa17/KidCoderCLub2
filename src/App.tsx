import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Classes from './components/Classes';
import Mentors from './components/Mentors';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Registration from './components/Registration';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      <Hero />
      <Classes />
      <Mentors />
      <Gallery />
      <Testimonials />
      <Registration />
      <Footer />
    </div>
  );
}

export default App;