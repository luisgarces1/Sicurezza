
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProp from './components/ValueProp';
import Configurator from './components/Configurator';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import SpecialOffers from './components/SpecialOffers';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';
import AIConsultationModal from './components/AIConsultationModal';

const App: React.FC = () => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState<{ property: string; level: string } | null>(null);

  const handleOpenAI = (property: string, level: string) => {
    setActiveConfig({ property, level });
    setIsAIModalOpen(true);
  };

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <ValueProp />
        <Configurator onResult={handleOpenAI} />
        <Portfolio />
        <Pricing />
        <SpecialOffers />
        <Testimonials />
      </main>
      <Footer />
      <FloatingContact />
      
      {isAIModalOpen && activeConfig && (
        <AIConsultationModal 
          isOpen={isAIModalOpen} 
          onClose={() => setIsAIModalOpen(false)} 
          property={activeConfig.property}
          level={activeConfig.level}
        />
      )}
    </div>
  );
};

export default App;
