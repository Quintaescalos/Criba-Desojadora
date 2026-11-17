import { useMemo, useState } from 'react';
import { WOOD_CUT_PIECES, WoodCutPiece } from '../data/manualData';

type GroupFilter = 'Todas' | WoodCutPiece['group'];

const GROUPS: GroupFilter[] = [
  'Todas',
  'Tramo Inferior',
  'Tramo Superior',
  'Patas y Plegado',
  'Tolva Superior',
];

interface PieceExtraDetail {
  dimensionsMm: string;
  shapeSummary: string;
  cutsAndBevels: string[];
  holesAndSlots: string[];
}

const PIECE_EXTRA: Record<string, PieceExtraDetail> = {
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
    cutsAndBevels: [
      'Cortes limpios a 90° en ambos extremos; longitud exacta 42,4 cm (luz interna inferior).',
    ],
    holesAndSlots: [
      'Ranuras superiores de 2,5 mm de ancho × 3,0 mm de profundidad según paso elegido (10,2 / 12,0 / 14,0 mm).',
      'Márgenes laterales macizos de 1,8 cm en cada extremo sin ranurar.',
      '2 pretaladros Ø 2,5 mm en cada testa para atornillado desde el exterior de M-01.',
    ],
  },
  'M-05': {
    dimensionsMm: '384 × 35 × 20 mm',
    shapeSummary: 'Listón ranurado idéntico en perfil a M-04 pero acortado a 38,4 cm para el tramo superior interior.',
    cutsAndBevels: [
      'Cortes limpios a 90° en ambos extremos; longitud exacta 38,4 cm (luz interna superior).',
    ],
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
    cutsAndBevels: [
      'Dos piezas iguales de 46,0 cm cortadas a escuadra (90°) en ambos extremos.',
    ],
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
    holesAndSlots: [
      'Fijación a tope desde los laterales M-09 con 2 tirafondos 4×45 mm por esquina.',
    ],
  },
  'M-11': {
    dimensionsMm: '22 × 22 mm (190 / 100 / 120 mm)',
    shapeSummary: 'Tres parejas en cuadradillo de 22×22 mm: pies frontales de tolva (19 cm), topes 180° (10 cm) y calzos (12 cm).',
    cutsAndBevels: [
      'M-11a (2 uds × 19,0 cm): base inferior cortada a 31° para apoyar plana sobre el canto superior de M-02.',
      'M-11b (2 uds × 10,0 cm): tacos rectos a 90° atornillados bajo M-01 como tope mecánico de la bisagra.',
      'M-11c (2 uds × 12,0 cm): calzos guía interiores para centrar la tolva sin desplazamientos.',
    ],
    holesAndSlots: [
      'Atornillado interior con tirafondos 3,5×35 mm (pretaladro Ø 2,5 mm obligatorio en cuadradillo fino).',
    ],
  },
};

