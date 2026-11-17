import {
  ASSEMBLY_PHASES,
  AssemblyPhase,
  BASE_BOM_ITEMS,
  BomItem,
  OLIVE_PRESETS,
  OlivePreset,
  REFERENCE_PHOTOS,
  ReferencePhoto,
  STOCK_PLANS,
  StockBarPlan,
  WOOD_CUT_PIECES,
  WoodCutPiece,
} from '../data/manualData';
import { LanguageCode } from './types';

export interface FoldingStageText {
  id: number;
  label: string;
  target: number;
  title: string;
  description: string;
}

export interface PieceExtraDetail {
  dimensionsMm: string;
  shapeSummary: string;
  cutsAndBevels: string[];
  holesAndSlots: string[];
}

export interface LocalizedDataset {
  referencePhotos: ReferencePhoto[];
  foldingStages: FoldingStageText[];
  olivePresets: OlivePreset[];
  woodCutPieces: WoodCutPiece[];
  groupNames: Record<WoodCutPiece['group'], string>;
  pieceExtra: Record<string, PieceExtraDetail>;
  stockPlans: StockBarPlan[];
  bomItems: BomItem[];
  categoryNames: Record<BomItem['category'], string>;
  assemblyPhases: AssemblyPhase[];
}

const ES_STAGES: FoldingStageText[] = [
  {
    id: 0,
    label: '1. Trabajo',
    target: 0,
    title: 'Posición de trabajo desplegada (31°)',
    description:
      'Las patas traseras y delanteras están bloqueadas con pasadores Ø 6 mm. La rampa de 162 cm trabaja a 31° con tolva superior horizontal a 120 cm y salida de aceituna a 30 cm del suelo.',
  },
  {
    id: 1,
    label: '2. Tolva',
    target: 25,
    title: 'Desmontaje rápido de la tolva',
    description:
      'Se liberan los dos pasadores de la tolva superior y se extrae hacia arriba. Su anchura de 45 cm y 9 cm de altura permiten alojarla plana junto al bastidor plegado.',
  },
  {
    id: 2,
    label: '3. Patas',
    target: 58,
    title: 'Abatimiento de patas sobre largueros',
    description:
      'Se aflojan las palomillas M8 exteriores. Las patas delanteras (28 cm) y traseras (76 cm) giran sobre arandelas de nylon hasta quedar paralelas al bastidor inferior de 88 cm.',
  },
  {
    id: 3,
    label: '4. Cierre',
    target: 100,
    title: 'Cierre en libro compacto (90 × 50 × 20 cm)',
    description:
      'El tramo superior (42 cm de ancho) pivota 180° por la bisagra central M8 y encaja dentro del tramo inferior (42,4 cm interiores), protegiendo la estructura en un bloque de 90×50×20 cm.',
  },
];

const ES_PIECE_EXTRA: Record<string, PieceExtraDetail> = {
  'M-01': {
    dimensionsMm: '880 × 90 × 18 mm',
    shapeSummary: 'Larguero rectangular con boca delantera biselada a 31° y cabeza trasera semicircular R=35 mm.',
    cutsAndBevels: [
      'Extremo delantero: corte oblicuo a 31° respecto a la vertical (queda aplomado al suelo).',
      'Extremo superior (bisagra): radio semicircular R=35 mm para giro libre de 180°.',
    ],
    holesAndSlots: [
      'Taladro Ø 8,5 mm a 4,5 cm de la cabeza superior y 4,5 cm del canto (eje bisagra).',
      'Taladro Ø 8,5 mm a 12,0 cm de la cabeza superior y 3,0 cm del borde inferior (pata trasera).',
      'Taladro Ø 8,5 mm a 10,0 cm del frente y 3,0 cm del borde inferior (pata delantera).',
      'Taladro Ø 6,0 mm a 9,0 cm de la cabeza superior para pasador de bloqueo desplegado.',
    ],
  },
  'M-02': {
    dimensionsMm: '820 × 90 × 18 mm',
    shapeSummary: 'Larguero interior con cabeza de giro redondeada R=35 mm y testa superior recta a escuadra (90°).',
    cutsAndBevels: [
      'Extremo inferior (bisagra): radio semicircular R=35 mm; encaja dentro de M-01 con 2 mm de holgura.',
      'Extremo superior (tolva): corte recto a 90° en escuadra.',
    ],
    holesAndSlots: [
      'Taladro Ø 8,5 mm a 4,5 cm de la cabeza redondeada y 4,5 cm del canto (coincide con M-01).',
      'Taladro Ø 6,0 mm a 9,0 cm de la cabeza redondeada para pasador de bloqueo a 180°.',
    ],
  },
  'M-03': {
    dimensionsMm: '460 × 90 × 18 mm',
    shapeSummary: 'Tabla frontal a escuadra con chaflán interior a 45° para guiar la caída de las aceitunas.',
    cutsAndBevels: [
      'Testas laterales rectas a 90°; cubre todo el ancho exterior de M-01 (46,0 cm).',
      'Canto inferior interior biselado a 45° (chaflán de 10 × 10 mm).',
    ],
    holesAndSlots: [
      '4 pretaladros avellanados Ø 4,0 mm (2 por extremo a 1,5 cm del borde) para tirafondos 4×40 mm.',
      'Se monta dejando 5,5 cm de hueco libre inferior bajo la tabla como boca de descarga.',
    ],
  },
  'M-04': {
    dimensionsMm: '424 × 35 × 20 mm',
    shapeSummary: 'Listón rectangular con peine de ranuras superiores paralelas para asentar las varillas longitudinales.',
    cutsAndBevels: ['Cortes limpios a 90° en ambos extremos; longitud exacta 42,4 cm (luz interna inferior).'],
    holesAndSlots: [
      'Ranuras superiores de 2,5 mm de ancho × 3,0 mm de profundidad según paso elegido (10,2 / 12,0 / 14,0 mm).',
      'Márgenes laterales macizos de 1,8 cm en cada extremo sin ranurar.',
      '2 pretaladros Ø 2,5 mm en cada testa para atornillado desde el exterior de M-01.',
    ],
  },
  'M-05': {
    dimensionsMm: '384 × 35 × 20 mm',
    shapeSummary: 'Listón ranurado idéntico en perfil a M-04 pero acortado a 38,4 cm para el tramo superior interior.',
    cutsAndBevels: ['Cortes limpios a 90° en ambos extremos; longitud exacta 38,4 cm (luz interna superior).'],
    holesAndSlots: [
      'Mismas ranuras superiores de 2,5 × 3,0 mm alineadas eje con eje respecto a M-04.',
      'Márgenes laterales macizos de 1,4 cm en cada extremo sin ranurar.',
      '2 pretaladros Ø 2,5 mm en cada testa para atornillado desde el exterior de M-02.',
    ],
  },
  'M-06': {
    dimensionsMm: '780 × 45 × 20 mm',
    shapeSummary: 'Pata trasera articulada con cabeza redondeada R=22 mm y apoyo inferior biselado a 8°.',
    cutsAndBevels: [
      'Cabeza superior redondeada R=22 mm para pivotar sobre el exterior de M-01.',
      'Pie inferior biselado a 8° respecto a la horizontal para apoyar toda la planta en el suelo.',
    ],
    holesAndSlots: [
      'Taladro Ø 8,5 mm a 3,5 cm del extremo superior y centrado en los 45 mm (eje M8).',
      'Taladro Ø 6,0 mm a 8,5 cm del extremo superior para pasador de tope en trabajo.',
    ],
  },
  'M-07': {
    dimensionsMm: '280 × 45 × 20 mm',
    shapeSummary: 'Pata delantera corta con cabeza redondeada R=22 mm y base plana a escuadra.',
    cutsAndBevels: [
      'Cabeza superior redondeada R=22 mm.',
      'Base inferior cortada a escuadra (90°) para trabajar aplomada a 30 cm de altura de boca.',
    ],
    holesAndSlots: [
      'Taladro Ø 8,5 mm a 3,5 cm del extremo superior (eje M8).',
      'Taladro Ø 6,0 mm a 8,0 cm del extremo superior para pasador de bloqueo vertical.',
    ],
  },
  'M-08': {
    dimensionsMm: '460 × 45 × 20 mm',
    shapeSummary: 'Travesaño horizontal recto que une cada pareja de patas evitando deformaciones laterales.',
    cutsAndBevels: ['Dos piezas iguales de 46,0 cm cortadas a escuadra (90°) en ambos extremos.'],
    holesAndSlots: [
      'Se atornillan con 2 tirafondos 4×45 mm por lado a 14 cm de la base (traseras) y 10 cm (delanteras).',
      'La chambrana trasera coincide con el ancho exterior de M-01 (46 cm) permitiendo plegar en plano.',
    ],
  },
  'M-09': {
    dimensionsMm: '380 × 90 × 18 mm',
    shapeSummary: 'Lateral de tolva rectangular con asiento trasero rebajado a 31° para nivelar el cajón sobre la rampa.',
    cutsAndBevels: [
      'Borde superior horizontal recto de 38,0 cm.',
      'Borde inferior trasero con corte oblicuo ascendente a 31° en los últimos 14,0 cm para apoyar plano sobre M-02.',
    ],
    holesAndSlots: [
      'Grapado inferior de malla electrosoldada 25×25 mm por toda la base perimetral.',
      'Pretaladros Ø 2,5 mm en las testas para atornillar a M-10.',
    ],
  },
  'M-10': {
    dimensionsMm: '414 × 90 × 18 mm',
    shapeSummary: 'Tablas frontal y trasera rectas que cierran el cajón de tolva a 45,0 cm de anchura exterior.',
    cutsAndBevels: [
      'Cortes rectos a 90° en todo su perímetro.',
      'Medida interior exacta: 41,4 cm (+ 1,8 cm + 1,8 cm de M-09 = 45,0 cm totales).',
    ],
    holesAndSlots: ['Fijación a tope desde los laterales M-09 con 2 tirafondos 4×45 mm por esquina.'],
  },
  'M-11': {
    dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
    shapeSummary: 'Tres parejas en cuadradillo de 22×22 mm: pies frontales de tolva (19 cm), topes 180° (10 cm) y calzos (12 cm).',
    cutsAndBevels: [
      'M-11a (2 uds × 19,0 cm): base inferior cortada a 31° para apoyar plana sobre el canto superior de M-02.',
      'M-11b (2 uds × 10,0 cm): tacos rectos a 90° atornillados bajo M-01 como tope mecánico de la bisagra.',
      'M-11c (2 uds × 12,0 cm): calzos guía interiores para centrar la tolva sin desplazamientos.',
    ],
    holesAndSlots: ['Atornillado interior con tirafondos 3,5×35 mm (pretaladro Ø 2,5 mm obligatorio en cuadradillo fino).'],
  },
};

function mapPieces(
  updates: Record<string, { name: string; angleNote: string; drillNote: string }>
): WoodCutPiece[] {
  return WOOD_CUT_PIECES.map((p) => ({
    ...p,
    ...(updates[p.code] ?? {}),
  }));
}

function mapBom(
  updates: Record<string, { name: string; spec: string; qtyLabel: string; note: string }>
): BomItem[] {
  return BASE_BOM_ITEMS.map((item) => ({
    ...item,
    ...(updates[item.id] ?? {}),
  }));
}

function mapStock(
  sectionMap: Record<string, string>,
  labelMap: Record<string, string>
): StockBarPlan[] {
  return STOCK_PLANS.map((plan) => ({
    ...plan,
    sectionMm: sectionMap[plan.id] ?? plan.sectionMm,
    cuts: plan.cuts.map((bar) => ({
      ...bar,
      pieces: bar.pieces.map((cut) => ({
        ...cut,
        label: labelMap[cut.label] ?? cut.label,
      })),
    })),
  }));
}

function mapPhases(
  updates: Record<
    number,
    { title: string; tools: string; summary: string; instructions: string[]; toleranceNote: string }
  >
): AssemblyPhase[] {
  return ASSEMBLY_PHASES.map((phase) => ({
    ...phase,
    ...(updates[phase.step] ?? {}),
  }));
}

