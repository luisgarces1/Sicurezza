// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

/**
 * ESTRATEGIA DE CASCADA (WATERFALL)
 * Intenta secuencialmente diferentes modelos y versiones de API hasta obtener respuesta.
 */
export const getSecurityAdvice = async (data: any) => {
  if (!API_KEY) {
    throw new Error("❌ Clave de API no configurada.");
  }

  // Lista de modelos a probar en orden de prioridad
  const modelsToTry = [
    { name: "gemini-1.5-flash", version: "v1beta", useJsonMode: true },
    { name: "gemini-1.5-flash-001", version: "v1beta", useJsonMode: true },
    { name: "gemini-1.5-flash", version: "v1", useJsonMode: false },
    { name: "gemini-pro", version: "v1", useJsonMode: false }
  ];

  const systemPrompt = `Eres el Director de Estrategia de 'Sicurezza'.
  Genera un informe técnico de vulnerabilidad.
  UBICACIÓN: ${data.municipio || "Medellín"}, ${data.barrio || "Sector Exclusivo"}.
  PROPIEDAD: ${data.propertyType}.
  NIVEL: ${data.securityLevel}.
  
  Responde ÚNICAMENTE en formato JSON con esta estructura:
  {
    "title": "Título impactante",
    "analysis": "Análisis de 4 líneas sobre riesgos locales.",
    "recommendations": ["Punto 1", "Punto 2", "Punto 3"],
    "closing": "Cierre elegante."
  }
  `;

  for (const model of modelsToTry) {
    try {
      console.log(` próbando modelo: ${model.name} (${model.version})...`);

      const API_URL = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${API_KEY}`;

      const generationConfig: any = {
        temperature: 0.7,
        maxOutputTokens: 1000,
      };

      // responseMimeType SOLO se usa en v1beta
      if (model.useJsonMode) {
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
        console.warn(`⚠️ Modelo ${model.name} falló con status ${response.status}`);
        continue; // Probar el siguiente en la lista
      }

      const result = await response.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        console.warn(`⚠️ El modelo ${model.name} devolvió una respuesta vacía.`);
        continue;
      }

      console.log(`✅ Éxito con ${model.name}`);

      // Limpieza robusta del JSON (Eliminar bloques Markdown si existen)
      const cleanText = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleanText);

    } catch (err) {
      console.error(`❌ Error con modelo ${model.name}:`, err);
      continue; // Probar el siguiente
    }
  }

  throw new Error("No se pudo conectar con ningún modelo de seguridad. Por favor, verifique su conexión o clave de API.");
};