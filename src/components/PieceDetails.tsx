import { useMemo, useState } from 'react';
import { WoodCutPiece } from '../data/manualData';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';

type GroupFilter = 'Todas' | WoodCutPiece['group'];

const GROUPS: GroupFilter[] = [
  'Todas',
  'Tramo Inferior',
  'Tramo Superior',
  'Patas y Plegado',
  'Tolva Superior',
];

interface SvgPieceLabels {
  bevel31: string;
  at45cm: string;
  frontLeg: string;
  rearLeg: string;
  m01Bottom: string;
  cut90: string;
  m02Bottom: string;
  m03Elev: string;
  chamfer45: string;
  m03Bottom: string;
  slot3: string;
  m04Bottom: string;
  m05Bottom: string;
  slotNote: string;
  foot8: string;
  m06Bottom: string;
  m07Bottom: string;
  m08Bottom: string;
  m09Side: string;
  seat31: string;
  m09Bottom: string;
  m10Title: string;
  m10Bottom: string;
  m11a: string;
  m11Bottom: string;
}

const SVG_LABELS: Record<LanguageCode, SvgPieceLabels> = {
  es: {
    bevel31: 'Bisel 31°',
    at45cm: 'R=35 mm · Ø8,5 a 4,5 cm',
    frontLeg: 'Pata del. 10 cm',
    rearLeg: 'Pata tras. 12 cm',
    m01Bottom: 'Largo total: 88,0 cm (880 mm) · Sección: 90 × 18 mm',
    cut90: 'Corte 90°',
    m02Bottom: 'Largo total: 82,0 cm (820 mm) · Sección: 90 × 18 mm',
    m03Elev: 'Alzado frontal 46,0 × 9,0 cm',
    chamfer45: 'Perfil bisel 45°',
    m03Bottom: 'Largo: 46,0 cm · Altura: 9,0 cm · Espesor: 18 mm',
    slot3: 'Ranura 3 mm',
    m04Bottom: 'Largo: 42,4 cm · Margen extremos: 1,8 cm · Sección 35×20 mm',
    m05Bottom: 'Largo: 38,4 cm · Margen extremos: 1,4 cm · Sección 35×20 mm',
    slotNote: 'Ranurado continuo en bloque (ancho 2,5 mm × prof. 3,0 mm)',
    foot8: 'Bisel pie 8°',
    m06Bottom: 'Largo total: 78,0 cm (780 mm) · Sección: 45 × 20 mm',
    m07Bottom: 'Largo total: 28,0 cm (280 mm) · Sección: 45 × 20 mm',
    m08Bottom: 'Largo: 46,0 cm (460 mm) · Cortes rectos a 90° · Sección: 45 × 20 mm',
    m09Side: 'Lateral Tolva · 38,0 × 9,0 cm',
    seat31: 'Rebaje apoyo 31°',
    m09Bottom: 'Largo: 38,0 cm · Altura frontal: 9,0 cm · Espesor: 18 mm',
    m10Title: 'Frente / Trasera Tolva · 41,4 × 9,0 cm (escuadra 90°)',
    m10Bottom: '41,4 cm (+ 2 × 1,8 cm laterales = 45,0 cm ancho exterior)',
    m11a: 'M-11a · 19,0 cm (base 31°)',
    m11Bottom: 'Cuadradillo 22 × 22 mm · 2 uds de cada sub-pieza (6 uds en total)',
  },
  en: {
    bevel31: '31° bevel',
    at45cm: 'R=35 mm · Ø8.5 @ 4.5 cm',
    frontLeg: 'Front leg 10 cm',
    rearLeg: 'Rear leg 12 cm',
    m01Bottom: 'Total length: 88.0 cm (880 mm) · Section: 90 × 18 mm',
    cut90: '90° square cut',
    m02Bottom: 'Total length: 82.0 cm (820 mm) · Section: 90 × 18 mm',
    m03Elev: 'Front face 46.0 × 9.0 cm',
    chamfer45: '45° bevel profile',
    m03Bottom: 'Length: 46.0 cm · Height: 9.0 cm · Thickness: 18 mm',
    slot3: '3 mm slot',
    m04Bottom: 'Length: 42.4 cm · End margin: 1.8 cm · Section 35×20 mm',
    m05Bottom: 'Length: 38.4 cm · End margin: 1.4 cm · Section 35×20 mm',
    slotNote: 'Gang-slotted together (2.5 mm wide × 3.0 mm deep)',
    foot8: '8° foot bevel',
    m06Bottom: 'Total length: 78.0 cm (780 mm) · Section: 45 × 20 mm',
    m07Bottom: 'Total length: 28.0 cm (280 mm) · Section: 45 × 20 mm',
    m08Bottom: 'Length: 46.0 cm (460 mm) · 90° square cuts · Section: 45 × 20 mm',
    m09Side: 'Hopper Side · 38.0 × 9.0 cm',
    seat31: '31° ramp seat',
    m09Bottom: 'Length: 38.0 cm · Front height: 9.0 cm · Thickness: 18 mm',
    m10Title: 'Hopper Front / Back · 41.4 × 9.0 cm (90° square)',
    m10Bottom: '41.4 cm (+ 2 × 1.8 cm sides = 45.0 cm outer width)',
    m11a: 'M-11a · 19.0 cm (31° base)',
    m11Bottom: '22 × 22 mm square stock · 2 pcs each sub-part (6 pcs total)',
  },
  pt: {
    bevel31: 'Chanfro 31°',
    at45cm: 'R=35 mm · Ø8,5 a 4,5 cm',
    frontLeg: 'Pé diant. 10 cm',
    rearLeg: 'Pé tras. 12 cm',
    m01Bottom: 'Comp. total: 88,0 cm (880 mm) · Secção: 90 × 18 mm',
    cut90: 'Corte 90°',
    m02Bottom: 'Comp. total: 82,0 cm (820 mm) · Secção: 90 × 18 mm',
    m03Elev: 'Alçado frontal 46,0 × 9,0 cm',
    chamfer45: 'Perfil chanfro 45°',
    m03Bottom: 'Comp.: 46,0 cm · Altura: 9,0 cm · Espessura: 18 mm',
    slot3: 'Ranhura 3 mm',
    m04Bottom: 'Comp.: 42,4 cm · Margem pontas: 1,8 cm · Secção 35×20 mm',
    m05Bottom: 'Comp.: 38,4 cm · Margem pontas: 1,4 cm · Secção 35×20 mm',
    slotNote: 'Ranhurado em bloco (largura 2,5 mm × prof. 3,0 mm)',
    foot8: 'Base chanfro 8°',
    m06Bottom: 'Comp. total: 78,0 cm (780 mm) · Secção: 45 × 20 mm',
    m07Bottom: 'Comp. total: 28,0 cm (280 mm) · Secção: 45 × 20 mm',
    m08Bottom: 'Comp.: 46,0 cm (460 mm) · Cortes retos 90° · Secção: 45 × 20 mm',
    m09Side: 'Lateral Tremonha · 38,0 × 9,0 cm',
    seat31: 'Rebaixo apoio 31°',
    m09Bottom: 'Comp.: 38,0 cm · Altura frontal: 9,0 cm · Espessura: 18 mm',
    m10Title: 'Frente / Traseira Tremonha · 41,4 × 9,0 cm (90°)',
    m10Bottom: '41,4 cm (+ 2 × 1,8 cm laterais = 45,0 cm largura exterior)',
    m11a: 'M-11a · 19,0 cm (base 31°)',
    m11Bottom: 'Ripa quadrada 22 × 22 mm · 2 uns de cada subpeça (6 uns total)',
  },
  de: {
    bevel31: '31°-Gehrung',
    at45cm: 'R=35 mm · Ø8,5 bei 4,5 cm',
    frontLeg: 'Vorderbein 10 cm',
    rearLeg: 'Hinterbein 12 cm',
    m01Bottom: 'Gesamtlänge: 88,0 cm (880 mm) · Querschnitt: 90 × 18 mm',
    cut90: '90°-Schnitt',
    m02Bottom: 'Gesamtlänge: 82,0 cm (820 mm) · Querschnitt: 90 × 18 mm',
    m03Elev: 'Frontansicht 46,0 × 9,0 cm',
    chamfer45: '45°-Fase',
    m03Bottom: 'Länge: 46,0 cm · Höhe: 9,0 cm · Stärke: 18 mm',
    slot3: 'Nut 3 mm',
    m04Bottom: 'Länge: 42,4 cm · Randabstand: 1,8 cm · Querschnitt 35×20 mm',
    m05Bottom: 'Länge: 38,4 cm · Randabstand: 1,4 cm · Querschnitt 35×20 mm',
    slotNote: 'Blockweise genutet (Breite 2,5 mm × Tiefe 3,0 mm)',
    foot8: 'Fußschräge 8°',
    m06Bottom: 'Gesamtlänge: 78,0 cm (780 mm) · Querschnitt: 45 × 20 mm',
    m07Bottom: 'Gesamtlänge: 28,0 cm (280 mm) · Querschnitt: 45 × 20 mm',
    m08Bottom: 'Länge: 46,0 cm (460 mm) · 90°-Schnitte · Querschnitt: 45 × 20 mm',
    m09Side: 'Trichterseite · 38,0 × 9,0 cm',
    seat31: '31°-Auflage',
    m09Bottom: 'Länge: 38,0 cm · Fronthöhe: 9,0 cm · Stärke: 18 mm',
    m10Title: 'Trichter Front / Heck · 41,4 × 9,0 cm (90°)',
    m10Bottom: '41,4 cm (+ 2 × 1,8 cm Seiten = 45,0 cm Außenbreite)',
    m11a: 'M-11a · 19,0 cm (31°-Fuß)',
    m11Bottom: 'Vierkant 22 × 22 mm · je 2 Stk. pro Unterteil (6 Stk. gesamt)',
  },
  fr: {
    bevel31: 'Biseau 31°',
    at45cm: 'R=35 mm · Ø8,5 à 4,5 cm',
    frontLeg: 'Pied av. 10 cm',
    rearLeg: 'Pied arr. 12 cm',
    m01Bottom: 'Longueur totale : 88,0 cm (880 mm) · Section : 90 × 18 mm',
    cut90: 'Coupe 90°',
    m02Bottom: 'Longueur totale : 82,0 cm (820 mm) · Section : 90 × 18 mm',
    m03Elev: 'Vue frontale 46,0 × 9,0 cm',
    chamfer45: 'Chanfrein 45°',
    m03Bottom: 'Long. : 46,0 cm · Haut. : 9,0 cm · Épaisseur : 18 mm',
    slot3: 'Rainure 3 mm',
    m04Bottom: 'Long. : 42,4 cm · Marges : 1,8 cm · Section 35×20 mm',
    m05Bottom: 'Long. : 38,4 cm · Marges : 1,4 cm · Section 35×20 mm',
    slotNote: 'Rainurage groupé (largeur 2,5 mm × prof. 3,0 mm)',
    foot8: 'Biseau pied 8°',
    m06Bottom: 'Longueur totale : 78,0 cm (780 mm) · Section : 45 × 20 mm',
    m07Bottom: 'Longueur totale : 28,0 cm (280 mm) · Section : 45 × 20 mm',
    m08Bottom: 'Long. : 46,0 cm (460 mm) · Coupes 90° · Section : 45 × 20 mm',
    m09Side: 'Côté Trémie · 38,0 × 9,0 cm',
    seat31: 'Appui rampe 31°',
    m09Bottom: 'Long. : 38,0 cm · Hauteur avant : 9,0 cm · Ép. : 18 mm',
    m10Title: 'Avant / Arrière Trémie · 41,4 × 9,0 cm (90°)',
    m10Bottom: '41,4 cm (+ 2 × 1,8 cm côtés = 45,0 cm largeur ext.)',
    m11a: 'M-11a · 19,0 cm (base 31°)',
    m11Bottom: 'Tasseau carré 22 × 22 mm · 2 pces chacun (6 pces total)',
  },
  ca: {
    bevel31: 'Bisell 31°',
    at45cm: 'R=35 mm · Ø8,5 a 4,5 cm',
    frontLeg: 'Pota dav. 10 cm',
    rearLeg: 'Pota post. 12 cm',
    m01Bottom: 'Llarg total: 88,0 cm (880 mm) · Secció: 90 × 18 mm',
    cut90: 'Tall 90°',
    m02Bottom: 'Llarg total: 82,0 cm (820 mm) · Secció: 90 × 18 mm',
    m03Elev: 'Alçat frontal 46,0 × 9,0 cm',
    chamfer45: 'Perfil bisell 45°',
    m03Bottom: 'Llarg: 46,0 cm · Alçada: 9,0 cm · Gruix: 18 mm',
    slot3: 'Ranura 3 mm',
    m04Bottom: 'Llarg: 42,4 cm · Marge extrems: 1,8 cm · Secció 35×20 mm',
    m05Bottom: 'Llarg: 38,4 cm · Marge extrems: 1,4 cm · Secció 35×20 mm',
    slotNote: 'Ranurat continu en bloc (ample 2,5 mm × prof. 3,0 mm)',
    foot8: 'Bisell peu 8°',
    m06Bottom: 'Llarg total: 78,0 cm (780 mm) · Secció: 45 × 20 mm',
    m07Bottom: 'Llarg total: 28,0 cm (280 mm) · Secció: 45 × 20 mm',
    m08Bottom: 'Llarg: 46,0 cm (460 mm) · Talls rectes 90° · Secció: 45 × 20 mm',
    m09Side: 'Lateral Tremuja · 38,0 × 9,0 cm',
    seat31: 'Rebaix suport 31°',
    m09Bottom: 'Llarg: 38,0 cm · Alçada frontal: 9,0 cm · Gruix: 18 mm',
    m10Title: 'Frontal / Posterior Tremuja · 41,4 × 9,0 cm (90°)',
    m10Bottom: '41,4 cm (+ 2 × 1,8 cm laterals = 45,0 cm ample ext.)',
    m11a: 'M-11a · 19,0 cm (base 31°)',
    m11Bottom: 'Llistó quadrat 22 × 22 mm · 2 uts de cadascun (6 uts total)',
  },
};

