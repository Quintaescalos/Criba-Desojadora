export interface ReferencePhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  specs: string;
}

export interface WoodCutPiece {
  code: string;
  name: string;
  group: 'Tramo Inferior' | 'Tramo Superior' | 'Patas y Plegado' | 'Tolva Superior';
  qty: number;
  lengthCm: number;
  sectionMm: string;
  angleNote: string;
  drillNote: string;
}

export interface StockBarPlan {
  id: string;
  sectionMm: string;
  stockLengthCm: number;
  quantityBars: number;
  cuts: {
    barIndex: number;
    pieces: { code: string; lengthCm: number; label: string }[];
    wasteCm: number;
  }[];
}

export interface BomItem {
  id: string;
  category: 'Madera' | 'Metálica y Malla' | 'Herrajes' | 'Herramientas';
  name: string;
  spec: string;
  qtyLabel: string;
  note: string;
}

export interface OlivePreset {
  id: 'arbequina' | 'picual' | 'gordal';
  name: string;
  caliberMm: string;
  clearGapMm: number;
  wireDiameterMm: number;
  pitchMm: number;
  rodCountPerSection: number;
  totalWireMeters: number;
  recommendation: string;
}

export interface AssemblyPhase {
  step: number;
  title: string;
  duration: string;
  tools: string;
  summary: string;
  instructions: string[];
  toleranceNote: string;
}

export const REFERENCE_PHOTOS: ReferencePhoto[] = [
  {
    id: 'unfolded',
    src: '/assets/aistudio/image_a1d2b37a.png',
    title: 'Vista general desplegada en trabajo',
    caption: 'Posición de cribado con pendiente de 31,5°, tolva superior de 45 cm y boca de salida a 30 cm del suelo para encajar cajas de recolección.',
    specs: '120 cm altura total · 45 cm ancho tolva · 30 cm alto de caída',
  },
  {
    id: 'hopper',
    src: '/assets/aistudio/image_3e73180d.png',
    title: 'Detalle de tolva y pre-cribado superior',
    caption: 'Cajón nivelado con malla electrosoldada de 25×25 mm que retiene palos y ramas gruesas antes de dejar caer aceitunas y hojas sobre las varillas.',
    specs: 'Malla 25×25 mm · Soportes frontales 19 cm · Encaje desmontable',
  },
  {
    id: 'folded',
    src: '/assets/aistudio/image_79d05158.png',
    title: 'Formato plegado compacto para transporte',
    caption: 'Cierre en libro mediante bisagra central M8, patas traseras y delanteras abatidas sobre los largueros y parrilla protegida en los planos exteriores.',
    specs: '90 cm largo · 50 cm ancho · 20 cm grosor',
  },
];

export const OLIVE_PRESETS: OlivePreset[] = [
  {
    id: 'arbequina',
    name: 'Arbequina / Empeltre',
    caliberMm: '11 – 14 mm',
    clearGapMm: 8.0,
    wireDiameterMm: 2.2,
    pitchMm: 10.2,
    rodCountPerSection: 37,
    totalWireMeters: 64,
    recommendation: 'Luz libre de 8 mm para evitar que las aceitunas pequeñas se cuelen entre varillas manteniendo el paso limpio de hojas.',
  },
  {
    id: 'picual',
    name: 'Picual / Hojiblanca / Cornicabra',
    caliberMm: '15 – 20 mm',
    clearGapMm: 9.5,
    wireDiameterMm: 2.5,
    pitchMm: 12.0,
    rodCountPerSection: 31,
    totalWireMeters: 54,
    recommendation: 'Configuración estándar polivalente. Permite deshojado rápido incluso con hoja ancha húmeda o brotes finos.',
  },
  {
    id: 'gordal',
    name: 'Gordal / Manzanilla',
    caliberMm: '21 – 28 mm',
    clearGapMm: 11.5,
    wireDiameterMm: 2.5,
    pitchMm: 14.0,
    rodCountPerSection: 27,
    totalWireMeters: 47,
    recommendation: 'Mayor separación entre varillas para evacuar hojas grandes y pedúnculos sin frenar el rodamiento de fruto grueso.',
  },
];

