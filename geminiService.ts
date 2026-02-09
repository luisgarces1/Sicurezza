// geminiService.ts - Motor de Análisis Determinista v2.0 (10 Escenarios Elite)

export const getSecurityAdvice = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 2200));

  const barrio = data.barrio || "su sector";
  const municipio = data.municipio || "Antioquia";
  const nivel = data.securityLevel || "Nivel III";
  const propiedad = data.propertyType || "APARTAMENTO";

  // Base de datos expandida a 10 escenarios maestros
  const templates: Record<string, any> = {
    // 1. NIVEL IV+ (Máxima categoría)
    nivelIV: {
      title: "PROTOCOLO DE SEGURIDAD ESTATAL (NIVEL IV+)",
      analysis: `El análisis de riesgo para ${barrio} indica que la amenaza de intrusión ha escalado a técnicas de impacto cinético. En ${municipio}, el Nivel IV+ es la respuesta definitiva: una barrera impenetrable diseñada para resistir asaltos prolongados con herramientas industriales y balística pesada.`,
      recommendations: [
        "Estructura interna en acero al boro con blindaje certificado BR6",
        "Sistema de cerrojos activos en las 4 caras del marco",
        "Control de acceso mediante reconocimiento de venas dactilares"
      ],
      closing: "Para activos que no permiten margen de error."
    },
    // 2. EL POBLADO / PROVENZA
    poblado: {
      title: "INTELIGENCIA DE BLINDAJE: SECTOR EL POBLADO",
      analysis: `La densificación de ${barrio} ha generado un perfil de riesgo basado en el 'marcaje' previo. Para su propiedad en ${municipio}, detectamos que la vulnerabilidad principal es el acceso mediante duplicado de llaves o ataques silenciosos al cilindro.`,
      recommendations: [
        "Cilindro de alta seguridad KESO 8000Ω² (Incopiable)",
        "Escudo protector de acero fundido con rotor anti-taladro",
        "Acabado en madera noble con tratamiento ignífugo"
      ],
      closing: "Excelencia técnica para el perfil más exigente de Medellín."
    },
    // 3. LLANOGRANDE / RETIRO (Fincas Grandes)
    llanogrande: {
      title: "SEGURIDAD PERIMETRAL PARA CASAS DE CAMPO",
      analysis: `Las propiedades extensas en ${municipio} enfrentan el riesgo de aislamiento. En ${barrio}, la respuesta táctica de Sicurezza se enfoca en retardar la intrusión lo suficiente para que los sistemas de respuesta se activen, convirtiendo su puerta en un búnker de refugio.`,
      recommendations: [
        "Marco autoportante reforzado para anclaje en estructura de campo",
        "Sistema de pánico interior con bloqueo total inmediato",
        "Vidrio espía reforzado para verificación visual sin exposición"
      ],
      closing: "Paz absoluta en la tranquilidad de su hogar campestre."
    },
    // 4. LAURELES / BELÉN (Tradicional)
    laureles: {
      title: "ACTUALIZACIÓN ESTRUCTURAL: SECTOR TRADICIONAL",
      analysis: `En sectores como ${barrio}, las estructuras de las casas suelen ser robustas pero sus accesos originales son obsoletos. En ${municipio}, la ingeniería de Sicurezza integra tecnología de punta en la estética clásica de su fachada.`,
      recommendations: [
        "Anclaje estructural mediante expansión química en muros antiguos",
        "Puntos de cierre multidireccionales ocultos",
        "Aislamiento acústico de 45dB para confort total"
      ],
      closing: "Tradición y tecnología en perfecta armonía."
    },
    // 5. ENVIGADO / SABANETA (Nuevos Desarrollos)
    envigado: {
      title: "BLINDAJE PARA TORRES DE ALTA DISPONIBILIDAD",
      analysis: `Los nuevos desarrollos en ${barrio} presentan marcos de puerta estándar que ceden ante palancas simples. Para su residencia en ${municipio}, proponemos un sistema que rigidiza la apertura y neutraliza cualquier intento de deformación del marco.`,
      recommendations: [
        "Núcleo de acero estructural de 2.5mm con refuerzos horizontales",
        "Bisagras invisibles de alta carga con pivote anti-palanca",
        "Cerradura inteligente con gestión de accesos vía smartphone"
      ],
      closing: "Protección moderna para el estilo de vida contemporáneo."
    },
    // 6. APARTAMENTO NIVEL III+
    aptIIIPlus: {
      title: "ANÁLISIS DE RESISTENCIA BALÍSTICA URBANA",
      analysis: `Su elección de Nivel III+ para este apartamento en ${barrio} es estratégica. En ${municipio}, blindar contra armas cortas y ataques violentos es una inversión en estabilidad familiar ante el crecimiento de la inseguridad urbana.`,
      recommendations: [
        "Blindaje balístico certificado Nivel III-A",
        "Sistema central de mandos con 12 bulones de acero",
        "Ojo de buey digital con visión nocturna y grabación"
      ],
      closing: "Seguridad sin sacrificar la elegancia de su hogar."
    },
    // 7. CASA NIVEL III+ (Fuerzas Combinadas)
    casaIIIPlus: {
      title: "SISTEMA INTEGRAL DE PROTECCIÓN RESIDENCIAL",
      analysis: `Las casas en ${barrio} requieren un enfoque 360°. Al estar en ${municipio}, su seguridad depende de una puerta que funcione como el corazón de un sistema defensivo, resistiendo ataques de mazos, palancas y herramientas eléctricas.`,
      recommendations: [
        "Doble lámina de acero galvanizado con relleno de lana de roca",
        "Anclaje de seguridad invertido hacia el interior de la baldosa",
        "Cubre-juntas de seguridad anti-barreta"
      ],
      closing: "Un escudo impenetrable diseñado para durar décadas."
    },
    // 8. RIESGO ESPECÍFICO DE COPIA (Zona Comercial/Alta Rotación)
    riesgoCopia: {
      title: "CONTROL DE ACCESO Y SEGURIDAD MECATRÓNICA",
      analysis: `Hemos detectado que en ${barrio}, el robo mediante 'llave maestra' es la tendencia principal. En ${municipio}, Sicurezza recomienda eliminar el riesgo humano mediante sistemas de llaves incopiables protegidas por patentes internacionales.`,
      recommendations: [
        "Cerradura italiana CISA con sistema de re-codificación",
        "Protector de cilindro magnético con apertura de seguridad",
        "Tarjeta de propiedad exclusiva para solicitud de llaves"
      ],
      closing: "Usted es el único que tiene el control de su entrada."
    },
    // 9. EMERGENCIA Y UPGRADE (Refuerzo)
    refuerzo: {
      title: "INFORME DE REFUERZO DE SEGURIDAD PRIORITARIO",
      analysis: `Si ha sentido vulnerabilidad en ${barrio}, su instinto es correcto. Las estadísticas en ${municipio} muestran que una puerta reforzada previene el 98% de los intentos de intrusión oportunista en este tipo de propiedades.`,
      recommendations: [
        "Instalación de blindaje sobre estructura existente (Opcional)",
        "Refuerzo de marco con pletina de acero templado",
        "Segunda cerradura de alta seguridad independiente"
      ],
      closing: "No espere a que suceda; prevenga con ingeniería."
    },
    // 10. ESTÁNDAR SICUREZZA (La base del lujo)
    estandar: {
      title: "ESTÁNDAR DE INGENIERÍA ARQUITECTÓNICA",
      analysis: `Incluso nuestra configuración base supera cualquier estándar del mercado. En ${barrio}, ${municipio}, su propiedad destacará no solo por su belleza, sino por la solidez que solo el acero estructural y el diseño Sicurezza pueden ofrecer.`,
      recommendations: [
        "Certificación de calidad Sicurezza en cada componente",
        "Acabados personalizados en pintura electrostática o madera",
        "Garantía extendida de 10 años en estructura"
      ],
      closing: "Bienvenido al mundo de la tranquilidad absoluta."
    }
  };

  // Lógica de Selección refinada (10 pasos)
  let selected = templates.estandar;

  const b = barrio.toLowerCase();
  const m = municipio.toLowerCase();

  // 1. Nivel IV+ es prioridad absoluta
  if (nivel.includes("IV+")) {
    selected = templates.nivelIV;
  }
  // 2. Poblado / Provenza
  else if (b.includes("poblado") || b.includes("provenza") || b.includes("tesoro")) {
    selected = templates.poblado;
  }
  // 3. Llanogrande / Retiro
  else if (b.includes("llano") || m.includes("retiro") || m.includes("rionegro") || m.includes("ceja")) {
    selected = templates.llanogrande;
  }
  // 4. Laureles / Belén
  else if (b.includes("laureles") || b.includes("belen") || b.includes("conquistadores")) {
    selected = templates.laureles;
  }
  // 5. Envigado / Sabaneta
  else if (m.includes("envigado") || m.includes("sabaneta") || b.includes("estrella")) {
    selected = templates.envigado;
  }
  // 6. Casa III+
  else if (propiedad === "CASA / FINCA" && nivel.includes("III+")) {
    selected = templates.casaIIIPlus;
  }
  // 7. Apt III+
  else if (propiedad === "APARTAMENTO" && nivel.includes("III+")) {
    selected = templates.aptIIIPlus;
  }
  // 8. Zonas de alta rotación (Estadios, centros, etc.)
  else if (b.includes("centro") || b.includes("estadio") || b.includes("la 70")) {
    selected = templates.riesgoCopia;
  }
  // 9. Fallback casa
  else if (propiedad === "CASA / FINCA") {
    selected = templates.refuerzo;
  }
  // 10. Fallback apartamento (Estandar ya es el default inicial)

  return {
    title: selected.title,
    analysis: selected.analysis,
    recommendations: selected.recommendations,
    closing: selected.closing
  };
};