function PieceShapeSvg({
  code,
  lang,
  compact = false,
}: {
  code: string;
  lang: LanguageCode;
  compact?: boolean;
}) {
  const heightClass = compact ? 'h-44' : 'h-64';
  const lbl = SVG_LABELS[lang];

  return (
    <svg
      viewBox="0 0 560 220"
      className={`w-full ${heightClass}`}
      role="img"
      aria-label={code}
    >
      <rect x="8" y="8" width="544" height="204" rx="6" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />

      {code === 'M-01' && (
        <g>
          <path
            d="M 88 68 L 456 68 A 32 32 0 0 1 456 132 L 50 132 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <line x1="60" y1="118" x2="430" y2="118" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="110" cy="112" r="4" fill="#1e40af" stroke="#fff" strokeWidth="1.2" />
          <circle cx="408" cy="112" r="4" fill="#1e40af" stroke="#fff" strokeWidth="1.2" />
          <circle cx="430" cy="96" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <circle cx="458" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <line x1="50" y1="158" x2="488" y2="158" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="50" y1="152" x2="50" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="488" y1="152" x2="488" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="269" y="175" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m01Bottom}
          </text>
          <text x="72" y="54" className="fill-slate-700 text-[10px] font-mono">{lbl.bevel31}</text>
          <text x="456" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.at45cm}</text>
          <text x="110" y="148" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">{lbl.frontLeg}</text>
          <text x="400" y="148" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">{lbl.rearLeg}</text>
          <rect x="510" y="68" width="16" height="64" fill="#e5c79e" stroke="#78502b" strokeWidth="1.4" />
          <text x="518" y="148" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
        </g>
      )}

      {code === 'M-02' && (
        <g>
          <path
            d="M 102 68 L 474 68 L 474 132 L 102 132 A 32 32 0 0 1 102 68 Z"
            fill="#e5c79e"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <line x1="115" y1="118" x2="474" y2="118" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx="100" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="132" cy="96" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <line x1="70" y1="158" x2="474" y2="158" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="70" y1="152" x2="70" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <line x1="474" y1="152" x2="474" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="272" y="175" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m02Bottom}
          </text>
          <text x="106" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.at45cm}</text>
          <text x="456" y="54" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.cut90}</text>
          <rect x="506" y="68" width="16" height="64" fill="#e5c79e" stroke="#78502b" strokeWidth="1.4" />
          <text x="514" y="148" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
        </g>
      )}

      {code === 'M-03' && (
        <g>
          <rect x="85" y="62" width="320" height="72" fill="#e5c79e" stroke="#78502b" strokeWidth="1.6" />
          <line x1="85" y1="122" x2="405" y2="122" stroke="#926239" strokeWidth="1" strokeDasharray="4 3" />
          {[98, 392].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="80" r="3" fill="#0f172a" />
              <circle cx={cx} cy="114" r="3" fill="#0f172a" />
            </g>
          ))}
          <text x="245" y="102" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            {lbl.m03Elev}
          </text>
          <polygon points="462,62 486,62 486,120 474,134 462,134" fill="#d9b382" stroke="#78502b" strokeWidth="1.6" />
          <text x="474" y="152" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.chamfer45}</text>
          <line x1="85" y1="164" x2="405" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="245" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m03Bottom}
          </text>
        </g>
      )}

      {(code === 'M-04' || code === 'M-05') && (
        <g>
          <rect
            x={code === 'M-04' ? 65 : 85}
            y="78"
            width={code === 'M-04' ? 350 : 310}
            height="42"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          {Array.from({ length: code === 'M-04' ? 24 : 21 }, (_, idx) => {
            const startX = code === 'M-04' ? 88 : 105;
            const x = startX + idx * 12.6;
            return <rect key={idx} x={x} y="78" width="4" height="10" fill="#475569" />;
          })}
          <polygon points="465,78 480,78 480,85 486,85 486,78 500,78 500,120 465,120" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
          <text x="482" y="140" textAnchor="middle" className="fill-slate-700 text-[9px] font-mono">{lbl.slot3}</text>
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
            {code === 'M-04' ? lbl.m04Bottom : lbl.m05Bottom}
          </text>
          <text x="240" y="62" textAnchor="middle" className="fill-slate-600 text-[10px] font-mono">
            {lbl.slotNote}
          </text>
        </g>
      )}

      {code === 'M-06' && (
        <g>
          <path
            d="M 94 78 L 468 78 L 478 122 L 94 122 A 22 22 0 0 1 94 78 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <circle cx="96" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="128" cy="100" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <text x="128" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=22 · Ø8.5 (3.5 cm) · Ø6 (8.5 cm)</text>
          <text x="466" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.foot8}</text>
          <line x1="72" y1="152" x2="478" y2="152" stroke="#1e40af" strokeWidth="1.2" />
          <text x="275" y="172" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m06Bottom}
          </text>
        </g>
      )}

      {code === 'M-07' && (
        <g>
          <path
            d="M 185 78 L 365 78 L 365 122 L 185 122 A 22 22 0 0 1 185 78 Z"
            fill="#d9b382"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <circle cx="188" cy="100" r="4.5" fill="#1e40af" stroke="#fff" strokeWidth="1.4" />
          <circle cx="218" cy="100" r="3" fill="#0f172a" stroke="#fff" strokeWidth="1" />
          <text x="200" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">R=22 · Ø8.5 (3.5 cm)</text>
          <text x="355" y="60" textAnchor="middle" className="fill-slate-700 text-[10px] font-mono">{lbl.cut90}</text>
          <line x1="163" y1="152" x2="365" y2="152" stroke="#1e40af" strokeWidth="1.2" />
          <text x="264" y="172" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m07Bottom}
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
            {lbl.m08Bottom}
          </text>
        </g>
      )}

      {code === 'M-09' && (
        <g>
          <polygon
            points="95,60 395,60 395,92 290,136 95,136"
            fill="#e5c79e"
            stroke="#78502b"
            strokeWidth="1.6"
          />
          <line x1="95" y1="130" x2="290" y2="130" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x="245" y="100" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            {lbl.m09Side}
          </text>
          <text x="360" y="138" className="fill-blue-900 text-[10px] font-mono font-semibold">{lbl.seat31}</text>
          <rect x="465" y="60" width="16" height="76" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />
          <text x="473" y="152" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
          <line x1="95" y1="164" x2="395" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="245" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m09Bottom}
          </text>
        </g>
      )}

      {code === 'M-10' && (
        <g>
          <rect x="85" y="64" width="330" height="72" fill="#e5c79e" stroke="#78502b" strokeWidth="1.6" />
          <text x="250" y="104" textAnchor="middle" className="fill-slate-900 text-[11px] font-mono font-semibold">
            {lbl.m10Title}
          </text>
          <rect x="465" y="64" width="16" height="72" fill="#d9b382" stroke="#78502b" strokeWidth="1.4" />
          <text x="473" y="152" textAnchor="middle" className="fill-slate-500 text-[9px] font-mono">18×90</text>
          <line x1="85" y1="164" x2="415" y2="164" stroke="#1e40af" strokeWidth="1.2" />
          <text x="250" y="182" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m10Bottom}
          </text>
        </g>
      )}

      {code === 'M-11' && (
        <g>
          <polygon points="75,66 235,66 218,92 75,92" fill="#d9b382" stroke="#78502b" strokeWidth="1.5" />
          <text x="150" y="83" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            {lbl.m11a}
          </text>

          <rect x="285" y="66" width="110" height="26" fill="#cba16d" stroke="#78502b" strokeWidth="1.5" />
          <text x="340" y="83" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            M-11b · 10.0 cm
          </text>

          <rect x="285" y="114" width="130" height="26" fill="#e5c79e" stroke="#78502b" strokeWidth="1.5" />
          <text x="350" y="131" textAnchor="middle" className="fill-slate-900 text-[10px] font-mono font-semibold">
            M-11c · 12.0 cm
          </text>

          <rect x="468" y="82" width="28" height="28" fill="#d9b382" stroke="#78502b" strokeWidth="1.5" />
          <text x="482" y="128" textAnchor="middle" className="fill-slate-600 text-[9px] font-mono">22×22 mm</text>

          <text x="280" y="176" textAnchor="middle" className="fill-blue-900 text-[11px] font-mono font-semibold">
            {lbl.m11Bottom}
          </text>
        </g>
      )}
    </svg>
  );
}