export const WOOD_CUT_PIECES: WoodCutPiece[] = [
  {
    code: 'M-01',
    name: 'Largueros tramo inferior (exteriores)',
    group: 'Tramo Inferior',
    qty: 2,
    lengthCm: 88.0,
    sectionMm: '90 × 18',
    angleNote: 'Corte a 31° en boca frontal; extremo superior redondeado R=35 mm',
    drillNote: 'Ø 8,5 mm a 4,5 cm del tope superior (bisagra) y a 10 cm (pata trasera)',
  },
  {
    code: 'M-02',
    name: 'Largueros tramo superior (interiores)',
    group: 'Tramo Superior',
    qty: 2,
    lengthCm: 82.0,
    sectionMm: '90 × 18',
    angleNote: 'Corte recto atrás; extremo inferior redondeado R=35 mm',
    drillNote: 'Ø 8,5 mm a 4,5 cm del extremo inferior (coincide con M-01)',
  },
  {
    code: 'M-03',
    name: 'Puente frontal de salida y refuerzo',
    group: 'Tramo Inferior',
    qty: 1,
    lengthCm: 46.0,
    sectionMm: '90 × 18',
    angleNote: 'Cantos interiores biselados a 45° para salida fluida de aceituna',
    drillNote: 'Avellanado Ø 4 mm en extremos para tirafondos 4×40 mm',
  },
  {
    code: 'M-04',
    name: 'Travesaños ranurados tramo inferior',
    group: 'Tramo Inferior',
    qty: 4,
    lengthCm: 42.4,
    sectionMm: '35 × 20',
    angleNote: 'Cortes a 90°; cara superior con ranuras de 3 mm de profundidad',
    drillNote: 'Fijación lateral con 2 tirafondos 4×45 mm por cabeza',
  },
  {
    code: 'M-05',
    name: 'Travesaños ranurados tramo superior',
    group: 'Tramo Superior',
    qty: 3,
    lengthCm: 38.4,
    sectionMm: '35 × 20',
    angleNote: 'Cortes a 90°; cara superior ranurada según paso elegido',
    drillNote: 'Fijación lateral con 2 tirafondos 4×45 mm por cabeza',
  },
  {
    code: 'M-06',
    name: 'Patas traseras plegables',
    group: 'Patas y Plegado',
    qty: 2,
    lengthCm: 78.0,
    sectionMm: '45 × 20',
    angleNote: 'Pie inferior biselado 8° para apoyo plano en suelo; cabeza R=22 mm',
    drillNote: 'Ø 8,5 mm a 3,5 cm de la cabeza (giro en cara exterior de M-01)',
  },
  {
    code: 'M-07',
    name: 'Patas delanteras plegables',
    group: 'Patas y Plegado',
    qty: 2,
    lengthCm: 28.0,
    sectionMm: '45 × 20',
    angleNote: 'Base a 90°; cabeza redondeada R=22 mm',
    drillNote: 'Ø 8,5 mm a 3,5 cm de la cabeza (giro en cara exterior de M-01)',
  },
  {
    code: 'M-08',
    name: 'Chambranas estabilizadoras entre patas',
    group: 'Patas y Plegado',
    qty: 2,
    lengthCm: 46.0,
    sectionMm: '45 × 20',
    angleNote: '1 ud de 46,0 cm (patas traseras) + 1 ud de 46,0 cm (delanteras)',
    drillNote: 'Encolado y atornillado a 14 cm de la base de las patas',
  },
  {
    code: 'M-09',
    name: 'Laterales de tolva de pre-cribado',
    group: 'Tolva Superior',
    qty: 2,
    lengthCm: 38.0,
    sectionMm: '90 × 18',
    angleNote: 'Base inferior recta; asiento trasero rebajado 31° para apoyar en rampa',
    drillNote: 'Ranura o listón soporte inferior para tensar la malla de 25 mm',
  },
  {
    code: 'M-10',
    name: 'Frente y trasera de tolva (45 cm total)',
    group: 'Tolva Superior',
    qty: 2,
    lengthCm: 41.4,
    sectionMm: '90 × 18',
    angleNote: 'Cortes limpios a escuadra (41,4 + 1,8 + 1,8 = 45,0 cm exterior)',
    drillNote: 'Fijación a tope con M-09 mediante tirafondos 4×45 mm',
  },
  {
    code: 'M-11',
    name: 'Soportes frontales tolva y topes 180°',
    group: 'Tolva Superior',
    qty: 4,
    lengthCm: 19.0,
    sectionMm: '22 × 22',
    angleNote: '2 uds × 19 cm (patas frontales tolva) + 2 uds × 10 cm (topes bisagra)',
    drillNote: 'Atornillado interno en esquinas frontales de tolva y bajo M-01',
  },
];