const EN_DATASET: LocalizedDataset = {
  referencePhotos: [
    {
      ...REFERENCE_PHOTOS[0],
      title: 'Unfolded working view',
      caption: 'Screening stance at 31.5° incline, 45 cm upper hopper, and 30 cm front discharge clearance to fit field harvest crates underneath.',
      specs: '120 cm total height · 45 cm hopper width · 30 cm drop height',
    },
    {
      ...REFERENCE_PHOTOS[1],
      title: 'Upper pre-screening hopper detail',
      caption: 'Level wooden sieve box with 25×25 mm welded square mesh that traps twigs and coarse branches before olives and leaves drop onto the rods.',
      specs: '25×25 mm mesh · 19 cm front struts · Removable drop-in mount',
    },
    {
      ...REFERENCE_PHOTOS[2],
      title: 'Compact folded transport state',
      caption: 'Clamshell fold via M8 central hinge, front and rear legs folded flush along the rails, and metal rod bed facing outward cleanly.',
      specs: '90 cm length · 50 cm width · 20 cm thickness',
    },
  ],
  foldingStages: [
    {
      id: 0,
      label: '1. Working',
      target: 0,
      title: 'Unfolded working position (31°)',
      description: 'Front and rear legs are locked with Ø 6 mm pins. The 162 cm ramp works at 31° with the hopper level at 120 cm and olive discharge 30 cm above ground.',
    },
    {
      id: 1,
      label: '2. Hopper',
      target: 25,
      title: 'Quick hopper lift-off',
      description: 'Pull the two locking pins and lift the 45×38×9 cm hopper straight up so it can nest flat alongside the folded frame.',
    },
    {
      id: 2,
      label: '3. Legs',
      target: 58,
      title: 'Fold legs flush along rails',
      description: 'Loosen the outer M8 wing nuts. Both front (28 cm) and rear (76 cm) legs pivot on nylon washers parallel to the 88 cm lower frame.',
    },
    {
      id: 3,
      label: '4. Folded',
      target: 100,
      title: 'Compact clamshell fold (90 × 50 × 20 cm)',
      description: 'The upper frame (42 cm outer width) pivots 180° on the central M8 bolt into the lower frame (42.4 cm inner width) into a 90×50×20 cm bundle.',
    },
  ],
  olivePresets: [
    {
      ...OLIVE_PRESETS[0],
      recommendation: '8 mm clear gap prevents small olives from dropping between rods while letting flat leaves fall through cleanly.',
    },
    {
      ...OLIVE_PRESETS[1],
      recommendation: 'Standard all-purpose setting. Fast de-leafing even with wide damp leaves or fine shoots.',
    },
    {
      ...OLIVE_PRESETS[2],
      recommendation: 'Wider rod gap to evacuate large leaves and stems without slowing heavy table olives.',
    },
  ],
  groupNames: {
    'Tramo Inferior': 'Lower Frame',
    'Tramo Superior': 'Upper Frame',
    'Patas y Plegado': 'Legs & Folding',
    'Tolva Superior': 'Upper Hopper',
  },
  woodCutPieces: mapPieces({
    'M-01': {
      name: 'Lower frame side rails (outer)',
      angleNote: '31° miter at front mouth; rounded top end R=35 mm',
      drillNote: 'Ø 8.5 mm at 4.5 cm from rounded end (hinge) & 12 cm (rear leg)',
    },
    'M-02': {
      name: 'Upper frame side rails (inner)',
      angleNote: 'Square 90° top end; rounded hinge end R=35 mm',
      drillNote: 'Ø 8.5 mm at 4.5 cm from rounded end (matches M-01)',
    },
    'M-03': {
      name: 'Front discharge bridge & tie',
      angleNote: 'Inner bottom edge chamfered 45° for smooth olive exit',
      drillNote: 'Countersunk Ø 4 mm holes at ends for 4×40 mm wood screws',
    },
    'M-04': {
      name: 'Slotted crossbars (lower frame)',
      angleNote: '90° square cuts; 3 mm deep parallel slots on top face',
      drillNote: 'Side-screwed through M-01 with two 4×45 mm screws per end',
    },
    'M-05': {
      name: 'Slotted crossbars (upper frame)',
      angleNote: '90° square cuts; slotted to match chosen rod pitch',
      drillNote: 'Side-screwed through M-02 with two 4×45 mm screws per end',
    },
    'M-06': {
      name: 'Folding rear legs',
      angleNote: 'Foot beveled 8° to sit flat on ground; head rounded R=22 mm',
      drillNote: 'Ø 8.5 mm at 3.5 cm from top head (mounts outside M-01)',
    },
    'M-07': {
      name: 'Folding front legs',
      angleNote: '90° flat foot; head rounded R=22 mm',
      drillNote: 'Ø 8.5 mm at 3.5 cm from top head (mounts outside M-01)',
    },
    'M-08': {
      name: 'Leg stabilizer stretchers',
      angleNote: '1 pc 46.0 cm (rear legs) + 1 pc 46.0 cm (front legs)',
      drillNote: 'Glued & screwed 14 cm (rear) / 10 cm (front) above foot',
    },
    'M-09': {
      name: 'Hopper side walls',
      angleNote: 'Straight top edge; rear bottom tapered 31° to seat level on ramp',
      drillNote: 'Bottom perimeter stapled with 25×25 mm welded wire mesh',
    },
    'M-10': {
      name: 'Hopper front & back walls (45 cm total)',
      angleNote: 'Clean 90° square cuts (41.4 + 1.8 + 1.8 = 45.0 cm outer)',
      drillNote: 'Butt-jointed to M-09 with 4×45 mm countersunk screws',
    },
    'M-11': {
      name: 'Hopper front struts & 180° stop cleats',
      angleNote: '2 pcs 19 cm (hopper struts, 31° base) + 2×10 cm (stops) + 2×12 cm (guides)',
      drillNote: 'Pre-drilled Ø 2.5 mm and screwed with 3.5×35 mm screws',
    },
  }),
  pieceExtra: {
    'M-01': {
      dimensionsMm: '880 × 90 × 18 mm',
      shapeSummary: 'Rectangular outer rail with 31° front bevel and semicircular R=35 mm hinge head.',
      cutsAndBevels: [
        'Front mouth: 31° oblique cut so the front face stands plumb when in working stance.',
        'Hinge end: R=35 mm semicircular radius for collision-free 180° folding.',
      ],
      holesAndSlots: [
        'Ø 8.5 mm bore 4.5 cm from rounded end, centered vertically (central hinge axis).',
        'Ø 8.5 mm bore 12.0 cm from rounded end, 3.0 cm from bottom edge (rear leg).',
        'Ø 8.5 mm bore 10.0 cm from front edge, 3.0 cm from bottom edge (front leg).',
        'Ø 6.0 mm bore 9.0 cm from rounded end for unfolded lock pin.',
      ],
    },
    'M-02': {
      dimensionsMm: '820 × 90 × 18 mm',
      shapeSummary: 'Inner upper rail with R=35 mm pivot head and 90° square upper end.',
      cutsAndBevels: [
        'Hinge end: R=35 mm semicircular radius; nests inside M-01 with 2 mm side clearance.',
        'Top end: clean 90° square cut.',
      ],
      holesAndSlots: [
        'Ø 8.5 mm bore 4.5 cm from rounded end, centered vertically (aligns with M-01).',
        'Ø 6.0 mm bore 9.0 cm from rounded end for 180° lock pin.',
      ],
    },
    'M-03': {
      dimensionsMm: '460 × 90 × 18 mm',
      shapeSummary: 'Square-cut front tie board with 45° lower inner chamfer for smooth olive discharge.',
      cutsAndBevels: [
        '90° square ends spanning the full 46.0 cm outer width of M-01.',
        'Lower inner edge chamfered 45° (10 × 10 mm bevel).',
      ],
      holesAndSlots: [
        '4 countersunk Ø 4.0 mm pilot holes (2 per end, 1.5 cm from edge) for 4×40 mm screws.',
        'Mounted flush with top edge, leaving a 5.5 cm exit slot underneath for olives.',
      ],
    },
    'M-04': {
      dimensionsMm: '424 × 35 × 20 mm',
      shapeSummary: 'Rectangular crossbar with parallel top slots to seat the longitudinal steel rods.',
      cutsAndBevels: ['90° square cuts on both ends; exact 42.4 cm length (lower bed clear width).'],
      holesAndSlots: [
        'Top slots 2.5 mm wide × 3.0 mm deep spaced to match chosen cultivar pitch.',
        '1.8 cm unslotted solid margin at both ends.',
        'Two Ø 2.5 mm end pilot holes for 4×45 mm side screws.',
      ],
    },
    'M-05': {
      dimensionsMm: '384 × 35 × 20 mm',
      shapeSummary: 'Slotted crossbar matching M-04 profile, shortened to 38.4 cm for the upper frame.',
      cutsAndBevels: ['90° square cuts on both ends; exact 38.4 cm length (upper bed clear width).'],
      holesAndSlots: [
        'Identical 2.5 × 3.0 mm top slots aligned coaxially with M-04.',
        '1.4 cm unslotted solid margin at both ends.',
        'Two Ø 2.5 mm end pilot holes for 4×45 mm side screws.',
      ],
    },
    'M-06': {
      dimensionsMm: '780 × 45 × 20 mm',
      shapeSummary: 'Pivoting rear leg with R=22 mm rounded top and 8° beveled ground foot.',
      cutsAndBevels: [
        'Top head: R=22 mm radius to pivot cleanly outside M-01.',
        'Bottom foot: 8° bevel cut so the foot sits flat on the ground at working angle.',
      ],
      holesAndSlots: [
        'Ø 8.5 mm bore 3.5 cm from top head, centered on 45 mm width (M8 axis).',
        'Ø 6.0 mm bore 8.5 cm from top head for working-angle stop pin.',
      ],
    },
    'M-07': {
      dimensionsMm: '280 × 45 × 20 mm',
      shapeSummary: 'Short pivoting front leg with R=22 mm rounded top and 90° flat foot.',
      cutsAndBevels: [
        'Top head: R=22 mm radius.',
        'Bottom foot: 90° square cut for plumb stance at 30 cm discharge height.',
      ],
      holesAndSlots: [
        'Ø 8.5 mm bore 3.5 cm from top head (M8 axis).',
        'Ø 6.0 mm bore 8.0 cm from top head for vertical lock pin.',
      ],
    },
    'M-08': {
      dimensionsMm: '460 × 45 × 20 mm',
      shapeSummary: 'Straight horizontal stretcher tying each pair of legs against lateral racking.',
      cutsAndBevels: ['Two identical 46.0 cm rails cut square at 90° on both ends.'],
      holesAndSlots: [
        'Screwed with two 4×45 mm screws per side at 14 cm (rear) and 10 cm (front) from bottom.',
        'Matches the 46 cm outer width of M-01 so legs fold flush.',
      ],
    },
    'M-09': {
      dimensionsMm: '380 × 90 × 18 mm',
      shapeSummary: 'Hopper side wall with 31° tapered rear seat so the box sits level over the sloped ramp.',
      cutsAndBevels: [
        'Straight horizontal top edge (38.0 cm).',
        'Rear bottom edge tapered 31° over the last 14.0 cm to rest flat on M-02.',
      ],
      holesAndSlots: [
        '25×25 mm welded mesh stapled taut around the lower perimeter.',
        'Ø 2.5 mm pilot holes at ends to screw into M-10.',
      ],
    },
    'M-10': {
      dimensionsMm: '414 × 90 × 18 mm',
      shapeSummary: 'Square-cut front and back hopper boards forming a 45.0 cm outer box width.',
      cutsAndBevels: [
        '90° square cuts on all edges.',
        'Exact inner span: 41.4 cm (+ 1.8 + 1.8 cm sides = 45.0 cm total width).',
      ],
      holesAndSlots: ['Butt-jointed from M-09 sides with two 4×45 mm screws per corner.'],
    },
    'M-11': {
      dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
      shapeSummary: 'Three pairs from 22×22 mm square stock: hopper struts (19 cm), 180° stops (10 cm), guides (12 cm).',
      cutsAndBevels: [
        'M-11a (2 pcs × 19.0 cm): bottom cut at 31° to rest flat on top of M-02 rail.',
        'M-11b (2 pcs × 10.0 cm): square cleats screwed inside M-01 as 180° hinge stops.',
        'M-11c (2 pcs × 12.0 cm): centering guide cleats under hopper.',
      ],
      holesAndSlots: ['Pre-drill Ø 2.5 mm before driving 3.5×35 mm screws to avoid splitting.'],
    },
  },
  stockPlans: mapStock(
    {
      'stock-90x18': '90 × 18 mm (Planed pine board)',
      'stock-45x20': '45 × 20 mm (Structural leg batten)',
      'stock-35x20': '35 × 20 mm (Bed crossbars)',
      'stock-22x22': '22 × 22 mm (Square stock cleats)',
    },
    {}
  ),
  categoryNames: {
    Madera: 'Timber',
    'Metálica y Malla': 'Metal & Mesh',
    Herrajes: 'Hardware',
    Herramientas: 'Tools',
  },
  bomItems: mapBom({
    'bom-wood-90': {
      name: 'Planed pine or beech board 90 × 18 mm',
      spec: '240 cm commercial lengths, knot-free',
      qtyLabel: '3 boards (7.20 m)',
      note: 'For main side rails, front bridge, and hopper walls',
    },
    'bom-wood-45': {
      name: 'Planed structural batten 45 × 20 mm',
      spec: '240 cm commercial lengths (dense hardwood preferred)',
      qtyLabel: '2 battens (4.80 m)',
      note: 'For folding front/rear legs and leg stretchers',
    },
    'bom-wood-35': {
      name: 'Planed batten 35 × 20 mm',
      spec: '240 cm commercial lengths',
      qtyLabel: '2 battens (4.80 m)',
      note: 'For the 7 slotted crossbars supporting longitudinal rods',
    },
    'bom-wood-22': {
      name: 'Planed square stock 22 × 22 mm',
      spec: '240 cm commercial length',
      qtyLabel: '1 batten (2.40 m)',
      note: 'For hopper front struts, 180° hinge stops, and guide cleats',
    },
    'bom-mesh': {
      name: 'Galvanized welded wire mesh 25 × 25 mm',
      spec: 'Wire Ø 1.8 – 2.0 mm · Sheet 44 × 37 cm',
      qtyLabel: '1 sheet (0.20 m²)',
      note: 'Upper hopper floor to trap coarse twigs and branches',
    },
    'bom-staples': {
      name: 'Fencing staples or rod retaining strip',
      spec: '14 mm staples or 15 × 8 mm thin wood strip',
      qtyLabel: '80 pcs / 2.8 m',
      note: 'Secures hopper mesh and locks rods inside crossbar slots',
    },
    'bom-bolts': {
      name: 'M8 × 60 mm carriage bolts (square neck)',
      spec: 'Galvanized or A2 stainless + wide washer + wing nut',
      qtyLabel: '6 sets',
      note: '2 at central hinge, 2 at rear legs, 2 at front legs',
    },
    'bom-wingnuts': {
      name: 'Nylon glide washers Ø 8 × 24 mm',
      spec: '1.5 mm thick between pivoting wood faces',
      qtyLabel: '8 pcs',
      note: 'Prevents wood-on-wood friction for smooth folding',
    },
    'bom-pins': {
      name: 'Ø 6 mm quick-release locking pins',
      spec: 'Locks hopper and working leg angles without wrenches',
      qtyLabel: '4 pcs',
      note: 'Allows tool-free setup and folding in the olive grove',
    },
    'bom-screws': {
      name: 'Countersunk wood screws 4 × 45 mm & 3.5 × 30 mm',
      spec: 'Zinc-plated or stainless steel for frame assembly',
      qtyLabel: '60 pcs (4×45) + 30 pcs (3.5×30)',
      note: 'Always pre-drill Ø 2.5 mm pilot holes to prevent splitting',
    },
    'bom-varnish': {
      name: 'Boiled linseed oil or food-safe outdoor sealer',
      spec: 'Open-pore breathable finish safe for olive contact',
      qtyLabel: '500 ml',
      note: 'Protects timber from morning dew and olive oil staining',
    },
    'bom-tools': {
      name: 'Circular or miter saw (thin kerf blade)',
      spec: '2.2 – 2.5 mm blade kerf width',
      qtyLabel: '1 unit',
      note: 'Ideal for gang-slotting all 7 crossbars in one pass',
    },
    'bom-drill': {
      name: 'Drill with Ø 2.5 mm, Ø 6 mm & Ø 8.5 mm bits',
      spec: 'Drill press guide recommended for square M8 bores',
      qtyLabel: '1 set',
      note: 'Keeps pivot bolts perpendicular so folding stays true',
    },
  }),
  assemblyPhases: mapPhases({
    1: {
      title: 'Cut battens & shape pivoting ends',
      tools: 'Miter saw, jigsaw, 100-grit sandpaper',
      summary: 'Cut all side rails and legs per the nesting plan and round the pivoting heads for smooth folding.',
      instructions: [
        'Cut lower rails M-01 (88 cm) with a 31° front bevel and upper rails M-02 (82 cm) square at 90°.',
        'Scribe R=35 mm arcs on the hinge ends of M-01 and M-02; cut with a jigsaw and sand smooth.',
        'Round leg tops (M-06, M-07) to R=22 mm and bevel M-06 bottom feet at 8°.',
        'Drill all M8 pivot bores at Ø 8.5 mm using a sacrificial backing board.',
      ],
      toleranceNote: 'Key tolerance: M-01 and M-02 hinge bores must sit exactly 45 mm from the rounded end and centered on 90 mm width.',
    },
    2: {
      title: 'Gang-slot all 7 rod-bed crossbars',
      tools: 'Table saw or sliding miter saw with depth stop',
      summary: 'Slot all crossbars clamped together so every longitudinal rod runs parallel without pinching olives.',
      instructions: [
        'Clamp all four M-04 (42.4 cm) and three M-05 (38.4 cm) battens aligned by their centerlines.',
        'Set saw blade depth to exactly 3.0 mm.',
        'Cut parallel kerfs at your chosen cultivar pitch, leaving 18 mm solid margins on outer ends.',
        'Sand fuzz and coat inside the slots with linseed oil.',
      ],
      toleranceNote: 'A 2.4 mm blade kerf grips 2.5 mm rod with a snug push fit.',
    },
    3: {
      title: 'Assemble upper (42 cm) and lower (46 cm) frames',
      tools: 'Driver, bar clamps, carpenter square',
      summary: 'The 42.0 cm upper frame nests inside the 42.4 cm lower frame cavity for clamshell folding.',
      instructions: [
        'Position M-04 crossbars 20 mm up from M-01 bottom edge, leaving a 70 mm side wall to contain rolling olives.',
        'Screw the 4 M-04 bars evenly along M-01 (6, 30, 54, 78 cm from front) and check diagonals.',
        'Repeat with 3 M-05 bars along M-02 (12, 42, 72 cm from hinge).',
        'Attach front bridge M-03 leaving a 55 mm exit gap underneath for olive discharge.',
      ],
      toleranceNote: 'Check M-01 inside width: 42.4 cm gives 2 mm per side for 1.5 mm nylon washers.',
    },
    4: {
      title: 'Install calibrated longitudinal steel rods',
      tools: 'Bolt cutters, nylon mallet, retaining strips',
      summary: 'Smooth parallel rods guide olives downward while leaves drop cleanly through open longitudinal gaps.',
      instructions: [
        'Cut galvanized or stainless rods to 85 cm (lower bed) and 79 cm (upper bed).',
        'Press each rod into its 3 mm crossbar slots flush with the exit end.',
        'Lock rods axially using fencing staples or a thin retaining strip on the end crossbars.',
        'Test roll a sample olive (or 13 mm marble) down every channel.',
      ],
      toleranceNote: 'Never varnish or paint the steel rods—bare smooth metal prevents damp leaf sticking.',
    },
    5: {
      title: 'Install central M8 hinge & 180° stop cleats',
      tools: '13 mm wrench, Ø 6 mm drill bit',
      summary: 'M8 carriage bolts join both halves while internal wooden cleats prevent downward sag under load.',
      instructions: [
        'Nest M-02 inside M-01 aligning the Ø 8.5 mm bores with a 1.5 mm nylon washer on each side.',
        'Insert M8 × 60 mm carriage bolts from outside and tighten locknuts gently so the hinge swings smoothly.',
        'Extend ramp to 180° flat and screw two 22×22×100 mm cleats inside M-01 under M-02 tail.',
        'Drill a Ø 6 mm through-hole 7 cm from hinge for the working lock pin.',
      ],
      toleranceNote: 'When folded 180°, the upper frame sits face-to-face over the lower frame with rods protected outward.',
    },
    6: {
      title: 'Mount folding front & rear leg frames',
      tools: 'Drill, 13 mm wrench, bevel gauge',
      summary: 'Leg frames pivot outside M-01 on nylon washers, compressing a 120 cm stand into 90×50×20 cm.',
      instructions: [
        'Join rear legs M-06 (78 cm) with stretcher M-08 at 14 cm above foot into a rigid U-frame.',
        'Join front legs M-07 (28 cm) with stretcher M-08 at 10 cm above foot.',
        'Bolt both leg frames outside M-01 with M8×60 mm bolts, nylon washers, and wing nuts.',
        'Mark working angles (82° rear, 90° front) and drill Ø 6 mm stop-pin holes.',
      ],
      toleranceNote: 'Folded legs stay strictly inside the 90 cm length and 50 cm width envelope.',
    },
    7: {
      title: 'Build removable hopper & oil finish',
      tools: 'Heavy staple gun or hammer, paintbrush',
      summary: 'The 45×38 cm hopper traps heavy branches on 25 mm mesh and lifts off in 5 seconds for folding.',
      instructions: [
        'Assemble the 45×38 cm box (M-09 + M-10) and staple taut 25×25 mm mesh across the bottom.',
        'Screw front vertical struts M-11a (19 cm, 31° base) inside front corners so hopper sits level.',
        'Add centering guide cleats M-11c under struts so hopper indexes inside M-02 rails.',
        'Sand all edges (120 grit) and apply two coats of boiled linseed oil (24 h cure).',
      ],
      toleranceNote: 'To fold to 20 cm thick: lift hopper off, fold legs flush, fold hinge 180°, and tuck hopper struts inside.',
    },
  }),
};

