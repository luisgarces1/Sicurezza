// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

// Lógica de Selección Segura: Busca modelos disponibles que soporten generación y prioriza los gratuitos/estables
async function getSafeModel(key: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (!data.models || !Array.isArray(data.models)) {
      console.warn("No se pudo obtener la lista de modelos. Usando fallback.");
      return "gemini-1.5-flash";
    }

    console.log("📋 Analizando modelos disponibles...");

    // Filtrar modelos que soporten 'generateContent'
    const available = data.models.filter((m: any) =>
      m.supportedMethods?.includes("generateContent")
    );

    // Prioridad exacta: 1.5-flash-001 -> 1.5-flash -> pro
    // Bloqueamos '2.5' o 'latest' para evitar errores de cuota excesiva
    const safeModel = available.find((m: any) => m.name.includes("gemini-1.5-flash-001")) ||
      available.find((m: any) => m.name.includes("gemini-1.5-flash") && !m.name.includes("latest") && !m.name.includes("2.5")) ||
      available.find((m: any) => m.name.includes("gemini-pro"));

    if (safeModel) {
      const cleanName = safeModel.name.replace("models/", "");
      console.log(`✅ Modelo seleccionado automáticamente: ${cleanName}`);
      return cleanName;
    }

    return "gemini-1.5-flash";
  } catch (e) {
    console.error("Error en selección de modelo:", e);
    return "gemini-1.5-flash";
  }
}

export const getSecurityAdvice = async (data: any) => {
  if (!API_KEY) {
    throw new Error("❌ Clave de API no configurada en Vercel (VITE_GEMINI_API_KEY)");
  }

  const modelName = await getSafeModel(API_KEY);

  // URL base con v1beta
  let API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  const systemPrompt = `Eres un Consultor de Seguridad de 'Sicurezza'.
  Ubicación: ${data.municipio || "Medellín"}, ${data.barrio || "Sector Exclusivo"}.
  Propiedad: ${data.propertyType}.
  IMPORTANTE: Responde SOLO con JSON válido. Sin Markdown. Sin comillas triples.
  Estructura:
  {
    "title": "Título del análisis para su zona",
    "analysis": "Párrafo breve y experto sobre riesgos locales.",
    "recommendations": ["Recomendación 1", "Recomendación 2"],
    "closing": "Cierre formal."
  }
  `;

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: systemPrompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7
      }
    })
  };

  try {
    let response = await fetch(API_URL, requestOptions);

    // ESTRATEGIA: Si v1beta da 404, reintentamos automáticamente con v1
    if (response.status === 404) {
      console.warn("⚠️ v1beta devolvió 404, intentando con endpoint v1...");
      const V1_URL = API_URL.replace("v1beta", "v1");
      response = await fetch(V1_URL, requestOptions);
    }

    if (!response.ok) {
      const errorJson = await response.json().catch(() => ({}));
      const errorMessage = errorJson.error?.message || `Status ${response.status}`;
      throw new Error(`Google API Error: ${response.status} - ${errorMessage}`);
    }

    const result = await response.json();
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("La IA no devolvió texto.");

    console.log("📥 Respuesta recibida:", rawText);

    // LIMPIEZA FINAL: Por si la IA ignora las instrucciones y envía Markdown
    const cleanText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/\\n/g, ' ')
      .trim();

    return JSON.parse(cleanText);

  } catch (error: any) {
    console.error("Fallo crítico en el servicio:", error.message);
    throw error; // El componente Configurator atrapará esto y mostrará el alert
  }
};