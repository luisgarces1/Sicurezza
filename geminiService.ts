// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

// Función para elegir el mejor modelo disponible que NO sea de pago excesivo
async function getSafeModel(key: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (!data.models) return "gemini-pro"; // Fallback de emergencia

    console.log("📋 Lista de modelos recibida. Buscando uno seguro...");

    // Buscamos en orden de prioridad, evitando versiones "latest" que cobran cuota
    const safeModel = data.models.find((m: any) => m.name.includes("gemini-1.5-flash-001")) ||
      data.models.find((m: any) => m.name.includes("gemini-1.5-flash")) ||
      data.models.find((m: any) => m.name === "models/gemini-pro");

    if (safeModel) {
      // La API devuelve "models/nombre", limpiamos el prefijo para la URL
      const cleanName = safeModel.name.replace("models/", "");
      console.log(`✅ Modelo seguro seleccionado: ${cleanName}`);
      return cleanName;
    }

    return "gemini-pro"; // Si todo falla, usamos el clásico
  } catch (e) {
    console.warn("⚠️ Error listando modelos, usando default:", e);
    return "gemini-pro";
  }
}

export const getSecurityAdvice = async (data: any) => {
  if (!API_KEY) throw new Error("Falta la API Key");

  // 1. OBTENER MODELO SEGURO (Dinámico)
  const modelName = await getSafeModel(API_KEY);
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  // 2. PROMPT DE LUJO
  const systemPrompt = `Eres un Consultor de Seguridad de 'Sicurezza'.
  Ubicación: ${data.municipio || "Medellín"}, ${data.barrio || "Sector Exclusivo"}.
  Propiedad: ${data.propertyType}.
  IMPORTANTE: Responde SOLO con JSON válido. Sin Markdown.
  {
    "title": "Título del análisis para su zona",
    "analysis": "Párrafo breve y experto sobre riesgos locales.",
    "recommendations": ["Recomendación 1", "Recomendación 2"],
    "closing": "Cierre formal."
  }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      // Si falla, lanzamos error para que la UI lo muestre
      throw new Error(`Error Google: ${response.status}`);
    }

    const json = await response.json();
    const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) throw new Error("Sin respuesta de IA");

    // 3. LIMPIEZA JSON
    const cleanText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);

  } catch (error) {
    console.error("Error final:", error);
    throw error;
  }
};