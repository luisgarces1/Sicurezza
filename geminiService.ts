// geminiService.ts
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

/**
 * Función para seleccionar dinámicamente el modelo más "humilde" y estándar posible
 * para evitar errores de cuota (429) o modelos restringidos.
 */
async function getBestAvailableModel(key: string): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();

    if (!data.models) {
      console.warn("No se pudo listar modelos. Usando fallback seguro.");
      return "models/gemini-1.5-flash";
    }

    // DEBUG: Ver qué modelos ve realmente tu cuenta
    console.log("Modelos disponibles:", data.models.map((m: any) => m.name));

    const models = data.models;

    // Lógica de Selección Prioritaria (Buscamos estabilidad y bajo costo)
    // 1. Flash Stable (Suele ser el más rápido y 'barato' en términos de cuota)
    // 2. Flash Specific Version (Por si el alias falla)
    // 3. Pro Classic (El estándar antiguo)

    const selectedModel =
      models.find((m: any) => m.name === "models/gemini-1.5-flash") ||
      models.find((m: any) => m.name === "models/gemini-1.5-flash-001") ||
      models.find((m: any) => m.name === "models/gemini-pro") ||
      models.find((m: any) => m.name === "models/gemini-1.0-pro");

    if (selectedModel) {
      console.log("✅ Modelo 'Humilde' seleccionado:", selectedModel.name);
      return selectedModel.name;
    }

    // Si fallan los específicos, buscamos cualquiera que contenga 'flash' pero no 'latest'
    const fallbackFlash = models.find((m: any) => m.name.includes("flash") && !m.name.includes("latest"));
    if (fallbackFlash) return fallbackFlash.name;

    console.log("⚠️ Ninguno preferido encontrado. Usando gemini-1.5-flash por defecto.");
    return "models/gemini-1.5-flash";

  } catch (e) {
    console.error("Error al buscar modelos:", e);
    return "models/gemini-1.5-flash";
  }
}

export const getSecurityAdvice = async (data: any) => {
  console.log("Iniciando consulta de seguridad...");
  if (!API_KEY) {
    console.error("CRÍTICO: No se detectó VITE_GEMINI_API_KEY en el entorno.");
    throw new Error("Error de configuración: Clave de API no encontrada. Verifique las variables de entorno.");
  }

  // 1. Obtener el mejor modelo disponible dinámicamente
  const capitalize = (str: string) => str ? str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ') : '';
  const barrioClean = capitalize(data.barrio);
  const municipioClean = capitalize(data.municipio);

  const rawModelName = await getBestAvailableModel(API_KEY!);
  const cleanModelName = rawModelName.replace("models/", "");
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelName}:generateContent?key=${API_KEY}`;

  console.log(`Conectando a: ${cleanModelName}`);

  // PROMPT DE ALTA ESTRATEGIA (Sicurezza)
  const systemPrompt = `
    Eres el Director de Estrategia de 'Sicurezza'. Genera un informe de seguridad técnico y premium.
    
    DATOS:
    - Propiedad: ${data.propertyType}
    - Nivel: ${data.securityLevel}
    - Ubicación: ${barrioClean}, ${municipioClean}
    
    Responde estrictamente en formato JSON con esta estructura:
    {
      "title": "Título imponente",
      "analysis": "Análisis de 4 líneas sobre riesgos específicos en ${barrioClean}",
      "recommendations": ["Recomendación técnica 1", "Recomendación técnica 2", "Recomendación técnica 3"],
      "closing": "Frase de cierre profesional"
    }
    `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: systemPrompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1000,
          responseMimeType: "application/json",
        },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      })
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("El sistema está saturado (Quota Exceeded). Por favor intente en un minuto.");
      }
      const errorText = await response.text();
      console.error("Error REAL de la API:", errorText);
      throw new Error(`Fallo en la API de Google (${response.status})`);
    }

    const json = await response.json();
    console.log("DEBUG: Respuesta API", json);

    let resultText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!resultText) {
      if (json.candidates?.[0]?.finishReason === "SAFETY") {
        throw new Error("Contenido bloqueado por seguridad.");
      }
      throw new Error("No hay respuesta de la IA.");
    }

    // EXTRAER JSON: Buscar el primer '{' y el último '}'
    const startIndex = resultText.indexOf('{');
    const endIndex = resultText.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) {
      console.error("No se detectó JSON:", resultText);
      throw new Error("Formato de respuesta inválido.");
    }

    const jsonSnippet = resultText.substring(startIndex, endIndex + 1);

    try {
      return JSON.parse(jsonSnippet);
    } catch (e) {
      // Intento final: limpiar caracteres invisibles
      try {
        const cleaned = jsonSnippet.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
        return JSON.parse(cleaned);
      } catch (inner) {
        throw new Error("Error de estructura en la respuesta.");
      }
    }

  } catch (error: any) {
    console.error("Error en servicio IA:", error.message);
    throw error;
  }
};