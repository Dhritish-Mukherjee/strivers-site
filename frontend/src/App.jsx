import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import AboutBand from './components/AboutBand.jsx';
import PosterCarousel from './components/PosterCarousel.jsx';
import JoinUsBand from './components/JoinUsBand.jsx';
import CommunityStrip from './components/CommunityStrip.jsx';
import StatsBanner from './components/StatsBanner.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import FacultyCarousel from './components/FacultyCarousel.jsx';
import TestimonialBanner from './components/TestimonialBanner.jsx';
import Footer from './components/Footer.jsx';
import NotFound from './pages/NotFound.jsx';
import ParticleNetwork from './components/ParticleNetwork.jsx';
import RisingLine from './components/RisingLine.jsx';
import LoginModal from './components/LoginModal.jsx';

const TornEdge = () => (
  <svg width="100%" height="16" viewBox="0 0 100 16" preserveAspectRatio="none" style={{ display:'block', fill:'var(--color-paper)', filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.06))', position: 'relative', zIndex: 10, marginTop: '-16px' }}>
    <path d="M0,0 L0,16 L5,12 L10,16 L15,13 L20,16 L25,11 L30,16 L35,14 L40,16 L45,12 L50,16 L55,11 L60,16 L65,13 L70,16 L75,12 L80,16 L85,14 L90,16 L95,12 L100,16 L100,0 Z" />
  </svg>
);

function HomePage() {
  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh', position: 'relative' }}>
      <div className="noise-overlay" />
      <ParticleNetwork density={15000} fixed={true} />
      <RisingLine />
      <Navbar />
      <main style={{ position: 'relative' }}>
        <Hero />
        <AboutBand />
        <PosterCarousel />
        <JoinUsBand />
        <CommunityStrip />
        <StatsBanner />
        <CategoryGrid />
        <TornEdge />
        <FacultyCarousel />
        <TestimonialBanner />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoginModal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
