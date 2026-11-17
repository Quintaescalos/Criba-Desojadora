import { jsPDF } from 'jspdf';
import { OlivePreset } from '../data/manualData';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';

function cleanText(text: string): string {
  return text
    .replace(/→/g, '->')
    .replace(/±/g, '+/-')
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/’/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/€/g, 'EUR');
}

const PDF_PIECE_CALLOUTS: Record<LanguageCode, Record<string, string>> = {
  es: {
    'M-01': 'Bisel 31° | R=35 mm | Ejes Ø8,5 mm',
    'M-02': 'Cabeza R=35 mm | Testa 90° | Ø8,5 a 4,5 cm',
    'M-03': '46,0 x 9,0 cm | Canto inf. biselado 45°',
    'M-04': '42,4 x 3,5 x 2,0 cm | Ranuras 2,5x3 mm',
    'M-05': '38,4 x 3,5 x 2,0 cm | Ranuras 2,5x3 mm',
    'M-06': '78,0 x 4,5 x 2,0 cm | Cabeza R=22 | Pie 8°',
    'M-07': '28,0 x 4,5 x 2,0 cm | Cabeza R=22 | Base 90°',
    'M-08': '46,0 x 4,5 x 2,0 cm | Cortes rectos 90°',
    'M-09': '38,0 x 9,0 x 1,8 cm | Rebaje apoyo 31°',
    'M-10': '41,4 x 9,0 x 1,8 cm | Cierre tolva 45 cm',
    'M-11': 'Cuadradillo 22x22 mm: 19 cm (31°), 10 cm, 12 cm',
  },
  en: {
    'M-01': '31° bevel | R=35 mm | Ø8.5 mm bores',
    'M-02': 'Head R=35 mm | 90° end | Ø8.5 @ 4.5 cm',
    'M-03': '46.0 x 9.0 cm | 45° lower inner bevel',
    'M-04': '42.4 x 3.5 x 2.0 cm | Slots 2.5x3 mm',
    'M-05': '38.4 x 3.5 x 2.0 cm | Slots 2.5x3 mm',
    'M-06': '78.0 x 4.5 x 2.0 cm | Head R=22 | Foot 8°',
    'M-07': '28.0 x 4.5 x 2.0 cm | Head R=22 | Base 90°',
    'M-08': '46.0 x 4.5 x 2.0 cm | 90° square cuts',
    'M-09': '38.0 x 9.0 x 1.8 cm | 31° ramp seat',
    'M-10': '41.4 x 9.0 x 1.8 cm | 45 cm hopper width',
    'M-11': '22x22 mm stock: 19 cm (31°), 10 cm, 12 cm',
  },
  pt: {
    'M-01': 'Chanfro 31° | R=35 mm | Furos Ø8,5 mm',
    'M-02': 'Topo R=35 mm | Corte 90° | Ø8,5 a 4,5 cm',
    'M-03': '46,0 x 9,0 cm | Chanfro inf. 45°',
    'M-04': '42,4 x 3,5 x 2,0 cm | Ranhuras 2,5x3 mm',
    'M-05': '38,4 x 3,5 x 2,0 cm | Ranhuras 2,5x3 mm',
    'M-06': '78,0 x 4,5 x 2,0 cm | Topo R=22 | Pé 8°',
    'M-07': '28,0 x 4,5 x 2,0 cm | Topo R=22 | Base 90°',
    'M-08': '46,0 x 4,5 x 2,0 cm | Cortes retos 90°',
    'M-09': '38,0 x 9,0 x 1,8 cm | Rebaixo 31°',
    'M-10': '41,4 x 9,0 x 1,8 cm | Fecho 45 cm',
    'M-11': 'Ripa 22x22 mm: 19 cm (31°), 10 cm, 12 cm',
  },
  de: {
    'M-01': '31°-Gehrung | R=35 mm | Ø8,5 mm Bohrung',
    'M-02': 'Kopf R=35 mm | 90° | Ø8,5 bei 4,5 cm',
    'M-03': '46,0 x 9,0 cm | 45°-Innenfase',
    'M-04': '42,4 x 3,5 x 2,0 cm | Nuten 2,5x3 mm',
    'M-05': '38,4 x 3,5 x 2,0 cm | Nuten 2,5x3 mm',
    'M-06': '78,0 x 4,5 x 2,0 cm | R=22 | Fuß 8°',
    'M-07': '28,0 x 4,5 x 2,0 cm | R=22 | Fuß 90°',
    'M-08': '46,0 x 4,5 x 2,0 cm | 90°-Schnitte',
    'M-09': '38,0 x 9,0 x 1,8 cm | 31°-Auflage',
    'M-10': '41,4 x 9,0 x 1,8 cm | 45 cm Außenmaß',
    'M-11': 'Vierkant 22x22 mm: 19 (31°), 10, 12 cm',
  },
  fr: {
    'M-01': 'Biseau 31° | R=35 mm | Axes Ø8,5 mm',
    'M-02': 'Tête R=35 mm | 90° | Ø8,5 à 4,5 cm',
    'M-03': '46,0 x 9,0 cm | Chanfrein inf. 45°',
    'M-04': '42,4 x 3,5 x 2,0 cm | Rainures 2,5x3 mm',
    'M-05': '38,4 x 3,5 x 2,0 cm | Rainures 2,5x3 mm',
    'M-06': '78,0 x 4,5 x 2,0 cm | R=22 | Pied 8°',
    'M-07': '28,0 x 4,5 x 2,0 cm | R=22 | Base 90°',
    'M-08': '46,0 x 4,5 x 2,0 cm | Coupes 90°',
    'M-09': '38,0 x 9,0 x 1,8 cm | Appui 31°',
    'M-10': '41,4 x 9,0 x 1,8 cm | Largeur 45 cm',
    'M-11': 'Carré 22x22 mm : 19 (31°), 10, 12 cm',
  },
  ca: {
    'M-01': 'Bisell 31° | R=35 mm | Eixos Ø8,5 mm',
    'M-02': 'Cap R=35 mm | Tall 90° | Ø8,5 a 4,5 cm',
    'M-03': '46,0 x 9,0 cm | Bisell inf. 45°',
    'M-04': '42,4 x 3,5 x 2,0 cm | Ranures 2,5x3 mm',
    'M-05': '38,4 x 3,5 x 2,0 cm | Ranures 2,5x3 mm',
    'M-06': '78,0 x 4,5 x 2,0 cm | Cap R=22 | Peu 8°',
    'M-07': '28,0 x 4,5 x 2,0 cm | Cap R=22 | Base 90°',
    'M-08': '46,0 x 4,5 x 2,0 cm | Talls rectes 90°',
    'M-09': '38,0 x 9,0 x 1,8 cm | Rebaix 31°',
    'M-10': '41,4 x 9,0 x 1,8 cm | Tancament 45 cm',
    'M-11': 'Llistó 22x22 mm: 19 cm (31°), 10 cm, 12 cm',
  },
};

