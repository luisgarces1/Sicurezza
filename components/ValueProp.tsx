
import React from 'react';

const ValueProp: React.FC = () => {
  return (
    <section className="py-16 bg-background-dark border-y border-white/5" id="legado">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-8">Invirtiendo en la Paz Mental de su Familia</h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-8 italic">
              "El verdadero lujo es saber que su mundo está seguro. En el Valle de Aburra y el Oriente Antioqueño, brindamos la barrera entre su santuario y el mundo exterior."
            </p>
            <div className="space-y-6">
              <div className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Excelencia Balística</h4>
                  <p className="text-white/50 font-light">Protección certificada Nivel III y IV que se fusiona perfectamente con acabados italianos.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="material-symbols-outlined text-primary text-3xl">architecture</span>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Integración Arquitectónica</h4>
                  <p className="text-white/50 font-light">Diseños personalizados que honran la visión de los arquitectos más prestigiosos de Antioquia.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 border border-primary/20 rounded-lg group-hover:-inset-2 transition-all duration-500"></div>
            <img
              alt="Detailed door finish"
              className="relative rounded-lg w-full h-[500px] object-cover"
              src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
