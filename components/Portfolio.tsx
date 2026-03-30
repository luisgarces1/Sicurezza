
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: '1',
    title: 'Ingeniería de Seguridad',
    location: 'El Poblado, Medellín',
    materials: 'Doble Refuerzo de Acero y Multi-Pasadores',
    imageUrl: '/images/puerta_roble.jpeg'
  },
  {
    id: '2',
    title: 'Roble Ejecutivo con Cerradura Digital',
    location: 'Llanogrande, Rionegro',
    materials: 'Madera Premium y Blindaje Nivel 3',
    imageUrl: '/images/puerta_digital_cleaned.png'
  },
  {
    id: '3',
    title: 'Minimalismo Pivotante',
    location: 'Envigado, Antioquia',
    materials: 'Sistema Pivotante de Alta Resistencia',
    imageUrl: '/images/cleaned_white_door.png'
  },
  {
    id: '4',
    title: 'Diseño Nórdico Blindado',
    location: 'Sabuneta, Antioquia',
    materials: 'Acabado en Roble Natural y Acero',
    imageUrl: '/images/puerta_nordica.jpeg'
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
          <a 
            className="bg-primary/10 hover:bg-primary text-primary hover:text-background-dark px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 transition-all flex items-center gap-2 group" 
            href="https://wa.me/573105078585?text=Hola,%20me%20gustaría%20ver%20el%20catálogo%20completo%20de%20puertas."
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Catálogo Completo
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-3xl mb-6 aspect-[9/16] border border-white/5 shadow-2xl bg-black/40 flex items-center justify-center">
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
