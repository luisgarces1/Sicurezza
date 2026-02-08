
import React from 'react';

const SpecialOffers: React.FC = () => {
  return (
    <section id="ofertas" className="py-16 bg-accent-dark border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 items-center gap-12 lg:gap-16">
          <div className="md:order-1">
            <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Exclusividad</span>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">Ofertas Especiales para Propiedades Premier</h2>
            <p className="text-white/60 font-light text-lg mb-8 leading-relaxed">
              Optimice su inversión en seguridad con nuestros paquetes de temporada diseñados para proyectos en el Área Metropolitana y el Oriente Antioqueño.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background-dark/30 p-4 rounded gold-border group hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                <div className="flex-1">
                  <p className="text-white text-sm"><span className="font-bold block sm:inline">Upgrade de Herrajes:</span> Acabados en oro de 24k o níquel satinado sin costo adicional en Nivel IV.</p>
                </div>
                <a
                  href="https://wa.me/5731234567890?text=Hola,%20me%20interesa%20el%20Upgrade%20de%20Herrajes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 sm:mt-0 bg-primary/10 hover:bg-primary text-primary hover:text-background-dark px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap"
                >
                  Solicitar
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-background-dark/30 p-4 rounded gold-border group hover:bg-white/5 transition-all">
                <span className="material-symbols-outlined text-primary text-3xl">security</span>
                <div className="flex-1">
                  <p className="text-white text-sm"><span className="font-bold block sm:inline">Mantenimiento Vitalicio:</span> Incluido en todos los contratos cerrados este trimestre.</p>
                </div>
                <a
                  href="https://wa.me/5731234567890?text=Hola,%20me%20interesa%20el%20Mantenimiento%20Vitalicio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 sm:mt-0 bg-primary/10 hover:bg-primary text-primary hover:text-background-dark px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap"
                >
                  Solicitar
                </a>
              </div>
            </div>
          </div>
          <div className="md:order-2 grid grid-cols-2 gap-4">
            <img
              alt="Luxury detail 1"
              className="rounded-lg w-full h-64 object-cover"
              src="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800"
            />
            <img
              alt="Luxury detail 2"
              className="rounded-lg w-full h-64 object-cover mt-8"
              src="https://images.unsplash.com/photo-1600566752355-397921139bc0?auto=format&fit=crop&q=80&w=800"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