export function PieceDetails({
  lang,
  forceExpand = false,
}: {
  lang: LanguageCode;
  forceExpand?: boolean;
}) {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>('Todas');
  const [selectedCode, setSelectedCode] = useState<string>('M-01');
  const [showAllGrid, setShowAllGrid] = useState<boolean>(false);

  const copy = UI_COPY[lang].pieces;
  const dataset = useMemo(() => getLocalizedDataset(lang), [lang]);
  const pieces = dataset.woodCutPieces;
  const decimalSep = lang === 'en' ? '.' : ',';

  const isGridExpanded = showAllGrid || forceExpand;

  const filteredPieces = useMemo(
    () =>
      groupFilter === 'Todas'
        ? pieces
        : pieces.filter((p) => p.group === groupFilter),
    [groupFilter, pieces]
  );

  const activePiece = useMemo(
    () =>
      filteredPieces.find((p) => p.code === selectedCode) ??
      filteredPieces[0] ??
      pieces[0],
    [filteredPieces, selectedCode, pieces]
  );

  const extra = dataset.pieceExtra[activePiece.code];

  return (
    <div className="space-y-6 pt-4 border-t border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <h3 className="font-display text-xl font-semibold text-slate-900">{copy.title}</h3>
          <p className="text-xs text-slate-600 mt-1">{copy.subtitle}</p>
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
                {grp === 'Todas' ? copy.allGroup : dataset.groupNames[grp]}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAllGrid((v) => !v)}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            {isGridExpanded ? copy.viewInspector : copy.viewAllGrid}
          </button>
        </div>
      </div>

      {!isGridExpanded ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
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
                      {piece.qty} {piece.qty === 1 ? copy.unitSingle : copy.unitPlural} ·{' '}
                      {piece.lengthCm.toFixed(1).replace('.', decimalSep)} cm · {piece.sectionMm} mm
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 border border-slate-200 rounded-xl bg-white p-6 space-y-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <div className="text-xs font-mono text-blue-800 font-semibold">
                  {activePiece.code} · {dataset.groupNames[activePiece.group]} · {activePiece.qty}{' '}
                  {activePiece.qty === 1 ? copy.unitSingle : copy.unitPlural}
                </div>
                <h4 className="font-display text-xl font-semibold text-slate-900 mt-1">
                  {activePiece.name}
                </h4>
              </div>
              <span className="font-mono text-sm font-semibold text-slate-900">
                {extra.dimensionsMm}
              </span>
            </div>

            <PieceShapeSvg code={activePiece.code} lang={lang} />

            <p className="text-sm text-slate-700 leading-relaxed">{extra.shapeSummary}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  {copy.cutsHeading}
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
                  {copy.holesHeading}
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
            const info = dataset.pieceExtra[piece.code];
            return (
              <article
                key={piece.code}
                className="border border-slate-200 rounded-xl bg-white p-5 space-y-4"
              >
                <div className="flex items-baseline justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-semibold text-blue-800">
                      {piece.code} · {piece.qty} {piece.qty === 1 ? copy.unitSingle : copy.unitPlural}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 mt-0.5">{piece.name}</h4>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-700 whitespace-nowrap">
                    {info.dimensionsMm}
                  </span>
                </div>

                <PieceShapeSvg code={piece.code} lang={lang} compact />

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
