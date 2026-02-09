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
  const rawModelName = await getBestAvailableModel(API_KEY);
  const cleanModelName = rawModelName.replace("models/", ""); // La API de generación requiere solo el nombre corto a veces, pero v1beta suele aceptar ambos. Usamos limpieza para asegurar.

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModelName}:generateContent?key=${API_KEY}`;

  console.log(`Conectando a: ${cleanModelName}`);

  // PROMPT DE ALTA ESTRATEGIA (Sicurezza)
  const systemPrompt = `
    Eres el Director de Estrategia de 'Sicurezza'. No eres un chatbot genérico. Eres un consultor de seguridad de élite para el 1% de Antioquia.
    
    DATOS DEL OBJETIVO:
    - Propiedad: ${data.propertyType}
    - Nivel Solicitado: ${data.securityLevel}
    - Ubicación: ${data.barrio}, ${data.municipio}
    
    REGLAS DE ORO DE ESCRITURA:
    1. TONO: Hiper-profesional, clínico y premium. Cero clichés. Cero exclamaciones.
    2. VARIABILIDAD: Cada diagnóstico debe ser único. Prohibido usar frases de plantilla como "hemos detectado un aumento".
    3. ESPECIFICIDAD: Si el nivel es III, habla de delincuencia común y semi-organizada. Si es IV+, habla de ataques de alto perfil, secuestro o blindaje militar.
    4. CONTEXTO LOCAL: 
       - Si es un barrio popular o de alta densidad: Habla de oportunismo, asonadas y vulnerabilidad en accesos rápidos.
       - Si es Poblado/Envigado/Laureles: Habla de inteligencia criminal, inhibidores de señal y vulnerabilidad de servicio doméstico.
       - Si es Oriente/Campestre: Habla de aislamiento, tiempos de reacción de la policía (>15 min) y vulnerabilidad perimetral.

    ESTRUCTURA TÉCNICA OBLIGATORIA (JSON):
    - "title": Un título imponente y personalizado.
    - "analysis": Un párrafo de 4 líneas que explique POR QUÉ esa propiedad en ese lugar es un blanco hoy. Sé creativo y crudo.
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
    let resultText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resultText) {
      throw new Error("La IA no generó texto.");
    }

    // LIMPIEZA: Eliminamos posibles bloques de markdown
    resultText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();

    // Parseamos el texto JSON
    return JSON.parse(resultText);

  } catch (error) {
    console.error("Error grave en el servicio:", error);
    throw error;
  }
};