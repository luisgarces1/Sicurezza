
import React from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#050505]/95 backdrop-blur-xl border-b border-[#D4C5A5]/10 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2">
        {/* Logo Section */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 md:gap-4 group cursor-pointer h-full py-3 shrink-0"
        >
          <div className="h-8 md:h-12 aspect-square p-1 bg-black/20 rounded border border-[#D4C5A5]/30 shadow-[0_0_15px_rgba(212,197,165,0.1)] group-hover:border-[#D4C5A5]/60 transition-all duration-500 overflow-hidden">
            <img src="/images/logo_final.jpg" alt="Sicurezza Logo" className="h-full w-full object-cover rounded-sm" />
          </div>

          <div className="flex flex-col justify-center">
            <span className="text-lg md:text-2xl font-premium font-bold tracking-[0.1em] md:tracking-[0.2em] text-[#D4C5A5] uppercase drop-shadow-md whitespace-nowrap leading-none">
              Sicurezza
            </span>
            <span className="text-[6px] md:text-[9px] uppercase tracking-[0.1em] md:tracking-[0.3em] text-white/30 group-hover:text-primary transition-colors ml-0.5 whitespace-nowrap mt-1">
              Blindaje Arquitectónico <span className="hidden md:inline">de Lujo</span>
            </span>
          </div>
        </div>

        {/* Desktop Menu - xl+ only */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-8 ml-auto">
          {[
            { label: '¿POR QUÉ UNA PUERTA?', href: '#legado' },
            { label: 'CONFIGURAR BLINDAJE', href: '#configurador' },
            { label: 'PLANES', href: '#ingenieria' },
            { label: 'OFERTAS', href: '#ofertas' },
            { label: 'PORTAFOLIO', href: '#portafolio' },
            { label: 'RESPALDO', href: '#testimonios' },
          ].map((link) => (
            <a
              key={link.label}
              className="relative text-[10px] 2xl:text-xs uppercase tracking-[0.15em] font-bold text-white/70 hover:text-white transition-colors duration-300 group/link whitespace-nowrap"
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
            className="ml-2 bg-[#D4C5A5] hover:bg-[#C3B494] text-[#050505] px-5 py-2.5 rounded-[1px] text-[10px] 2xl:text-xs uppercase tracking-[0.2em] font-black transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(212,197,165,0.3)] whitespace-nowrap"
          >
            Consulta
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="xl:hidden text-[#D4C5A5] focus:outline-none"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`xl:hidden absolute top-full left-0 w-full bg-[#050505]/98 backdrop-blur-2xl border-b border-[#D4C5A5]/20 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-8 gap-6 text-center">
          {[
            { label: '¿POR QUÉ UNA PUERTA?', href: '#legado' },
            { label: 'CONFIGURAR BLINDAJE', href: '#configurador' },
            { label: 'PLANES', href: '#ingenieria' },
            { label: 'OFERTAS', href: '#ofertas' },
            { label: 'PORTAFOLIO', href: '#portafolio' },
            { label: 'RESPALDO', href: '#testimonios' },
          ].map((link) => (
            <a
              key={link.label}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-[0.3em] font-bold text-white/70 hover:text-primary transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5731234567890"
            className="mt-4 bg-[#D4C5A5] text-[#050505] py-4 rounded-sm text-sm uppercase tracking-[0.2em] font-black"
          >
            Consulta Privada
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