export const STOCK_PLANS: StockBarPlan[] = [
  {
    id: 'stock-90x18',
    sectionMm: '90 × 18 mm (Tabla pino cepillado)',
    stockLengthCm: 240,
    quantityBars: 3,
    cuts: [
      {
        barIndex: 1,
        pieces: [
          { code: 'M-01', lengthCm: 88.0, label: 'Larguero Inf. 1' },
          { code: 'M-01', lengthCm: 88.0, label: 'Larguero Inf. 2' },
          { code: 'M-03', lengthCm: 46.0, label: 'Puente Salida' },
        ],
        wasteCm: 17.1,
      },
      {
        barIndex: 2,
        pieces: [
          { code: 'M-02', lengthCm: 82.0, label: 'Larguero Sup. 1' },
          { code: 'M-02', lengthCm: 82.0, label: 'Larguero Sup. 2' },
          { code: 'M-10', lengthCm: 41.4, label: 'Frente Tolva' },
        ],
        wasteCm: 33.7,
      },
      {
        barIndex: 3,
        pieces: [
          { code: 'M-09', lengthCm: 38.0, label: 'Lateral Tolva 1' },
          { code: 'M-09', lengthCm: 38.0, label: 'Lateral Tolva 2' },
          { code: 'M-10', lengthCm: 41.4, label: 'Trasera Tolva' },
        ],
        wasteCm: 121.7,
      },
    ],
  },
  {
    id: 'stock-45x20',
    sectionMm: '45 × 20 mm (Listón estructural patas)',
    stockLengthCm: 240,
    quantityBars: 2,
    cuts: [
      {
        barIndex: 1,
        pieces: [
          { code: 'M-06', lengthCm: 78.0, label: 'Pata Trasera 1' },
          { code: 'M-06', lengthCm: 78.0, label: 'Pata Trasera 2' },
          { code: 'M-08', lengthCm: 46.0, label: 'Chambrana Tras.' },
          { code: 'M-07', lengthCm: 28.0, label: 'Pata Del. 1' },
        ],
        wasteCm: 8.8,
      },
      {
        barIndex: 2,
        pieces: [
          { code: 'M-08', lengthCm: 46.0, label: 'Chambrana Del.' },
          { code: 'M-07', lengthCm: 28.0, label: 'Pata Del. 2' },
        ],
        wasteCm: 165.4,
      },
    ],
  },
  {
    id: 'stock-35x20',
    sectionMm: '35 × 20 mm (Travesaños parrilla)',
    stockLengthCm: 240,
    quantityBars: 2,
    cuts: [
      {
        barIndex: 1,
        pieces: [
          { code: 'M-04', lengthCm: 42.4, label: 'Trav. Inf. 1' },
          { code: 'M-04', lengthCm: 42.4, label: 'Trav. Inf. 2' },
          { code: 'M-04', lengthCm: 42.4, label: 'Trav. Inf. 3' },
          { code: 'M-04', lengthCm: 42.4, label: 'Trav. Inf. 4' },
          { code: 'M-05', lengthCm: 38.4, label: 'Trav. Sup. 1' },
        ],
        wasteCm: 30.5,
      },
      {
        barIndex: 2,
        pieces: [
          { code: 'M-05', lengthCm: 38.4, label: 'Trav. Sup. 2' },
          { code: 'M-05', lengthCm: 38.4, label: 'Trav. Sup. 3' },
        ],
        wasteCm: 162.6,
      },
    ],
  },
  {
    id: 'stock-22x22',
    sectionMm: '22 × 22 mm (Cuadradillo soportes y topes)',
    stockLengthCm: 240,
    quantityBars: 1,
    cuts: [
      {
        barIndex: 1,
        pieces: [
          { code: 'M-11', lengthCm: 19.0, label: 'Soporte Tolva 1' },
          { code: 'M-11', lengthCm: 19.0, label: 'Soporte Tolva 2' },
          { code: 'M-11', lengthCm: 10.0, label: 'Tope Bisagra 1' },
          { code: 'M-11', lengthCm: 10.0, label: 'Tope Bisagra 2' },
          { code: 'M-11', lengthCm: 12.0, label: 'Calzo Tolva 1' },
          { code: 'M-11', lengthCm: 12.0, label: 'Calzo Tolva 2' },
        ],
        wasteCm: 156.2,
      },
    ],
  },
];

