
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Excelencia en El Poblado',
    location: 'Medellín',
    materials: 'Caoba Personalizada y Acero',
    imageUrl: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Estado Llanogrande',
    location: 'Rionegro',
    materials: 'Acero Arquitectónico Reforzado',
    imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bdb7489feef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Modernismo Envigado',
    location: 'Envigado',
    materials: 'Acabado en Pizarra Italiana',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section className="py-16 bg-accent-dark" id="portafolio">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Portafolio</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-white">Instalaciones Reales: <br /><span className="text-gold-muted italic">Maestría Arquitectónica</span></h2>
          </div>
          <a className="text-primary text-sm font-bold uppercase tracking-widest border-b border-primary/30 pb-1" href="#">Ver Catálogo Completo</a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-lg mb-6 aspect-[3/4]">
                <img
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={p.imageUrl}
                />
              </div>
              <h3 className="text-white text-xl font-bold mb-1">{p.title}</h3>
              <p className="text-gold-muted text-sm uppercase tracking-widest font-medium">{p.materials}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
