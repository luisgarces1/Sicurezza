
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
    <section id="testimonios" className="py-24 bg-accent-dark border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Columna Izquierda: Mensaje de Marca y Testimonios */}
          <div className="lg:w-1/2">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block underline underline-offset-8 decoration-primary/30">Respaldo y Confianza</span>
            <h2 className="font-serif text-3xl lg:text-5xl text-white mb-10 leading-tight">Respaldamos cada <br /><span className="text-gold-muted italic">Estructura que Fabricamos</span></h2>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-16">
              <div className="bg-background-dark/20 p-6 rounded border-l-2 border-primary/40">
                <p className="text-primary text-4xl font-extrabold mb-2">100%</p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Satisfacción Real</p>
              </div>
              <div className="bg-background-dark/20 p-6 rounded border-l-2 border-primary/40">
                <p className="text-primary text-4xl font-extrabold mb-2">+500</p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Hogares Blindados</p>
              </div>
            </div>

            <div className="space-y-6">
              {testimonials.map((t) => (
                <div key={t.id} className="relative bg-background-dark/30 p-10 rounded-2xl gold-border hover:bg-white/5 transition-all group">
                  <span className="material-symbols-outlined absolute top-6 right-8 text-primary/10 text-6xl group-hover:text-primary/20 transition-colors pointer-events-none">format_quote</span>
                  <div className="flex text-primary mb-6 scale-90 -ml-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined fill-1">star</span>
                    ))}
                  </div>
                  <p className="text-white/70 italic mb-8 relative z-10 leading-relaxed font-light text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                      <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold tracking-wider">{t.name}</p>
                      <p className="text-gold-muted text-[10px] uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Proceso de Fabricación (Ingeniería) */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative group rounded-2xl overflow-hidden aspect-[4/5] bg-black/40 border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10 pointer-events-none"></div>
              <div className="grid grid-rows-2 h-full gap-1">
                <img 
                  src="/imagenes/cleaned_chassis.png" 
                  alt="Estructura Interna de Seguridad" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <img 
                  src="/imagenes/final_chassis_v2.png" 
                  alt="Ingeniería Interna - Chasis" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-12 z-20 w-full">
                <span className="bg-primary/90 text-background-dark px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Ingeniería en Acción</span>
                <h3 className="text-white text-3xl font-serif mb-4 leading-snug">Maestría en la <br />Estructura Interna</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed max-w-sm mb-6">
                  Cada puerta nace de un chasis de acero galvanizado con múltiples puntos de anclaje independientes. Blindaje nivel IV estándar para su máxima protección.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <span className="material-symbols-outlined text-primary mb-2 block">precision_manufacturing</span>
                    <p className="text-white/80 text-[11px] font-medium tracking-wide">Corte Láser CNC</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <span className="material-symbols-outlined text-primary mb-2 block">security</span>
                    <p className="text-white/80 text-[11px] font-medium tracking-wide">Refuerzos de 4mm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Galería Tech Adicional */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="relative group rounded-xl overflow-hidden aspect-video border border-white/10">
                <img 
                  src="/imagenes/WhatsApp Image 2026-03-30 at 9.12.56 AM (2).jpeg" 
                  alt="Tecnología de Seguridad" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background-dark/60 backdrop-blur-sm">
                   <p className="text-primary text-[10px] font-bold tracking-widest uppercase">Seguridad Digital</p>
                </div>
              </div>
              <div className="relative group rounded-xl overflow-hidden aspect-video border border-white/10 bg-black">
                <video 
                   src="/imagenes/video_seguridad.mp4" 
                   className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                   muted
                   loop
                   autoPlay
                />
                <div className="absolute top-4 right-4 bg-primary/20 backdrop-blur p-1 rounded">
                   <span className="material-symbols-outlined text-primary text-xs">videocam</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
