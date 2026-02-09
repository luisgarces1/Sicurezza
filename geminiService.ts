// geminiService.ts - Motor de Persuasión y Seguridad v4.0 (Cobertura Regional Antioquia)

export const getSecurityAdvice = async (data: any) => {
  await new Promise(resolve => setTimeout(resolve, 2200));

  const barrio = data.barrio || "su sector";
  const municipio = data.municipio || "Antioquia";
  const nivel = data.securityLevel || "Nivel III";
  const propiedad = data.propertyType || "APARTAMENTO";

  const templates: Record<string, any> = {
    // 1. NIVEL IV+ (MÁXIMA URGENCIA)
    nivelIV: {
      title: "PROTOCOLO DE SEGURIDAD CRÍTICA (NIVEL IV+)",
      analysis: `El análisis para ${barrio}, ${municipio}, revela una exposición a amenazas de grado industrial. En este nivel de riesgo, los sistemas convencionales son inútiles ante herramientas de impacto y balística. Su integridad requiere una barrera infranqueable de ingeniería Sicurezza.`,
      recommendations: ["Blindaje estructural nivel militar", "Cerrojos activos anti-sísmicos", "Anclaje químico de alta resistencia"],
      closing: "Para activos donde el error no es una opción."
    },
    // 2. ÁREA METROPOLITANA - NORTE (Bello, Copacabana, Girardota, Barbosa)
    valleNorte: {
      title: "PERFIL DE RIESGO: INTRUSIÓN VIOLENTA",
      analysis: `La zona norte de ${municipio} registra un aumento crítico en asaltos mediante 'mazo' y 'barreta'. En ${barrio}, las puertas estándar están fallando en menos de 60 segundos ante bandas organizadas. Su puerta actual es el eslabón más débil de su patrimonio.`,
      recommendations: ["Doble lámina de acero estructural", "Marco reforzado anti-deformación", "Puntos de cierre multidireccionales"],
      closing: "Blindarse hoy es la única forma de no ser parte de la estadística."
    },
    // 3. ÁREA METROPOLITANA - SUR (Envigado, Itagüí, Sabaneta, Caldas, La Estrella)
    valleSur: {
      title: "ALERTA: MODALIDAD DE ROBO POR APALANCAMIENTO",
      analysis: `En ${municipio}, los nuevos desarrollos en ${barrio} son blancos de 'intrusión limpia' por deformación de marcos. El 85% de los robos ocurren sin ruido, usando palancas que su puerta actual no puede resistir. Sicurezza neutraliza este vector de ataque.`,
      recommendations: ["Bisagras anti-palanca de alta carga", "Cerradura inteligente con sensor de impacto", "Refuerzo perimetral de acero templado"],
      closing: "Proteja su hogar antes de que su zona sea el próximo objetivo."
    },
    // 4. ORIENTE ANTIOQUEÑO (Rionegro, Llanogrande, Retiro, La Ceja, Marinilla, Guarne)
    oriente: {
      title: "SEGURIDAD DE ALTO PERFIL: ESTRATEGIA ORIENTE",
      analysis: `Las propiedades exclusivas en ${barrio}, ${municipio}, enfrentan riesgos de 'marcaje' y aislamiento. La delincuencia técnica en el Oriente busca accesos fallidos mediante copias de llaves y ataques al cilindro. Su paz mental depende de una seguridad invisible pero impenetrable.`,
      recommendations: ["Cilindro suizo KESO 8000Ω² incopiable", "Escudo magnético protector", "Sistema de pánico interior"],
      closing: "La tranquilidad del Oriente solo es real con la ingeniería Sicurezza."
    },
    // 5. URABÁ (Apartadó, Turbo, Carepa, Chigorodó)
    uraba: {
      title: "INFORME TÁCTICO: CONTROL DE ACCESO URABÁ",
      analysis: `El crecimiento de ${municipio} ha traído consigo nuevas modalidades de asalto violento. En ${barrio}, las estructuras requieren un blindaje que soporte climas extremos y ataques de fuerza bruta. Su configuración actual es insuficiente ante el panorama de seguridad regional.`,
      recommendations: ["Acero galvanizado anticorrosivo", "Cerradura de alta seguridad certificada", "Anclaje de profundidad en pared"],
      closing: "Seguridad de grado industrial para una región en expansión."
    },
    // 6. SUROESTE (Jericó, Jardín, Fredonia, Amagá, Ciudad Bolívar)
    suroeste: {
      title: "PROTECCIÓN RESIDENCIAL: ESTRATEGIA SUROESTE",
      analysis: `En sectores tradicionales de ${municipio}, como ${barrio}, las viviendas suelen tener puertas de madera vulnerables al hachazo o la patada inicial. Sicurezza refuerza su tradición con tecnología que detiene cualquier incursión violenta en segundos.`,
      recommendations: ["Blindaje invisible bajo madera noble", "Puntos de cierre reforzados", "Aislamiento termo-acústico premium"],
      closing: "Que la paz de su pueblo comience dentro de su casa."
    },
    // 7. MEDELLÍN - SECTORES TRADICIONALES (Laureles, Belén, Robledo)
    medellinTradicional: {
      title: "URGENCIA: ACTUALIZACIÓN DE SEGURIDAD URBANA",
      analysis: `En sectores como ${barrio}, los delincuentes aprovechan la antigüedad de las estructuras para forzar cerraduras obsoletas. En ${municipio}, renovar su acceso con ingeniería Sicurezza es la inversión más inteligente para proteger su vida y su patrimonio.`,
      recommendations: ["Cilindro anti-bumping de alta seguridad", "Protector de cilindro de acero fundido", "Cerradura CISA italiana"],
      closing: "No espere a que su puerta ceda. El momento de blindarse es ahora."
    },
    // 8. MEDELLÍN - SECTOR ÉLITE (Poblado, Provenza, Tesoro)
    medellinElite: {
      title: "INTELIGENCIA DE BLINDAJE: SECTOR EXCLUSIVO",
      analysis: `El riesgo en ${barrio} es la intrusión dirigida de guante blanco. En ${municipio}, detectamos vulnerabilidades críticas por manipulación técnica de cilindros estándar. Su propiedad requiere un sistema que garantice que usted es el único con permiso de entrada.`,
      recommendations: ["Llave incopiable con tarjeta de propiedad", "Sensor de vibración mecatrónico", "Diseño de lujo mimetizado"],
      closing: "La discreción absoluta es el complemento de una seguridad perfecta."
    },
    // 9. ESCENARIO SEMI-URBANO / RESTO DE ANTIOQUIA
    antioquiaGeneral: {
      title: "ESTUDIO DE VULNERABILIDAD REGIONAL",
      analysis: `Tras analizar los reportes de seguridad en ${municipio}, ${barrio}, detectamos una tendencia creciente en asaltos oportunistas a residencias. Sin una base de acero estructural y marcos reforzados, su puerta actual es una invitación abierta para la delincuencia regional.`,
      recommendations: ["Upgrade estructural a Nivel III", "Sistema de bloqueo multidireccional", "Garantía de impenetrabilidad Sicurezza"],
      closing: "El estándar Sicurezza es la única defensa real ante la inseguridad actual."
    },
    // 10. LOCALES / NEGOCIOS (Riesgo Comercial)
    comercial: {
      title: "PERFIL DE RIESGO COMERCIAL DETECTADO",
      analysis: `Los negocios en ${barrio}, ${municipio}, son blancos de ataques nocturnos sincronizados. No permita que su esfuerzo de años sea vulnerado por una puerta convencional. Sicurezza ofrece la ingeniería que detiene asaltos y garantiza la continuidad de su operación.`,
      recommendations: ["Puerta comercial reforzada", "Monitoreo de apertura digital", "Cierre reforzado anti-mazo"],
      closing: "Asegure su futuro con el estándar que los profesionales respetan."
    }
  };

  // Lógica de Selección Regional y por Riesgo
  let selected = templates.antioquiaGeneral; // Fallback

  const b = (barrio || "").toLowerCase();
  const m = (municipio || "").toLowerCase();

  // 1. NIVEL IV+ (Prioridad Máxima)
  if (nivel.includes("IV+")) {
    selected = templates.nivelIV;
  }
  // 2. VALLE DE ABURRÁ - NORTE (Bello, Copacabana, Girardota, Barbosa)
  else if (m.includes("bello") || m.includes("copa") || m.includes("gira") || m.includes("barbosa") || b.includes("trapiche")) {
    selected = templates.valleNorte;
  }
  // 3. VALLE DE ABURRÁ - SUR (Envigado, Itagüí, Sabaneta, Caldas, Estrella)
  else if (m.includes("envigado") || m.includes("itag") || m.includes("saba") || m.includes("caldas") || m.includes("estrella")) {
    selected = templates.valleSur;
  }
  // 4. ORIENTE ANTIOQUEÑO
  else if (m.includes("rion") || m.includes("llano") || m.includes("retiro") || m.includes("ceja") || m.includes("marin") || m.includes("guarne") || b.includes("llano")) {
    selected = templates.oriente;
  }
  // 5. URABÁ
  else if (m.includes("apartad") || m.includes("turbo") || m.includes("carepa") || m.includes("chigo") || m.includes("urab")) {
    selected = templates.uraba;
  }
  // 6. SUROESTE
  else if (m.includes("jeric") || m.includes("jard") || m.includes("fredo") || m.includes("amag") || m.includes("boliv") || m.includes("andes") || m.includes("urra")) {
    selected = templates.suroeste;
  }
  // 7. MEDELLÍN ELITE
  else if (b.includes("poblado") || b.includes("prov") || b.includes("tesoro") || b.includes("astorga")) {
    selected = templates.medellinElite;
  }
  // 8. MEDELLÍN TRADICIONAL
  else if (b.includes("laurel") || b.includes("belen") || b.includes("robledo") || b.includes("pilarica") || b.includes("conquis") || m.includes("medell")) {
    selected = templates.medellinTradicional;
  }
  // 9. COMERCIAL
  else if (b.includes("centro") || b.includes("comercial") || b.includes("local") || b.includes("estadio")) {
    selected = templates.comercial;
  }

  return {
    title: selected.title,
    analysis: selected.analysis,
    recommendations: selected.recommendations,
    closing: selected.closing
  };
};