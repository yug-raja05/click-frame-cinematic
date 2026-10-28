import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Services } from './components/Services';
import { About } from './components/About';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string | undefined>(undefined);

  useEffect(() => {
    const sectionIds = ['home', 'work', 'services', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080811] text-white flex flex-col selection:bg-purple-600 selection:text-white overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar activeSection={activeSection} />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          {/* Hero Section */}
          <Hero />

          {/* Selected Work / Portfolio Gallery */}
          <PortfolioGallery />

          {/* Services Section */}
          <Services onSelectService={handleSelectService} />

          {/* About & Software Section */}
          <About />

          {/* Contact Section with Two-Column Form & Real Email Delivery */}
          <ContactSection initialService={selectedServiceForContact} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default App;