const PT_DATASET: LocalizedDataset = {
  referencePhotos: [
    {
      ...REFERENCE_PHOTOS[0],
      title: 'Vista geral aberta em trabalho',
      caption: 'Posição de crivagem a 31,5°, tremonha superior de 45 cm e boca de saída a 30 cm do solo para encaixar caixas de colheita.',
      specs: '120 cm altura total · 45 cm largura tremonha · 30 cm saída',
    },
    {
      ...REFERENCE_PHOTOS[1],
      title: 'Detalhe da tremonha e pré-crivagem',
      caption: 'Caixa nivelada com malha eletrossoldada de 25×25 mm que retém ramos e paus antes de deixar cair azeitonas e folhas nas varetas.',
      specs: 'Malha 25×25 mm · Suportes frontais 19 cm · Encaixe amovível',
    },
    {
      ...REFERENCE_PHOTOS[2],
      title: 'Formato dobrado compacto para transporte',
      caption: 'Fecho em livro por dobradiça central M8, pés recolhidos sobre os sarrafos e grelha metálica protegida nos planos exteriores.',
      specs: '90 cm comp. · 50 cm largura · 20 cm espessura',
    },
  ],
  foldingStages: [
    {
      id: 0,
      label: '1. Trabalho',
      target: 0,
      title: 'Posição de trabalho aberta (31°)',
      description: 'Os pés dianteiros e traseiros estão bloqueados com cavilhas Ø 6 mm. Rampa de 162 cm a 31°, tremonha a 120 cm e saída a 30 cm do solo.',
    },
    {
      id: 1,
      label: '2. Tremonha',
      target: 25,
      title: 'Remoção rápida da tremonha',
      description: 'Libertam-se as cavilhas da tremonha superior (45×38×9 cm) levantando-a na vertical para arrumação plana.',
    },
    {
      id: 2,
      label: '3. Pés',
      target: 58,
      title: 'Recolha dos pés sobre as longarinas',
      description: 'Desapertam-se as porcas de orelhas M8 exteriores; os pés dianteiros (28 cm) e traseiros (76 cm) rodam paralelos a M-01.',
    },
    {
      id: 3,
      label: '4. Fecho',
      target: 100,
      title: 'Fecho compacto em livro (90 × 50 × 20 cm)',
      description: 'O troço superior (42 cm) roda 180° pela dobradiça M8 encaixando no troço inferior (42,4 cm internos), formando um bloco de 90×50×20 cm.',
    },
  ],
  olivePresets: [
    {
      ...OLIVE_PRESETS[0],
      recommendation: 'Folga de 8 mm impede que azeitonas pequenas passem entre as varetas mantendo a queda limpa das folhas.',
    },
    {
      ...OLIVE_PRESETS[1],
      recommendation: 'Configuração padrão polivalente. Desfolha rápida mesmo com folha larga húmida ou rebentos finos.',
    },
    {
      ...OLIVE_PRESETS[2],
      recommendation: 'Maior folga entre varetas para evacuar folhas grandes e pedúnculos sem travar azeitonas graúdas.',
    },
  ],
  groupNames: {
    'Tramo Inferior': 'Troço Inferior',
    'Tramo Superior': 'Troço Superior',
    'Patas y Plegado': 'Pés e Dobragem',
    'Tolva Superior': 'Tremonha Superior',
  },
  woodCutPieces: mapPieces({
    'M-01': {
      name: 'Longarinas troço inferior (exteriores)',
      angleNote: 'Corte inclinado a 31° na boca frontal; topo arredondado R=35 mm',
      drillNote: 'Ø 8,5 mm a 4,5 cm do topo (dobradiça) e 12 cm (pé traseiro)',
    },
    'M-02': {
      name: 'Longarinas troço superior (interiores)',
      angleNote: 'Topo superior reto 90°; ponta da dobradiça arredondada R=35 mm',
      drillNote: 'Ø 8,5 mm a 4,5 cm da ponta arredondada (coincide com M-01)',
    },
    'M-03': {
      name: 'Ponte frontal de saída e reforço',
      angleNote: 'Aresta inferior interna chanfrada a 45° para saída fluida',
      drillNote: '4 furos escareados Ø 4 mm nos topos para parafusos 4×40 mm',
    },
    'M-04': {
      name: 'Travessas ranhuradas troço inferior',
      angleNote: 'Cortes a 90°; ranhuras superiores com 3 mm de profundidade',
      drillNote: 'Aparafusadas lateralmente com 2 parafusos 4×45 mm por lado',
    },
    'M-05': {
      name: 'Travessas ranhuradas troço superior',
      angleNote: 'Cortes a 90°; ranhuradas segundo o passo escolhido',
      drillNote: 'Aparafusadas lateralmente com 2 parafusos 4×45 mm por lado',
    },
    'M-06': {
      name: 'Pés traseiros dobráveis',
      angleNote: 'Base chanfrada a 8° para apoio plano no solo; topo R=22 mm',
      drillNote: 'Ø 8,5 mm a 3,5 cm do topo (montagem exterior em M-01)',
    },
    'M-07': {
      name: 'Pés dianteiros dobráveis',
      angleNote: 'Base reta a 90°; topo arredondado R=22 mm',
      drillNote: 'Ø 8,5 mm a 3,5 cm do topo (montagem exterior em M-01)',
    },
    'M-08': {
      name: 'Travessas estabilizadoras entre pés',
      angleNote: '1 un de 46,0 cm (traseira) + 1 un de 46,0 cm (dianteira)',
      drillNote: 'Coladas e aparafusadas a 14 cm / 10 cm da base',
    },
    'M-09': {
      name: 'Laterais da tremonha de pré-crivagem',
      angleNote: 'Topo reto; base traseira rebaixada a 31° para assentar nivelada',
      drillNote: 'Malha 25×25 mm agrafada em todo o perímetro inferior',
    },
    'M-10': {
      name: 'Frente e traseira da tremonha (45 cm)',
      angleNote: 'Cortes limpos a 90° (41,4 + 1,8 + 1,8 = 45,0 cm exterior)',
      drillNote: 'União de topo com M-09 por parafusos 4×45 mm',
    },
    'M-11': {
      name: 'Suportes frontais tremonha e batentes 180°',
      angleNote: '2×19 cm (pés tremonha base 31°) + 2×10 cm (batentes) + 2×12 cm (guias)',
      drillNote: 'Pré-furação Ø 2,5 mm e parafusos 3,5×35 mm',
    },
  }),
  pieceExtra: {
    'M-01': {
      dimensionsMm: '880 × 90 × 18 mm',
      shapeSummary: 'Longarina retangular com boca dianteira chanfrada a 31° e topo traseiro semicircular R=35 mm.',
      cutsAndBevels: [
        'Extremidade dianteira: corte oblíquo a 31° para ficar vertical em trabalho.',
        'Topo superior (dobradiça): raio semicircular R=35 mm para rotação livre de 180°.',
      ],
      holesAndSlots: [
        'Furo Ø 8,5 mm a 4,5 cm do topo arredondado e centrado (eixo dobradiça).',
        'Furo Ø 8,5 mm a 12,0 cm do topo e 3,0 cm do bordo inferior (pé traseiro).',
        'Furo Ø 8,5 mm a 10,0 cm da frente e 3,0 cm do bordo inferior (pé dianteiro).',
        'Furo Ø 6,0 mm a 9,0 cm do topo para cavilha de bloqueio.',
      ],
    },
    'M-02': {
      dimensionsMm: '820 × 90 × 18 mm',
      shapeSummary: 'Longarina interior com cabeça arredondada R=35 mm e topo superior reto a 90°.',
      cutsAndBevels: [
        'Ponta da dobradiça: raio R=35 mm; encaixa dentro de M-01 com 2 mm de folga lateral.',
        'Topo superior: corte reto a 90°.',
      ],
      holesAndSlots: [
        'Furo Ø 8,5 mm a 4,5 cm da ponta arredondada (alinha com M-01).',
        'Furo Ø 6,0 mm a 9,0 cm da ponta para cavilha de bloqueio a 180°.',
      ],
    },
    'M-03': {
      dimensionsMm: '460 × 90 × 18 mm',
      shapeSummary: 'Tábua frontal a esquadro com chanfro inferior interno a 45° para saída limpa.',
      cutsAndBevels: [
        'Topos retos a 90° cobrindo os 46,0 cm exteriores de M-01.',
        'Aresta inferior interna chanfrada a 45° (10 × 10 mm).',
      ],
      holesAndSlots: [
        '4 furos escareados Ø 4,0 mm (2 por lado a 1,5 cm) para parafusos 4×40 mm.',
        'Deixa 5,5 cm livres por baixo como boca de saída.',
      ],
    },
    'M-04': {
      dimensionsMm: '424 × 35 × 20 mm',
      shapeSummary: 'Sarrafo retangular com ranhuras superiores paralelas para assentar as varetas.',
      cutsAndBevels: ['Cortes retos a 90°; comprimento exato de 42,4 cm (vão inferior).'],
      holesAndSlots: [
        'Ranhuras de 2,5 mm × 3,0 mm conforme o passo escolhido.',
        'Margens laterais maciças de 1,8 cm nas pontas.',
        '2 pré-furos Ø 2,5 mm por topo para fixação lateral em M-01.',
      ],
    },
    'M-05': {
      dimensionsMm: '384 × 35 × 20 mm',
      shapeSummary: 'Sarrafo ranhurado idêntico a M-04, encurtado para 38,4 cm no troço superior.',
      cutsAndBevels: ['Cortes retos a 90°; comprimento exato de 38,4 cm (vão superior).'],
      holesAndSlots: [
        'Mesmas ranhuras 2,5 × 3,0 mm alinhadas com M-04.',
        'Margens laterais maciças de 1,4 cm nas pontas.',
        '2 pré-furos Ø 2,5 mm por topo para fixação em M-02.',
      ],
    },
    'M-06': {
      dimensionsMm: '780 × 45 × 20 mm',
      shapeSummary: 'Pé traseiro articulado com topo R=22 mm e base chanfrada a 8°.',
      cutsAndBevels: [
        'Topo superior arredondado R=22 mm para rodar no exterior de M-01.',
        'Base inferior chanfrada a 8° para assentar plana no chão.',
      ],
      holesAndSlots: [
        'Furo Ø 8,5 mm a 3,5 cm do topo (eixo M8).',
        'Furo Ø 6,0 mm a 8,5 cm do topo para cavilha de bloqueio.',
      ],
    },
    'M-07': {
      dimensionsMm: '280 × 45 × 20 mm',
      shapeSummary: 'Pé dianteiro curto com topo R=22 mm e base plana a 90°.',
      cutsAndBevels: [
        'Topo superior arredondado R=22 mm.',
        'Base cortada a 90° para trabalhar aprumado a 30 cm.',
      ],
      holesAndSlots: [
        'Furo Ø 8,5 mm a 3,5 cm do topo (eixo M8).',
        'Furo Ø 6,0 mm a 8,0 cm do topo para bloqueio vertical.',
      ],
    },
    'M-08': {
      dimensionsMm: '460 × 45 × 20 mm',
      shapeSummary: 'Travessa horizontal reta que solidariza cada par de pés.',
      cutsAndBevels: ['Duas peças iguais de 46,0 cm cortadas a 90°.'],
      holesAndSlots: [
        'Fixação com 2 parafusos 4×45 mm por lado a 14 cm (traseiro) e 10 cm (dianteiro).',
        'Acompanha os 46 cm de largura de M-01 para dobrar em plano.',
      ],
    },
    'M-09': {
      dimensionsMm: '380 × 90 × 18 mm',
      shapeSummary: 'Lateral da tremonha com rebaixo traseiro a 31° para nivelar sobre a rampa.',
      cutsAndBevels: [
        'Bordo superior horizontal de 38,0 cm.',
        'Bordo inferior traseiro inclinado a 31° nos últimos 14,0 cm.',
      ],
      holesAndSlots: [
        'Agrafagem inferior da malha 25×25 mm em todo o perímetro.',
        'Pré-furos Ø 2,5 mm para unir com M-10.',
      ],
    },
    'M-10': {
      dimensionsMm: '414 × 90 × 18 mm',
      shapeSummary: 'Tábuas frontal e traseira retas fechando a tremonha com 45,0 cm exteriores.',
      cutsAndBevels: [
        'Cortes a 90° em todo o perímetro.',
        'Largura interna de 41,4 cm (+ 1,8 + 1,8 cm = 45,0 cm exteriores).',
      ],
      holesAndSlots: ['Aparafusamento de topo desde M-09 com parafusos 4×45 mm.'],
    },
    'M-11': {
      dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
      shapeSummary: 'Três pares em ripa 22×22 mm: suportes tremonha (19 cm), batentes 180° (10 cm) e calços (12 cm).',
      cutsAndBevels: [
        'M-11a (2×19,0 cm): base cortada a 31° para assentar plana sobre M-02.',
        'M-11b (2×10,0 cm): batentes retos sob M-01 para travar a dobradiça a 180°.',
        'M-11c (2×12,0 cm): guias interiores de centragem da tremonha.',
      ],
      holesAndSlots: ['Pré-furar Ø 2,5 mm antes de colocar parafusos 3,5×35 mm.'],
    },
  },
  stockPlans: mapStock(
    {
      'stock-90x18': '90 × 18 mm (Tábua pinho aplainado)',
      'stock-45x20': '45 × 20 mm (Sarrafo estrutural pés)',
      'stock-35x20': '35 × 20 mm (Travessas grelha)',
      'stock-22x22': '22 × 22 mm (Ripa quadrada suportes)',
    },
    {}
  ),
  categoryNames: {
    Madera: 'Madeira',
    'Metálica y Malla': 'Metal e Malha',
    Herrajes: 'Ferragens',
    Herramientas: 'Ferramentas',
  },
  bomItems: mapBom({
    'bom-wood-90': {
      name: 'Tábua aplainada de pinho ou faia 90 × 18 mm',
      spec: 'Comprimentos comerciais de 240 cm sem nós soltos',
      qtyLabel: '3 tábuas (7,20 m)',
      note: 'Para longarinas principais, ponte frontal e caixa da tremonha',
    },
    'bom-wood-45': {
      name: 'Sarrafo estrutural aplainado 45 × 20 mm',
      spec: 'Comprimentos comerciais de 240 cm',
      qtyLabel: '2 sarrafos (4,80 m)',
      note: 'Para pés dobráveis dianteiros, traseiros e travessas',
    },
    'bom-wood-35': {
      name: 'Sarrafo aplainado 35 × 20 mm',
      spec: 'Comprimentos comerciais de 240 cm',
      qtyLabel: '2 sarrafos (4,80 m)',
      note: 'Para as 7 travessas ranhuradas que suportam as varetas',
    },
    'bom-wood-22': {
      name: 'Ripa quadrada aplainada 22 × 22 mm',
      spec: 'Comprimento comercial de 240 cm',
      qtyLabel: '1 ripa (2,40 m)',
      note: 'Para apoios frontais da tremonha, batentes 180° e calços',
    },
    'bom-mesh': {
      name: 'Malha eletrossoldada galvanizada 25 × 25 mm',
      spec: 'Arame Ø 1,8 – 2,0 mm · Pano de 44 × 37 cm',
      qtyLabel: '1 pano (0,20 m²)',
      note: 'Fundo da tremonha superior para reter ramos grossos',
    },
    'bom-staples': {
      name: 'Agrafos de fixação ou régua pisa-varetas',
      spec: 'Agrafos 14 mm ou régua fina 15 × 8 mm',
      qtyLabel: '80 uns / 2,8 m',
      note: 'Fixam a malha da tremonha e bloqueiam as varetas nas ranhuras',
    },
    'bom-bolts': {
      name: 'Parafusos de cabeça redonda M8 × 60 mm',
      spec: 'Aço galvanizado ou inox A2 + anilha larga + porca de orelhas',
      qtyLabel: '6 conjuntos',
      note: '2 na dobradiça central, 2 nos pés traseiros, 2 nos dianteiros',
    },
    'bom-wingnuts': {
      name: 'Anilhas deslizantes de nylon Ø 8 × 24 mm',
      spec: 'Espessura 1,5 mm entre madeiras articuladas',
      qtyLabel: '8 unidades',
      note: 'Evitam o atrito madeira-madeira e suavizam a dobragem',
    },
    'bom-pins': {
      name: 'Cavilhas rápidas de segurança Ø 6 mm',
      spec: 'Bloqueio da tremonha e do ângulo dos pés sem chaves',
      qtyLabel: '4 unidades',
      note: 'Permitem montar e dobrar rapidamente no olival',
    },
    'bom-screws': {
      name: 'Parafusos de madeira cabeça escareada 4×45 e 3,5×30 mm',
      spec: 'Aço bicromatado ou inox para montagem dos bastidores',
      qtyLabel: '60 uns (4×45) + 30 uns (3,5×30)',
      note: 'Pré-furar sempre com broca Ø 2,5 mm para não rachar',
    },
    'bom-varnish': {
      name: 'Óleo de linhaça cozido ou lasur aquoso exterior',
      spec: 'Acabamento apto para contacto alimentar',
      qtyLabel: '500 ml',
      note: 'Protege contra humidade matinal e manchas de azeite',
    },
    'bom-tools': {
      name: 'Serra circular ou meia-esquadria (disco fino)',
      spec: 'Disco de 2,2 – 2,5 mm de espessura de corte',
      qtyLabel: '1 unidade',
      note: 'Ideal para abrir em série todas as ranhuras de M-04 e M-05',
    },
    'bom-drill': {
      name: 'Berbequim com brocas Ø 2,5, Ø 6 e Ø 8,5 mm',
      spec: 'Preferível suporte vertical para furar os eixos M8 a 90°',
      qtyLabel: '1 jogo',
      note: 'Garante dobragem alinhada sem torções',
    },
  }),
  assemblyPhases: mapPhases({
    1: {
      title: 'Corte de sarrafos e arredondamento de cabeças',
      tools: 'Serra de esquadria, tico-tico, lixa grão 100',
      summary: 'Cortam-se longarinas e pés conforme o plano e arredondam-se os topos articulados.',
      instructions: [
        'Corte M-01 (88 cm) a 31° na frente e M-02 (82 cm) reto a 90°.',
        'Trace raio R=35 mm nas cabeças da dobradiça de M-01 e M-02 e recorte.',
        'Arredonde os topos dos pés (M-06, M-07) com R=22 mm e chanfre a base de M-06 a 8°.',
        'Fure todos os eixos M8 com broca Ø 8,5 mm usando madeira mártir por baixo.',
      ],
      toleranceNote: 'Tolerância chave: furo da dobradiça a exatamente 45 mm do topo arredondado.',
    },
    2: {
      title: 'Ranhuramento simultâneo das 7 travessas',
      tools: 'Serra circular com batente de profundidade',
      summary: 'Ranhurar todas as travessas juntas garante paralelismo perfeito das varetas.',
      instructions: [
        'Alinhe os 4 M-04 (42,4 cm) e 3 M-05 (38,4 cm) pelo eixo central e aperte com grampos.',
        'Regule a altura do disco para 3,0 mm de profundidade.',
        'Faça cortes paralelos segundo o passo da variedade, deixando 18 mm maciços nas pontas.',
        'Lixe rebarbas e aplique óleo de linhaça dentro das ranhuras.',
      ],
      toleranceNote: 'Com disco de 2,4 mm e vareta de 2,5 mm o encaixe fica firme sem folgas.',
    },
    3: {
      title: 'Montagem dos bastidores superior (42 cm) e inferior (46 cm)',
      tools: 'Aparafusadora, grampos longos, esquadro',
      summary: 'O troço superior encaixa dentro do inferior para permitir o fecho em livro.',
      instructions: [
        'Posicione M-04 a 20 mm do bordo inferior de M-01 (parede lateral útil de 70 mm).',
        'Aparafuse as 4 travessas M-04 uniformemente e confira as diagonais.',
        'Repita no troço superior com as 3 travessas M-05.',
        'Fixe a ponte frontal M-03 deixando 55 mm livres por baixo para saída das azeitonas.',
      ],
      toleranceNote: 'Largura interna de M-01 deve medir 42,4 cm para alojar as anilhas de nylon.',
    },
    4: {
      title: 'Instalação da grelha de varetas calibradas',
      tools: 'Cizalha, maço de nylon, régua pisa-varetas',
      summary: 'As varetas guiam o fruto enquanto as folhas caem pelas aberturas longitudinais.',
      instructions: [
        'Corte varetas galvanizadas ou inox com 85 cm (inferior) e 79 cm (superior).',
        'Assente cada vareta nas ranhuras de 3 mm até facear na boca de saída.',
        'Bloqueie axialmente com agrafos ou régua fina nas travessas extremas.',
        'Teste o rolamento livre com uma azeitona ou esfera de 13 mm.',
      ],
      toleranceNote: 'Nunca envernize as varetas: o metal liso evita que folhas húmidas se agarrem.',
    },
    5: {
      title: 'Dobradiça central M8 e batentes de 180°',
      tools: 'Chave 13 mm, broca Ø 6 mm',
      summary: 'Pernos M8 articulam ambos os troços e dois tacos batentes impedem flexão.',
      instructions: [
        'Encaixe M-02 dentro de M-01 intercalando anilhas de nylon de 1,5 mm.',
        'Passe os parafusos M8×60 mm e aperte suavemente para permitir rotação livre.',
        'Com a rampa plana a 180°, aparafuse dois tacos 22×22×100 mm sob M-01.',
        'Fure Ø 6 mm a 7 cm da dobradiça para a cavilha de bloqueio.',
      ],
      toleranceNote: 'Ao dobrar 180°, a grelha metálica fica voltada para fora e os sarrafos fecham face a face.',
    },
    6: {
      title: 'Montagem dos pés articulados e travessas',
      tools: 'Berbequim, chave 13 mm, suta',
      summary: 'Pés montados no exterior de M-01 permitem compactar tudo em 90×50×20 cm.',
      instructions: [
        'Una os pés traseiros M-06 (78 cm) com a travessa M-08 a 14 cm da base.',
        'Una os pés dianteiros M-07 (28 cm) com M-08 a 10 cm da base.',
        'Fixe ambos os pórticos no exterior de M-01 com parafusos M8×60 mm e porcas de orelhas.',
        'Marque os ângulos de trabalho (82° / 90°) e fure para cavilhas Ø 6 mm.',
      ],
      toleranceNote: 'Com os pés rebatidos, o conjunto não ultrapassa 90 cm de comprimento nem 50 cm de largura.',
    },
    7: {
      title: 'Construção da tremonha amovível e acabamento',
      tools: 'Agrafador manual, trincha',
      summary: 'Caixa superior de 45×38 cm retém ramos na malha de 25 mm e sai em 5 segundos.',
      instructions: [
        'Monte o caixote 45×38 cm (M-09 + M-10) e agrafe a malha 25×25 mm bem esticada.',
        'Aparafuse os pés frontais M-11a (19 cm, base 31°) nos cantos dianteiros.',
        'Coloque os calços guias M-11c sob os suportes para centrar a tremonha em M-02.',
        'Lixe as arestas (grão 120) e aplique duas demãos de óleo de linhaça cozido.',
      ],
      toleranceNote: 'Para dobrar a 20 cm: retire a tremonha, rebata os pés, dobre a dobradiça e aloje os suportes dentro.',
    },
  }),
};

