// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

/**
 * ESTRATEGIA DE CASCADA (WATERFALL) MEJORADA
 * Intenta secuencialmente diferentes modelos y versiones de API.
 * Administra el campo responseMimeType de forma dinámica para evitar errores 400 en modelos antiguos.
 */
export const getSecurityAdvice = async (data: any) => {
  if (!API_KEY) {
    throw new Error("❌ Clave de API no configurada.");
  }

  // Lista de modelos a probar con configuración específica
  const modelsToTry = [
    { name: "gemini-1.5-flash", version: "v1beta", supportsJson: true },
    { name: "gemini-1.5-flash-001", version: "v1beta", supportsJson: true },
    { name: "gemini-1.5-flash", version: "v1", supportsJson: false },
    { name: "gemini-pro", version: "v1", supportsJson: false }
  ];

  const systemPrompt = `Eres el Director de Estrategia de 'Sicurezza'. 
  Genera un informe técnico de vulnerabilidad en formato JSON.
  UBICACIÓN: ${data.municipio || "Medellín"}, ${data.barrio || "Sector Exclusivo"}.
  PROPIEDAD: ${data.propertyType}.
  NIVEL: ${data.securityLevel}.
  
  Responde ÚNICAMENTE con este JSON:
  {
    "title": "Título",
    "analysis": "Análisis (4 líneas)",
    "recommendations": ["R1", "R2", "R3"],
    "closing": "Cierre"
  }
  `;

  for (const model of modelsToTry) {
    try {
      console.log(`🔍 Intentando con ${model.name} (${model.version})...`);

      const API_URL = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${API_KEY}`;

      const generationConfig: any = {
        temperature: 0.7,
        maxOutputTokens: 1000,
      };

      // SOLO añadimos responseMimeType si el modelo Y la versión de la API lo soportan
      if (model.supportsJson) {
        generationConfig.responseMimeType = "application/json";
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig
        })
      });

      if (!response.ok) {
        const errorDetail = await response.json().catch(() => ({}));
        console.warn(`⚠️ ${model.name} falló:`, errorDetail.error?.message || response.status);
        continue;
      }

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) continue;

      console.log(`✅ Éxito con ${model.name}`);

      // Limpieza robusta para casos donde no se use el modo JSON de la API
      const cleanText = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleanText);

    } catch (err) {
      console.error(`❌ Error con ${model.name}:`, err);
      continue;
    }
  }

  throw new Error("No se pudo conectar con ningún estratega de seguridad. Intente nuevamente en unos minutos.");
};