// geminiService.ts - Motor de Persuasión Ultra-Dinámico v5.0 (40+ Escenarios)

export const getSecurityAdvice = async (data: any) => {
  // Simulación de "pensamiento" de la IA para realismo
  await new Promise(resolve => setTimeout(resolve, 2500));

  const b = (data.barrio || "").toLowerCase();
  const m = (data.municipio || "").toLowerCase();
  const nivel = data.securityLevel || "Nivel III";
  const propiedad = data.propertyType || "APARTAMENTO";

  // Función para obtener un elemento aleatorio de un array
  const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

  // --- BASE DE DATOS MASIVA DE PLANTILLAS ---
  const database: Record<string, any[]> = {
    // 1. VALLE NORTE (Bello, Copacabana, Girardota, Barbosa) - Enfoque: Fuerza bruta/Mazos
    valleNorte: [
      {
        title: "ALERTA TÁCTICA: INCURSIÓN POR IMPACTO",
        analysis: `Nuestros registros en ${m} indican un pico de ataques con mazos de 10lb en sectores como ${b}. Su seguridad actual fallará en menos de 45 segundos ante esta modalidad de impacto extremo.`,
        recommendations: ["Núcleo de acero estructural 1010", "Marco reforzado con anclaje químico inverso", "Vidrio balístico de inspección SG-3"],
        closing: "Blindarse no es una opción, es una necesidad de supervivencia urbana."
      },
      {
        title: "INFORME DE VULNERABILIDAD: SECTOR NORTE",
        analysis: `Bandas organizadas en ${b} están utilizando gatos hidráulicos para deformar marcos estándar de apartamentos. En ${m}, su propiedad es un blanco fácil si no cuenta con una estructura que resista 4 toneladas de presión.`,
        recommendations: ["Sistema de 18 bulones activos", "Bisagras de alta carga anti-cizalla", "Chasis de acero al manganeso"],
        closing: "Proteja lo que más ama con ingeniería de grado militar."
      },
      {
        title: "DIAGNÓSTICO DE RIESGO: ASALTO VIOLENTO",
        analysis: `La modalidad de 'barreta' ha evolucionado en ${m}. En ${b}, detectamos que los marcos de madera u hoja sencilla son vulnerados sin ruido mediante el desgarro de la lamina. Sicurezza neutraliza este vector de ataque.`,
        recommendations: ["Doble lámina de acero galvanizado", "Protector de cilindro magnético", "Sistema de pánico interior"],
        closing: "La tranquilidad en el norte de Aburrá tiene un solo nombre: Sicurezza."
      },
      {
        title: "PERFIL DE AMENAZA: ZONA INDUSTRIAL/RESIDENCIAL",
        analysis: `La cercanía a vías principales en ${b} facilita la huida rápida de intrusos. En ${m}, las puertas de 'seguridad comercial' no ofrecen resistencia real ante un ataque coordinado. Usted necesita un búnker autónomo.`,
        recommendations: ["Anclaje perimetral de 12 puntos", "Cerradura CISA italiana de doble mapa", "Garantía de impenetrabilidad certificada"],
        closing: "Prevenga el siniestro con la mejor ingeniería de Antioquia."
      },
      {
        title: "ALERTA DE SEGURIDAD ESTRUCTURAL",
        analysis: `Tras auditar la zona de ${b}, confirmamos que el 90% de los apartamentos en ${m} tienen el mismo error: marcos que no están anclados a la losa. Un golpe seco y su entrada queda libre.`,
        recommendations: ["Inyección de hormigón en marco perimetral", "Pletina anti-palanca de 5mm", "Cerradura de alta seguridad certificada"],
        closing: "No espere a ser la próxima noticia. Asegure hoy."
      }
    ],

    // 2. VALLE SUR (Envigado, Itagüí, Sabaneta, Caldas, Estrella) - Enfoque: Deformación/Palanca
    valleSur: [
      {
        title: "ALERTA: MODALIDAD DE ROBO POR APALANCAMIENTO",
        analysis: `En ${m}, los delincuentes en ${b} se especializan en la 'deformación limpia'. Sin hacer ruido, usan palancas mecánicas que doblan su puerta actual como papel. Usted necesita rigidez estructural absoluta.`,
        recommendations: ["Refuerzos internos en forma de Omega", "Cerradura de 3 puntos con bloqueo de motor", "Bisagras invisibles de alta resistencia"],
        closing: "En el sur, la elegancia de su hogar debe ser tan fuerte como el acero."
      },
      {
        title: "INFORME DE INTELIGENCIA: SECTOR SUR",
        analysis: `Los nuevos proyectos en ${b} sacrifican seguridad por estética. En ${m}, detectamos un aumento en el uso de 'llaves maestras' y manipulación de cilindros originales. Su acceso actual es una vulnerabilidad crítica.`,
        recommendations: ["Cilindro KESO 8000Ω² incopiable", "Escudo protector de acero fundido", "Monitoreo de apertura vía App"],
        closing: "Seguridad inteligente para el sector con mayor desarrollo del Valle."
      },
      {
        title: "DIAGNÓSTICO DE VULNERABILIDAD RESIDENCIAL",
        analysis: `En ${b}, ${m}, la seguridad perimetral de las torres es burlada fácilmente. La última línea de defensa es su puerta, y la suya actual no resistirá un ataque técnico de más de 2 minutos.`,
        recommendations: ["Blindaje Nivel III-A Certificado", "Marco autoportante de alta seguridad", "Sistema de cierre automático"],
        closing: "Eleve su estándar de tranquilidad al nivel Sicurezza."
      },
      {
        title: "PERFIL DE AMENAZA: INTRUSIÓN SILENCIOSA",
        analysis: `Detectamos en ${b} una tendencia de robos nocturnos mientras los residentes duermen. En ${m}, la apertura silenciosa de cerraduras estándar es el método preferido. Bloquee este acceso con tecnología Sicurezza.`,
        recommendations: ["Cerradura biométrica con cifrado bancario", "Sensores de vibración inteligentes", "Aislamiento acústico reflexivo"],
        closing: "Su familia merece dormir con la certeza de una protección total."
      },
      {
        title: "ALERTA DE SEGURIDAD: ZONA EXCLUSIVA SUR",
        analysis: `El valor de sus activos en ${b} lo convierte en un objetivo. En ${m}, el blindaje no es un lujo, es la base de su gestión de riesgos. Nuestros sistemas son diseñados para neutralizar al delincuente profesional.`,
        recommendations: ["Acabados personalizados en madera noble", "Chasis de acero estructural 2.5mm", "Garantía de por vida en estructura"],
        closing: "Invierta en el activo más valioso: su seguridad."
      }
    ],

    // 3. ORIENTE (Rionegro, Llanogrande, Retiro, Ceja, etc.) - Enfoque: Marcaje/Aislamiento
    oriente: [
      {
        title: "ESTRATEGIA DE SEGURIDAD: ORIENTE ANTIOQUEÑO",
        analysis: `Las propiedades en ${m}, especialmente en ${b}, enfrentan el riesgo de aislamiento táctico. Los intrusos buscan viviendas con accesos de madera estándar para realizar asaltos rápidos y violentos.`,
        recommendations: ["Blindaje mimetizado de alta resistencia", "Cerradura mecatrónica con control remoto", "Sistema de pánico y bloqueo inmediato"],
        closing: "Que la paz del Oriente sea el único ruido en su hogar."
      },
      {
        title: "ALERTA: RIESGO DE ASALTO EN ZONA CAMPESTRE",
        analysis: `En ${b}, detectamos que las puertas de servicio y principales en ${m} son el punto de entrada preferido por bandas rurales. Una puerta Sicurezza actúa como un escudo impenetrable que retarda la intrusión.`,
        recommendations: ["Anclaje profundo en estructura de concreto", "Sistema multidireccional de 12 bulones", "Cilindro con tarjeta de propiedad exclusiva"],
        closing: "Su búnker personal en medio de la naturaleza."
      },
      {
        title: "INFORME TÁCTICO: SECTOR LLANOGRANDE / RETIRO",
        analysis: `Debido al perfil de las propiedades en ${b}, ${m}, la principal amenaza es el 'marcaje' por parte de personal externo. Necesita un control total de quién entra y una puerta que nadie pueda abrir sin su permiso.`,
        recommendations: ["Cerradura digital con auditoría de eventos", "Puntos de cierre pasivos anti-barreta", "Diseño de ultra-lujo a medida"],
        closing: "Seguridad de élite para su residencia de prestigio."
      },
      {
        title: "DIAGNÓSTICO DE VULNERABILIDAD: CASAS INDEPENDIENTES",
        analysis: `Las casas en ${m} en sectores abiertos como ${b} no tienen la protección de una portería 24/7. Su puerta es su única defensa real contra el crimen de alto impacto.`,
        recommendations: ["Lámina interna de acero al boro", "Bisagras reforzadas con pivotes de acero", "Cierre reforzado anti-mazo"],
        closing: "Protección absoluta donde el estado no llega."
      },
      {
        title: "ALERTA DE SEGURIDAD: ZONA DE ALTO PERFIL ORIENTE",
        analysis: `En ${b}, el robo de activos de lujo está en aumento. En ${m}, los delincuentes ya conocen cómo vulnerar las marcas tradicionales. Solo Sicurezza ofrece una arquitectura de defensa real.`,
        recommendations: ["Blindaje certificado Nivel III+", "Escudo magnético de doble seguridad", "Acabados en pintura electrostática"],
        closing: "Eleve su seguridad al nivel de su éxito."
      }
    ],

    // 4. MEDELLÍN ÉLITE (Poblado, Provenza, Tesoro) - Enfoque: Guante Blanco/Técnico
    medellinElite: [
      {
        title: "ESTRATEGIA DE BLINDAJE: SECTOR EL POBLADO",
        analysis: `En ${b}, la amenaza no es el ruido, es la técnica. En ${m}, los delincuentes de 'guante blanco' abren su puerta actual en segundos usando impresionismo o llaves clonadas. Usted necesita tecnología incopiable.`,
        recommendations: ["Cilindro suizo KESO 8000Ω²", "Chapa de acero al manganeso anti-taladro", "Sistema mecatrónico de detección"],
        closing: "La exclusividad de Sicurezza es su mejor escudo."
      },
      {
        title: "INFORME DE INTELIGENCIA: ZONA EXCLUSIVA MEDELLÍN",
        analysis: `Hemos auditado incidentes en ${b}, ${m}, donde la seguridad física fue eludida por falta de control en los duplicados. Sicurezza garantiza que usted y solo usted tiene el control total de su acceso.`,
        recommendations: ["Cerradura mecatrónica invisible", "Blindaje mimetizado AAA", "Servicio VIP de mantenimiento preventivo"],
        closing: "Seguridad de ultra-lujo para un perfil de clase mundial."
      },
      {
        title: "ALERTA: VULNERABILIDAD EN TORRES DE LUJO",
        analysis: `Incluso en los mejores edificios de ${b}, la puerta original es un punto débil. En ${m}, los intrusos aprovechan los cambios de turno de vigilancia para atacar accesos desprotegidos.`,
        recommendations: ["Blindaje estructural Sicurezza Nivel III", "Sistema de 14 bulones multidireccionales", "Ojo de buey digital con grabación"],
        closing: "Que su tranquilidad no dependa de terceros."
      },
      {
        title: "DIAGNÓSTICO DE RIESGO: INTRUSIÓN DE ALTA TECNOLOGÍA",
        analysis: `Detectamos en ${b}, ${m}, el uso de decodificadores para cerraduras estándar. Su puerta actual es tecnológicamente obsoleta ante el crimen organizado moderno.`,
        recommendations: ["Cerradura de alta seguridad KESO", "Protector de cilindro magnético", "Sistema de alarma integrada"],
        closing: "Actualice su protección al estándar Sicurezza."
      },
      {
        title: "PERFIL DE AMENAZA: SECTOR PROVENZA / TESORO",
        analysis: `La alta rotación de personal en ${b} genera un riesgo crítico de seguridad. En ${m}, tener una puerta que sea un búnker es la única forma de garantizar la integridad de su familia y su arte.`,
        recommendations: ["Diseño arquitectónico personalizado", "Marco de seguridad reforzado", "Bulones de acero endurecido de 18mm"],
        closing: "Su hogar merece la ingeniería que protege a las naciones."
      }
    ],

    // 5. MEDELLÍN TRADICIONAL (Laureles, Belén, Robledo) - Enfoque: Bumping/Obsoleto
    medellinTradicional: [
      {
        title: "ACTUALIZACIÓN DE SEGURIDAD: MEDELLÍN TRADICIONAL",
        analysis: `Sectores como ${b} tienen estructuras fuertes pero puertas obsoletas. En ${m}, los delincuentes usan 'bumping' para abrir cerraduras antiguas sin dejar rastro. Es hora de evolucionar.`,
        recommendations: ["Cerradura CISA italiana de alta gama", "Cilindro anti-bumping certificado", "Refuerzo estructural Sicurezza"],
        closing: "Tradición con la fuerza del acero moderno."
      },
      {
        title: "ALERTA: RIESGO DE ASALTO URBANO",
        analysis: `En ${b}, ${m}, el aumento de la delincuencia de oportunidad requiere una entrada que desanime al intruso desde el primer contacto visual. Una puerta Sicurezza es una declaración de impenetrabilidad.`,
        recommendations: ["Blindaje Nivel III estructural", "Pletina anti-palanca de 5mm", "Diseño sofisticado antioqueño"],
        closing: "Prevención inteligente para su patrimonio familiar."
      },
      {
        title: "INFORME DE VULNERABILIDAD: SECTOR RESIDENCIAL",
        analysis: `Hemos detectado en ${b} que los marcos originales están cedidos por el tiempo, facilitando el uso de barretas. En ${m}, Sicurezza instala soluciones que devuelven la solidez total a su hogar.`,
        recommendations: ["Anclaje mediante expansión química", "Doble lámina de acero 2.5mm", "Cerradura de seguridad con tarjeta"],
        closing: "Recupere la paz mental que su hogar merece."
      },
      {
        title: "DIAGNÓSTICO TÉCNICO: CASAS EN LAURELES / BELÉN",
        analysis: `Las casas tradicionales en ${b} son blancos frecuentes por sus puertas de madera sólida pero cerrajería débil. En ${m}, blindamos su historia con tecnología de punta.`,
        recommendations: ["Blindaje invisible bajo madera original", "Refuerzo de marco perimetral", "Puntos de cierre horizontales y verticales"],
        closing: "Seguridad de lujo integrada a su estilo tradicional."
      },
      {
        title: "ALERTA ESTRATÉGICA: SECTOR ROBLEDO / ESTADIO",
        analysis: `En ${b}, ${m}, detectamos un aumento en ataques violentos a puertas principales. No permita que su acceso sea el punto de entrada a su intimidad.`,
        recommendations: ["Sistema de 12 bulones de acero", "Protector de cilindro anti-taladro", "Aislamiento termo-acústico premium"],
        closing: "Blindaje Sicurezza: El estándar que los profesionales respetan."
      }
    ],

    // 6. URABÁ (Apartadó, Turbo, Carepa, Chigorodó) - Enfoque: Fuerza Bruta / Clima
    uraba: [
      {
        title: "ESTRATEGIA DE SEGURIDAD: REGIÓN URABÁ",
        analysis: `El auge económico de ${m} ha traído delincuencia especializada a sectores como ${b}. Usted requiere un blindaje que soporte tanto la fuerza bruta como las condiciones salinas de la región.`,
        recommendations: ["Acero galvanizado con tratamiento anticorrosivo", "Cerradura de alta montaña", "Anclaje profundo en mampostería"],
        closing: "Seguridad de hierro para una tierra de progreso."
      },
      {
        title: "ALERTA: VULNERABILIDAD EN ZONAS DE EXPANSIÓN",
        analysis: `En ${b}, detectamos que el método preferido es el asalto directo durante el ingreso. En ${m}, una puerta Sicurezza le gana tiempo vital gracias a su resistencia balística opcional.`,
        recommendations: ["Resistencia Balística Nivel III-A", "Sistema de cierre rápido unificado", "Diseño de alta visibilidad Sicurezza"],
        closing: "Su protección no conoce fronteras."
      },
      {
        title: "INFORME TÁCTICO: APARTADÓ / TURBO",
        analysis: `En ${b}, ${m}, las puertas estándar de madera ceden ante un hachazo o patada violenta. Nuestra ingeniería de acero estructural le garantiza que nadie entrará sin su invitación.`,
        recommendations: ["Doble lámina de acero estructural", "Cerradura italiana 14 bulones", "Servicio de instalación garantizado"],
        closing: "Fuerza y elegancia en cada centímetro de acero."
      },
      {
        title: "DIAGNÓSTICO DE RIESGO: URABÁ ANTIOQUEÑO",
        analysis: `Con el desarrollo de los puertos en ${m}, la criminalidad se ha sofisticado. En ${b}, los locales y casas están bajo la mira de bandas que no encuentran resistencia en cerraduras convencionales.`,
        recommendations: ["Upgrade a Nivel III+", "Cilindro anti-bumping de alta gama", "Blindaje estructural de hoja completa"],
        closing: "El mundo cambia, su seguridad debe evolucionar."
      },
      {
        title: "ALERTA ESPECIAL: SEGURIDAD COMERCIAL URABÁ",
        analysis: `Si su propiedad en ${b}, ${m} es un punto de alto valor, necesita la certificación Sicurezza. Detenemos ataques de amoladora y herramientas de corte.`,
        recommendations: ["Refuerzo con pletinas al manganeso", "Cerradura de doble cilindro", "Estructura interna anti-deformación"],
        closing: "Invierta en tranquilidad certificada."
      }
    ],

    // 7. SUROESTE (Jericó, Jardín, Fredonia, Amagá, Andes) - Enfoque: Tradición/Fuerza
    suroeste: [
      {
        title: "PROTECCIÓN RESIDENCIAL: SUROESTE ANTIOQUEÑO",
        analysis: `En los bellos pueblos de ${m}, la seguridad ha dejado de ser un tema de confianza. En ${b}, detectamos que el punto de fallo es la madera tradicional que no aguanta un ataque de fuerza física.`,
        recommendations: ["Blindaje invisible de acero Sicurezza", "Cerradura europea de alta seguridad", "Instalación mimetizada con madera local"],
        closing: "Cuide su tradición con la fuerza del acero."
      },
      {
        title: "ALERTA: VULNERABILIDAD EN CASAS DE PUEBLO",
        analysis: `En ${b}, ${m}, el método 'hachazo' ha regresado. Una puerta Sicurezza reforzada internamente es la única que garantiza que su hogar sea impenetrable aunque luzca como una puerta clásica.`,
        recommendations: ["Lámina interna de acero 2mm", "Anclaje de marco reforzado", "Bulones de acero endurecido"],
        closing: "Que la paz de su pueblo sea su paz interior."
      },
      {
        title: "INFORME TÉCNICO: SECTOR JARDÍN / JERICÓ",
        analysis: `Las propiedades de alto valor arquitectónico en ${b}, ${m} son objetivos para delincuentes que aprovechan la falta de sistemas integrales de seguridad. Sicurezza es la solución de ingeniería perfecta.`,
        recommendations: ["Cerradura biométrica mimetizada", "Sistema de 12 puntos de cierre", "Acabados premium resistentes al clima"],
        closing: "Elegancia eterna, seguridad absoluta."
      },
      {
        title: "DIAGNÓSTICO DE RIESGO: ZONA CAFETERA ANTIOQUIA",
        analysis: `En ${m}, la delincuencia se ha movido hacia las zonas rurales de ${b}. Sin un blindaje estructural, su familia está expuesta a intrusiones violentas en cualquier momento.`,
        recommendations: ["Marco de alta resistencia anti-palanca", "Protector magnético de cilindro", "Diseño rústico de alta seguridad"],
        closing: "Proteja el fruto de su trabajo con Sicurezza."
      },
      {
        title: "ALERTA DE SEGURIDAD: SUROESTE SECTOR PRODUCTIVO",
        analysis: `Si su propiedad en ${b}, ${m} maneja valores o activos, requiere el Nivel III de Sicurezza. El asalto a mano armada es prevenible con una barrera física certificada.`,
        recommendations: ["Blindaje certificado Nivel III-A", "Cerradura de doble función", "Servicio técnico regional"],
        closing: "La tranquilidad es el mayor lujo de un caficultor."
      }
    ],

    // 8. NIVEL IV+ (Máxima Prioridad) - Enfoque: Militar/Industrial
    nivelIV: [
      {
        title: "PROTOCOLO DE SEGURIDAD CRÍTICA (NIVEL IV+)",
        analysis: `Usted ha seleccionado el nivel búnker. En ${b}, ${m}, esto lo protege contra ataques balísticos de fusil (AK-47/AR-15) y asaltos prolongados con herramientas eléctricas de alto poder.`,
        recommendations: ["Blindaje certificado BR6/SG3", "Sistema de 22 bulones activos", "Nucleo de acero balmístico de 12mm"],
        closing: "Para activos y vidas que requieren protección estatal absoluta."
      },
      {
        title: "ALERTA TÁCTICA: MÁXIMA CATEGORÍA SICUREZZA",
        analysis: `El Nivel IV+ en ${b} es la respuesta definitiva ante el crimen de alto impacto en ${m}. Usted no está comprando una puerta, está instalando una barrera de ingeniería de grado militar.`,
        recommendations: ["Marco de acero estructural pesado", "Cerradura de pánico automática", "Control de entrada por venas dactilares"],
        closing: "Un muro de acero invisible entre su paz y la amenaza."
      },
      {
        title: "INFORME DE VIVIENDA TIPO BÚNKER (IV+)",
        analysis: `Detectamos que en ${m}, los ataques a residencias de alto valor en ${b} están usando explosivos ligeros y cortes masivos. El Nivel IV+ es el único capaz de neutralizar estas amenazas extremas.`,
        recommendations: ["Sistema de sellado hermético", "Blindaje perimetral extendido", "Puerta con núcleo de resinas anti-taladro"],
        closing: "La seguridad absoluta existe: Usted la ha configurado."
      },
      {
        title: "PERFIL DE AMENAZA: EXPOSICIÓN CRÍTICA",
        analysis: `Dada su ubicación en ${b} y su requerimiento de nivel IV+, Sicurezza activa sus protocolos élite para ${m}. Esta puerta resistirá cualquier intento violento de intrusión, sin importar el equipo usado.`,
        recommendations: ["Ingeniería de montaje con pernos industriales", "Doble cerradura de alta seguridad KESO", "Certificación balística internacional"],
        closing: "Tranquilidad innegociable."
      },
      {
        title: "DIAGNÓSTICO DE INGENIERÍA: SEGURIDAD NIVEL IV+",
        analysis: `En ${m}, no hay sistema más fuerte que un Sicurezza Nivel IV+. En ${b}, su propiedad quedará sellada bajo los estándares que protegen a los jefes de estado.`,
        recommendations: ["Acero al boro endurecido de doble capa", "Pletinas anti-corte integradas", "Acabado de lujo ultra-resistente"],
        closing: "Bienvenidos al estándar más alto de seguridad en Latinoamérica."
      }
    ],

    // 9. GENÉRICO (Cualquier otro municipio o sector)
    generic: [
      {
        title: "INFORME DE VULNERABILIDAD: RIESGO DETECTADO",
        analysis: `Tras analizar la situación en ${m}, detectamos que ${b} presenta un riesgo creciente de asaltos de oportunidad. Su puerta actual es una invitación abierta para delincuentes que buscan debilidades estructurales.`,
        recommendations: ["Refuerzo estructural Sicurezza Nivel III", "Cerradura de 14 puntos de anclaje", "Garantía de impenetrabilidad de 10 años"],
        closing: "Prevenga hoy para no lamentar mañana."
      },
      {
        title: "DIAGNÓSTICO TÉCNICO DE SEGURIDAD REGIONAL",
        analysis: `En ${m}, la inseguridad urbana en sectores como ${b} exige una protección de grado profesional. Las cerraduras de ferretería no ofrecen resistencia real ante una palanca básica.`,
        recommendations: ["Upgrade a cilindro anti-bumping", "Protector de cilindro de acero fundido", "Anclaje de marco perimetral"],
        closing: "Eleve su estándar de seguridad con ingeniería real."
      },
      {
        title: "ALERTA PREVENTIVA: PATRIMONIO EN RIESGO",
        analysis: `Si ha sentido inseguridad en ${b}, su instinto es correcto. En ${m}, los reportes de intrusión residencial han aumentado un 35% en los últimos meses. Su puerta es el eslabón más débil.`,
        recommendations: ["Chasis de acero estructural", "Doble lámina de seguridad", "Asesoría técnica personalizada"],
        closing: "Blindarse es la mejor inversión en paz mental."
      },
      {
        title: "PERFIL DE AMENAZA URBANA",
        analysis: `Las bandas locales en ${m} identifican casas en ${b} con accesos vulnerables. No permita que su privacidad sea violada; instale una barrera física Sicurezza.`,
        recommendations: ["Instalación de blindaje certificado", "Cerradura italiana CISA", "Control de duplicado de llaves"],
        closing: "Seguridad de lujo al alcance de su tranquilidad."
      },
      {
        title: "ESTUDIO DE SEGURIDAD EXPRÉS: RESULTADO CRÍTICO",
        analysis: `Para su propiedad en ${b}, el diagnóstico para ${m} arroja que el tiempo de apertura por parte de un intruso es de menos de 2 minutos. Usted necesita ingeniería Sicurezza inmediatamente.`,
        recommendations: ["Sistema de bloqueo multidireccional", "Bisagras de alta carga anti-palanca", "Certificado de calidad internacional"],
        closing: "Un paso adelante de la delincuencia regional."
      }
    ]
  };

  // --- LÓGICA DE SELECCIÓN DE CATEGORÍA ---
  let category = "generic";

  // 1. Prioridad Máxima: Nivel IV+
  if (nivel.includes("IV+")) {
    category = "nivelIV";
  }
  // 2. Valle Norte
  else if (m.includes("bello") || m.includes("copa") || m.includes("gira") || m.includes("barbosa") || b.includes("trapiche")) {
    category = "valleNorte";
  }
  // 3. Valle Sur
  else if (m.includes("envigado") || m.includes("itag") || m.includes("saba") || m.includes("caldas") || m.includes("estrella")) {
    category = "valleSur";
  }
  // 4. Medellín Élite
  else if (b.includes("poblado") || b.includes("prov") || b.includes("tesoro") || b.includes("astorga")) {
    category = "medellinElite";
  }
  // 5. Oriente
  else if (m.includes("rion") || m.includes("llano") || m.includes("retiro") || m.includes("ceja") || m.includes("marin") || m.includes("guarne") || b.includes("llano")) {
    category = "oriente";
  }
  // 6. Medellín Tradicional
  else if (b.includes("laurel") || b.includes("belen") || b.includes("robledo") || b.includes("pilarica") || b.includes("conquis") || m.includes("medell")) {
    category = "medellinTradicional";
  }
  // 7. Urabá
  else if (m.includes("apartad") || m.includes("turbo") || m.includes("carepa") || m.includes("chigo") || m.includes("urab")) {
    category = "uraba";
  }
  // 8. Suroeste
  else if (m.includes("jeric") || m.includes("jard") || m.includes("fredo") || m.includes("amag") || m.includes("boliv") || m.includes("andes") || b.includes("suroeste")) {
    category = "suroeste";
  }

  // Selección de plantilla aleatoria dentro de la categoría
  const selected = getRandom(database[category]);

  return {
    title: selected.title,
    analysis: selected.analysis,
    recommendations: selected.recommendations,
    closing: selected.closing
  };
};