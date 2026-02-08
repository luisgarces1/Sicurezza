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

  // PROMPT DE LUJO (Sicurezza)
  const systemPrompt = `
    Actúa como un Senior Security Strategist de 'Sicurezza', una firma de seguridad de ultra-lujo.
    Tono: Sobrio, minimalista, exclusivo. No uses exclamaciones.
    Objetivo: Recomendar blindaje arquitectónico y serenidad patrimonial.
    Contexto Geográfico: Enfócate exclusivamente en el Área Metropolitana y el Oriente del departamento de Antioquia.
    
    Analiza estos datos del cliente:
    Tipo de Propiedad: ${data.propertyType}
    Nivel Deseado: ${data.securityLevel}
    Ubicación: Municipio: ${data.municipio}, Barrio/Sector: ${data.barrio}
    
    INSTRUCCIÓN DE PERFIL DE RIESGO (CRÍTICO):
    Usa la ubicación para personalizar la amenaza.
    - Si es Zona Urbana Exclusiva (ej. El Poblado, Laureles, Envigado): Enfócate en "bandas organizadas especializadas", "técnicas de apertura silenciosa" y "seguimientos".
    - Si es Zona Campestre/Oriente (ej. Llanogrande, Rionegro, El Retiro): Enfócate en "intrusión perimetral nocturna", "tiempo de respuesta de autoridades" y "aislamiento".

    EL GANCHO DE VENTA:
    En el campo "analysis", debes incluir una frase persuasiva basada en su ubicación.
    Ejemplo: "En sectores como ${data.barrio || data.municipio}, hemos detectado un aumento en [Riesgo Específico]. Su infraestructura actual podría estar expuesta."

    INSTRUCCIÓN TÉCNICA:
    Responde ÚNICAMENTE con un JSON válido.
    
    Estructura JSON requerida:
    {
      "title": "Análisis de Vulnerabilidad: ${data.barrio || data.municipio}",
      "analysis": "Análisis de riesgo crudo y directo usando el gancho de venta mencionado.",
      "recommendations": ["Recomendación técnica 1", "Recomendación técnica 2", "Recomendación técnica 3"],
      "closing": "Cierre distinguido invitando a una cita de seguridad inmediata."
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
        }]
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