function PieceShapeSvg({ code, compact = false }: { code: string; compact?: boolean }) {
  const heightClass = compact ? 'h-44' : 'h-64';

  return (
    <svg
      viewBox="0 0 560 220"
      className={`w-full ${heightClass}`}
      role="img"
      aria-label={`Dibujo técnico de forma y cotas de la pieza ${code}`}
    >
      {/* Subtle blueprint baseline */}
      <rect x="8" y="8" width="544" height="204" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {code === 'M-01' && (
        <g>
          {/* Main rail: beveled left at 31 deg, rounded right R=35 */}
          <path
            d="M 88 68 L 456 68 A 32 32 0 0 1 456 132 L 50 132 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          {/* Crossbar shelf reference line at 20mm from bottom */}
          <line x1="60" y1="118" x2="430" y2="118" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          {/* Drill holes */}
          <circle cx="110" cy="112" r="4" fill="#1e40af" stroke="#fff" strokeWidth="1.2" />
          <circle cx="408" cy="112" r="4" fill="#1e40af" stroke="#fff" strokeWidth="1.2" />
          <circle cx="430" cy="96" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <circle cx="458" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          {/* Dimensions */}
          <line x1="50" y1="158" x2="488" y2="158" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="50" y1="152" x2="50" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="488" y1="152" x2="488" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="269" y="175" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo total: 88,0 cm (880 mm) · Sección: 90 × 18 mm
          </text>
          <text x="72" y="54" className="fill-slate-700 text-[10px] font-mono">Bisel 31°</text>
          <text x="456" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=35 mm · Ø8,5 a 4,5 cm</text>
          <text x="110" y="148" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">Pata del. 10 cm</text>
          <text x="400" y="148" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">Pata tras. 12 cm</text>
          {/* End-section profile inset */}
          <rect x="510" y="68" width="16" height="64" fill="#e5c79e" stroke="#78502b" strokeWidth="1.4" />
          <text x="518" y="148" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
        </g>
      )}

      {code === 'M-02' && (
        <g>
          {/* Rounded left R=35, square right 90 deg */}
          <path
            d="M 102 68 L 474 68 L 474 132 L 102 132 A 32 32 0 0 1 102 68 Z"
            fill="#e5c79e"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <line x1="115" y1="118" x2="474" y2="118" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="100" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="132" cy="96" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          {/* Dimensions */}
          <line x1="70" y1="158" x2="474" y2="158" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="70" y1="152" x2="70" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="474" y1="152" x2="474" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="272" y="175" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo total: 82,0 cm (820 mm) · Sección: 90 × 18 mm
          </text>
          <text x="106" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=35 mm · Ø8,5 a 4,5 cm</text>
          <text x="456" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">Corte 90°</text>
          <rect x="506" y="68" width="16" height="64" fill="#e5c79e" stroke="#78502b" strokeWidth="1.4" />
          <text x="514" y="148" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
        </g>
      )}

      {code === 'M-03' && (
        <g>
          {/* Front discharge bridge 46 x 9 cm + side chamfer profile */}
          <rect x="85" y="62" width="320" height="72" fill="#e5c79e" stroke="#78502b" strokeWidth="1.6" />
          <line x1="85" y1="122" x2="405" y2="122" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          {/* 4 countersunk screw holes */}
          {[98, 392].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="80" r="3" fill="#0f172a" />
              <circle cx={cx} cy="114" r="3" fill="#0f172a" />
            </g>
          ))}
          <text x="245" y="102" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            Alzado frontal 46,0 × 9,0 cm
          </text>
          {/* Side profile showing 45 deg lower chamfer */}
          <polygon points="462,62 486,62 486,120 474,134 462,134" fill="#d9b382" stroke="#78502b" strokeWidth="1.6" />
          <text x="474" y="152" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">Perfil bisel 45°</text>
          <line x1="85" y1="164" x2="405" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="245" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo: 46,0 cm · Altura: 9,0 cm · Espesor: 18 mm
          </text>
        </g>
      )}

      {(code === 'M-04' || code === 'M-05') && (
        <g>
          {/* Top-down / elevation showing parallel slots */}
          <rect
            x={code === 'M-04' ? 65 : 85}
            y="78"
            width={code === 'M-04' ? 350 : 310}
            height="42"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          {/* Parallel notches along top edge */}
          {Array.from({ length: code === 'M-04' ? 24 : 21 }, (_, idx) => {
            const startX = code === 'M-04' ? 88 : 105;
            const x = startX + idx * 12.6;
            return (
              <rect key={idx} x={x} y="78" width="4" height="10" fill="#475569" />
            );
          })}
          {/* Profile cross section with 3mm notch */}
          <polygon points="465,78 480,78 480,85 486,85 486,78 500,78 500,120 465,120" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
          <text x="482" y="140" textAnchor="middle" className="fill-slate-700 text-[9px] font-mono">Ranura 3 mm</text>
          <text x="482" y="66" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">20×35 mm</text>

          <line
            x1={code === 'M-04' ? 65 : 85}
            y1="150"
            x2={code === 'M-04' ? 415 : 395}
            y2="150"
            stroke="#1e40af"
            strokeWidth="1.2"
          />
          <text x="240" y="170" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {code === 'M-04'
              ? 'Largo: 42,4 cm · Margen extremos: 1,8 cm · Sección 35×20 mm'
              : 'Largo: 38,4 cm · Margen extremos: 1,4 cm · Sección 35×20 mm'}
          </text>
          <text x="240" y="62" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
            Ranurado continuo en bloque (ancho 2,5 mm × prof. 3,0 mm)
          </text>
        </g>
      )}

      {code === 'M-06' && (
        <g>
          {/* Rear leg 78 cm: rounded left head R=22, 8 deg beveled right foot */}
          <path
            d="M 94 78 L 468 78 L 478 122 L 94 122 A 22 22 0 0 1 94 78 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <circle cx="96" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="128" cy="100" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <text x="108" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=22 · Ø8,5 (3,5 cm) · Ø6 (8,5 cm)</text>
          <text x="466" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">Bisel pie 8°</text>
          <line x1="72" y1="152" x2="478" y2="152" stroke="#1e40af" strokeWidth="1.2" />
          <text x="275" y="172" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo total: 78,0 cm (780 mm) · Sección: 45 × 20 mm
          </text>
        </g>
      )}

      {code === 'M-07' && (
        <g>
          {/* Front leg 28 cm: rounded top R=22, square bottom 90 deg */}
          <path
            d="M 185 78 L 365 78 L 365 122 L 185 122 A 22 22 0 0 1 185 78 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <circle cx="188" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="218" cy="100" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <text x="200" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=22 · Ø8,5 (3,5 cm)</text>
          <text x="355" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">Corte 90°</text>
          <line x1="163" y1="152" x2="365" y2="152" stroke="#1e40af" strokeWidth="1.2" />
          <text x="264" y="172" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo total: 28,0 cm (280 mm) · Sección: 45 × 20 mm
          </text>
        </g>
      )}

      {code === 'M-08' && (
        <g>
          <rect x="95" y="78" width="320" height="44" fill="#d9b382" stroke="#78502b" strokeWidth="1.6" />
          {[106, 404].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="90" r="2.5" fill="#0f172a" />
              <circle cx={cx} cy="110" r="2.5" fill="#0f172a" />
            </g>
          ))}
          <rect x="460" y="78" width="22" height="44" fill="#e5c79e" stroke="#78502b" strokeWidth="1.4" />
          <text x="471" y="140" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">20×45 mm</text>
          <line x1="95" y1="152" x2="415" y2="152" stroke="#1e40af" strokeWidth="1.2" />
          <text x="255" y="172" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo: 46,0 cm (460 mm) · Cortes rectos a 90° · Sección: 45 × 20 mm
          </text>
        </g>
      )}

      {code === 'M-09' && (
        <g>
          {/* Hopper side panel 38x9 cm with 31 deg rear bottom taper/seat */}
          <polygon
            points="95,60 395,60 395,92 290,136 95,136"
            fill="#e5c79e"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <line x1="95" y1="130" x2="290" y2="130" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x="245" y="100" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            Lateral Tolva · 38,0 × 9,0 cm
          </text>
          <text x="360" y="138" className="fill-blue-900 text-[10px] font-mono font-semibold">Rebaje apoyo 31°</text>
          <rect x="465" y="60" width="16" height="76" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />
          <text x="473" y="152" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
          <line x1="95" y1="164" x2="395" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="245" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Largo: 38,0 cm · Altura frontal: 9,0 cm · Espesor: 18 mm
          </text>
        </g>
      )}

      {code === 'M-10' && (
        <g>
          <rect x="85" y="64" width="330" height="72" fill="#e5c79e" stroke="#78502b" strokeWidth="1.6" />
          <text x="250" y="104" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            Frente / Trasera Tolva · 41,4 × 9,0 cm (escuadra 90°)
          </text>
          <rect x="465" y="64" width="16" height="72" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />
          <text x="473" y="152" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
          <line x1="85" y1="164" x2="415" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="250" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            41,4 cm (+ 2 × 1,8 cm laterales = 45,0 cm ancho exterior)
          </text>
        </g>
      )}

      {code === 'M-11' && (
        <g>
          {/* M-11a front strut 19 cm with 31 deg bottom */}
          <polygon points="75,66 235,66 218,92 75,92" fill="#d9b382" stroke="#78502b" strokeWidth="1.5" />
          <text x="150" y="83" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            M-11a · 19,0 cm (base 31°)
          </text>

          {/* M-11b stop cleat 10 cm */}
          <rect x="285" y="66" width="110" height="26" fill="#cba16d" stroke="#78502b" strokeWidth="1.5" />
          <text x="340" y="83" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            M-11b · 10,0 cm
          </text>

          {/* M-11c guide block 12 cm */}
          <rect x="285" y="114" width="130" height="26" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
          <text x="350" y="131" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            M-11c · 12,0 cm
          </text>

          {/* Square section 22x22 */}
          <rect x="468" y="82" width="28" height="28" fill="#d9b382" stroke="#78502b" strokeWidth="1.5" />
          <text x="482" y="128" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">22×22 mm</text>

          <text x="280" y="176" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            Cuadradillo 22 × 22 mm · 2 uds de cada sub-pieza (6 uds en total)
          </text>
        </g>
      )}
    </svg>
  );
}

