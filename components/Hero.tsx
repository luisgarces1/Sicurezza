
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-gradient z-10"></div>
        <div className="absolute inset-0 bg-black/50 z-10"></div> {/* Oscurecimiento para contraste */}
        <img
          alt="Luxury armored door in Medellin"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
        />
      </div>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-4xl">
          <span className="text-primary uppercase tracking-[0.4em] text-xs md:text-sm font-bold mb-6 block">Seguridad Premier en Antioquia</span>
          <h1 className="font-premium text-4xl md:text-5xl lg:text-7xl text-white leading-[1.2] md:leading-[1.1] mb-8 tracking-wider">
            SEGURIDAD Y ESTATUS: <br />
            <span className="italic font-serif font-light text-primary">El Legado Definitivo.</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/80 font-serif italic max-w-2xl mb-10 leading-relaxed">
            Protegiendo las residencias más exclusivas en el Área Metropolitana y el Oriente Antioqueño con obras maestras arquitectónicas que funcionan como fortalezas anti robo y atentados a su propiedad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5731234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-background-dark px-8 py-4 md:px-10 md:py-5 rounded-sm text-xs md:text-sm uppercase tracking-widest font-black flex items-center justify-center gap-3 group transition-all"
            >
              Consulta Privada
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
            <a
              href="#configurador"
              className="border border-white/20 hover:bg-white/5 text-white px-8 py-4 md:px-10 md:py-5 rounded-sm text-xs md:text-sm uppercase tracking-widest font-bold transition-all flex items-center justify-center text-center"
            >
              Configurar Blindaje
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="material-symbols-outlined text-white/30 text-3xl font-light">expand_more</span>
      </div>
    </section>
  );
};

export default Hero;