const DE_DATASET: LocalizedDataset = {
  referencePhotos: [
    {
      ...REFERENCE_PHOTOS[0],
      title: 'Aufgeklappte Arbeitsansicht',
      caption: 'Arbeitsneigung 31,5°, 45 cm Einfülltrichter und 30 cm Auslaufhöhe für Standard-Erntekisten.',
      specs: '120 cm Gesamthöhe · 45 cm Breite · 30 cm Auslaufhöhe',
    },
    {
      ...REFERENCE_PHOTOS[1],
      title: 'Detail Vorsieb-Trichter',
      caption: 'Waagerechter Holzkasten mit 25×25 mm Punktgitter hält grobe Zweige zurück, bevor Oliven und Blätter auf die Stäbe fallen.',
      specs: '25×25 mm Gitter · 19 cm Stützen · Abnehmbar',
    },
    {
      ...REFERENCE_PHOTOS[2],
      title: 'Kompaktes Packmaß für den Transport',
      caption: 'Zentrales M8-Klappscharnier, angeklappte Beine entlang der Holme und geschützter Stabrost.',
      specs: '90 cm Länge · 50 cm Breite · 20 cm Stärke',
    },
  ],
  foldingStages: [
    {
      id: 0,
      label: '1. Betrieb',
      target: 0,
      title: 'Aufgeklappte Arbeitsposition (31°)',
      description: 'Vorder- und Hinterbeine sind mit Ø 6 mm Bolzen gesichert. Die 162-cm-Rutsche steht bei 31°, Trichter auf 120 cm, Auslauf auf 30 cm.',
    },
    {
      id: 1,
      label: '2. Trichter',
      target: 25,
      title: 'Trichter werkzeuglos abnehmen',
      description: 'Sicherungsstifte ziehen und den 45×38×9 cm Vorsieb-Trichter nach oben abheben.',
    },
    {
      id: 2,
      label: '3. Beine',
      target: 58,
      title: 'Beine parallel zu den Holmen einklappen',
      description: 'Äußere M8-Flügelmuttern lösen; Vorder- (28 cm) und Hinterbeine (76 cm) schwenken auf Nylonscheiben flach an M-01.',
    },
    {
      id: 3,
      label: '4. Packmaß',
      target: 100,
      title: 'Kompakte Buchklappung (90 × 50 × 20 cm)',
      description: 'Der obere Rahmen (42 cm) schwenkt um 180° in den unteren Rahmen (42,4 cm lichte Weite) auf 90×50×20 cm.',
    },
  ],
  olivePresets: [
    {
      ...OLIVE_PRESETS[0],
      recommendation: '8 mm lichter Spalt verhindert das Durchfallen kleiner Oliven bei sauberem Laubauswurf.',
    },
    {
      ...OLIVE_PRESETS[1],
      recommendation: 'Universelle Standard-Teilung für schnelles Entlauben auch bei feuchtem Laub.',
    },
    {
      ...OLIVE_PRESETS[2],
      recommendation: 'Größerer Stababstand für breite Blätter und Stiele bei großfruchtigen Tafeloliven.',
    },
  ],
  groupNames: {
    'Tramo Inferior': 'Unterer Rahmen',
    'Tramo Superior': 'Oberer Rahmen',
    'Patas y Plegado': 'Beine & Klappen',
    'Tolva Superior': 'Vorsieb-Trichter',
  },
  woodCutPieces: mapPieces({
    'M-01': {
      name: 'Seitenholme unterer Rahmen (außen)',
      angleNote: '31°-Gehrung vorn; Scharnierende halbrund R=35 mm',
      drillNote: 'Ø 8,5 mm bei 4,5 cm (Scharnier) & 12 cm (Hinterbein)',
    },
    'M-02': {
      name: 'Seitenholme oberer Rahmen (innen)',
      angleNote: 'Oben 90° gerade; Scharnierende halbrund R=35 mm',
      drillNote: 'Ø 8,5 mm bei 4,5 cm vom runden Ende (deckt sich mit M-01)',
    },
    'M-03': {
      name: 'Vordere Auslaufbrücke & Aussteifung',
      angleNote: 'Untere Innenkante 45° angefast für freien Olivenauslauf',
      drillNote: '4× Ø 4 mm Senklöcher außen für Schrauben 4×40 mm',
    },
    'M-04': {
      name: 'Genutete Querträger unterer Rahmen',
      angleNote: '90°-Schnitte; 3 mm tiefe parallele Nuten auf Oberseite',
      drillNote: 'Seitlich durch M-01 mit je 2 Schrauben 4×45 mm befestigt',
    },
    'M-05': {
      name: 'Genutete Querträger oberer Rahmen',
      angleNote: '90°-Schnitte; Nuten passend zur gewählten Stabteilung',
      drillNote: 'Seitlich durch M-02 mit je 2 Schrauben 4×45 mm befestigt',
    },
    'M-06': {
      name: 'Klappbare Hinterbeine',
      angleNote: 'Fuß 8° abgeschrägt für planen Bodenstand; Kopf R=22 mm',
      drillNote: 'Ø 8,5 mm bei 3,5 cm von oben (Außenmontage an M-01)',
    },
    'M-07': {
      name: 'Klappbare Vorderbeine',
      angleNote: 'Fuß 90° gerade; Kopf abgerundet R=22 mm',
      drillNote: 'Ø 8,5 mm bei 3,5 cm von oben (Außenmontage an M-01)',
    },
    'M-08': {
      name: 'Querstreben zwischen den Beinen',
      angleNote: '2 Stk. à 46,0 cm (90°-Schnitte für Hinter- und Vorderbeine)',
      drillNote: 'Verleimt & verschraubt 14 cm bzw. 10 cm über dem Fuß',
    },
    'M-09': {
      name: 'Seitenteile Vorsieb-Trichter',
      angleNote: 'Oberkante gerade; hinterer Boden 31° abgeschrägt',
      drillNote: 'Unten umlaufend mit 25×25 mm Drahtgitter getackert',
    },
    'M-10': {
      name: 'Vorder- und Rückwand Trichter (45 cm)',
      angleNote: '90°-Schnitte (41,4 + 1,8 + 1,8 = 45,0 cm Außenbreite)',
      drillNote: 'Stumpf mit M-09 durch Schrauben 4×45 mm verschraubt',
    },
    'M-11': {
      name: 'Trichterstützen & 180°-Anschläge',
      angleNote: '2×19 cm (Stützen 31°-Fuß) + 2×10 cm (Anschläge) + 2×12 cm (Führungen)',
      drillNote: 'Ø 2,5 mm vorbohren, Schrauben 3,5×35 mm',
    },
  }),
  pieceExtra: {
    'M-01': {
      dimensionsMm: '880 × 90 × 18 mm',
      shapeSummary: 'Rechteckiger Außenholm mit 31°-Schrägschnitt vorn und R=35 mm Scharnierkopf hinten.',
      cutsAndBevels: [
        'Vorderes Ende: 31° Gehrungsschnitt für lotrechten Abschluss.',
        'Scharnierende: Radius R=35 mm für kollisionsfreie 180°-Drehung.',
      ],
      holesAndSlots: [
        'Ø 8,5 mm Bohrung 4,5 cm vom runden Ende, mittig (Zentralachse).',
        'Ø 8,5 mm Bohrung 12,0 cm vom runden Ende, 3,0 cm von unten (Hinterbein).',
        'Ø 8,5 mm Bohrung 10,0 cm von vorn, 3,0 cm von unten (Vorderbein).',
        'Ø 6,0 mm Bohrung 9,0 cm vom runden Ende für Sicherungsstift.',
      ],
    },
    'M-02': {
      dimensionsMm: '820 × 90 × 18 mm',
      shapeSummary: 'Innerer Oberholm mit R=35 mm Scharnierkopf und 90° rechtwinkligem Oberende.',
      cutsAndBevels: [
        'Scharnierende: Radius R=35 mm; läuft mit 2 mm Spiel in M-01.',
        'Oberes Ende: sauberer 90°-Schnitt.',
      ],
      holesAndSlots: [
        'Ø 8,5 mm Bohrung 4,5 cm vom runden Ende (deckungsgleich mit M-01).',
        'Ø 6,0 mm Bohrung 9,0 cm vom runden Ende für 180°-Sperrbolzen.',
      ],
    },
    'M-03': {
      dimensionsMm: '460 × 90 × 18 mm',
      shapeSummary: 'Gerades Frontbrett mit 45°-Innenfase für ungehinderten Olivenauslauf.',
      cutsAndBevels: [
        '90°-Stirnschnitte über die volle 46,0 cm Außenbreite.',
        'Untere Innenkante 45° angefast (10 × 10 mm).',
      ],
      holesAndSlots: [
        '4 Senkbohrungen Ø 4,0 mm außen für Schrauben 4×40 mm.',
        'Lässt unten einen 5,5 cm hohen Auslassspalt frei.',
      ],
    },
    'M-04': {
      dimensionsMm: '424 × 35 × 20 mm',
      shapeSummary: 'Querleiste mit parallelen Oberseitennuten für den Stabrost.',
      cutsAndBevels: ['90°-Schnitte beidseitig; exakte Länge 42,4 cm.'],
      holesAndSlots: [
        'Nuten 2,5 mm breit × 3,0 mm tief nach gewählter Sortenteilung.',
        '1,8 cm ungenuteter Rand an beiden Enden.',
        'Je 2 Vorbohrungen Ø 2,5 mm stirnseitig.',
      ],
    },
    'M-05': {
      dimensionsMm: '384 × 35 × 20 mm',
      shapeSummary: 'Genutete Querleiste wie M-04, verkürzt auf 38,4 cm für den oberen Innenrahmen.',
      cutsAndBevels: ['90°-Schnitte beidseitig; exakte Länge 38,4 cm.'],
      holesAndSlots: [
        'Gleiche Nuten 2,5 × 3,0 mm fluchtend zu M-04.',
        '1,4 cm ungenuteter Rand an beiden Enden.',
        'Je 2 Vorbohrungen Ø 2,5 mm stirnseitig.',
      ],
    },
    'M-06': {
      dimensionsMm: '780 × 45 × 20 mm',
      shapeSummary: 'Schwenkbares Hinterbein mit R=22 mm Kopf und 8° abgeschrägtem Fuß.',
      cutsAndBevels: [
        'Oberkopf: Radius R=22 mm für Drehung außen an M-01.',
        'Fuß: 8° Schrägschnitt für satten Bodenkontakt.',
      ],
      holesAndSlots: [
        'Ø 8,5 mm Bohrung 3,5 cm von oben (M8-Achse).',
        'Ø 6,0 mm Bohrung 8,5 cm von oben für Arbeits-Steckbolzen.',
      ],
    },
    'M-07': {
      dimensionsMm: '280 × 45 × 20 mm',
      shapeSummary: 'Kurzes Vorderbein mit R=22 mm Kopf und geradem 90°-Standfuß.',
      cutsAndBevels: ['Oberkopf R=22 mm; Standfläche 90° gerade.'],
      holesAndSlots: [
        'Ø 8,5 mm Bohrung 3,5 cm von oben (M8-Achse).',
        'Ø 6,0 mm Bohrung 8,0 cm von oben für vertikale Arretierung.',
      ],
    },
    'M-08': {
      dimensionsMm: '460 × 45 × 20 mm',
      shapeSummary: 'Gerade Querstrebe zur Aussteifung beider Beinpaare.',
      cutsAndBevels: ['Zwei identische Leisten à 46,0 cm im 90°-Winkel.'],
      holesAndSlots: ['Mit je 2 Schrauben 4×45 mm bei 14 cm (hinten) / 10 cm (vorn) verschraubt.'],
    },
    'M-09': {
      dimensionsMm: '380 × 90 × 18 mm',
      shapeSummary: 'Trichter-Seitenwand mit 31° Schrägsitz hinten für waagerechte Lage auf der Rutsche.',
      cutsAndBevels: [
        'Gerade Oberkante 38,0 cm.',
        'Hinterer Boden auf den letzten 14,0 cm um 31° abgeschrägt.',
      ],
      holesAndSlots: ['Umlaufende Heftung des 25×25 mm Gitters; Vorbohrung Ø 2,5 mm für M-10.'],
    },
    'M-10': {
      dimensionsMm: '414 × 90 × 18 mm',
      shapeSummary: 'Rechtwinklige Vorder- und Rückwand für 45,0 cm Trichter-Außenbreite.',
      cutsAndBevels: ['90°-Schnitte; 41,4 cm + 2×1,8 cm = 45,0 cm Gesamtbreite.'],
      holesAndSlots: ['Stumpf verschraubt mit 4×45 mm Schrauben von M-09 her.'],
    },
    'M-11': {
      dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
      shapeSummary: 'Drei Paare aus 22×22 mm Vierkant: Stützen (19 cm), Anschläge (10 cm), Führungen (12 cm).',
      cutsAndBevels: [
        'M-11a (2×19 cm): Fuß 31° für plane Auflage auf M-02.',
        'M-11b (2×10 cm): 180°-Scharnieranschläge innen unter M-01.',
        'M-11c (2×12 cm): seitliche Führungsleisten.',
      ],
      holesAndSlots: ['Stets Ø 2,5 mm vorbohren für 3,5×35 mm Schrauben.'],
    },
  },
  stockPlans: mapStock(
    {
      'stock-90x18': '90 × 18 mm (Gehobeltes Kiefernbrett)',
      'stock-45x20': '45 × 20 mm (Beinleiste)',
      'stock-35x20': '35 × 20 mm (Rost-Querträger)',
      'stock-22x22': '22 × 22 mm (Vierkantleiste)',
    },
    {}
  ),
  categoryNames: {
    Madera: 'Holz',
    'Metálica y Malla': 'Metall & Gitter',
    Herrajes: 'Beschläge',
    Herramientas: 'Werkzeug',
  },
  bomItems: mapBom({
    'bom-wood-90': {
      name: 'Gehobeltes Kiefern- oder Buchenbrett 90 × 18 mm',
      spec: 'Handelslänge 240 cm, möglichst astfrei',
      qtyLabel: '3 Bretter (7,20 m)',
      note: 'Für Hauptholme, Auslaufbrücke und Trichterwände',
    },
    'bom-wood-45': {
      name: 'Konstruktionsleiste gehobelt 45 × 20 mm',
      spec: 'Handelslänge 240 cm',
      qtyLabel: '2 Leisten (4,80 m)',
      note: 'Für klappbare Beine und Querstreben',
    },
    'bom-wood-35': {
      name: 'Gehobelte Leiste 35 × 20 mm',
      spec: 'Handelslänge 240 cm',
      qtyLabel: '2 Leisten (4,80 m)',
      note: 'Für die 7 genuteten Querträger des Stabrosts',
    },
    'bom-wood-22': {
      name: 'Vierkantleiste gehobelt 22 × 22 mm',
      spec: 'Handelslänge 240 cm',
      qtyLabel: '1 Leiste (2,40 m)',
      note: 'Für Trichterstützen, 180°-Anschläge und Führungen',
    },
    'bom-mesh': {
      name: 'Verzinktes Punktschweißgitter 25 × 25 mm',
      spec: 'Draht Ø 1,8 – 2,0 mm · Zuschnitt 44 × 37 cm',
      qtyLabel: '1 Stück (0,20 m²)',
      note: 'Trichterboden zum Zurückhalten grober Zweige',
    },
    'bom-staples': {
      name: 'Heftklammern oder Niederhalteleiste',
      spec: '14 mm Klammern oder dünne Leiste 15 × 8 mm',
      qtyLabel: '80 Stk. / 2,8 m',
      note: 'Sichert Trichtergitter und Stäbe in den Nuten',
    },
    'bom-bolts': {
      name: 'Schlossschrauben M8 × 60 mm',
      spec: 'Verzinkt oder A2 Edelstahl + Scheibe + Flügelmutter',
      qtyLabel: '6 Sätze',
      note: '2× Zentralscharnier, 2× Hinterbeine, 2× Vorderbeine',
    },
    'bom-wingnuts': {
      name: 'Nylon-Gleitscheiben Ø 8 × 24 mm',
      spec: '1,5 mm stark zwischen beweglichen Holzteilen',
      qtyLabel: '8 Stück',
      note: 'Verhindert Holzreibung für leichtgängiges Klappen',
    },
    'bom-pins': {
      name: 'Schnellsteckbolzen Ø 6 mm',
      spec: 'Werkzeuglose Sicherung für Trichter & Beinwinkel',
      qtyLabel: '4 Stück',
      note: 'Schneller Auf- und Abbau direkt im Olivenhain',
    },
    'bom-screws': {
      name: 'Senkkopf-Holzschrauben 4×45 & 3,5×30 mm',
      spec: 'Gelb verzinkt oder Edelstahl',
      qtyLabel: '60 Stk. (4×45) + 30 Stk. (3,5×30)',
      note: 'Immer mit Ø 2,5 mm vorbohren gegen Reißen',
    },
    'bom-varnish': {
      name: 'Gekochtes Leinöl oder lebensmittelechte Lasur',
      spec: 'Offenporiger Wetterschutz',
      qtyLabel: '500 ml',
      note: 'Schützt vor Morgentau und Olivenölflecken',
    },
    'bom-tools': {
      name: 'Kreis- oder Kappsäge (schmales Sägeblatt)',
      spec: '2,2 – 2,5 mm Schnittbreite',
      qtyLabel: '1 Gerät',
      note: 'Zum gemeinsamen Nuten aller 7 Querträger',
    },
    'bom-drill': {
      name: 'Bohrmaschine mit Bohrern Ø 2,5 / 6 / 8,5 mm',
      spec: 'Bohrständer empfohlen für exakte 90°-M8-Achsen',
      qtyLabel: '1 Satz',
      note: 'Sorgt für verwindungsfreies Zusammenklappen',
    },
  }),
  assemblyPhases: mapPhases({
    1: {
      title: 'Zuschnitt und Abrunden der Schwenkköpfe',
      tools: 'Kappsäge, Stichsäge, Schleifpapier K100',
      summary: 'Holme und Beine nach Plan ablängen und Schwenkradien sauber ausschneiden.',
      instructions: [
        'Unterholme M-01 (88 cm) vorn 31° schräg und Oberholme M-02 (82 cm) 90° ablängen.',
        'Radien R=35 mm an den Scharnierköpfen anreißen, aussägen und schleifen.',
        'Beinköpfe (M-06, M-07) auf R=22 mm runden und M-06-Fuß um 8° abschrägen.',
        'Alle M8-Drehpunkte mit Ø 8,5 mm auf Unterlage bohren.',
      ],
      toleranceNote: 'Wichtig: Scharnierbohrung genau 45 mm vom runden Ende entfernt mittig setzen.',
    },
    2: {
      title: 'Gemeinsames Nuten der 7 Rost-Querträger',
      tools: 'Tischkreis- oder Zug-Kappsäge mit Tiefenanschlag',
      summary: 'Im Block genutete Querträger garantieren exakt parallele Rundstäbe.',
      instructions: [
        'Alle 4 M-04 (42,4 cm) und 3 M-05 (38,4 cm) mittig fluchtend zusammenspannen.',
        'Schnitttiefe exakt auf 3,0 mm einstellen.',
        'Nuten im gewählten Teilungsabstand sägen, 18 mm Rand stehen lassen.',
        'Entgraten und Nuten mit Leinöl einlassen.',
      ],
      toleranceNote: 'Bei 2,4 mm Sägeblatt sitzt der 2,5 mm Stab stramm ohne Spiel.',
    },
    3: {
      title: 'Montage von Ober- (42 cm) und Unterrahmen (46 cm)',
      tools: 'Akkuschrauber, Zwingen, Winkel',
      summary: 'Der schmalere Oberrahmen taucht beim Zusammenklappen in den Unterrahmen ein.',
      instructions: [
        'M-04 20 mm über der Unterkante von M-01 ansetzen (70 mm Seitenführung bleiben frei).',
        'Alle 4 M-04 gleichmäßig verschrauben und Rechtwinkligkeit per Diagonale prüfen.',
        'Analog mit den 3 M-05 am Oberrahmen verfahren.',
        'Frontbrücke M-03 oben bündig montieren, 55 mm Auslaufspalt unten offen lassen.',
      ],
      toleranceNote: 'Lichte Weite von M-01 exakt 42,4 cm für je 1,5 mm Nylonscheiben.',
    },
    4: {
      title: 'Einlegen der kalibrierten Längsstäbe',
      tools: 'Bolzenschneider, Schonhammer, Niederhalter',
      summary: 'Glatte Rundstäbe führen Oliven talwärts, während Blätter zwischen den Stäben fallen.',
      instructions: [
        'Verzinkte oder Edelstahl-Stäbe auf 85 cm (unten) und 79 cm (oben) ablängen.',
        'Stäbe bündig zum Auslauf in die 3-mm-Nuten eindrücken.',
        'Mit Klammern oder Holzleiste auf den äußeren Querträgern sichern.',
        'Laufprobe mit einer Olive oder 13-mm-Kugel durchführen.',
      ],
      toleranceNote: 'Stäbe niemals lackieren — blankes Metall verhindert das Kleben feuchter Blätter.',
    },
    5: {
      title: 'Zentralscharnier M8 und 180°-Anschläge',
      tools: '13-mm-Schlüssel, Ø 6 mm Bohrer',
      summary: 'M8-Bolzen verbinden beide Rahmen; innere Anschlagklötze tragen die Last im Betrieb.',
      instructions: [
        'M-02 mit je einer 1,5 mm Nylonscheibe in M-01 einsetzen.',
        'M8×60 mm Schlossschrauben von außen durchstecken und leichtgängig sichern.',
        'In gestreckter 180°-Lage zwei Klötze 22×22×100 mm unter M-01 als Anschlag schrauben.',
        'Ø 6 mm Sperrbohrung 7 cm neben dem Scharnier setzen.',
      ],
      toleranceNote: 'Im geklappten Zustand liegen beide Stabroste geschützt nach außen.',
    },
    6: {
      title: 'Montage der klappbaren Beinportale',
      tools: 'Bohrmaschine, 13-mm-Schlüssel, Schmiege',
      summary: 'Außen montierte Beine schwenken komplett innerhalb der 90×50×20 cm Kontur ein.',
      instructions: [
        'Hinterbeine M-06 (78 cm) mit Querstrebe M-08 bei 14 cm Höhe verbinden.',
        'Vorderbeine M-07 (28 cm) mit M-08 bei 10 cm Höhe verbinden.',
        'Beide Portale außen an M-01 mit M8×60 mm, Nylonscheiben und Flügelmuttern montieren.',
        'Arbeitswinkel (82° / 90°) markieren und Ø 6 mm Sicherungslöcher bohren.',
      ],
      toleranceNote: 'Eingeklappt bleibt jede Komponente unter 90 cm Länge.',
    },
    7: {
      title: 'Abnehmbarer Trichter & Öl-Endbehandlung',
      tools: 'Tacker, Pinsel',
      summary: 'Der 45×38 cm Trichter fängt Äste auf 25-mm-Gitter ab und wird zum Klappen abgehoben.',
      instructions: [
        'Rahmen 45×38 cm (M-09 + M-10) verschrauben und 25×25 mm Gitter straff antackern.',
        'Vordere Stützen M-11a (19 cm, 31°-Fuß) in den vorderen Ecken befestigen.',
        'Führungsklötze M-11c darunter setzen, damit der Trichter sauber auf M-02 zentriert.',
        'Kanten brechen (K120) und zweimal mit gekochtem Leinöl behandeln.',
      ],
      toleranceNote: 'Zum Klappen auf 20 cm: Trichter abheben, Beine anlegen, 180° zuklappen.',
    },
  }),
};