async function loadImageAsDataUrl(src: string): Promise<{ dataUrl: string; w: number; h: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 800;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve({
          dataUrl: canvas.toDataURL('image/jpeg', 0.88),
          w: canvas.width,
          h: canvas.height,
        });
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawClosedPolygon(
  doc: jsPDF,
  pts: [number, number][],
  offsetX: number,
  offsetY: number
) {
  if (pts.length < 2) return;
  const deltas: [number, number][] = [];
  for (let i = 1; i < pts.length; i++) {
    deltas.push([pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]]);
  }
  doc.lines(deltas, offsetX + pts[0][0], offsetY + pts[0][1], [1, 1], 'FD', true);
}

function drawPieceVector(
  doc: jsPDF,
  code: string,
  lang: LanguageCode,
  x: number,
  y: number,
  w: number,
  h: number
) {
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(x, y, w, h, 1.5, 1.5, 'FD');

  const padX = 5;
  const drawW = w - padX * 2;
  const cx = x + padX;
  const cy = y + h * 0.45;
  const callout = cleanText(PDF_PIECE_CALLOUTS[lang][code] ?? code);

  doc.setDrawColor(120, 80, 43);
  doc.setFillColor(229, 199, 158);
  doc.setLineWidth(0.35);

  if (code === 'M-01') {
    const rw = drawW * 0.85;
    const rh = 10;
    drawClosedPolygon(
      doc,
      [
        [6, 0],
        [rw - 5, 0],
        [rw, rh / 2],
        [rw - 5, rh],
        [0, rh],
      ],
      cx,
      cy - rh / 2
    );
    doc.setFillColor(30, 64, 175);
    doc.circle(cx + 12, cy + 2, 0.9, 'F');
    doc.circle(cx + rw - 16, cy + 2, 0.9, 'F');
    doc.circle(cx + rw - 5, cy, 1.1, 'F');
  } else if (code === 'M-02') {
    const rw = drawW * 0.82;
    const rh = 10;
    drawClosedPolygon(
      doc,
      [
        [5, 0],
        [rw, 0],
        [rw, rh],
        [5, rh],
        [0, rh / 2],
      ],
      cx,
      cy - rh / 2
    );
    doc.setFillColor(30, 64, 175);
    doc.circle(cx + 5, cy, 1.1, 'F');
    doc.circle(cx + 12, cy - 1, 0.8, 'F');
  } else if (code === 'M-03') {
    const rw = drawW * 0.65;
    const rh = 10;
    doc.rect(cx, cy - rh / 2, rw, rh, 'FD');
    doc.setFillColor(217, 179, 130);
    drawClosedPolygon(
      doc,
      [
        [0, 0],
        [5, 0],
        [5, rh - 2],
        [2.5, rh],
        [0, rh],
      ],
      cx + rw + 6,
      cy - rh / 2
    );
  } else if (code === 'M-04' || code === 'M-05') {
    const rw = code === 'M-04' ? drawW * 0.82 : drawW * 0.74;
    const rh = 7;
    doc.rect(cx, cy - rh / 2, rw, rh, 'FD');
    doc.setFillColor(71, 85, 105);
    for (let i = 0; i < 16; i++) {
      doc.rect(cx + 4 + i * ((rw - 8) / 16), cy - rh / 2, 0.9, 2.1, 'F');
    }
  } else if (code === 'M-06') {
    const rw = drawW * 0.84;
    const rh = 7;
    drawClosedPolygon(
      doc,
      [
        [3.5, 0],
        [rw - 2, 0],
        [rw, rh],
        [3.5, rh],
        [0, rh / 2],
      ],
      cx,
      cy - rh / 2
    );
    doc.setFillColor(30, 64, 175);
    doc.circle(cx + 3.5, cy, 1, 'F');
  } else if (code === 'M-07') {
    const rw = drawW * 0.45;
    const rh = 7;
    drawClosedPolygon(
      doc,
      [
        [3.5, 0],
        [rw, 0],
        [rw, rh],
        [3.5, rh],
        [0, rh / 2],
      ],
      cx + 12,
      cy - rh / 2
    );
    doc.setFillColor(30, 64, 175);
    doc.circle(cx + 15.5, cy, 1, 'F');
  } else if (code === 'M-08') {
    const rw = drawW * 0.68;
    const rh = 7;
    doc.rect(cx + 6, cy - rh / 2, rw, rh, 'FD');
  } else if (code === 'M-09') {
    const rw = drawW * 0.65;
    const rh = 11;
    drawClosedPolygon(
      doc,
      [
        [0, 0],
        [rw, 0],
        [rw, rh * 0.45],
        [rw * 0.62, rh],
        [0, rh],
      ],
      cx + 6,
      cy - rh / 2
    );
  } else if (code === 'M-10') {
    const rw = drawW * 0.68;
    const rh = 10;
    doc.rect(cx + 6, cy - rh / 2, rw, rh, 'FD');
  } else {
    drawClosedPolygon(
      doc,
      [
        [0, 0],
        [26, 0],
        [23, 5],
        [0, 5],
      ],
      cx,
      cy - 5
    );
    doc.rect(cx + 31, cy - 5, 16, 5, 'FD');
    doc.rect(cx + 51, cy - 5, 19, 5, 'FD');
  }

  doc.setFontSize(6.5);
  doc.setTextColor(30, 64, 175);
  doc.text(callout, cx, y + h - 3);
}

