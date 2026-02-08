import React, { useState } from 'react';
import { getSecurityAdvice } from '../geminiService';

interface ConfigState {
  propertyType: 'apartment' | 'house' | null;
  securityLevel: string | null;
  municipio: string;
  barrio: string;
}

const Configurator: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>({
    propertyType: null,
    securityLevel: null,
    municipio: '',
    barrio: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleConsult = async () => {
    if (!config.propertyType || !config.securityLevel || !config.municipio || !config.barrio) return;

    setLoading(true);
    try {
      const advice = await getSecurityAdvice({
        propertyType: config.propertyType === 'apartment' ? 'Apartamento' : 'Casa',
        securityLevel: config.securityLevel,
        municipio: config.municipio,
        barrio: config.barrio
      });
      setResult(advice);
    } catch (error) {
      console.error("Error consultando IA:", error);
      alert("Hubo un error al conectar con el estratega de seguridad. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <section id="resultado-ia" className="py-16 bg-[#050505] flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#D4C5A5]/5"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4C5A5] to-transparent"></div>

        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-[#D4C5A5] uppercase tracking-[0.4em] text-sm font-bold mb-6 block animate-[fadeIn_0.5s]">
              Informe de Inteligencia: {config.municipio}
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-white mb-8 leading-tight animate-[fadeIn_0.7s]">
              {result.title}
            </h2>
            <div className="w-40 h-1 bg-[#D4C5A5] mx-auto mb-12"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Análisis de Riesgo (El Gancho) */}
            <div className="bg-white/5 p-10 md:p-12 rounded border-l-4 border-red-500/50 backdrop-blur-sm animate-[fadeInLeft_1s]">
              <div className="flex items-center gap-6 mb-8">
                <span className="material-symbols-outlined text-red-500 text-5xl">warning</span>
                <h3 className="text-white font-serif text-3xl md:text-4xl">Perfil de Riesgo Detectado</h3>
              </div>
              <p className="text-white text-xl md:text-2xl leading-snug font-light">
                "{result.analysis}"
              </p>
            </div>

            {/* Solución (Recomendaciones) */}
            <div className="space-y-10 animate-[fadeInRight_1s]">
              <div>
                <h3 className="text-[#D4C5A5] font-bold uppercase tracking-widest mb-8 text-lg border-b border-white/10 pb-4">Contramedidas Recomendadas</h3>
                <ul className="space-y-8">
                  {result.recommendations?.map((rec: string, idx: number) => (
                    <li key={idx} className="flex gap-6 items-start group">
                      <span className="material-symbols-outlined text-[#D4C5A5] text-4xl group-hover:scale-110 transition-transform mt-1">shield_lock</span>
                      <span className="text-white text-xl md:text-2xl font-light leading-relaxed">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#D4C5A5] p-1 mt-12">
                <a
                  href={`https://wa.me/5731234567890?text=Hola,%20recibí%20mi%20análisis%20para%20${config.barrio}.%20Quiero%20agendar%20una%20cita.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#050505] text-[#D4C5A5] hover:bg-[#D4C5A5] hover:text-[#050505] text-center py-8 text-xl md:text-2xl uppercase tracking-widest font-black transition-all duration-500"
                >
                  Agendar Cita de Blindaje
                </a>
              </div>
              <p className="text-center text-white/40 text-sm uppercase tracking-widest mt-6">
                {result.closing}
              </p>
            </div>
          </div>

          <button
            onClick={() => setResult(null)}
            className="absolute top-8 right-8 p-4 text-white/30 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-5xl">close</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="configurador" className="py-16 bg-background-dark relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-accent-dark p-8 md:p-16 rounded-sm border border-[#D4C5A5]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">Configurador de Seguridad</h2>
            <p className="text-[#D4C5A5] font-light text-lg">
              El entorno cambia. Su protección debe evolucionar.
              <br />
              <span className="text-white/40 text-sm">Responda para recibir un análisis de vulnerabilidad personalizado.</span>
            </p>
          </div>

          <div className="space-y-16">
            {/* Paso 1: Propiedad */}
            <div>
              <p className="text-[#D4C5A5] text-xs uppercase tracking-[0.3em] font-bold mb-8 text-center flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span> 1. Tipo de Propiedad <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span>
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                <button
                  onClick={() => setConfig({ ...config, propertyType: 'apartment' })}
                  className={`flex flex-col items-center justify-center gap-4 p-8 rounded-sm border transition-all duration-300 group ${config.propertyType === 'apartment' ? 'border-[#D4C5A5] bg-[#D4C5A5]/10 shadow-[0_0_20px_rgba(212,197,165,0.1)]' : 'border-white/5 hover:border-[#D4C5A5]/50 hover:bg-white/5'}`}
                >
                  <span className={`material-symbols-outlined text-5xl ${config.propertyType === 'apartment' ? 'text-[#D4C5A5]' : 'text-white/30 group-hover:text-[#D4C5A5]'}`}>apartment</span>
                  <span className="text-white text-sm font-bold uppercase tracking-widest">Apartamento</span>
                </button>
                <button
                  onClick={() => setConfig({ ...config, propertyType: 'house' })}
                  className={`flex flex-col items-center justify-center gap-4 p-8 rounded-sm border transition-all duration-300 group ${config.propertyType === 'house' ? 'border-[#D4C5A5] bg-[#D4C5A5]/10 shadow-[0_0_20px_rgba(212,197,165,0.1)]' : 'border-white/5 hover:border-[#D4C5A5]/50 hover:bg-white/5'}`}
                >
                  <span className={`material-symbols-outlined text-5xl ${config.propertyType === 'house' ? 'text-[#D4C5A5]' : 'text-white/30 group-hover:text-[#D4C5A5]'}`}>home</span>
                  <span className="text-white text-sm font-bold uppercase tracking-widest">Casa / Finca</span>
                </button>
              </div>
            </div>

            {/* Paso 2: Nivel */}
            <div>
              <p className="text-[#D4C5A5] text-xs uppercase tracking-[0.3em] font-bold mb-8 text-center flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span> 2. Nivel de Defensa <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {(['III', 'III+', 'IV+'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setConfig({ ...config, securityLevel: level })}
                    className={`p-6 rounded-sm border transition-all text-center group ${config.securityLevel === level ? 'border-[#D4C5A5] bg-[#D4C5A5]/10' : 'border-white/5 hover:border-[#D4C5A5]/50 hover:bg-white/5'}`}
                  >
                    <p className="text-white font-bold mb-2 text-xl">Nivel {level}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest group-hover:text-white/70">
                      {level === 'III' ? 'Antirrobo Urbano' : level === 'III+' ? 'Resistencia Balística' : 'Búnker Residencial'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 3: Ubicación (Nuevo) */}
            <div>
              <p className="text-[#D4C5A5] text-xs uppercase tracking-[0.3em] font-bold mb-8 text-center flex items-center justify-center gap-4">
                <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span> 3. Ubicación Estratégica <span className="w-8 h-[1px] bg-[#D4C5A5]/50"></span>
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="group">
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-3 group-focus-within:text-[#D4C5A5] transition-colors">Municipio</label>
                  <input
                    type="text"
                    placeholder="Ej: Medellín, Envigado..."
                    value={config.municipio}
                    onChange={(e) => setConfig({ ...config, municipio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-[#D4C5A5] focus:ring-0 transition-all placeholder:text-white/20"
                  />
                </div>
                <div className="group">
                  <label className="block text-white/50 text-xs uppercase tracking-widest mb-3 group-focus-within:text-[#D4C5A5] transition-colors">Barrio / Sector</label>
                  <input
                    type="text"
                    placeholder="Ej: El Poblado, Llanogrande..."
                    value={config.barrio}
                    onChange={(e) => setConfig({ ...config, barrio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-sm p-4 text-white focus:border-[#D4C5A5] focus:ring-0 transition-all placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>

            {/* Botón de Acción */}
            <div className="pt-12 text-center">
              <button
                disabled={!config.propertyType || !config.securityLevel || !config.municipio || !config.barrio || loading}
                onClick={handleConsult}
                className={`
                  relative overflow-hidden px-16 py-6 rounded-sm text-sm uppercase tracking-[0.25em] font-black transition-all duration-300
                  ${(!config.propertyType || !config.securityLevel || !config.municipio || !config.barrio)
                    ? 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'
                    : 'bg-[#D4C5A5] text-[#050505] hover:bg-[#C3B494] shadow-[0_0_30px_rgba(212,197,165,0.3)] hover:scale-105'}
                `}
              >
                {loading ? (
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 border-2 border-[#050505] border-t-transparent rounded-full animate-spin"></div>
                    <span>Analizando Riesgos...</span>
                  </div>
                ) : (
                  "Generar Perfil de Vulnerabilidad"
                )}
              </button>
              {loading && <p className="mt-4 text-[#D4C5A5] text-xs animate-pulse">Conectando con base de datos de seguridad...</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Configurator;