const FR_DATASET: LocalizedDataset = {
  referencePhotos: [
    {
      ...REFERENCE_PHOTOS[0],
      title: 'Vue générale dépliée en travail',
      caption: 'Pente de travail à 31,5°, trémie supérieure de 45 cm et hauteur de sortie à 30 cm pour glisser les caisses de récolte.',
      specs: '120 cm hauteur totale · 45 cm largeur trémie · 30 cm sortie',
    },
    {
      ...REFERENCE_PHOTOS[1],
      title: 'Détail de la trémie de pré-criblage',
      caption: 'Caisson horizontal muni d\'un grillage soudé 25×25 mm qui retient rameaux et brindilles avant la chute sur les tringles.',
      specs: 'Grillage 25×25 mm · Pieds avant 19 cm · Montage amovible',
    },
    {
      ...REFERENCE_PHOTOS[2],
      title: 'Format plié compact de transport',
      caption: 'Pliage portefeuille par charnière centrale M8, pieds rabattus contre les longerons et grille protégée à l\'extérieur.',
      specs: '90 cm long. · 50 cm largeur · 20 cm épaisseur',
    },
  ],
  foldingStages: [
    {
      id: 0,
      label: '1. Travail',
      target: 0,
      title: 'Position de travail dépliée (31°)',
      description: 'Pieds avant et arrière verrouillés par goupilles Ø 6 mm. Rampe de 162 cm à 31°, trémie à 120 cm et sortie à 30 cm du sol.',
    },
    {
      id: 1,
      label: '2. Trémie',
      target: 25,
      title: 'Dépose rapide de la trémie',
      description: 'Retirer les deux goupilles et soulever la trémie (45×38×9 cm) pour la ranger à plat contre le châssis plié.',
    },
    {
      id: 2,
      label: '3. Pieds',
      target: 58,
      title: 'Rabattement des pieds sur longerons',
      description: 'Desserrer les écrous papillon M8 ; les pieds avant (28 cm) et arrière (76 cm) pivotent sur rondelles nylon le long de M-01.',
    },
    {
      id: 3,
      label: '4. Plié',
      target: 100,
      title: 'Pliage portefeuille compact (90 × 50 × 20 cm)',
      description: 'Le cadre supérieur (42 cm) pivote de 180° sur la charnière M8 et s\'emboîte dans le cadre inférieur (42,4 cm intérieurs).',
    },
  ],
  olivePresets: [
    {
      ...OLIVE_PRESETS[0],
      recommendation: 'Jeu libre de 8 mm empêchant les petites olives de passer tout en évacuant proprement les feuilles.',
    },
    {
      ...OLIVE_PRESETS[1],
      recommendation: 'Réglage standard polyvalent. Effeuillage rapide même avec feuillage humide ou jeunes pousses.',
    },
    {
      ...OLIVE_PRESETS[2],
      recommendation: 'Écartement élargi pour évacuer grandes feuilles et pédoncules sans freiner les gros calibres.',
    },
  ],
  groupNames: {
    'Tramo Inferior': 'Cadre Inférieur',
    'Tramo Superior': 'Cadre Supérieur',
    'Patas y Plegado': 'Pieds et Pliage',
    'Tolva Superior': 'Trémie Supérieure',
  },
  woodCutPieces: mapPieces({
    'M-01': {
      name: 'Longerons cadre inférieur (extérieurs)',
      angleNote: 'Coupe à 31° en sortie avant ; tête charnière arrondie R=35 mm',
      drillNote: 'Ø 8,5 mm à 4,5 cm du bout (charnière) et 12 cm (pied arrière)',
    },
    'M-02': {
      name: 'Longerons cadre supérieur (intérieurs)',
      angleNote: 'Extrémité haute d\'équerre 90° ; tête charnière R=35 mm',
      drillNote: 'Ø 8,5 mm à 4,5 cm du bout arrondi (aligné sur M-01)',
    },
    'M-03': {
      name: 'Traverse frontale de sortie et renfort',
      angleNote: 'Arête inférieure interne chanfreinée à 45° pour sortie fluide',
      drillNote: '4 fraisages Ø 4 mm aux bouts pour vis bois 4×40 mm',
    },
    'M-04': {
      name: 'Entretoises rainurées cadre inférieur',
      angleNote: 'Coupes à 90° ; rainures parallèles prof. 3 mm sur chant haut',
      drillNote: 'Vissées latéralement à travers M-01 (2 vis 4×45 mm/bout)',
    },
    'M-05': {
      name: 'Entretoises rainurées cadre supérieur',
      angleNote: 'Coupes à 90° ; rainurées selon le pas choisi',
      drillNote: 'Vissées latéralement à travers M-02 (2 vis 4×45 mm/bout)',
    },
    'M-06': {
      name: 'Pieds arrière pliants',
      angleNote: 'Pied biseauté à 8° pour appui plat au sol ; tête R=22 mm',
      drillNote: 'Ø 8,5 mm à 3,5 cm du haut (montage extérieur sur M-01)',
    },
    'M-07': {
      name: 'Pieds avant pliants',
      angleNote: 'Base droite à 90° ; tête arrondie R=22 mm',
      drillNote: 'Ø 8,5 mm à 3,5 cm du haut (montage extérieur sur M-01)',
    },
    'M-08': {
      name: 'Traverses stabilisatrices des pieds',
      angleNote: '2 pcs de 46,0 cm à 90° (1 paire arrière + 1 paire avant)',
      drillNote: 'Collées et vissées à 14 cm / 10 cm du sol',
    },
    'M-09': {
      name: 'Côtés de trémie de pré-criblage',
      angleNote: 'Haut droit ; base arrière délardée à 31° pour assise horizontale',
      drillNote: 'Grillage 25×25 mm agrafé sur tout le pourtour inférieur',
    },
    'M-10': {
      name: 'Avant et arrière de trémie (45 cm total)',
      angleNote: 'Coupes d\'équerre 90° (41,4 + 1,8 + 1,8 = 45,0 cm extérieurs)',
      drillNote: 'Assemblage à plat-joint sur M-09 par vis 4×45 mm',
    },
    'M-11': {
      name: 'Pieds de trémie et butées 180°',
      angleNote: '2×19 cm (pieds base 31°) + 2×10 cm (butées) + 2×12 cm (guides)',
      drillNote: 'Pré-perçage Ø 2,5 mm et vis 3,5×35 mm',
    },
  }),
  pieceExtra: {
    'M-01': {
      dimensionsMm: '880 × 90 × 18 mm',
      shapeSummary: 'Longeron rectangulaire biseauté à 31° devant et terminé en demi-cercle R=35 mm à la charnière.',
      cutsAndBevels: [
        'Extrémité avant : coupe oblique à 31° pour tomber d\'aplomb au sol.',
        'Tête supérieure : rayon R=35 mm permettant une rotation libre à 180°.',
      ],
      holesAndSlots: [
        'Perçage Ø 8,5 mm à 4,5 cm du bout arrondi, centré sur la hauteur (axe central).',
        'Perçage Ø 8,5 mm à 12,0 cm du bout et 3,0 cm du bas (pied arrière).',
        'Perçage Ø 8,5 mm à 10,0 cm du front et 3,0 cm du bas (pied avant).',
        'Perçage Ø 6,0 mm à 9,0 cm du bout pour goupille de verrouillage.',
      ],
    },
    'M-02': {
      dimensionsMm: '820 × 90 × 18 mm',
      shapeSummary: 'Longeron intérieur à tête arrondie R=35 mm et extrémité haute coupée d\'équerre à 90°.',
      cutsAndBevels: [
        'Tête charnière : rayon R=35 mm ; s\'emboîte dans M-01 avec 2 mm de jeu.',
        'Extrémité haute : coupe droite à 90°.',
      ],
      holesAndSlots: [
        'Perçage Ø 8,5 mm à 4,5 cm du bout arrondi (coïncide avec M-01).',
        'Perçage Ø 6,0 mm à 9,0 cm du bout pour goupille à 180°.',
      ],
    },
    'M-03': {
      dimensionsMm: '460 × 90 × 18 mm',
      shapeSummary: 'Planche frontale droite avec chanfrein interne inférieur à 45° pour évacuer les olives.',
      cutsAndBevels: [
        'Coupes droites à 90° couvrant les 46,0 cm extérieurs de M-01.',
        'Arête basse interne chanfreinée à 45° (10 × 10 mm).',
      ],
      holesAndSlots: [
        '4 fraisages Ø 4,0 mm aux extrémités pour vis 4×40 mm.',
        'Laisse un passage libre de 5,5 cm dessous pour la sortie des fruits.',
      ],
    },
    'M-04': {
      dimensionsMm: '424 × 35 × 20 mm',
      shapeSummary: 'Entretoise droite munie de rainures supérieures parallèles pour loger les tringles.',
      cutsAndBevels: ['Coupes nettes à 90° ; longueur exacte 42,4 cm.'],
      holesAndSlots: [
        'Rainures larg. 2,5 mm × prof. 3,0 mm selon l\'entraxe choisi.',
        'Marges pleines de 1,8 cm à chaque bout.',
        '2 pré-perçages Ø 2,5 mm par bout pour vissage latéral.',
      ],
    },
    'M-05': {
      dimensionsMm: '384 × 35 × 20 mm',
      shapeSummary: 'Entretoise rainurée identique à M-04, raccourcie à 38,4 cm pour le cadre supérieur.',
      cutsAndBevels: ['Coupes nettes à 90° ; longueur exacte 38,4 cm.'],
      holesAndSlots: [
        'Mêmes rainures 2,5 × 3,0 mm alignées axe sur axe avec M-04.',
        'Marges pleines de 1,4 cm à chaque bout.',
        '2 pré-perçages Ø 2,5 mm par bout.',
      ],
    },
    'M-06': {
      dimensionsMm: '780 × 45 × 20 mm',
      shapeSummary: 'Pied arrière articulé à tête R=22 mm et talon biseauté à 8°.',
      cutsAndBevels: [
        'Tête supérieure arrondie R=22 mm pour pivoter à l\'extérieur de M-01.',
        'Talon biseauté à 8° pour un appui stable au sol.',
      ],
      holesAndSlots: [
        'Perçage Ø 8,5 mm à 3,5 cm du haut (axe M8).',
        'Perçage Ø 6,0 mm à 8,5 cm du haut pour goupille de butée.',
      ],
    },
    'M-07': {
      dimensionsMm: '280 × 45 × 20 mm',
      shapeSummary: 'Pied avant court à tête R=22 mm et base d\'équerre à 90°.',
      cutsAndBevels: ['Tête R=22 mm ; base plane à 90° donnant 30 cm de hauteur de sortie.'],
      holesAndSlots: [
        'Perçage Ø 8,5 mm à 3,5 cm du haut (axe M8).',
        'Perçage Ø 6,0 mm à 8,0 cm du haut pour verrouillage vertical.',
      ],
    },
    'M-08': {
      dimensionsMm: '460 × 45 × 20 mm',
      shapeSummary: 'Traverse horizontale rigidifiant chaque paire de pieds.',
      cutsAndBevels: ['Deux pièces de 46,0 cm coupées à 90°.'],
      holesAndSlots: ['Vissées avec 2 vis 4×45 mm/côté à 14 cm (arrière) et 10 cm (avant) du bas.'],
    },
    'M-09': {
      dimensionsMm: '380 × 90 × 18 mm',
      shapeSummary: 'Côté de trémie avec délardage arrière à 31° pour reposer de niveau sur la rampe.',
      cutsAndBevels: [
        'Bord supérieur horizontal de 38,0 cm.',
        'Bord inférieur arrière biseauté à 31° sur les 14,0 cm arrière.',
      ],
      holesAndSlots: ['Grillage 25×25 mm agrafé dessous ; pré-perçages Ø 2,5 mm pour M-10.'],
    },
    'M-10': {
      dimensionsMm: '414 × 90 × 18 mm',
      shapeSummary: 'Parois avant et arrière fermant la trémie à 45,0 cm de largeur extérieure.',
      cutsAndBevels: ['Coupes à 90° ; 41,4 + 2×1,8 = 45,0 cm largeur totale.'],
      holesAndSlots: ['Vissées à travers M-09 avec 2 vis 4×45 mm par angle.'],
    },
    'M-11': {
      dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
      shapeSummary: 'Trois paires en tasseau 22×22 mm : pieds avant (19 cm), butées 180° (10 cm) et guides (12 cm).',
      cutsAndBevels: [
        'M-11a (2×19 cm) : pied coupé à 31° pour poser à plat sur M-02.',
        'M-11b (2×10 cm) : butées vissées sous M-01 bloquant la charnière à 180°.',
        'M-11c (2×12 cm) : cales de guidage latéral.',
      ],
      holesAndSlots: ['Pré-perçage Ø 2,5 mm indispensable avant vissage 3,5×35 mm.'],
    },
  },
  stockPlans: mapStock(
    {
      'stock-90x18': '90 × 18 mm (Planche pin raboté)',
      'stock-45x20': '45 × 20 mm (Tasseau structurel pieds)',
      'stock-35x20': '35 × 20 mm (Entretoises grille)',
      'stock-22x22': '22 × 22 mm (Tasseau carré supports)',
    },
    {}
  ),
  categoryNames: {
    Madera: 'Bois',
    'Metálica y Malla': 'Métal & Grillage',
    Herrajes: 'Quincaillerie',
    Herramientas: 'Outillage',
  },
  bomItems: mapBom({
    'bom-wood-90': {
      name: 'Planche rabotée pin ou hêtre 90 × 18 mm',
      spec: 'Longueurs standard 240 cm sans nœuds lâches',
      qtyLabel: '3 planches (7,20 m)',
      note: 'Pour longerons principaux, traverse frontale et trémie',
    },
    'bom-wood-45': {
      name: 'Tasseau structurel raboté 45 × 20 mm',
      spec: 'Longueurs standard 240 cm',
      qtyLabel: '2 tasseaux (4,80 m)',
      note: 'Pour pieds pliants et traverses stabilisatrices',
    },
    'bom-wood-35': {
      name: 'Tasseau raboté 35 × 20 mm',
      spec: 'Longueurs standard 240 cm',
      qtyLabel: '2 tasseaux (4,80 m)',
      note: 'Pour les 7 entretoises rainurées portant les tringles',
    },
    'bom-wood-22': {
      name: 'Tasseau carré raboté 22 × 22 mm',
      spec: 'Longueur standard 240 cm',
      qtyLabel: '1 tasseau (2,40 m)',
      note: 'Pour pieds de trémie, butées 180° et cales guides',
    },
    'bom-mesh': {
      name: 'Grillage soudé galvanisé 25 × 25 mm',
      spec: 'Fil Ø 1,8 – 2,0 mm · Panneau 44 × 37 cm',
      qtyLabel: '1 panneau (0,20 m²)',
      note: 'Fond de trémie retenant les gros rameaux',
    },
    'bom-staples': {
      name: 'Agrafes de fixation ou baguette bloque-tringles',
      spec: 'Agrafes 14 mm ou baguette fine 15 × 8 mm',
      qtyLabel: '80 pcs / 2,8 m',
      note: 'Maintiennent le grillage et bloquent les tringles dans les rainures',
    },
    'bom-bolts': {
      name: 'Boulons collet carré M8 × 60 mm',
      spec: 'Acier galvanisé ou inox A2 + rondelle large + écrou papillon',
      qtyLabel: '6 jeux',
      note: '2 charnière centrale, 2 pieds arrière, 2 pieds avant',
    },
    'bom-wingnuts': {
      name: 'Rondelles antifriction nylon Ø 8 × 24 mm',
      spec: 'Épaisseur 1,5 mm entre pièces pivotantes',
      qtyLabel: '8 unités',
      note: 'Suppriment le frottement bois sur bois au pliage',
    },
    'bom-pins': {
      name: 'Goupilles rapides de sécurité Ø 6 mm',
      spec: 'Verrouillage sans outil de la trémie et des pieds',
      qtyLabel: '4 unités',
      note: 'Déploiement et pliage rapides au verger',
    },
    'bom-screws': {
      name: 'Vis bois tête fraisée 4×45 et 3,5×30 mm',
      spec: 'Acier bichromaté ou inox pour assemblage des cadres',
      qtyLabel: '60 pcs (4×45) + 30 pcs (3,5×30)',
      note: 'Toujours pré-percer à Ø 2,5 mm pour éviter d\'éclater le bois',
    },
    'bom-varnish': {
      name: 'Huile de lin cuite ou lasure extérieure alimentaire',
      spec: 'Finition microporeuse apte contact alimentaire',
      qtyLabel: '500 ml',
      note: 'Protège de la rosée matinale et des taches d\'huile',
    },
    'bom-tools': {
      name: 'Scie circulaire ou à onglet (lame fine)',
      spec: 'Voie de lame 2,2 – 2,5 mm',
      qtyLabel: '1 unité',
      note: 'Permet de rainurer en série les 7 entretoises',
    },
    'bom-drill': {
      name: 'Perceuse avec forets Ø 2,5 / 6 / 8,5 mm',
      spec: 'Colonne conseillée pour percer les axes M8 d\'équerre',
      qtyLabel: '1 jeu',
      note: 'Garantit un pliage parfaitement aligné',
    },
  }),
  assemblyPhases: mapPhases({
    1: {
      title: 'Débit des bois et arrondi des têtes pivotantes',
      tools: 'Scie à onglet, scie sauteuse, abrasif grain 100',
      summary: 'Couper longerons et pieds selon le plan et façonner les rayons de rotation.',
      instructions: [
        'Couper M-01 (88 cm) à 31° côté sortie et M-02 (82 cm) à 90° d\'équerre.',
        'Tracer R=35 mm sur les têtes charnière de M-01 et M-02 ; découper et poncer.',
        'Arrondir le haut des pieds (M-06, M-07) à R=22 mm et biseauter le pied M-06 à 8°.',
        'Percer tous les axes M8 à Ø 8,5 mm avec un martyr dessous.',
      ],
      toleranceNote: 'Tolérance clé : perçage charnière exactement à 45 mm du bout arrondi.',
    },
    2: {
      title: 'Rainurage groupé des 7 entretoises de grille',
      tools: 'Scie circulaire sur table avec butée de profondeur',
      summary: 'Rainurer les 7 traverses ensemble garantit des tringles parfaitement parallèles.',
      instructions: [
        'Brider ensemble les 4 M-04 (42,4 cm) et 3 M-05 (38,4 cm) centrées sur leur axe.',
        'Régler la profondeur de coupe à 3,0 mm.',
        'Scier les rainures parallèles selon le pas choisi en laissant 18 mm pleins aux bouts.',
        'Ébavurer et huiler l\'intérieur des rainures à l\'huile de lin.',
      ],
      toleranceNote: 'Avec une lame de 2,4 mm et tringle Ø 2,5 mm, l\'ajustement est serré sans jeu.',
    },
    3: {
      title: 'Assemblage des cadres supérieur (42 cm) et inférieur (46 cm)',
      tools: 'Visseuse, serre-joints longs, équerre',
      summary: 'Le cadre supérieur s\'emboîte dans l\'inférieur pour le pliage portefeuille.',
      instructions: [
        'Placer M-04 à 20 mm du bord inférieur de M-01 (bordure latérale de 70 mm).',
        'Visser régulièrement les 4 M-04 et vérifier l\'équerrage par les diagonales.',
        'Répéter pour le cadre supérieur avec les 3 M-05.',
        'Fixer la traverse frontale M-03 en laissant 55 mm libres dessous pour la sortie.',
      ],
      toleranceNote: 'Largeur intérieure de M-01 : 42,4 cm exacts pour loger les rondelles nylon.',
    },
    4: {
      title: 'Pose de la grille de tringles calibrées',
      tools: 'Cisaille, maillet nylon, baguette de blocage',
      summary: 'Les tringles guident les olives vers la sortie tandis que les feuilles chutent entre elles.',
      instructions: [
        'Couper les tringles à 85 cm (cadre inférieur) et 79 cm (cadre supérieur).',
        'Enfoncer chaque tringle dans les rainures de 3 mm à ras de la sortie.',
        'Bloquer axialement par agrafes ou baguette fine sur les traverses extrêmes.',
        'Tester le roulement libre avec une olive ou bille de 13 mm.',
      ],
      toleranceNote: 'Ne jamais vernir les tringles : le métal nu évite le collage des feuilles humides.',
    },
    5: {
      title: 'Montage de la charnière centrale M8 et butées 180°',
      tools: 'Clé de 13 mm, foret Ø 6 mm',
      summary: 'Les boulons M8 articulent les cadres et deux butées empêchent le fléchissement.',
      instructions: [
        'Emboîter M-02 dans M-01 avec rondelles nylon 1,5 mm de chaque côté.',
        'Passer les boulons M8×60 mm de l\'extérieur et serrer modérément.',
        'Rampe ouverte à 180°, visser deux cales 22×22×100 mm sous M-01 comme butées.',
        'Percer un trou traversant Ø 6 mm à 7 cm de la charnière pour la goupille.',
      ],
      toleranceNote: 'Au pliage à 180°, les grilles se retrouvent face extérieure et protègent l\'intérieur.',
    },
    6: {
      title: 'Montage des pieds articulés et traverses',
      tools: 'Perceuse, clé de 13 mm, fausse équerre',
      summary: 'Les pieds montés à l\'extérieur de M-01 se replient dans le gabarit 90×50×20 cm.',
      instructions: [
        'Relier les pieds arrière M-06 (78 cm) par M-08 à 14 cm du sol.',
        'Relier les pieds avant M-07 (28 cm) par M-08 à 10 cm du sol.',
        'Fixer les deux portiques à l\'extérieur de M-01 avec M8×60 mm et écrous papillon.',
        'Repérer les angles de service (82° / 90°) et percer pour goupilles Ø 6 mm.',
      ],
      toleranceNote: 'Pieds rabattus, l\'ensemble reste sous 90 cm de long et 50 cm de large.',
    },
    7: {
      title: 'Fabrication de la trémie amovible et finition',
      tools: 'Agrafeuse manuelle, pinceau',
      summary: 'Le caisson 45×38 cm retient les branches sur maille 25 mm et se retire en 5 secondes.',
      instructions: [
        'Assembler le cadre 45×38 cm (M-09 + M-10) et agrafer le grillage 25×25 mm bien tendu.',
        'Visser les pieds avant M-11a (19 cm, base 31°) dans les angles avant.',
        'Ajouter les cales de centrage M-11c pour caler la trémie entre les rails M-02.',
        'Poncer les arêtes (grain 120) et appliquer deux couches d\'huile de lin cuite.',
      ],
      toleranceNote: 'Pour plier à 20 cm : ôter la trémie, rabattre les pieds, plier la charnière.',
    },
  }),
};