export async function generateManualPdf(
  presetId: OlivePreset['id'] = 'picual',
  lang: LanguageCode = 'es'
): Promise<string> {
  const copy = UI_COPY[lang];
  const pdfCopy = copy.pdf;
  const matCopy = copy.materials;
  const pieceCopy = copy.pieces;
  const dataset = getLocalizedDataset(lang);
  const decimalSep = lang === 'en' ? '.' : ',';

  const preset = dataset.olivePresets.find((p) => p.id === presetId) ?? dataset.olivePresets[1];
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = 210;
  const pageH = 297;
  const margin = 14;
  const contentW = pageW - margin * 2;
  let y = 20;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageH - 18) {
      doc.addPage();
      y = 20;
    }
  };

  const drawSectionTitle = (kicker: string, title: string) => {
    ensureSpace(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(kicker.toUpperCase()), margin, y);
    y += 5;
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(title), margin, y);
    y += 3;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 6;
  };

  // --- PAGE 1: COVER & OVERVIEW ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(30, 64, 175);
  doc.text(cleanText(pdfCopy.headerKicker), margin, y);
  y += 8;

  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(cleanText(pdfCopy.docTitle), contentW);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const introLines = doc.splitTextToSize(cleanText(pdfCopy.intro(preset.name)), contentW);
  doc.text(introLines, margin, y);
  y += introLines.length * 4.8 + 5;

  const kpis = [
    { label: cleanText(pdfCopy.kpiLabels[0]), value: '120 cm' },
    { label: cleanText(pdfCopy.kpiLabels[1]), value: '45 cm' },
    { label: cleanText(pdfCopy.kpiLabels[2]), value: '30 cm' },
    { label: cleanText(pdfCopy.kpiLabels[3]), value: '90 x 50 x 20 cm' },
  ];
  const kpiW = contentW / 4;
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentW, 18, 'FD');
  kpis.forEach((kpi, idx) => {
    const kx = margin + idx * kpiW;
    if (idx > 0) doc.line(kx, y, kx, y + 18);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(kpi.label, kx + 3, y + 6);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(kpi.value, kx + 3, y + 13.5);
  });
  y += 24;

  const loadedPhotos = await Promise.all(
    dataset.referencePhotos.map(async (photo) => ({
      photo,
      img: await loadImageAsDataUrl(photo.src),
    }))
  );

  const photoColW = (contentW - 8) / 3;
  const photoBoxH = 52;
  loadedPhotos.forEach(({ photo, img }, idx) => {
    const px = margin + idx * (photoColW + 4);
    doc.setDrawColor(226, 232, 240);
    doc.setFillColor(255, 255, 255);
    doc.rect(px, y, photoColW, photoBoxH + 14, 'FD');

    if (img) {
      const ratio = Math.min((photoColW - 4) / img.w, (photoBoxH - 4) / img.h);
      const iw = img.w * ratio;
      const ih = img.h * ratio;
      doc.addImage(img.dataUrl, 'JPEG', px + (photoColW - iw) / 2, y + 2 + (photoBoxH - 4 - ih) / 2, iw, ih);
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(photo.title), px + 2.5, y + photoBoxH + 4.5, { maxWidth: photoColW - 5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(photo.specs), px + 2.5, y + photoBoxH + 11, { maxWidth: photoColW - 5 });
  });
  y += photoBoxH + 22;

  drawSectionTitle(pdfCopy.foldKicker, pdfCopy.foldTitle);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  pdfCopy.foldSteps.forEach((line) => {
    ensureSpace(7);
    const wrapped = doc.splitTextToSize(cleanText(line), contentW);
    doc.text(wrapped, margin, y);
    y += wrapped.length * 4.5 + 1.5;
  });

  // --- PAGE 2: INDIVIDUAL PIECE SHAPES & DIMENSIONS ---
  doc.addPage();
  y = 20;
  drawSectionTitle(pdfCopy.piecesKicker, pdfCopy.piecesTitle);

  const cardW = (contentW - 6) / 2;
  const cardH = 38;
  for (let i = 0; i < dataset.woodCutPieces.length; i += 2) {
    ensureSpace(cardH + 6);
    for (let col = 0; col < 2; col++) {
      const piece = dataset.woodCutPieces[i + col];
      if (!piece) continue;
      const cx = margin + col * (cardW + 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      const unitLbl = piece.qty === 1 ? pieceCopy.unitSingle : pieceCopy.unitPlural;
      doc.text(
        cleanText(`${piece.code} (${piece.qty} ${unitLbl}) · ${piece.name}`),
        cx,
        y,
        { maxWidth: cardW }
      );
      drawPieceVector(doc, piece.code, lang, cx, y + 2.5, cardW, cardH - 5);
    }
    y += cardH + 2;
  }

  // --- PAGE 3: CUTTING TABLE & 240 CM STOCK OPTIMIZER ---
  doc.addPage();
  y = 20;
  drawSectionTitle(pdfCopy.cutKicker, pdfCopy.cutTitle);

  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentW, 7, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text(cleanText(pdfCopy.cutCols[0]), margin + 2, y + 4.8);
  doc.text(cleanText(pdfCopy.cutCols[1]), margin + 15, y + 4.8);
  doc.text(cleanText(pdfCopy.cutCols[2]), margin + 74, y + 4.8);
  doc.text(cleanText(pdfCopy.cutCols[3]), margin + 84, y + 4.8);
  doc.text(cleanText(pdfCopy.cutCols[4]), margin + 98, y + 4.8);
  doc.text(cleanText(pdfCopy.cutCols[5]), margin + 118, y + 4.8);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  dataset.woodCutPieces.forEach((p) => {
    const noteText = cleanText(`${p.angleNote}. ${p.drillNote}`);
    const wrapped = doc.splitTextToSize(noteText, contentW - 120);
    const rowH = Math.max(7, wrapped.length * 3.5 + 2.5);
    ensureSpace(rowH);

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + rowH, pageW - margin, y + rowH);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 64, 175);
    doc.text(p.code, margin + 2, y + 4.5);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(p.name), margin + 15, y + 4.5, { maxWidth: 57 });
    doc.text(String(p.qty), margin + 75, y + 4.5);
    doc.text(`${p.lengthCm.toFixed(1).replace('.', decimalSep)} cm`, margin + 84, y + 4.5);
    doc.text(`${p.sectionMm} mm`, margin + 98, y + 4.5);
    doc.setTextColor(71, 85, 105);
    doc.text(wrapped, margin + 118, y + 4.2);

    y += rowH;
  });

  y += 8;
  ensureSpace(45);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(cleanText(pdfCopy.stockTitle), margin, y);
  y += 5;

  dataset.stockPlans.forEach((plan) => {
    ensureSpace(8 + plan.cuts.length * 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(pdfCopy.stockBarsLabel(plan.sectionMm, plan.quantityBars)), margin, y);
    y += 4;

    plan.cuts.forEach((bar) => {
      doc.setDrawColor(203, 213, 225);
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentW, 6.5, 'FD');

      let cursorX = margin;
      bar.pieces.forEach((piece) => {
        const segW = (piece.lengthCm / plan.stockLengthCm) * contentW;
        doc.setFillColor(254, 243, 199);
        doc.setDrawColor(217, 119, 6);
        doc.rect(cursorX, y, segW, 6.5, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.2);
        doc.setTextColor(120, 53, 15);
        if (segW > 12) {
          doc.text(`${piece.code} (${piece.lengthCm})`, cursorX + 1.5, y + 4.3);
        }
        cursorX += segW;
      });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(100, 116, 139);
      doc.text(
        cleanText(pdfCopy.wasteShort(bar.wasteCm.toFixed(1).replace('.', decimalSep))),
        pageW - margin - 22,
        y + 4.3
      );
      y += 8;
    });
    y += 2;
  });

  // --- PAGE 4: BOM & 7 ASSEMBLY PHASES ---
  doc.addPage();
  y = 20;
  const gapStr = preset.clearGapMm.toFixed(1).replace('.', decimalSep);
  drawSectionTitle(pdfCopy.bomKicker, pdfCopy.bomTitle(preset.name, gapStr));

  const dynamicRodRow = {
    name: matCopy.dynamicRodName(preset.wireDiameterMm.toFixed(1).replace('.', decimalSep)),
    spec: matCopy.dynamicRodSpec(
      preset.pitchMm.toFixed(1).replace('.', decimalSep),
      gapStr,
      preset.name
    ),
    qtyLabel: matCopy.dynamicRodQty(preset.rodCountPerSection * 2, preset.totalWireMeters),
  };

  const bomRows = [
    dynamicRodRow,
    ...dataset.bomItems.map((item) => ({
      name: item.name,
      spec: item.spec,
      qtyLabel: item.qtyLabel,
    })),
  ];

  bomRows.forEach((row) => {
    ensureSpace(8.5);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y + 7, pageW - margin, y + 7);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(row.name), margin + 1, y + 3.8, { maxWidth: 112 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(row.spec), margin + 1, y + 6.4, { maxWidth: 132 });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(row.qtyLabel), pageW - margin - 1, y + 4.5, { align: 'right' });
    y += 8;
  });

  y += 6;
  drawSectionTitle(pdfCopy.assemblyKicker, pdfCopy.assemblyTitle);

  dataset.assemblyPhases.forEach((phase) => {
    const instrLines = phase.instructions.flatMap((line, idx) =>
      doc.splitTextToSize(cleanText(`${phase.step}.${idx + 1} ${line}`), contentW - 4)
    );
    const tolLines = doc.splitTextToSize(
      cleanText(`${pdfCopy.tolerancePrefix} ${phase.toleranceNote}`),
      contentW - 4
    );
    const blockH = 11 + instrLines.length * 3.8 + tolLines.length * 3.8 + 4;
    ensureSpace(blockH);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanText(`${String(phase.step).padStart(2, '0')}. ${phase.title}`), margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(`${phase.duration} · ${phase.tools}`), margin, y + 4.2);

    y += 8.2;
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(instrLines, margin + 2, y);
    y += instrLines.length * 3.8 + 1;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(tolLines, margin + 2, y);
    y += tolLines.length * 3.8 + 4;
  });

  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(cleanText(pdfCopy.footerLeft), margin, pageH - 7.5);
    doc.text(cleanText(pdfCopy.pageOf(p, totalPages)), pageW - margin, pageH - 7.5, { align: 'right' });
  }

  const filename = `manual-criba-deshojadora-${lang}-${preset.id}.pdf`;
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  return filename;
}
