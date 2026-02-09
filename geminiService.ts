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
  if (!API_KEY) {
    console.error("API KEY NO ENCONTRADA");
    throw new Error("Clave de API no configurada.");
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
    Eres el Director de Estrategia de 'Sicurezza'. No eres un chatbot genérico. Eres un consultor de seguridad de élite para el 1% de Antioquia.
    
    DATOS DEL OBJETIVO:
    - Propiedad: ${data.propertyType}
    - Nivel Solicitado: ${data.securityLevel}
    - Ubicación: ${barrioClean}, ${municipioClean}
    
    REGLAS DE ORO DE ESCRITURA:
    1. TONO: Hiper-profesional, clínico y premium. Cero clichés. Cero exclamaciones.
    2. VARIABILIDAD: Cada diagnóstico debe ser único. Prohibido usar frases de plantilla como "hemos detectado un aumento".
    3. ESPECIFICIDAD: Si el nivel es III, habla de delincuencia común y semi-organizada. Si es IV+, habla de ataques de alto perfil, secuestro o blindaje militar.
    4. CONTEXTO LOCAL: 
       - Si es un barrio popular o de alta densidad (ej. ${barrioClean}): Habla de oportunismo, asonadas y vulnerabilidad en accesos rápidos.
       - Si es Poblado/Envigado/Laureles: Habla de inteligencia criminal, inhibidores de señal y vulnerabilidad de servicio doméstico.
       - Si es Oriente/Campestre: Habla de aislamiento, tiempos de reacción de la policía (>15 min) y vulnerabilidad perimetral.

    ESTRUCTURA TÉCNICA OBLIGATORIA (JSON):
    - "title": Un título imponente y personalizado para ${municipioClean}.
    - "analysis": Un párrafo de 4 líneas que explique POR QUÉ esa propiedad en ${barrioClean} es un blanco hoy. Sé creativo y crudo.
    - "recommendations": 3 puntos técnicos específicos que NO sean "poner una puerta". Habla de "anclajes estructurales", "cristalería de policarbonato laminado", "marcos de acero balístico", "cerraduras biométricas de grado militar", etc.
    - "closing": Una frase final que genere urgencia sin perder la clase.

    Responde SOLO el JSON.
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
          temperature: 0.9, // Aumentamos la creatividad
          topP: 0.95,
          maxOutputTokens: 1000,
        }
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

    if (json.promptFeedback?.blockReason) {
      throw new Error(`La consulta fue bloqueada por políticas de seguridad: ${json.promptFeedback.blockReason}`);
    }

    let resultText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      if (json.candidates?.[0]?.finishReason === "SAFETY") {
        throw new Error("La IA bloqueó la respuesta por motivos de seguridad. Intente con otros términos.");
      }
      console.error("Respuesta de IA vacía o nula:", json);
      throw new Error("La IA no generó una respuesta válida.");
    }

    // EXTRAER JSON: Buscamos el primer '{' y el último '}' por si la IA agregó texto extra
    const startIdx = resultText.indexOf('{');
    const endIdx = resultText.lastIndexOf('}');

    if (startIdx === -1 || endIdx === -1) {
      console.error("La IA no devolvió un formato JSON válido:", resultText);
      throw new Error("Formato de respuesta inválido.");
    }

    const cleanJson = resultText.substring(startIdx, endIdx + 1);

    try {
      return JSON.parse(cleanJson);
    } catch (e) {
      console.error("Error al parsear el JSON extraído:", cleanJson);
      throw new Error("Error en la estructura de la respuesta.");
    }

  } catch (error: any) {
    console.error("Error crítico en getSecurityAdvice:", error.message);
    throw error;
  }
};