const CA_DATASET: LocalizedDataset = {
  referencePhotos: [
    {
      ...REFERENCE_PHOTOS[0],
      title: 'Vista general desplegada en treball',
      caption: 'Posició de garbellat amb pendent de 31,5°, tremuja superior de 45 cm i boca de sortida a 30 cm del terra per encaixar caixes.',
      specs: '120 cm alçada total · 45 cm amplada tremuja · 30 cm sortida',
    },
    {
      ...REFERENCE_PHOTOS[1],
      title: 'Detall de tremuja i pregarbellat superior',
      caption: 'Calaix anivellat amb malla electrosoldada de 25×25 mm que reté branques gruixudes abans de deixar caure olives i fulles a les varetes.',
      specs: 'Malla 25×25 mm · Suports frontals 19 cm · Encaix desmuntable',
    },
    {
      ...REFERENCE_PHOTOS[2],
      title: 'Format plegat compacte per a transport',
      caption: 'Tancament en llibre mitjançant frontissa central M8, potes abatudes sobre els llistons i graella protegida a l\'exterior.',
      specs: '90 cm llarg · 50 cm amplada · 20 cm gruix',
    },
  ],
  foldingStages: [
    {
      id: 0,
      label: '1. Treball',
      target: 0,
      title: 'Posició de treball desplegada (31°)',
      description: 'Les potes davanteres i posteriors queden blocades amb passadors Ø 6 mm. Rampa de 162 cm a 31°, tremuja a 120 cm i sortida a 30 cm.',
    },
    {
      id: 1,
      label: '2. Tremuja',
      target: 25,
      title: 'Desmuntatge ràpid de la tremuja',
      description: 'S\'alliberen els passadors de la tremuja superior (45×38×9 cm) i s\'extrau cap amunt per desar-la plana.',
    },
    {
      id: 2,
      label: '3. Potes',
      target: 58,
      title: 'Abatiment de potes sobre llistons',
      description: 'S\'afluixen les papallones M8 exteriors; potes davanteres (28 cm) i posteriors (76 cm) giren sobre volanderes de niló paral·leles a M-01.',
    },
    {
      id: 3,
      label: '4. Tancament',
      target: 100,
      title: 'Tancament en llibre compacte (90 × 50 × 20 cm)',
      description: 'El tram superior (42 cm) pivota 180° per la frontissa central M8 i encaixa dins el tram inferior (42,4 cm interiors).',
    },
  ],
  olivePresets: [
    {
      ...OLIVE_PRESETS[0],
      recommendation: 'Llum lliure de 8 mm per evitar que les olives petites passin entre varetes mantenint el pas net de fulles.',
    },
    {
      ...OLIVE_PRESETS[1],
      recommendation: 'Configuració estàndard polivalent. Desfullat ràpid fins i tot amb fulla ampla humida o brots fins.',
    },
    {
      ...OLIVE_PRESETS[2],
      recommendation: 'Més separació entre varetes per evacuar fulles grans i peduncles sense frenar olives gruixudes.',
    },
  ],
  groupNames: {
    'Tramo Inferior': 'Tram Inferior',
    'Tramo Superior': 'Tram Superior',
    'Patas y Plegado': 'Potes i Plegat',
    'Tolva Superior': 'Tremuja Superior',
  },
  woodCutPieces: mapPieces({
    'M-01': {
      name: 'Llistons tram inferior (exteriors)',
      angleNote: 'Tall a 31° en boca frontal; cap superior arrodonit R=35 mm',
      drillNote: 'Ø 8,5 mm a 4,5 cm del cap (frontissa) i 12 cm (pota posterior)',
    },
    'M-02': {
      name: 'Llistons tram superior (interiors)',
      angleNote: 'Tall recte a 90° dalt; cap inferior arrodonit R=35 mm',
      drillNote: 'Ø 8,5 mm a 4,5 cm del cap arrodonit (coincideix amb M-01)',
    },
    'M-03': {
      name: 'Pont frontal de sortida i reforç',
      angleNote: 'Cantó inferior interior bisellat a 45° per a sortida fluida',
      drillNote: '4 avellanats Ø 4 mm als extrems per a cargols 4×40 mm',
    },
    'M-04': {
      name: 'Travessers ranurats tram inferior',
      angleNote: 'Talls a 90°; ranures superiors de 3 mm de profunditat',
      drillNote: 'Cargolats lateralment amb 2 cargols 4×45 mm per testa',
    },
    'M-05': {
      name: 'Travessers ranurats tram superior',
      angleNote: 'Talls a 90°; ranurats segons el pas escollit',
      drillNote: 'Cargolats lateralment amb 2 cargols 4×45 mm per testa',
    },
    'M-06': {
      name: 'Potes posteriors plegables',
      angleNote: 'Peu bisellat a 8° per a suport pla a terra; cap R=22 mm',
      drillNote: 'Ø 8,5 mm a 3,5 cm del cap (muntatge exterior a M-01)',
    },
    'M-07': {
      name: 'Potes davanteres plegables',
      angleNote: 'Base recta a 90°; cap arrodonit R=22 mm',
      drillNote: 'Ø 8,5 mm a 3,5 cm del cap (muntatge exterior a M-01)',
    },
    'M-08': {
      name: 'Travessers estabilitzadors entre potes',
      angleNote: '2 uts de 46,0 cm a 90° (1 posterior + 1 davanter)',
      drillNote: 'Encolats i cargolats a 14 cm / 10 cm de la base',
    },
    'M-09': {
      name: 'Laterals de tremuja de pregarbellat',
      angleNote: 'Vora superior recta; suport posterior rebaixat a 31°',
      drillNote: 'Malla 25×25 mm grapada per tot el perímetre inferior',
    },
    'M-10': {
      name: 'Frontal i posterior de tremuja (45 cm)',
      angleNote: 'Talls nets a esquadra 90° (41,4 + 1,8 + 1,8 = 45,0 cm)',
      drillNote: 'Fixació a testa amb M-09 mitjançant cargols 4×45 mm',
    },
    'M-11': {
      name: 'Suports frontals tremuja i topalls 180°',
      angleNote: '2×19 cm (peus tremuja base 31°) + 2×10 cm (topalls) + 2×12 cm (guies)',
      drillNote: 'Preforat Ø 2,5 mm i cargols 3,5×35 mm',
    },
  }),
  pieceExtra: {
    'M-01': {
      dimensionsMm: '880 × 90 × 18 mm',
      shapeSummary: 'Llistó rectangular amb boca davantera bisellada a 31° i cap posterior semicircular R=35 mm.',
      cutsAndBevels: [
        'Extrem davanter: tall oblic a 31° per quedar aplomat a terra.',
        'Cap superior (frontissa): radi R=35 mm per a gir lliure de 180°.',
      ],
      holesAndSlots: [
        'Forat Ø 8,5 mm a 4,5 cm del cap arrodonit i centrat (eix frontissa).',
        'Forat Ø 8,5 mm a 12,0 cm del cap i 3,0 cm de baix (pota posterior).',
        'Forat Ø 8,5 mm a 10,0 cm del front i 3,0 cm de baix (pota davantera).',
        'Forat Ø 6,0 mm a 9,0 cm del cap per a passador de bloqueig.',
      ],
    },
    'M-02': {
      dimensionsMm: '820 × 90 × 18 mm',
      shapeSummary: 'Llistó interior amb cap arrodonit R=35 mm i testa superior recta a esquadra (90°).',
      cutsAndBevels: [
        'Cap frontissa: radi R=35 mm; encaixa dins M-01 amb 2 mm de joc.',
        'Cap superior: tall recte a 90°.',
      ],
      holesAndSlots: [
        'Forat Ø 8,5 mm a 4,5 cm del cap arrodonit (coincideix amb M-01).',
        'Forat Ø 6,0 mm a 9,0 cm del cap per a passador a 180°.',
      ],
    },
    'M-03': {
      dimensionsMm: '460 × 90 × 18 mm',
      shapeSummary: 'Taula frontal a esquadra amb xamfrà interior inferior a 45° per a sortida neta.',
      cutsAndBevels: [
        'Testes rectes a 90° cobrint els 46,0 cm exteriors de M-01.',
        'Cantó inferior interior bisellat a 45° (10 × 10 mm).',
      ],
      holesAndSlots: [
        '4 avellanats Ø 4,0 mm als extrems per a cargols 4×40 mm.',
        'Deixa 5,5 cm lliures per sota com a boca de descàrrega.',
      ],
    },
    'M-04': {
      dimensionsMm: '424 × 35 × 20 mm',
      shapeSummary: 'Llistó rectangular amb pinta de ranures superiors paral·leles per a les varetes.',
      cutsAndBevels: ['Talls nets a 90°; llargada exacta 42,4 cm.'],
      holesAndSlots: [
        'Ranures superiors de 2,5 × 3,0 mm segons el pas escollit.',
        'Marges laterals massissos d\'1,8 cm a cada extrem.',
        '2 preforats Ø 2,5 mm per testa.',
      ],
    },
    'M-05': {
      dimensionsMm: '384 × 35 × 20 mm',
      shapeSummary: 'Llistó ranurat idèntic a M-04 escurçat a 38,4 cm per al tram superior.',
      cutsAndBevels: ['Talls nets a 90°; llargada exacta 38,4 cm.'],
      holesAndSlots: [
        'Mateixes ranures 2,5 × 3,0 mm alineades amb M-04.',
        'Marges laterals massissos d\'1,4 cm a cada extrem.',
        '2 preforats Ø 2,5 mm per testa.',
      ],
    },
    'M-06': {
      dimensionsMm: '780 × 45 × 20 mm',
      shapeSummary: 'Pota posterior articulada amb cap R=22 mm i peu bisellat a 8°.',
      cutsAndBevels: [
        'Cap superior arrodonit R=22 mm per pivotar fora de M-01.',
        'Peu inferior bisellat a 8° per recolzar pla a terra.',
      ],
      holesAndSlots: [
        'Forat Ø 8,5 mm a 3,5 cm de dalt (eix M8).',
        'Forat Ø 6,0 mm a 8,5 cm de dalt per a passador de treball.',
      ],
    },
    'M-07': {
      dimensionsMm: '280 × 45 × 20 mm',
      shapeSummary: 'Pota davantera curta amb cap R=22 mm i base plana a 90°.',
      cutsAndBevels: ['Cap R=22 mm; base plana a 90° per mantenir 30 cm de sortida.'],
      holesAndSlots: [
        'Forat Ø 8,5 mm a 3,5 cm de dalt (eix M8).',
        'Forat Ø 6,0 mm a 8,0 cm de dalt per a bloqueig vertical.',
      ],
    },
    'M-08': {
      dimensionsMm: '460 × 45 × 20 mm',
      shapeSummary: 'Travesser horitzontal recte que uneix cada parella de potes.',
      cutsAndBevels: ['Dues peces iguals de 46,0 cm tallades a 90°.'],
      holesAndSlots: ['Cargolades amb 2 cargols 4×45 mm/costat a 14 cm (post.) i 10 cm (dav.) de la base.'],
    },
    'M-09': {
      dimensionsMm: '380 × 90 × 18 mm',
      shapeSummary: 'Lateral de tremuja amb rebaix posterior a 31° per anivellar sobre la rampa.',
      cutsAndBevels: [
        'Vora superior horitzontal de 38,0 cm.',
        'Vora inferior posterior inclinada a 31° en els darrers 14,0 cm.',
      ],
      holesAndSlots: ['Grapat inferior de malla 25×25 mm; preforats Ø 2,5 mm per a M-10.'],
    },
    'M-10': {
      dimensionsMm: '414 × 90 × 18 mm',
      shapeSummary: 'Taules frontal i posterior rectes tancant la tremuja a 45,0 cm exteriors.',
      cutsAndBevels: ['Talls a 90°; 41,4 + 2×1,8 = 45,0 cm totals.'],
      holesAndSlots: ['Fixació a testa des de M-09 amb cargols 4×45 mm.'],
    },
    'M-11': {
      dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
      shapeSummary: 'Tres parelles en quadrant 22×22 mm: peus tremuja (19 cm), topalls 180° (10 cm) i calços (12 cm).',
      cutsAndBevels: [
        'M-11a (2×19 cm): base tallada a 31° per recolzar plana sobre M-02.',
        'M-11b (2×10 cm): topalls sota M-01 per aturar la frontissa a 180°.',
        'M-11c (2×12 cm): calços guia interiors.',
      ],
      holesAndSlots: ['Preforar sempre Ø 2,5 mm abans de cargolar 3,5×35 mm.'],
    },
  },
  stockPlans: mapStock(
    {
      'stock-90x18': '90 × 18 mm (Taula pi raspallat)',
      'stock-45x20': '45 × 20 mm (Llistó estructural potes)',
      'stock-35x20': '35 × 20 mm (Travessers graella)',
      'stock-22x22': '22 × 22 mm (Quadrant suports i topalls)',
    },
    {}
  ),
  categoryNames: {
    Madera: 'Fusta',
    'Metálica y Malla': 'Metall i Malla',
    Herrajes: 'Ferratges',
    Herramientas: 'Eines',
  },
  bomItems: mapBom({
    'bom-wood-90': {
      name: 'Taula raspallada de pi o faig 90 × 18 mm',
      spec: 'Llargs comercials de 240 cm sense nusos',
      qtyLabel: '3 taules (7,20 m)',
      note: 'Per a llistons principals, pont frontal i calaix de tremuja',
    },
    'bom-wood-45': {
      name: 'Llistó estructural raspallat 45 × 20 mm',
      spec: 'Llargs comercials de 240 cm',
      qtyLabel: '2 llistons (4,80 m)',
      note: 'Per a potes plegables i travessers estabilitzadors',
    },
    'bom-wood-35': {
      name: 'Llistó raspallat 35 × 20 mm',
      spec: 'Llargs comercials de 240 cm',
      qtyLabel: '2 llistons (4,80 m)',
      note: 'Per als 7 travessers ranurats de la graella',
    },
    'bom-wood-22': {
      name: 'Quadrant raspallat 22 × 22 mm',
      spec: 'Llarg comercial de 240 cm',
      qtyLabel: '1 llistó (2,40 m)',
      note: 'Per a suports frontals de tremuja, topalls 180° i guies',
    },
    'bom-mesh': {
      name: 'Malla electrosoldada galvanitzada 25 × 25 mm',
      spec: 'Filferro Ø 1,8 – 2,0 mm · Pany de 44 × 37 cm',
      qtyLabel: '1 pany (0,20 m²)',
      note: 'Fons de la tremuja superior per retenir branques gruixudes',
    },
    'bom-staples': {
      name: 'Grapes de fixació o llistó trepitja-varetes',
      spec: 'Grapes 14 mm o llistó fi 15 × 8 mm',
      qtyLabel: '80 uts / 2,8 m',
      note: 'Fixen la malla i bloquegen les varetes a les ranures',
    },
    'bom-bolts': {
      name: 'Pernis carrosser coll quadrat M8 × 60 mm',
      spec: 'Acer galvanitzat o inox A2 + volandera ampla + papallona',
      qtyLabel: '6 jocs',
      note: '2 a frontissa central, 2 a potes posteriors, 2 a davanteres',
    },
    'bom-wingnuts': {
      name: 'Volanderes lliscants de niló Ø 8 × 24 mm',
      spec: 'Gruix 1,5 mm entre fustes articulades',
      qtyLabel: '8 unitats',
      note: 'Eviten el fregament fusta-fusta i suavitzen el plegat',
    },
    'bom-pins': {
      name: 'Passadors ràpids de seguretat Ø 6 mm',
      spec: 'Bloqueig de tremuja i potes sense claus a l\'oliverar',
      qtyLabel: '4 unitats',
      note: 'Permeten muntar i plegar en segons al camp',
    },
    'bom-screws': {
      name: 'Cargols cap avellanat 4 × 45 i 3,5 × 30 mm',
      spec: 'Acer bicromatat o inoxidable per a bastidors',
      qtyLabel: '60 uts (4×45) + 30 uts (3,5×30)',
      note: 'Preforar sempre amb broca Ø 2,5 mm per no esberlar',
    },
    'bom-varnish': {
      name: 'Oli de llinosa cuit o lasur a l\'aigua exterior',
      spec: 'Acabat apte per a contacte alimentari',
      qtyLabel: '500 ml',
      note: 'Protegeix de la humitat i evita taques d\'oli',
    },
    'bom-tools': {
      name: 'Serra circular o ingletadora (disc fi)',
      spec: 'Disc de 2,2 – 2,5 mm de gruix de tall',
      qtyLabel: '1 unitat',
      note: 'Per ranurar en bloc els 7 travessers',
    },
    'bom-drill': {
      name: 'Trepant amb broques Ø 2,5 / 6 / 8,5 mm',
      spec: 'Recomanat suport vertical per esquadrar els eixos M8',
      qtyLabel: '1 joc',
      note: 'Assegura un plegat alineat sense torsions',
    },
  }),
  assemblyPhases: mapPhases({
    1: {
      title: 'Tall de llistons i arrodoniment de caps articulats',
      tools: 'Ingletadora, serra de calar, paper de vidre gra 100',
      summary: 'Es tallen llistons i potes segons el plànol i s\'arrodoneixen les puntes mòbils.',
      instructions: [
        'Talla M-01 (88 cm) a 31° al davant i M-02 (82 cm) recte a 90°.',
        'Traça radi R=35 mm als caps de frontissa de M-01 i M-02 i retalla.',
        'Arrodoneix els caps de les potes (M-06, M-07) a R=22 mm i bisella la base de M-06 a 8°.',
        'Forada tots els eixos M8 a Ø 8,5 mm amb fusta màrtir a sota.',
      ],
      toleranceNote: 'Tolerància clau: el forat de frontissa a 45 mm exactes del cap arrodonit.',
    },
    2: {
      title: 'Ranurat simultani dels 7 travessers de graella',
      tools: 'Serra circular amb topall de profunditat',
      summary: 'Ranurar tots els travessers junts garanteix varetes perfectament paral·leles.',
      instructions: [
        'Alinea els 4 M-04 (42,4 cm) i 3 M-05 (38,4 cm) pel centre i subjecta\'ls amb sergents.',
        'Regula la profunditat de tall a 3,0 mm.',
        'Fes talls paral·lels segons el pas escollit deixant 18 mm lliures als extrems.',
        'Llima rebaves i aplica oli de llinosa dins les ranures.',
      ],
      toleranceNote: 'Amb disc de 2,4 mm i vareta de 2,5 mm l\'encaix queda ferm sense joc.',
    },
    3: {
      title: 'Muntatge dels bastidors superior (42 cm) i inferior (46 cm)',
      tools: 'Cargolador, sergents llargs, esquadre',
      summary: 'El tram superior encaixa dins l\'inferior per permetre el plegat en llibre.',
      instructions: [
        'Situa M-04 a 20 mm de la vora inferior de M-01 (paret lateral de 70 mm).',
        'Cargola els 4 M-04 uniformement i comprova les diagonals.',
        'Repeteix al tram superior amb els 3 M-05.',
        'Fixa el pont frontal M-03 deixant 55 mm lliures sota per a la sortida.',
      ],
      toleranceNote: 'Llum interna de M-01: 42,4 cm exactes per allotjar les volanderes de niló.',
    },
    4: {
      title: 'Muntatge de la graella de varetes calibrades',
      tools: 'Cisalla, maça de niló, llistó trepitja-varetes',
      summary: 'Les varetes guien l\'oliva mentre les fulles cauen pels espais oberts.',
      instructions: [
        'Talla varetes galvanitzades o inox de 85 cm (inferior) i 79 cm (superior).',
        'Assenta cada vareta a les ranures de 3 mm arran de la boca de sortida.',
        'Bloca axialment amb grapes o llistó fi als travessers extrems.',
        'Comprova amb una oliva que rodi lliurement.',
      ],
      toleranceNote: 'No envernissis mai les varetes: el metall nu evita que s\'hi enganxin fulles humides.',
    },
    5: {
      title: 'Instal·lació de frontissa central M8 i topalls a 180°',
      tools: 'Clau fixa de 13 mm, broca Ø 6 mm',
      summary: 'Els pernis M8 articulen els trams i dos topalls eviten que cedeixi en càrrega.',
      instructions: [
        'Introdueix M-02 dins M-01 intercalant volanderes de niló d\'1,5 mm.',
        'Passa els pernis M8×60 mm des de fora i estreny suaument.',
        'Amb la rampa estesa a 180°, cargola dos tacs 22×22×100 mm sota M-01.',
        'Forada Ø 6 mm a 7 cm de la frontissa per al passador de bloqueig.',
      ],
      toleranceNote: 'En plegar a 180°, les graelles queden a l\'exterior protegint l\'interior.',
    },
    6: {
      title: 'Muntatge de potes articulades i travessers',
      tools: 'Trepant, clau 13 mm, falsa esquadra',
      summary: 'Potes muntades fora de M-01 permeten plegar tot en 90×50×20 cm.',
      instructions: [
        'Uneix les potes posteriors M-06 (78 cm) amb M-08 a 14 cm de la base.',
        'Uneix les potes davanteres M-07 (28 cm) amb M-08 a 10 cm de la base.',
        'Fixa tots dos pòrtics fora de M-01 amb M8×60 mm i papallones.',
        'Marca els angles de treball (82° / 90°) i forada per a passadors Ø 6 mm.',
      ],
      toleranceNote: 'Amb les potes plegades, cap peça supera els 90 cm ni els 50 cm d\'amplada.',
    },
    7: {
      title: 'Construcció de tremuja desmuntable i acabat',
      tools: 'Grapadora manual, brotxa',
      summary: 'El calaix 45×38 cm reté branques a la malla de 25 mm i surt en 5 segons.',
      instructions: [
        'Muntem el marc 45×38 cm (M-09 + M-10) i grapem la malla 25×25 mm ben tensa.',
        'Fixem els peus frontals M-11a (19 cm, base 31°) a les cantonades davanteres.',
        'Afegim els calços guia M-11c per centrar la tremuja dins M-02.',
        'Polim arestes (gra 120) i apliquem dues mans d\'oli de llinosa cuit.',
      ],
      toleranceNote: 'Per plegar a 20 cm: treu la tremuja, abat potes i tanca la frontissa.',
    },
  }),
};

export function getLocalizedDataset(lang: LanguageCode): LocalizedDataset {
  switch (lang) {
    case 'en':
      return EN_DATASET;
    case 'pt':
      return PT_DATASET;
    case 'de':
      return DE_DATASET;
    case 'fr':
      return FR_DATASET;
    case 'ca':
      return CA_DATASET;
    case 'es':
    default:
      return {
        referencePhotos: REFERENCE_PHOTOS,
        foldingStages: ES_STAGES,
        olivePresets: OLIVE_PRESETS,
        woodCutPieces: WOOD_CUT_PIECES,
        groupNames: {
          'Tramo Inferior': 'Tramo Inferior',
          'Tramo Superior': 'Tramo Superior',
          'Patas y Plegado': 'Patas y Plegado',
          'Tolva Superior': 'Tolva Superior',
        },
        pieceExtra: ES_PIECE_EXTRA,
        stockPlans: STOCK_PLANS,
        bomItems: BASE_BOM_ITEMS,
        categoryNames: {
          Madera: 'Madera',
          'Metálica y Malla': 'Metálica y Malla',
          Herrajes: 'Herrajes',
          Herramientas: 'Herramientas',
        },
        assemblyPhases: ASSEMBLY_PHASES,
      };
  }
}
