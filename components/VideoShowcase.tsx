
import React from 'react';

const VideoShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-background-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Seguridad en Movimiento</span>
          <h2 className="font-serif text-3xl lg:text-5xl text-white mb-6">Test de Seguridad y <span className="text-gold-muted italic">Mecanismos</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Vea nuestros sistemas en acción. Desde mecanismos de cierre suave hasta la resistencia estructural de nuestros marcos blindados.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group overflow-hidden rounded-3xl bg-black/40 border border-white/10 aspect-video shadow-2xl">
            <video 
              src="/images/video_mecanismo.mp4" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              controls
              muted
              loop
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:hidden transition-all">
                <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-primary/50">
                    <span className="material-symbols-outlined text-primary text-3xl">play_arrow</span>
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
               <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
               </div>
               <div>
                  <h3 className="text-white text-xl font-bold mb-2">Certificación de Blindaje</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Nuestros videos demuestran la robustez de los perfiles y el funcionamiento de los sistemas de anclaje multipunto.</p>
               </div>
            </div>
            
            <div className="flex gap-6 items-start">
               <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
               </div>
               <div>
                  <h3 className="text-white text-xl font-bold mb-2">Acabados de Lujo</h3>
                  <p className="text-white/50 text-sm leading-relaxed">Mostramos el proceso de ajuste final donde la estética y la seguridad se fusionan en una sola pieza arquitectónica.</p>
               </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl border border-white/10 aspect-video max-w-sm shadow-xl">
                <video 
                src="/images/video_acabado.mp4" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                controls
                muted
                loop
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
