// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

// Función para elegir el mejor modelo disponible que NO sea de pago excesivo
async function getSafeModel(key: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (!data.models) {
      console.warn("No se pudo listar modelos. Usando fallback seguro.");
      return "gemini-pro";
    }

    console.log("📋 Lista de modelos recibida. Buscando uno seguro...");

    // Buscamos en orden de prioridad, evitando versiones "latest" o experimentales que cobran cuota
    const safeModel = data.models.find((m: any) => m.name.includes("gemini-1.5-flash-001")) ||
      data.models.find((m: any) => m.name.includes("gemini-1.5-flash")) ||
      data.models.find((m: any) => m.name.includes("gemini-pro"));

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
  console.log("🔒 Iniciando consulta de seguridad blindada...");

  if (!API_KEY) {
    console.error("❌ CRÍTICO: No se encontró la API KEY.");
    throw new Error("Clave de API no configurada.");
  }

  // 1. OBTENER MODELO SEGURO (Dinámico)
  const modelName = await getSafeModel(API_KEY);
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

  // 2. PROMPT DE EXPERTO (Sicurezza)
  const systemPrompt = `Actúa como el Director de Estrategia de 'Sicurezza' (Blindaje de Lujo).
  Genera un informe técnico de vulnerabilidad para un cliente exclusivo.
  
  DATOS:
  - Municipio: ${data.municipio || "Medellín"}
  - Sector/Barrio: ${data.barrio || "Antioquia"}
  - Propiedad: ${data.propertyType}
  - Nivel de Blindaje solicitado: ${data.securityLevel}
  
  IMPORTANTE: Responde ÚNICAMENTE con un JSON válido. No uses Markdown. No uses comillas triples.
  Estructura obligatoria:
  {
    "title": "Título sofisticado y urgente",
    "analysis": "Análisis técnico de 4 líneas sobre por qué su sector es vulnerable hoy.",
    "recommendations": ["Recomendación técnica 1", "Recomendación técnica 2", "Recomendación técnica 3"],
    "closing": "Cierre imponente invitando a contactar a un experto."
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
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("🔥 Error API Google:", response.status, errorText);
      if (response.status === 429) {
        throw new Error("El sistema está saturado (Quota Exceeded). Por favor intente en un minuto.");
      }
      throw new Error(`Error de conexión (${response.status})`);
    }

    const jsonResult = await response.json();
    const rawText = jsonResult.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("La IA no devolvió texto.");
    }

    console.log("📥 Respuesta cruda:", rawText);

    // 3. LIMPIEZA DE BASURA (Solución definitiva al 'Formato inválido')
    const cleanText = rawText
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    return JSON.parse(cleanText);

  } catch (error: any) {
    console.error("💀 Fallo en el servicio:", error);
    throw error;
  }
};