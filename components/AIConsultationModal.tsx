
import React, { useState, useEffect } from 'react';
import { getSecurityAdvice } from '../geminiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  property: string;
  level: string;
}

const AIConsultationModal: React.FC<Props> = ({ isOpen, onClose, property, level }) => {
  const [advice, setAdvice] = useState<any>(null); // Changed to any to handle JSON structure
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      const propertyName = property === 'apartment' ? 'Apartamento' : 'Casa Exterior';

      getSecurityAdvice({ propertyType: propertyName, securityLevel: `Nivel ${level}` })
        .then(res => {
          setAdvice(res);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching advice:", err);
          setError("Lo sentimos, no pudimos generar su consulta en este momento. Por favor intente más tarde.");
          setLoading(false);
        });
    }
  }, [isOpen, property, level]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
      <div className="relative bg-[#050505] w-full max-w-2xl p-8 rounded-xl border border-[#D4C5A5]/20 shadow-2xl overflow-y-auto max-h-[85vh]">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-[#D4C5A5] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="mb-8 border-b border-white/10 pb-6">
          <span className="text-[#D4C5A5] uppercase tracking-[0.4em] text-[10px] font-bold mb-2 block">
            Sicurezza Intelligence
          </span>
          <h3 className="font-serif text-3xl text-white">
            {advice?.title || `Análisis de Seguridad: ${property === 'apartment' ? 'Apartamento' : 'Finca'}`}
          </h3>
        </div>

        <div className="text-white/80 font-light leading-relaxed space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="w-12 h-12 border-2 border-[#D4C5A5] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/50 animate-pulse italic text-sm tracking-widest uppercase">
                Analizando vulnerabilidades...
              </p>
            </div>
          ) : error ? (
            <div className="bg-red-900/20 border border-red-500/30 p-6 rounded text-red-200 text-sm">
              {error}
            </div>
          ) : (
            <div className="animate-[fadeIn_0.7s_ease-out] space-y-6">

              <div className="bg-white/5 p-6 rounded-lg border-l-2 border-[#D4C5A5]">
                <h4 className="text-[#D4C5A5] uppercase tracking-widest text-xs font-bold mb-3">Diagnóstico</h4>
                <p className="italic text-white/90">{advice?.analysis}</p>
              </div>

              <div>
                <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-4 border-b border-white/10 pb-2">
                  Estrategia de Blindaje Recomendada
                </h4>
                <ul className="space-y-4">
                  {advice?.recommendations?.map((rec: string, index: number) => (
                    <li key={index} className="flex gap-3 items-start group">
                      <span className="material-symbols-outlined text-[#D4C5A5] text-lg mt-0.5 group-hover:scale-110 transition-transform">
                        verified_user
                      </span>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[#D4C5A5] font-serif text-lg text-center">"{advice?.closing}"</p>
              </div>

            </div>
          )}
        </div>

        {!loading && (
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5731234567890"
              target="_blank"
              className="flex-1 bg-[#D4C5A5] text-[#050505] py-4 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-[#c3b494] transition-colors text-center shadow-lg shadow-[#D4C5A5]/10"
            >
              Consultar con Especialista
            </a>
            <button
              onClick={onClose}
              className="px-8 py-4 border border-white/10 text-white/50 text-xs uppercase tracking-widest font-bold hover:bg-white/5 transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultationModal;
