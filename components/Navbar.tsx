
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-[#D4C5A5]/10 shadow-2xl transition-all duration-300">
      <div className="w-full px-6 md:px-12 lg:px-24 h-16 md:h-20 flex items-center justify-between">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 md:gap-4 group cursor-pointer h-full py-3 shrink-0"
        >
          {/* Logo Compacto */}
          <div className="h-8 md:h-12 aspect-square p-1 bg-black/20 rounded border border-[#D4C5A5]/30 shadow-[0_0_15px_rgba(212,197,165,0.1)] group-hover:border-[#D4C5A5]/60 transition-all duration-500 overflow-hidden">
            <img src="/images/logo_final.jpg" alt="Sicurezza Logo" className="h-full w-full object-cover rounded-sm" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg md:text-xl lg:text-2xl font-premium font-bold tracking-[0.2em] text-[#D4C5A5] uppercase drop-shadow-md whitespace-nowrap leading-none">
              Sicurezza
            </span>
            <span className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/40 group-hover:text-primary transition-colors ml-0.5 whitespace-nowrap mt-1">
              Blindaje Arquitectónico de Lujo
            </span>
          </div>
        </div>

        {/* Desktop Menu - Compacted for Laptops */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 ml-auto">
          {/* Menu Items */}
          {[
            { label: '¿Por qué una puerta?', href: '#legado' },
            { label: 'Configurar blindaje', href: '#configurador' },
            { label: 'Planes', href: '#ingenieria' },
            { label: 'Ofertas', href: '#ofertas' },
            { label: 'Portafolio', href: '#portafolio' },
            { label: 'Respaldo', href: '#testimonios' },
          ].map((link) => (
            <a
              key={link.label}
              className="relative text-[10px] xl:text-xs uppercase tracking-[0.15em] font-bold text-white/70 hover:text-white transition-colors duration-300 group/link whitespace-nowrap"
              href={link.href}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4C5A5] transition-all duration-300 group-hover/link:w-full"></span>
            </a>
          ))}

          <a
            href="https://wa.me/5731234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-[#D4C5A5] hover:bg-[#C3B494] text-[#050505] px-4 py-2 rounded-[1px] text-[10px] xl:text-xs uppercase tracking-[0.2em] font-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,197,165,0.3)] whitespace-nowrap"
          >
            Consulta
          </a>
        </div>

        {/* Mobile / Tablet Menu Button */}
        <div className="lg:hidden relative z-[60]">
          <span className="material-symbols-outlined text-[#D4C5A5] text-3xl cursor-pointer">menu</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
