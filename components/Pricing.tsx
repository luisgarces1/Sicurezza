
import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="py-16 bg-background-dark border-t border-white/5" id="ingenieria">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">Planes de Seguridad Integral</h2>
          <p className="text-white/50 font-light">Soluciones diseñadas específicamente para la realidad de Antioquia.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-accent-dark p-10 rounded-xl gold-border flex flex-col">
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h4 className="text-white text-2xl font-bold mb-2">Plan Apartamento Seguro</h4>
                <p className="text-white/40 text-sm italic">Ideal para unidades residenciales.</p>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl">apartment</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              <li className="flex items-center gap-3 text-white/70 text-sm"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Puerta Principal Blindada Nivel III</li>
              <li className="flex items-center gap-3 text-white/70 text-sm"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Cerradura Italiana Multianclaje</li>
              <li className="flex items-center gap-3 text-white/70 text-sm"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Ojo Mágico Digital HD</li>
              <li className="flex items-center gap-3 text-white/70 text-sm"><span className="material-symbols-outlined text-primary text-lg">check_circle</span> Instalación Certificada en 1 día</li>
            </ul>
            <button className="border border-white/20 text-white py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-white/5 transition-all">Consultar Precio</button>
          </div>

          <div className="bg-primary p-10 rounded-xl flex flex-col relative">
            <div className="absolute top-4 right-4 bg-background-dark text-primary text-[10px] px-3 py-1 font-bold uppercase tracking-widest rounded-full shadow-lg">Más Solicitado</div>
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h4 className="text-background-dark text-2xl font-bold mb-2">Combo Familiar Total</h4>
                <p className="text-background-dark/60 text-sm italic">Protección máxima para casas y fincas.</p>
              </div>
              <span className="material-symbols-outlined text-background-dark text-4xl">family_restroom</span>
            </div>
            <ul className="space-y-4 mb-12 flex-grow">
              <li className="flex items-center gap-3 text-background-dark text-sm font-medium"><span className="material-symbols-outlined text-background-dark text-lg">check_circle</span> Puerta Principal + Puerta de Servicio</li>
              <li className="flex items-center gap-3 text-background-dark text-sm font-medium"><span className="material-symbols-outlined text-background-dark text-lg">check_circle</span> Blindaje Reforzado Nivel IV</li>
              <li className="flex items-center gap-3 text-background-dark text-sm font-medium"><span className="material-symbols-outlined text-background-dark text-lg">check_circle</span> Sistema de Llave Única (Maestra)</li>
              <li className="flex items-center gap-3 text-background-dark text-sm font-medium"><span className="material-symbols-outlined text-background-dark text-lg">check_circle</span> Garantía de Por Vida en Estructura</li>
            </ul>
            <button className="bg-background-dark text-white py-4 rounded-sm uppercase tracking-widest text-xs font-bold hover:bg-background-dark/90 transition-all">Solicitar Oferta Combo</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