export const BASE_BOM_ITEMS: BomItem[] = [
  {
    id: 'bom-wood-90',
    category: 'Madera',
    name: 'Tabla cepillada de pino o haya 90 × 18 mm',
    spec: 'Largos comerciales de 240 cm sin nudos sueltos',
    qtyLabel: '3 listones (7,20 m)',
    note: 'Para largueros principales, puente frontal y cajón de tolva',
  },
  {
    id: 'bom-wood-45',
    category: 'Madera',
    name: 'Listón estructural cepillado 45 × 20 mm',
    spec: 'Largos comerciales de 240 cm (madera densa recomendada)',
    qtyLabel: '2 listones (4,80 m)',
    note: 'Para patas plegables traseras, delanteras y chambranas',
  },
  {
    id: 'bom-wood-35',
    category: 'Madera',
    name: 'Listón cepillado 35 × 20 mm',
    spec: 'Largos comerciales de 240 cm',
    qtyLabel: '2 listones (4,80 m)',
    note: 'Para los 7 travesaños ranurados que soportan las varillas',
  },
  {
    id: 'bom-wood-22',
    category: 'Madera',
    name: 'Cuadradillo cepillado 22 × 22 mm',
    spec: 'Largo comercial de 240 cm',
    qtyLabel: '1 listón (2,40 m)',
    note: 'Para apoyos frontales de tolva, topes 180° y listones pisavarillas',
  },
  {
    id: 'bom-mesh',
    category: 'Metálica y Malla',
    name: 'Malla electrosoldada galvanizada 25 × 25 mm',
    spec: 'Alambre Ø 1,8 – 2,0 mm · Paño de 44 × 37 cm',
    qtyLabel: '1 paño (0,20 m²)',
    note: 'Fondo de la tolva superior para retener ramas gruesas y palos',
  },
  {
    id: 'bom-staples',
    category: 'Metálica y Malla',
    name: 'Grapas de fijación o pletina pisavarillas',
    spec: 'Grapas de tapicero/cerca 14 mm o listón fino 15 × 8 mm',
    qtyLabel: '80 uds / 2,8 m',
    note: 'Inmovilizan la malla de tolva y bloquean las varillas en las ranuras',
  },
  {
    id: 'bom-bolts',
    category: 'Herrajes',
    name: 'Pernos carrocero cuello cuadrado M8 × 60 mm',
    spec: 'Acero galvanizado o inoxidable A2 + arandela ancha + palomilla/tuerca',
    qtyLabel: '6 juegos',
    note: '2 en bisagra central, 2 en patas traseras, 2 en patas delanteras',
  },
  {
    id: 'bom-wingnuts',
    category: 'Herrajes',
    name: 'Arandelas deslizantes de nylon Ø 8 × 24 mm',
    spec: 'Espesor 1,5 mm entre maderas articuladas',
    qtyLabel: '8 unidades',
    note: 'Evitan el roce madera-madera y dan suavidad al plegado',
  },
  {
    id: 'bom-pins',
    category: 'Herrajes',
    name: 'Pasadores rápidos de seguridad Ø 6 mm (con cadena)',
    spec: 'Para bloqueo de tolva y tope angular de patas en trabajo',
    qtyLabel: '4 unidades',
    note: 'Permiten fijar y liberar tolva y patas sin llaves en el olivar',
  },
  {
    id: 'bom-screws',
    category: 'Herrajes',
    name: 'Tirafondos cabeza avellanada 4 × 45 mm y 3,5 × 30 mm',
    spec: 'Acero bicromatado o inoxidable para ensamblaje de bastidores',
    qtyLabel: '60 uds (4×45) + 30 uds (3,5×30)',
    note: 'Pretaladrar siempre con broca Ø 2,5 mm para no rajar los listones',
  },
  {
    id: 'bom-varnish',
    category: 'Herrajes',
    name: 'Aceite de linaza cocido o lasur al agua exterior',
    spec: 'Acabado poro abierto apto para contacto con alimentos',
    qtyLabel: '500 ml',
    note: 'Protege de la humedad de la mañana y evita que el aceite manche',
  },
  {
    id: 'bom-tools',
    category: 'Herramientas',
    name: 'Sierra circular o ingletadora (disco fino para ranuras)',
    spec: 'Disco de 2,2 – 2,5 mm de ancho de corte',
    qtyLabel: '1 unidad',
    note: 'Imprescindible para cortar en serie las ranuras paralelas en M-04 y M-05',
  },
  {
    id: 'bom-drill',
    category: 'Herramientas',
    name: 'Taladro con brocas Ø 2,5 mm, Ø 6 mm y Ø 8,5 mm',
    spec: 'Preferible soporte vertical para escuadrar los ejes M8',
    qtyLabel: '1 juego',
    note: 'Asegura que los pernos entren perpendiculares y no tuerzan el plegado',
  },
];