export function PieceDetails() {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('Todas');
  const [selectedCode, setSelectedCode] = useState<string>('M-01');
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);

  const filteredPieces = useMemo(
    () =>
      groupFilter === 'Todas'
        ? WOOD_CUT_PIECES
        : WOOD_CUT_PIECES.filter((p) => p.group === groupFilter),
    [groupFilter]
  );

  const activePiece = useMemo(
    () =>
      filteredPieces.find((p) => p.code === selectedCode) ??
      filteredPieces[0] ??
      WOOD_CUT_PIECES[0],
    [filteredPieces, selectedCode]
  );

  const extra = PIECE_EXTRA[activePiece.code];

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-900">
            Detalle individual de forma, ángulos y dimensiones por pieza
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Selecciona cualquier referencia (M-01 a M-11) para consultar su perfil ortogonal, radios de giro, biseles y coordenadas de taladro.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 no-print">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/75 rounded-lg">
            {GROUPS.map((grp) => (
              <button
                key={grp}
                type="button"
                onClick={() => setGroupFilter(grp)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  groupFilter === grp
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid((v) => !v)}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            {showAllGrid ? 'Vista inspector individual' : 'Ver todas las fichas (11)'}
          </button>
        </div>
      </div>

      {!showAllGrid ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left selector list */}
          <div className="lg:col-span-4 border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 overflow-hidden">
            {filteredPieces.map((piece) => {
              const isSelected = piece.code === activePiece.code;
              return (
                <button
                  key={piece.code}
                  type="button"
                  onClick={() => setSelectedCode(piece.code)}
                  className={`w-full text-left px-4 py-3 transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-blue-800">
                        {piece.code}
                      </span>
                      <span className="text-sm font-medium text-slate-900 truncate">
                        {piece.name}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-slate-500 mt-0.5">
                      {piece.qty} {piece.qty === 1 ? 'ud' : 'uds'} · {piece.lengthCm.toFixed(1).replace('.', ',')} cm · {piece.sectionMm} mm
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Detailed Shape & Dimensions Card */}
          <div className="lg:col-span-8 border border-slate-200 rounded-xl bg-white p-6 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-mono text-blue-800 font-semibold">
                  {activePiece.code} · {activePiece.group} · {activePiece.qty}{' '}
                  {activePiece.qty === 1 ? 'unidad' : 'unidades'}
                </div>
                <h4 className="font-display text-xl font-semibold text-slate-900 mt-1">
                  {activePiece.name}
                </h4>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900">
                {extra.dimensionsMm}
              </span>
            </div>

            <PieceShapeSvg code={activePiece.code} />

            <p className="text-sm text-slate-700 leading-relaxed">{extra.shapeSummary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Forma, cortes y ángulos
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  {extra.cutsAndBevels.map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-blue-800 font-semibold">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Taladros, ranuras y fijación
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
                  {extra.holesAndSlots.map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-mono text-blue-800 font-semibold">·</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPieces.map((piece) => {
            const info = PIECE_EXTRA[piece.code];
            return (
              <article
                key={piece.code}
                className="border border-slate-200 rounded-xl bg-white p-5 space-y-4"
              >
                <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-semibold text-blue-800">
                      {piece.code} · {piece.qty} {piece.qty === 1 ? 'ud' : 'uds'}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{piece.name}</h4>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">
                    {info.dimensionsMm}
                  </span>
                </div>

                <PieceShapeSvg code={piece.code} compact />

                <p className="text-xs text-slate-600 leading-relaxed">{info.shapeSummary}</p>

                <div className="space-y-1 text-xs text-slate-700">
                  {info.cutsAndBevels.map((line, i) => (
                    <div key={`c-${i}`}>· {line}</div>
                  ))}
                  {info.holesAndSlots.map((line, i) => (
                    <div key={`h-${i}`}>· {line}</div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
