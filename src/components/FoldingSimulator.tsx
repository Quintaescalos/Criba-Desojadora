import { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';

interface Particle {
  id: number;
  kind: 'olive' | 'leaf' | 'twig';
  phase: number;
  laneOffset: number;
  speed: number;
}

const INITIAL_PARTICLES: Particle[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  kind: i % 5 === 0 ? 'twig' : i % 2 === 0 ? 'olive' : 'leaf',
  phase: (i * 0.055) % 1,
  laneOffset: ((i * 7) % 15) - 7,
  speed: 0.24 + (i % 4) * 0.03,
}));

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function FoldingSimulator({ lang }: { lang: LanguageCode }) {
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFlow, setShowFlow] = useState<boolean>(true);
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [flowTick, setFlowTick] = useState<number>(0);

  const playDirRef = useRef<1 | -1>(1);

  const copy = UI_COPY[lang].simulator;
  const stages = useMemo(() => getLocalizedDataset(lang).foldingStages, [lang]);

  useEffect(() => {
    if (!isPlaying) return;
    let rafId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      setProgress((prev) => {
        const next = prev + playDirRef.current * dt * 24;
        if (next >= 100) {
          setIsPlaying(false);
          playDirRef.current = -1;
          return 100;
        }
        if (next <= 0) {
          setIsPlaying(false);
          playDirRef.current = 1;
          return 0;
        }
        return next;
      });
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying]);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!showFlow || progress > 4 || prefersReduced) return;

    let rafId = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      setFlowTick((t) => (t + dt) % 1000);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [showFlow, progress]);

  const activeStage = useMemo(() => {
    if (progress < 15) return stages[0];
    if (progress < 42) return stages[1];
    if (progress < 82) return stages[2];
    return stages[3];
  }, [progress, stages]);

  // Kinematic interpolation parameters
  const tHopper = clamp(progress / 25, 0, 1);
  const tLegs = clamp((progress - 25) / 33, 0, 1);
  const tFold = clamp((progress - 58) / 42, 0, 1);

  const SCALE = 2.8;
  const FLOOR_Y = 408;

  const lowerAngleDeg = lerp(31, 0, tLegs);
  const lowerAngleRad = (lowerAngleDeg * Math.PI) / 180;

  const frontX = lerp(165, 285, tLegs);
  const frontY = lerp(FLOOR_Y - 30 * SCALE, FLOOR_Y - 12 * SCALE, tLegs);

  const ux = Math.cos(lowerAngleRad);
  const uy = -Math.sin(lowerAngleRad);
  const nx = -uy;
  const ny = ux;

  const L1 = 88 * SCALE;
  const H_RAIL = 9 * SCALE;
  const HINGE_OFFSET = 83 * SCALE;

  const hingeX = frontX + HINGE_OFFSET * ux;
  const hingeY = frontY + HINGE_OFFSET * uy;

  const L2 = 82 * SCALE;
  const foldAngleRad = lerp(0, Math.PI, tFold);
  const upperAngleRad = lowerAngleRad + foldAngleRad;
  const u2x = Math.cos(upperAngleRad);
  const u2y = -Math.sin(upperAngleRad);
  const n2x = -u2y;
  const n2y = u2x;

  const stackLift = lerp(0, H_RAIL * 0.92, tFold);
  const u2BaseX = hingeX - 5 * SCALE * u2x + stackLift * nx;
  const u2BaseY = hingeY - 5 * SCALE * u2y + stackLift * ny;

  const rearPivotDist = 76 * SCALE;
  const rearPivotX = frontX + rearPivotDist * ux;
  const rearPivotY = frontY + rearPivotDist * uy;
  const rearLen = 76 * SCALE;
  const rearLegAngleRad = lerp((75 * Math.PI) / 180, Math.PI, tLegs);
  const rearTipX = rearPivotX + rearLen * Math.cos(rearLegAngleRad);
  const rearTipY = rearPivotY + rearLen * Math.sin(rearLegAngleRad);

  const frontPivotDist = 10 * SCALE;
  const frontPivotX = frontX + frontPivotDist * ux;
  const frontPivotY = frontY + frontPivotDist * uy;
  const frontLen = 28 * SCALE;
  const frontLegAngleRad = lerp(Math.PI / 2, 0, tLegs);
  const frontTipX = frontPivotX + frontLen * Math.cos(frontLegAngleRad);
  const frontTipY = frontPivotY + frontLen * Math.sin(frontLegAngleRad);

  const m2TopX = u2BaseX + L2 * u2x + H_RAIL * n2x;
  const m2TopY = u2BaseY + L2 * u2y + H_RAIL * n2y;
  const hopperWidth = 38 * SCALE;
  const hopperHeight = 9 * SCALE;
  const hopperX = m2TopX - hopperWidth - tHopper * 32;
  const hopperY = m2TopY - hopperHeight - tHopper * 56;
  const hopperOpacity = 1 - tHopper * 0.82;

  const currentLengthCm = Math.round(lerp(162, 90, tFold));
  const currentHeightCm = Math.round(
    lerp(120, lerp(110, lerp(28, 20, tFold), tLegs), clamp(progress / 25, 0, 1))
  );
  const decimalSep = lang === 'en' ? '.' : ',';
  const currentRampAngle = lowerAngleDeg.toFixed(1).replace('.', decimalSep);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (progress >= 99) {
      playDirRef.current = -1;
    } else if (progress <= 1) {
      playDirRef.current = 1;
    }
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    playDirRef.current = 1;
    setProgress(0);
  };

  return (
    <section id="plegado" className="py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-blue-800 mb-2">
              {copy.kicker}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 text-balance">
              {copy.title}
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left / Top Interactive CAD Stage */}
          <div className="lg:col-span-8 border border-slate-200 rounded-xl bg-slate-50 drafting-grid overflow-hidden flex flex-col justify-between">
            <div className="px-5 py-3 border-b border-slate-200 bg-white/90 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 font-mono text-slate-700">
                <span>
                  {copy.lengthLabel}: <strong className="text-slate-900">{currentLengthCm} cm</strong>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  {copy.heightLabel}: <strong className="text-slate-900">{currentHeightCm} cm</strong>
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>
                  {copy.angleLabel}: <strong className="text-slate-900">{currentRampAngle}°</strong>
                </span>
              </div>
              <span className="font-mono text-blue-800 font-medium">
                {progress >= 98 ? copy.stateFolded : progress <= 2 ? copy.stateWorking : copy.stateTransition}
              </span>
            </div>

            <div className="p-4 flex-1 flex items-center justify-center">
              <svg
                viewBox="0 0 820 450"
                className="w-full h-auto max-h-[440px]"
                role="img"
                aria-label={copy.title}
              >
                <defs>
                  <pattern id="meshPattern" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#64748b" strokeWidth="0.8" />
                  </pattern>
                </defs>

                {/* Floor datum line */}
                <line x1="60" y1={FLOOR_Y} x2="760" y2={FLOOR_Y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 4" />
                <text x="72" y={FLOOR_Y + 18} className="fill-slate-500 text-[11px] font-mono">
                  {copy.svgFloor}
                </text>

                {/* Collection crate & leaf tarp in working position */}
                {progress < 18 && (
                  <g opacity={1 - progress / 18}>
                    <rect x="210" y={FLOOR_Y - 5} width="220" height="5" rx="2" fill="#cbd5e1" />
                    <text x="320" y={FLOOR_Y + 18} textAnchor="middle" className="fill-slate-500 text-[10px] font-mono">
                      {copy.svgLeafZone}
                    </text>

                    <rect
                      x="76"
                      y={FLOOR_Y - 22 * SCALE}
                      width={84}
                      height={22 * SCALE}
                      fill="#e2e8f0"
                      stroke="#64748b"
                      strokeWidth="1.5"
                      rx="2"
                    />
                    <text x="118" y={FLOOR_Y - 24} textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">
                      {copy.svgCrate}
                    </text>
                  </g>
                )}

                {/* Rear Leg M-06 */}
                <g>
                  <line
                    x1={rearPivotX}
                    y1={rearPivotY}
                    x2={rearTipX}
                    y2={rearTipY}
                    stroke="#926239"
                    strokeWidth={4.5 * SCALE * 0.45}
                    strokeLinecap="round"
                  />
                  <line
                    x1={rearPivotX}
                    y1={rearPivotY}
                    x2={rearTipX}
                    y2={rearTipY}
                    stroke="#d9b382"
                    strokeWidth={4.5 * SCALE * 0.32}
                    strokeLinecap="round"
                  />
                </g>

                {/* Front Leg M-07 */}
                <g>
                  <line
                    x1={frontPivotX}
                    y1={frontPivotY}
                    x2={frontTipX}
                    y2={frontTipY}
                    stroke="#926239"
                    strokeWidth={4.5 * SCALE * 0.45}
                    strokeLinecap="round"
                  />
                  <line
                    x1={frontPivotX}
                    y1={frontPivotY}
                    x2={frontTipX}
                    y2={frontTipY}
                    stroke="#d9b382"
                    strokeWidth={4.5 * SCALE * 0.32}
                    strokeLinecap="round"
                  />
                </g>

                {/* Lower Frame M-01 */}
                <g>
                  <polygon
                    points={`
                      ${frontX},${frontY}
                      ${frontX + L1 * ux},${frontY + L1 * uy}
                      ${frontX + L1 * ux + H_RAIL * nx},${frontY + L1 * uy + H_RAIL * ny}
                      ${frontX + H_RAIL * nx},${frontY + H_RAIL * ny}
                    `}
                    fill="#d9b382"
                    stroke="#78502b"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={frontX + 2 * SCALE * ux + 2.2 * SCALE * nx}
                    y1={frontY + 2 * SCALE * uy + 2.2 * SCALE * ny}
                    x2={frontX + (L1 - 3 * SCALE) * ux + 2.2 * SCALE * nx}
                    y2={frontY + (L1 - 3 * SCALE) * uy + 2.2 * SCALE * ny}
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={frontX + (L1 * 0.42) * ux + (H_RAIL * 0.55) * nx}
                    y={frontY + (L1 * 0.42) * uy + (H_RAIL * 0.55) * ny}
                    transform={`rotate(${-lowerAngleDeg}, ${frontX + (L1 * 0.42) * ux + (H_RAIL * 0.55) * nx}, ${frontY + (L1 * 0.42) * uy + (H_RAIL * 0.55) * ny})`}
                    textAnchor="middle"
                    className="fill-slate-900 text-[10px] font-mono font-semibold"
                  >
                    {copy.svgLowerFrame}
                  </text>
                </g>

                {/* Upper Frame M-02 */}
                <g>
                  <polygon
                    points={`
                      ${u2BaseX},${u2BaseY}
                      ${u2BaseX + L2 * u2x},${u2BaseY + L2 * u2y}
                      ${u2BaseX + L2 * u2x + H_RAIL * n2x},${u2BaseY + L2 * u2y + H_RAIL * n2y}
                      ${u2BaseX + H_RAIL * n2x},${u2BaseY + H_RAIL * n2y}
                    `}
                    fill="#e5c79e"
                    stroke="#78502b"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={u2BaseX + 3 * SCALE * u2x + 2.2 * SCALE * n2x}
                    y1={u2BaseY + 3 * SCALE * u2y + 2.2 * SCALE * n2y}
                    x2={u2BaseX + (L2 - 2 * SCALE) * u2x + 2.2 * SCALE * n2x}
                    y2={u2BaseY + (L2 - 2 * SCALE) * u2y + 2.2 * SCALE * n2y}
                    stroke="#334155"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  <text
                    x={u2BaseX + (L2 * 0.5) * u2x + (H_RAIL * 0.55) * n2x}
                    y={u2BaseY + (L2 * 0.5) * u2y + (H_RAIL * 0.55) * n2y}
                    transform={`rotate(${-upperAngleRad * (180 / Math.PI)}, ${u2BaseX + (L2 * 0.5) * u2x + (H_RAIL * 0.55) * n2x}, ${u2BaseY + (L2 * 0.5) * u2y + (H_RAIL * 0.55) * n2y})`}
                    textAnchor="middle"
                    className="fill-slate-900 text-[10px] font-mono font-semibold"
                  >
                    {copy.svgUpperFrame}
                  </text>
                </g>

                {/* Removable Hopper */}
                <g opacity={hopperOpacity}>
                  <rect
                    x={hopperX + 4}
                    y={hopperY + hopperHeight}
                    width="5"
                    height={17 * SCALE}
                    fill="#b4834e"
                    stroke="#78502b"
                    strokeWidth="1"
                  />
                  <rect
                    x={hopperX}
                    y={hopperY}
                    width={hopperWidth}
                    height={hopperHeight}
                    fill="#e5c79e"
                    stroke="#78502b"
                    strokeWidth="1.5"
                    rx="1"
                  />
                  <line
                    x1={hopperX + 4}
                    y1={hopperY + hopperHeight - 3}
                    x2={hopperX + hopperWidth - 4}
                    y2={hopperY + hopperHeight - 3}
                    stroke="#475569"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                  <text
                    x={hopperX + hopperWidth / 2}
                    y={hopperY + hopperHeight / 2 + 3}
                    textAnchor="middle"
                    className="fill-slate-900 text-[10px] font-mono font-semibold"
                  >
                    {copy.svgHopper}
                  </text>
                </g>

                {/* Live Olive & Leaf Separation Simulation */}
                {showFlow && progress <= 4 && (
                  <g>
                    {INITIAL_PARTICLES.map((p) => {
                      const t = (p.phase + flowTick * p.speed) % 1;

                      if (p.kind === 'twig') {
                        const dropT = clamp(t * 3, 0, 1);
                        const px = hopperX + 26 + ((p.id * 19) % 55);
                        const py = lerp(hopperY - 22, hopperY + hopperHeight - 5, dropT);
                        return (
                          <line
                            key={p.id}
                            x1={px - 7}
                            y1={py - 2}
                            x2={px + 7}
                            y2={py + 2}
                            stroke="#78350f"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            opacity={t > 0.85 ? (1 - t) * 6 : 0.95}
                          />
                        );
                      }

                      if (p.kind === 'leaf') {
                        if (t < 0.24) {
                          const lt = t / 0.24;
                          const px = hopperX + 25 + p.laneOffset * 2;
                          const py = lerp(hopperY - 15, hopperY + hopperHeight + 18, lt);
                          return (
                            <ellipse
                              key={p.id}
                              cx={px}
                              cy={py}
                              rx="5"
                              ry="2.2"
                              fill="#65a30d"
                              transform={`rotate(${lt * 40}, ${px}, ${py})`}
                            />
                          );
                        }
                        if (t < 0.55) {
                          const lt = (t - 0.24) / 0.31;
                          const distAlongRamp = lerp(140 * SCALE, 86 * SCALE, lt);
                          const px = frontX + distAlongRamp * ux + 4 * SCALE * nx;
                          const py = frontY + distAlongRamp * uy + 4 * SCALE * ny;
                          return (
                            <ellipse
                              key={p.id}
                              cx={px}
                              cy={py}
                              rx="5"
                              ry="2.2"
                              fill="#65a30d"
                              transform={`rotate(-31, ${px}, ${py})`}
                            />
                          );
                        }
                        const lt = (t - 0.55) / 0.45;
                        const dropX = frontX + 86 * SCALE * ux + 4 * SCALE * nx + Math.sin(lt * 8) * 6;
                        const startY = frontY + 86 * SCALE * uy + 4 * SCALE * ny;
                        const py = lerp(startY, FLOOR_Y - 6, lt);
                        return (
                          <ellipse
                            key={p.id}
                            cx={dropX}
                            cy={py}
                            rx="5"
                            ry="2.2"
                            fill="#84cc16"
                            opacity={1 - lt * 0.3}
                            transform={`rotate(${lt * 160}, ${dropX}, ${py})`}
                          />
                        );
                      }

                      if (t < 0.2) {
                        const lt = t / 0.2;
                        const px = hopperX + 35 + p.laneOffset * 2;
                        const py = lerp(hopperY - 18, hopperY + hopperHeight + 20, lt);
                        return <circle key={p.id} cx={px} cy={py} r="4.2" fill="#3f6212" stroke="#1a2e05" strokeWidth="0.7" />;
                      }
                      if (t < 0.78) {
                        const lt = (t - 0.2) / 0.58;
                        const distAlongRamp = lerp(135 * SCALE, 2 * SCALE, lt);
                        const px = frontX + distAlongRamp * ux + 3.2 * SCALE * nx;
                        const py = frontY + distAlongRamp * uy + 3.2 * SCALE * ny;
                        return <circle key={p.id} cx={px} cy={py} r="4.2" fill="#3f6212" stroke="#1a2e05" strokeWidth="0.7" />;
                      }
                      const lt = (t - 0.78) / 0.22;
                      const px = lerp(frontX, 118 + p.laneOffset, lt);
                      const py = lerp(frontY, FLOOR_Y - 12 * SCALE, lt * lt);
                      return <circle key={p.id} cx={px} cy={py} r="4.2" fill="#3f6212" stroke="#1a2e05" strokeWidth="0.7" />;
                    })}
                  </g>
                )}

                {/* Pivot Axes & Dimensions Overlay */}
                {showAxes && (
                  <g>
                    <circle cx={hingeX + 4.5 * SCALE * nx} cy={hingeY + 4.5 * SCALE * ny} r="5.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
                    <text
                      x={hingeX + 4.5 * SCALE * nx}
                      y={hingeY + 4.5 * SCALE * ny - 14}
                      textAnchor="middle"
                      className="fill-blue-900 text-[10px] font-mono font-semibold"
                    >
                      {copy.svgHinge}
                    </text>

                    <circle cx={rearPivotX + 4 * SCALE * nx} cy={rearPivotY + 4 * SCALE * ny} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx={frontPivotX + 4 * SCALE * nx} cy={frontPivotY + 4 * SCALE * ny} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />

                    {progress < 20 && (
                      <g opacity={1 - progress / 20}>
                        <line x1="650" y1={FLOOR_Y} x2="650" y2={hopperY} stroke="#1e40af" strokeWidth="1.2" />
                        <line x1="644" y1={FLOOR_Y} x2="656" y2={FLOOR_Y} stroke="#1e40af" strokeWidth="1.2" />
                        <line x1="644" y1={hopperY} x2="656" y2={hopperY} stroke="#1e40af" strokeWidth="1.2" />
                        <text x="662" y={(FLOOR_Y + hopperY) / 2} className="fill-blue-900 text-[11px] font-mono font-semibold">
                          120 cm
                        </text>
                      </g>
                    )}

                    {progress >= 95 && (
                      <g>
                        <rect
                          x={frontX - 10}
                          y={frontY - H_RAIL * 1.95}
                          width={L1 + 16}
                          height={20 * SCALE}
                          fill="none"
                          stroke="#1e40af"
                          strokeWidth="1.5"
                          strokeDasharray="5 3"
                          rx="3"
                        />
                        <text
                          x={frontX + L1 / 2}
                          y={frontY - H_RAIL * 2.25}
                          textAnchor="middle"
                          className="fill-blue-900 text-[11px] font-mono font-semibold"
                        >
                          {copy.svgFoldedVolume}
                        </text>
                      </g>
                    )}
                  </g>
                )}
              </svg>
            </div>
          </div>

          {/* Right Control & Concept Deck */}
          <div className="lg:col-span-4 border border-slate-200 rounded-xl bg-white p-6 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-2">
                  <label htmlFor="fold-slider">{copy.sliderLabel}</label>
                  <span className="font-mono font-semibold text-blue-800">
                    {Math.round(progress)} %
                  </span>
                </div>
                <input
                  id="fold-slider"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={progress}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setProgress(Number(e.target.value));
                  }}
                  className="w-full accent-blue-800 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                  <span>{copy.sliderMarks[0]}</span>
                  <span>{copy.sliderMarks[1]}</span>
                  <span>{copy.sliderMarks[2]}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayToggle}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{copy.pauseBtn}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{progress >= 99 ? copy.unfoldBtn : copy.foldBtn}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                  aria-label={copy.resetBtn}
                >
                  <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.resetBtn}</span>
                </button>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-2">{copy.stagesTitle}</p>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg">
                  {stages.map((st) => {
                    const isActive = activeStage.id === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setIsPlaying(false);
                          setProgress(st.target);
                        }}
                        className={`px-3 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <h3 className="text-sm font-semibold text-slate-900">{activeStage.title}</h3>
                <p className="text-xs leading-relaxed text-slate-600">{activeStage.description}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-2.5">
              <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                <span>{copy.toggleFlow}</span>
                <input
                  type="checkbox"
                  checked={showFlow}
                  onChange={(e) => setShowFlow(e.target.checked)}
                  className="w-4 h-4 accent-blue-800 rounded cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
                <span>{copy.toggleAxes}</span>
                <input
                  type="checkbox"
                  checked={showAxes}
                  onChange={(e) => setShowAxes(e.target.checked)}
                  className="w-4 h-4 accent-blue-800 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
