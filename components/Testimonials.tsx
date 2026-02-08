
import React from 'react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ricardo G.',
    role: 'Propietario en El Poblado',
    text: '"Después de un intento de robo en mi edificio en El Poblado, decidí cambiar mi puerta. La tranquilidad que siento ahora no tiene precio. El diseño quedó idéntico al original de la unidad."',
    rating: 5
  },
  {
    id: '2',
    name: 'Claudia M.',
    role: 'Finca en Llanogrande',
    text: '"Excelente servicio en Rionegro. Instalaron la puerta de mi casa de campo con un nivel de detalle impresionante. Altamente recomendados por su puntualidad y seriedad."',
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonios" className="py-16 bg-accent-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/3">
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-8">Respaldados por la Confianza</h2>
            <p className="text-white/50 font-light mb-12">Más de 500 instalaciones exitosas en Antioquia. No vendemos puertas, vendemos la libertad de vivir sin miedo.</p>
            <div className="flex gap-12">
              <div>
                <p className="text-primary text-4xl font-extrabold mb-2">100%</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Satisfacción</p>
              </div>
              <div>
                <p className="text-primary text-4xl font-extrabold mb-2">+500</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Hogares Seguros</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 space-y-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-background-dark/50 p-8 rounded-lg gold-border">
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined">star</span>
                  ))}
                </div>
                <p className="text-white/70 italic mb-6">{t.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">person</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-white/30 text-[10px] uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
