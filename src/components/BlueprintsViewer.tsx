import { useState } from 'react';
import { STOCK_PLANS, WOOD_CUT_PIECES } from '../data/manualData';
import { PieceDetails } from './PieceDetails';

type BlueprintTab = 'elevation' | 'top' | 'hinge' | 'hopper';

const TABS: { id: BlueprintTab; label: string }[] = [
  { id: 'elevation', label: 'Alzado Lateral' },
  { id: 'top', label: 'Planta y Parrilla' },
  { id: 'hinge', label: 'Detalle Bisagra M8' },
  { id: 'hopper', label: 'Tolva Pre-Cribado' },
];

export function BlueprintsViewer() {
  const [activeTab, setActiveTab] = useState<BlueprintTab>('elevation');

  return (
    <section id="planos" className="py-16 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-blue-800 mb-2">
              02 · Planos técnicos y optimización de corte
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 text-balance">
              Planos de acotación, despiece y aprovechamiento en listones de 240 cm
            </h2>
          </div>

          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/75 rounded-lg self-start lg:self-auto no-print">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Blueprint Canvas */}
        <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span>Lámina técnica · Medidas en centímetros (cm) salvo indicación en mm</span>
            <span>Escala gráfica proporcional</span>
          </div>

          <div className="p-6 drafting-grid bg-slate-50/40">
            {activeTab === 'elevation' && (
              <svg viewBox="0 0 860 400" className="w-full h-auto max-h-[390px]" role="img" aria-label="Plano de alzado lateral acotado">
                {/* Ground Line */}
                <line x1="60" y1="350" x2="780" y2="350" stroke="#64748b" strokeWidth="1.5" />
                <text x="70" y="370" className="fill-slate-500 text-[11px] font-mono">Cota de suelo: 0,0 cm</text>

                {/* Front leg M-07 (28 cm) */}
                <rect x="172" y="272" width="14" height="78" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />
                {/* Rear leg M-06 (76 cm angled) */}
                <polygon points="402,162 416,162 454,350 440,350" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />

                {/* Lower Frame M-01 (88 cm at 31 deg) */}
                <g transform="translate(140, 270) rotate(-31)">
                  <rect x="0" y="-26" width="290" height="26" fill="#d9b382" stroke="#78502b" strokeWidth="1.5" />
                  <line x1="12" y1="-8" x2="278" y2="-8" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="5 2" />
                  <text x="145" y="-12" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
                    M-01 · 88,0 cm (Exterior 46 cm)
                  </text>
                </g>

                {/* Upper Frame M-02 (82 cm at 31 deg) */}
                <g transform="translate(372, 130) rotate(-31)">
                  <rect x="0" y="-26" width="270" height="26" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
                  <line x1="12" y1="-8" x2="258" y2="-8" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="5 2" />
                  <text x="135" y="-12" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
                    M-02 · 82,0 cm (Interior 42 cm)
                  </text>
                </g>

                {/* Hopper M-09/M-10 */}
                <rect x="492" y="18" width="122" height="28" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
                <rect x="498" y="46" width="7" height="44" fill="#b4834e" stroke="#78502b" strokeWidth="1" />
                <text x="553" y="36" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
                  Tolva 38×9 cm
                </text>

                {/* Pivot points */}
                <circle cx="385" cy="133" r="5" fill="#1e40af" stroke="#fff" strokeWidth="1.5" />
                <circle cx="409" cy="166" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.5" />
                <circle cx="179" cy="276" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.5" />

                {/* Dimensions */}
                {/* Total height 120 cm */}
                <line x1="690" y1="18" x2="690" y2="350" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="682" y1="18" x2="698" y2="18" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="682" y1="350" x2="698" y2="350" stroke="#1e40af" strokeWidth="1.2" />
                <text x="704" y="188" className="fill-blue-900 text-[12px] font-mono font-semibold">120 cm</text>

                {/* Front drop 30 cm */}
                <line x1="95" y1="266" x2="95" y2="350" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="88" y1="266" x2="102" y2="266" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="88" y1="350" x2="102" y2="350" stroke="#1e40af" strokeWidth="1.2" />
                <text x="42" y="305" className="fill-blue-900 text-[11px] font-mono font-semibold">30 cm</text>
                <text x="20" y="320" className="fill-slate-500 text-[10px] font-mono">Alto caída</text>

                {/* Angle arc 31 deg */}
                <path d="M 210 350 A 70 70 0 0 0 198 315" fill="none" stroke="#1e40af" strokeWidth="1.2" />
                <text x="225" y="336" className="fill-blue-900 text-[11px] font-mono font-semibold">31,5° pendiente</text>

                {/* Total unfolded length */}
                <line x1="140" y1="382" x2="614" y2="382" stroke="#475569" strokeWidth="1" />
                <text x="377" y="395" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
                  Proyección en planta: 138 cm · Desarrollo rampa: 162 cm
                </text>
              </svg>
            )}

            {activeTab === 'top' && (
              <svg viewBox="0 0 860 360" className="w-full h-auto max-h-[360px]" role="img" aria-label="Plano de planta superior y distribución de varillas">
                {/* Lower Frame M-01 outer 46cm */}
                <rect x="70" y="75" width="365" height="190" fill="none" stroke="#78502b" strokeWidth="1.5" />
                <rect x="70" y="75" width="365" height="12" fill="#d9b382" stroke="#78502b" strokeWidth="1.2" />
                <rect x="70" y="253" width="365" height="12" fill="#d9b382" stroke="#78502b" strokeWidth="1.2" />
                {/* Front discharge bridge M-03 */}
                <rect x="70" y="87" width="34" height="166" fill="#e5c79e" stroke="#78502b" strokeWidth="1.2" />

                {/* 4 Crossbars M-04 */}
                {[95, 195, 295, 395].map((x) => (
                  <rect key={x} x={x} y="87" width="14" height="166" fill="#cba16d" stroke="#78502b" strokeWidth="1" />
                ))}

                {/* Upper Frame M-02 nested inside (42cm outer) */}
                <rect x="412" y="89" width="348" height="162" fill="none" stroke="#78502b" strokeWidth="1.5" />
                <rect x="412" y="89" width="348" height="12" fill="#e5c79e" stroke="#78502b" strokeWidth="1.2" />
                <rect x="412" y="239" width="348" height="12" fill="#e5c79e" stroke="#78502b" strokeWidth="1.2" />

                {/* 3 Crossbars M-05 */}
                {[470, 595, 720].map((x) => (
                  <rect key={x} x={x} y="101" width="14" height="138" fill="#cba16d" stroke="#78502b" strokeWidth="1" />
                ))}

                {/* Longitudinal Steel Rods (represented across both beds) */}
                {Array.from({ length: 16 }, (_, idx) => {
                  const y = 106 + idx * 8.8;
                  return (
                    <g key={idx}>
                      <line x1="82" y1={y - 10 + idx * 0.8} x2="418" y2={y - 10 + idx * 0.8} stroke="#475569" strokeWidth="1" />
                      <line x1="418" y1={y} x2="752" y2={y} stroke="#475569" strokeWidth="1" />
                    </g>
                  );
                })}

                {/* Hinge Bolts */}
                <circle cx="424" cy="81" r="4" fill="#1e40af" />
                <circle cx="424" cy="259" r="4" fill="#1e40af" />

                {/* Width Dimensions */}
                <line x1="45" y1="75" x2="45" y2="265" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="38" y1="75" x2="52" y2="75" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="38" y1="265" x2="52" y2="265" stroke="#1e40af" strokeWidth="1.2" />
                <text x="12" y="174" className="fill-blue-900 text-[11px] font-mono font-semibold">46 cm</text>

                <line x1="785" y1="89" x2="785" y2="251" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="778" y1="89" x2="792" y2="89" stroke="#1e40af" strokeWidth="1.2" />
                <line x1="778" y1="251" x2="792" y2="251" stroke="#1e40af" strokeWidth="1.2" />
                <text x="796" y="174" className="fill-blue-900 text-[11px] font-mono font-semibold">42 cm</text>

                <text x="245" y="302" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
                  Tramo Inferior M-01 · 88 cm (42,4 cm luz interna)
                </text>
                <text x="586" y="302" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
                  Tramo Superior M-02 · 82 cm (38,4 cm luz interna)
                </text>
                <text x="424" y="46" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
                  Solape bisagra central: 6,0 cm + arandela nylon 1,5 mm/lado
                </text>
              </svg>
            )}

            {activeTab === 'hinge' && (
              <svg viewBox="0 0 860 360" className="w-full h-auto max-h-[360px]" role="img" aria-label="Detalle técnico de bisagra central y tope a 180 grados">
                {/* M-01 Outer Rail */}
                <path d="M 110 130 L 420 130 A 45 45 0 0 1 420 220 L 110 220 Z" fill="#d9b382" stroke="#78502b" strokeWidth="1.6" />
                {/* M-02 Inner Rail */}
                <path d="M 730 130 L 400 130 A 45 45 0 0 0 400 220 L 730 220 Z" fill="#e5c79e" stroke="#78502b" strokeWidth="1.6" opacity="0.92" />

                {/* 180 degree stop cleat */}
                <rect x="330" y="200" width="90" height="20" fill="#926239" stroke="#5c3d20" strokeWidth="1.2" />
                <text x="375" y="246" textAnchor="middle" className="fill-slate-800 text-[11px] font-mono font-semibold">
                  Tope 180° (22×22×100 mm) bajo cara interna M-01
                </text>

                {/* M8 Carriage Bolt Axis */}
                <circle cx="410" cy="175" r="10" fill="#1e40af" stroke="#fff" strokeWidth="2" />
                <line x1="410" y1="65" x2="410" y2="275" stroke="#1e40af" strokeWidth="1" strokeDasharray="4 3" />
                <text x="410" y="54" textAnchor="middle" className="fill-blue-900 text-[12px] font-mono font-semibold">
                  Eje Bisagra Central · Perno M8 × 60 mm (Taladro Ø 8,5 mm)
                </text>

                {/* Locking Pin */}
                <circle cx="348" cy="158" r="6" fill="#0f172a" stroke="#fff" strokeWidth="1.5" />
                <text x="275" y="106" textAnchor="middle" className="fill-slate-700 text-[11px] font-mono">
                  Pasador rápido Ø 6 mm (bloqueo desplegado)
                </text>
                <line x1="305" y1="112" x2="344" y2="152" stroke="#475569" strokeWidth="1" />

                {/* Folding arc */}
                <path d="M 650 175 A 240 240 0 0 0 185 85" fill="none" stroke="#1e40af" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="580" y="86" className="fill-blue-900 text-[11px] font-mono font-semibold">
                  Giro 180° en plegado libro
                </text>
              </svg>
            )}

            {activeTab === 'hopper' && (
              <svg viewBox="0 0 860 360" className="w-full h-auto max-h-[360px]" role="img" aria-label="Plano de tolva de pre-cribado superior">
                {/* Side View Left */}
                <text x="220" y="34" textAnchor="middle" className="fill-slate-800 text-[12px] font-mono font-semibold">
                  Alzado lateral de tolva (nivelada sobre rampa a 31°)
                </text>
                <line x1="70" y1="275" x2="380" y2="90" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 3" />
                <rect x="120" y="76" width="230" height="54" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
                <rect x="128" y="130" width="14" height="112" fill="#cba16d" stroke="#78502b" strokeWidth="1.5" />
                <line x1="120" y1="126" x2="350" y2="126" stroke="#334155" strokeWidth="2.5" strokeDasharray="4 2" />

                <text x="235" y="106" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
                  M-09 · 38,0 cm × 9,0 cm
                </text>
                <text x="155" y="192" className="fill-slate-700 text-[10px] font-mono">
                  Soporte M-11 (19 cm)
                </text>
                <text x="300" y="160" className="fill-blue-900 text-[10px] font-mono font-semibold">
                  Apoyo directo en rampa
                </text>

                {/* Top View Right */}
                <text x="635" y="34" textAnchor="middle" className="fill-slate-800 text-[12px] font-mono font-semibold">
                  Planta de tolva (45 × 38 cm exterior)
                </text>
                <rect x="505" y="68" width="260" height="220" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
                <rect x="518" y="81" width="234" height="194" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
                {/* 25x25mm grid lines */}
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`v-${i}`} x1={538 + i * 19.5} y1="81" x2={538 + i * 19.5} y2="275" stroke="#64748b" strokeWidth="1" />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line key={`h-${i}`} x1="518" y1={100 + i * 19.5} x2="752" y2={100 + i * 19.5} stroke="#64748b" strokeWidth="1" />
                ))}
                <text x="635" y="314" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
                  Ancho exterior: 45,0 cm · Malla electrosoldada 25 × 25 mm
                </text>
              </svg>
            )}
          </div>
        </div>

        {/* Individual Piece Shape & Dimension Sheets */}
        <PieceDetails />

        {/* Complete Wood Cutting Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              Tabla completa de despiece en madera
            </h3>
            <p className="text-xs font-mono text-slate-500">
              11 referencias · 26 piezas cortadas · Tolerancia ±0,5 mm
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Pieza y conjunto</th>
                  <th className="py-3 px-4 text-right">Uds</th>
                  <th className="py-3 px-4 text-right">Largo (cm)</th>
                  <th className="py-3 px-4">Sección (mm)</th>
                  <th className="py-3 px-4">Cortes y ángulos</th>
                  <th className="py-3 px-4">Taladros / Fijación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {WOOD_CUT_PIECES.map((piece) => (
                  <tr key={piece.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-blue-800 whitespace-nowrap">
                      {piece.code}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900">{piece.name}</div>
                      <div className="text-xs text-slate-500">{piece.group}</div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-900">{piece.qty}</td>
                    <td className="py-3 px-4 text-right font-mono font-medium text-slate-900">
                      {piece.lengthCm.toFixed(1).replace('.', ',')}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                      {piece.sectionMm}
                    </td>
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">{piece.angleNote}</td>
                    <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">{piece.drillNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Commercial Timber Stock Optimizer */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-semibold text-slate-900">
              Optimización de corte en listones comerciales (240 cm)
            </h3>
            <p className="text-xs font-mono text-slate-500">
              Calculado con disco de sierra de 3 mm de espesor · Total compra: 8 listones estándar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STOCK_PLANS.map((plan) => (
              <div key={plan.id} className="border border-slate-200 rounded-xl bg-white p-5 space-y-4">
                <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-semibold text-slate-900">{plan.sectionMm}</h4>
                  <span className="font-mono text-xs font-semibold text-blue-800 whitespace-nowrap">
                    {plan.quantityBars} {plan.quantityBars === 1 ? 'listón' : 'listones'} × 240 cm
                  </span>
                </div>

                <div className="space-y-3">
                  {plan.cuts.map((bar) => (
                    <div key={bar.barIndex} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                        <span>Listón #{bar.barIndex}</span>
                        <span>Sobrante: {bar.wasteCm.toFixed(1).replace('.', ',')} cm</span>
                      </div>
                      <div className="h-9 w-full bg-slate-100 border border-slate-200 rounded-md overflow-hidden flex">
                        {bar.pieces.map((cut, i) => {
                          const widthPct = (cut.lengthCm / plan.stockLengthCm) * 100;
                          return (
                            <div
                              key={`${cut.code}-${i}`}
                              style={{ width: `${widthPct}%` }}
                              title={`${cut.code} · ${cut.label}: ${cut.lengthCm} cm`}
                              className="h-full bg-amber-100 border-r border-amber-400/80 flex flex-col items-center justify-center px-1 overflow-hidden"
                            >
                              <span className="font-mono text-[10px] font-semibold text-amber-950 truncate">
                                {cut.code}
                              </span>
                              <span className="font-mono text-[9px] text-amber-800 truncate">
                                {cut.lengthCm}
                              </span>
                            </div>
                          );
                        })}
                        <div
                          style={{ width: `${(bar.wasteCm / plan.stockLengthCm) * 100}%` }}
                          className="h-full bg-slate-100 flex items-center justify-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