export const ASSEMBLY_PHASES: AssemblyPhase[] = [
  {
    step: 1,
    title: 'Corte de listones y mecanizado de cabezas articuladas',
    duration: '45 min',
    tools: 'Ingletadora, sierra de calar, lija grano 100',
    summary: 'Se cortan los largueros y patas según el plano de optimización y se redondean los extremos que rotan para evitar tropiezos al plegar.',
    instructions: [
      'Corta los largueros M-01 (88 cm) con ángulo de 31° en el extremo delantero y M-02 (82 cm) a escuadra.',
      'Traza un radio de R=35 mm en la cabeza superior de M-01 y en la cabeza inferior de M-02; recorta con caladora y lija.',
      'Redondea las cabezas superiores de las cuatro patas (M-06 y M-07) con R=22 mm y bisela 8° la base de M-06.',
      'Taladra todos los ejes de giro con broca Ø 8,5 mm usando un mártir debajo para evitar astillados.',
    ],
    toleranceNote: 'Tolerancia clave: el taladro de bisagra en M-01 y M-02 debe estar exactamente a 45 mm del borde redondeado y centrado en el ancho de 90 mm.',
  },
  {
    step: 2,
    title: 'Ranurado simultáneo de los 7 travesaños de parrilla',
    duration: '40 min',
    tools: 'Sierra circular de mesa o ingletadora telescópica con tope',
    summary: 'Para que las varillas queden perfectamente paralelas sin desviar aceitunas, se ranuran todos los travesaños juntos en un solo bloque.',
    instructions: [
      'Agrupa los 4 travesaños M-04 (42,4 cm) y los 3 travesaños M-05 (38,4 cm) alineados por su eje central y sujétalos con sargentos.',
      'Regula la profundidad de corte de la sierra a 3 mm (igual o ligeramente superior al diámetro de la varilla).',
      'Realiza cortes paralelos de lado a lado respetando el paso elegido (p. ej. cada 12,0 mm para Picual), dejando 18 mm libres en cada extremo.',
      'Repasa las rebabas con lija fina y aplica una mano previa de aceite de linaza dentro de las ranuras.',
    ],
    toleranceNote: 'Si usas disco de 2,4 mm y varilla de 2,5 mm, la varilla entrará a presión suave sin vibrar ni desplazarse lateralmente.',
  },
  {
    step: 3,
    title: 'Ensamblaje de bastidores superior (42 cm) e inferior (46 cm)',
    duration: '35 min',
    tools: 'Atornillador, sargentos largos, escuadra de carpintero',
    summary: 'El tramo superior (42,0 cm exteriores) debe encajar con holgura dentro del tramo inferior (42,4 cm interiores) para permitir el plegado tipo libro.',
    instructions: [
      'Sitúa los travesaños M-04 a 20 mm del borde inferior de los largueros M-01; así quedará una pared lateral de 70 mm que contiene las aceitunas.',
      'Atornilla los 4 travesaños M-04 repartidos uniformemente (a 6 cm, 30 cm, 54 cm y 78 cm desde la boca frontal) comprobando las diagonales.',
      'Repite la operación en el tramo superior con los 3 travesaños M-05 repartidos en los 82 cm (a 12 cm, 42 cm y 72 cm desde la bisagra).',
      'Fija el puente frontal M-03 en la boca de salida dejando un hueco libre inferior de 55 mm bajo él para la expulsión del fruto.',
    ],
    toleranceNote: 'Comprueba la anchura libre interior de M-01: debe medir exactamente 42,4 cm (4 mm más que el exterior de M-02) para alojar arandelas de nylon de 1,5 mm.',
  },
  {
    step: 4,
    title: 'Montaje de la parrilla de varillas calibradas',
    duration: '45 min',
    tools: 'Cizalla para varilla, martillo de nylon, listón pisavarillas',
    summary: 'Las varillas longitudinales guían el fruto rodando cuesta abajo mientras el espacio abierto deja caer hojas secas y verdes por gravedad.',
    instructions: [
      'Corta varillas calibradas galvanizadas o inoxidables de 85 cm para el tramo inferior y de 79 cm para el tramo superior.',
      'Asienta cada varilla en su ranura correspondiente comprobando que queden al ras del extremo de salida para no enganchar aceitunas.',
      'Coloca un listón fino o grapas galvanizadas sobre el primer y último travesaño de cada tramo para bloquear el desplazamiento axial.',
      'Verifica con una aceituna de muestra o bola de 13 mm que ruede libremente sin acuñarse en ningún canal.',
    ],
    toleranceNote: 'Nunca pintes las varillas con barniz plástico ni pintura espesa: el metal liso reduce la fricción y evita atascos con hojas húmedas.',
  },
  {
    step: 5,
    title: 'Instalación de bisagra central y topes mecánicos de 180°',
    duration: '30 min',
    tools: 'Llave fija de 13 mm, broca Ø 6 mm',
    summary: 'La bisagra central une ambos tramos con pernos M8 y un tope inferior de madera impide que la rampa se doble hacia abajo bajo el peso de las aceitunas.',
    instructions: [
      'Introduce el tramo superior dentro del inferior alineando los taladros Ø 8,5 mm e intercala una arandela de nylon de 1,5 mm en cada lado.',
      'Pasa los dos pernos M8 × 60 mm desde el exterior y fija con arandela plana y tuerca autoblocante sin apretar en exceso (debe girar suave).',
      'Con la rampa extendida a 180° rectos, atornilla dos tacos tope de 22×22×100 mm bajo la cara interna de M-01 para que la cola de M-02 apoye sobre ellos.',
      'Taladra un orificio pasante Ø 6 mm a 7 cm de la bisagra para insertar el pasador de bloqueo cuando esté desplegada.',
    ],
    toleranceNote: 'Al plegar, el tramo superior rota 180° hacia delante quedando cara con cara sobre el tramo inferior; la parrilla metálica queda protegida hacia fuera.',
  },
  {
    step: 6,
    title: 'Montaje de patas articuladas y chambranas',
    duration: '30 min',
    tools: 'Taladro, llave 13 mm, escuadra falsa',
    summary: 'Las patas se montan en el exterior de M-01 con arandelas de fricción, permitiendo pasar de una altura de trabajo de 120 cm a un paquete de 90×50×20 cm.',
    instructions: [
      'Une las dos patas traseras M-06 (78 cm) con su chambrana M-08 a 14 cm de la base formando un pórtico rígido en U invertida.',
      'Une las dos patas delanteras M-07 (28 cm) con su chambrana M-08 a 10 cm de la base.',
      'Fija ambos pórticos al exterior de M-01 mediante pernos M8 × 60 mm con arandela de nylon intermedia y palomilla de apriete rápido.',
      'Marca el ángulo de trabajo (patas traseras casi verticales a 82° respecto al suelo; delanteras a 90°) y coloca topes/pasadores Ø 6 mm.',
    ],
    toleranceNote: 'Con las patas plegadas contra los largueros, ninguna pieza supera los 90 cm de largo ni los 50 cm de ancho total.',
  },
  {
    step: 7,
    title: 'Construcción de tolva desmontable y acabado protector',
    duration: '40 min',
    tools: 'Grapadora manual o martillo, brocha',
    summary: 'La tolva superior de 45 × 38 cm recibe los cubos o espuertas, retiene el ramaje grueso en la malla de 25 mm y se desmonta en 5 segundos para guardar.',
    instructions: [
      'Ensambla el marco de 45 × 38 cm (M-09 + M-10) y grapa la malla electrosoldada de 25×25 mm bien tensa en la base inferior.',
      'Fija en las dos esquinas frontales los pilares M-11 (19 cm) para que al apoyar el fondo trasero sobre la rampa, la tolva quede horizontal.',
      'Coloca dos calzos guía bajo los pilares frontales para que encajen entre los largueros M-02 sin deslizarse durante el cribado.',
      'Lija todas las aristas vivas (grano 120) y aplica dos manos de aceite de linaza cocido dejando secar 24 horas entre capas.',
    ],
    toleranceNote: 'Para plegar a 20 cm de grosor: retira la tolva hacia arriba, abate patas delanteras y traseras, dobla la bisagra central e introduce los pilares de tolva en el hueco central.',
  },
];
