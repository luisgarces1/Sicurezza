
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-20 bg-background-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-14 w-auto p-1 bg-white/5 rounded-sm border border-white/10 backdrop-blur-sm">
                <img src="/images/logo_final.jpg" alt="Sicurezza Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-[0.1em] text-white uppercase">Sicurezza</span>
            </div>
            <p className="text-white/40 font-light text-sm leading-relaxed">
              Redefiniendo el estándar de seguridad en las regiones más prestigiosas de Colombia. Construimos protección de legado para quienes valoran la privacidad y el estilo.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Regiones</h5>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Medellín</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Valle de Aburrá</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Oriente Antioqueño</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Contacto</h5>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a className="hover:text-primary transition-colors" href="https://instagram.com/sicu.rezza010" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">LinkedIn</a></li>
                <li><a className="hover:text-primary transition-colors" href="https://wa.me/5731234567890" target="_blank" rel="noopener noreferrer">Línea Privada</a></li>
              </ul>
            </div>
            <div className="hidden md:block">
              <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h5>
              <ul className="space-y-4 text-white/50 text-sm">
                <li><a className="hover:text-primary transition-colors" href="#">Política de Privacidad</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Términos de Servicio</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">© 2024 Sicurezza. Todos los derechos reservados.</span>
          <div className="flex gap-10">
            <span className="material-symbols-outlined text-white/20 hover:text-primary cursor-pointer transition-colors">lock</span>
            <span className="material-symbols-outlined text-white/20 hover:text-primary cursor-pointer transition-colors">encrypted</span>
            <span className="material-symbols-outlined text-white/20 hover:text-primary cursor-pointer transition-colors">shield</span>
          </div>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
