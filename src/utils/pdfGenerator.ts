import { jsPDF } from 'jspdf';
import {
  ASSEMBLY_PHASES,
  BASE_BOM_ITEMS,
  OLIVE_PRESETS,
  OlivePreset,
  REFERENCE_PHOTOS,
  STOCK_PLANS,
  WOOD_CUT_PIECES,
} from '../data/manualData';

function cleanText(text: string): string {
  return text
    .replace(/→/g, '->')
    .replace(/±/g, '+/-')
    .replace(/—/g, '-')
    .replace(/–/g, '-');
}

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

function drawPieceVector(doc: jsPDF, code: string, x: number, y: number, w: number, h: number) {
  // Card box
  doc.setDrawColor(203, 213, 225);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(x, y, w, h, 1.5, 1.5, 'FD');

  const padX = 5;
  const drawW = w - padX * 2;
  const cx = x + padX;
  const cy = y + h * 0.45;

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
    // Holes
    doc.setFillColor(30, 64, 175);
    doc.circle(cx + 12, cy + 2, 0.9, 'F');
    doc.circle(cx + rw - 16, cy + 2, 0.9, 'F');
    doc.circle(cx + rw - 5, cy, 1.1, 'F');
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('Bisel 31° | R=35 mm | Ejes Ø8,5 mm', cx, y + h - 3);
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('Cabeza R=35 mm | Testa 90° | Ø8,5 a 4,5 cm', cx, y + h - 3);
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('46,0 x 9,0 cm | Canto inf. biselado 45°', cx, y + h - 3);
  } else if (code === 'M-04' || code === 'M-05') {
    const rw = code === 'M-04' ? drawW * 0.82 : drawW * 0.74;
    const rh = 7;
    doc.rect(cx, cy - rh / 2, rw, rh, 'FD');
    doc.setFillColor(71, 85, 105);
    for (let i = 0; i < 16; i++) {
      doc.rect(cx + 4 + i * ((rw - 8) / 16), cy - rh / 2, 0.9, 2.1, 'F');
    }
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text(
      code === 'M-04'
        ? '42,4 x 3,5 x 2,0 cm | Ranuras 2,5x3 mm'
        : '38,4 x 3,5 x 2,0 cm | Ranuras 2,5x3 mm',
      cx,
      y + h - 3
    );
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('78,0 x 4,5 x 2,0 cm | Cabeza R=22 | Pie 8°', cx, y + h - 3);
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('28,0 x 4,5 x 2,0 cm | Cabeza R=22 | Base 90°', cx, y + h - 3);
  } else if (code === 'M-08') {
    const rw = drawW * 0.68;
    const rh = 7;
    doc.rect(cx + 6, cy - rh / 2, rw, rh, 'FD');
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('46,0 x 4,5 x 2,0 cm | Cortes rectos 90°', cx, y + h - 3);
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('38,0 x 9,0 x 1,8 cm | Rebaje apoyo 31°', cx, y + h - 3);
  } else if (code === 'M-10') {
    const rw = drawW * 0.68;
    const rh = 10;
    doc.rect(cx + 6, cy - rh / 2, rw, rh, 'FD');
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('41,4 x 9,0 x 1,8 cm | Cierre tolva 45 cm', cx, y + h - 3);
  } else {
    // M-11
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
    doc.setFontSize(6.5);
    doc.setTextColor(30, 64, 175);
    doc.text('Cuadradillo 22x22 mm: 19 cm (31°), 10 cm, 12 cm', cx, y + h - 3);
  }
}

export async function generateManualPdf(presetId: OlivePreset['id'] = 'picual'): Promise<void> {
  const preset = OLIVE_PRESETS.find((p) => p.id === presetId) ?? OLIVE_PRESETS[1];
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
  doc.text('TALLER OLIVAR · MANUAL CONSTRUCTIVO DE CARPINTERIA AGRICOLA', margin, y);
  y += 8;

  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(
    'Criba deshojadora de aceitunas manual plegable en madera',
    contentW
  );
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const introLines = doc.splitTextToSize(
    cleanText(
      `Manual tecnico completo con planos de corte, optimizacion en 8 listones comerciales de 240 cm, detalle de forma por pieza (M-01 a M-11), mecanismo de plegado compacto (90 x 50 x 20 cm) y lista de materiales calibrada para variedad ${preset.name}.`
    ),
    contentW
  );
  doc.text(introLines, margin, y);
  y += introLines.length * 4.8 + 5;

  // 4-KPI Bar
  const kpis = [
    { label: 'Altura total', value: '120 cm' },
    { label: 'Ancho tolva', value: '45 cm' },
    { label: 'Alto de caida', value: '30 cm' },
    { label: 'Plegado compacto', value: '90 x 50 x 20 cm' },
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

  // Load and embed the 3 reference photos side by side
  const loadedPhotos = await Promise.all(
    REFERENCE_PHOTOS.map(async (photo) => ({
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

  // Folding Mechanism Summary on Page 1
  drawSectionTitle('01 · Mecanismo de plegado compacto', 'Secuencia en 4 pasos (120 cm -> 90 x 50 x 20 cm)');
  const foldSteps = [
    '1. Retirar tolva superior: liberar pasadores Ø 6 mm y extraer el cajon de 45 x 38 cm hacia arriba.',
    '2. Abatir patas delanteras (28 cm) y traseras (76 cm): aflojar palomillas M8 exteriores y plegar paralelo a M-01.',
    '3. Liberar bloqueo de 180° en bisagra central: extraer el pasador Ø 6 mm junto al eje central.',
    '4. Cierre en libro: pivotar el tramo superior (42 cm ancho) dentro del tramo inferior (42,4 cm luz interna).',
  ];
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  foldSteps.forEach((line) => {
    ensureSpace(7);
    doc.text(cleanText(line), margin, y);
    y += 5.5;
  });

  // --- PAGE 2: INDIVIDUAL PIECE SHAPES & DIMENSIONS ---
  doc.addPage();
  y = 20;
  drawSectionTitle('02 · Fichas de forma y acotación', 'Geometría detallada de las 11 piezas (M-01 a M-11)');

  const cardW = (contentW - 6) / 2;
  const cardH = 38;
  for (let i = 0; i < WOOD_CUT_PIECES.length; i += 2) {
    ensureSpace(cardH + 6);
    for (let col = 0; col < 2; col++) {
      const piece = WOOD_CUT_PIECES[i + col];
      if (!piece) continue;
      const cx = margin + col * (cardW + 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(
        cleanText(`${piece.code} (${piece.qty} ${piece.qty === 1 ? 'ud' : 'uds'}) · ${piece.name}`),
        cx,
        y,
        { maxWidth: cardW }
      );
      drawPieceVector(doc, piece.code, cx, y + 2.5, cardW, cardH - 5);
    }
    y += cardH + 2;
  }

  // --- PAGE 3: CUTTING TABLE & 240 CM STOCK OPTIMIZER ---
  doc.addPage();
  y = 20;
  drawSectionTitle('03 · Tabla de despiece y aprovechamiento', 'Medidas exactas de corte y distribución en listones de 240 cm');

  // Table header
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(margin, y, contentW, 7, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Cód.', margin + 2, y + 4.8);
  doc.text('Pieza', margin + 15, y + 4.8);
  doc.text('Uds', margin + 74, y + 4.8);
  doc.text('Largo', margin + 84, y + 4.8);
  doc.text('Sección', margin + 98, y + 4.8);
  doc.text('Cortes y taladros', margin + 118, y + 4.8);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  WOOD_CUT_PIECES.forEach((p) => {
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
    doc.text(`${p.lengthCm.toFixed(1).replace('.', ',')} cm`, margin + 84, y + 4.5);
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
  doc.text('Optimización en 8 listones comerciales de 240 cm (corte sierra 3 mm)', margin, y);
  y += 5;

  STOCK_PLANS.forEach((plan) => {
    ensureSpace(8 + plan.cuts.length * 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 64, 175);
    doc.text(cleanText(`${plan.sectionMm} -> ${plan.quantityBars} listones`), margin, y);
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
      doc.text(`Sobra ${bar.wasteCm.toFixed(1)} cm`, pageW - margin - 20, y + 4.3);
      y += 8;
    });
    y += 2;
  });

  // --- PAGE 4: BOM & 7 ASSEMBLY PHASES ---
  doc.addPage();
  y = 20;
  drawSectionTitle(
    '04 · Lista de materiales y herrajes',
    `Calibración activa: ${preset.name} (luz ${preset.clearGapMm.toFixed(1).replace('.', ',')} mm)`
  );

  const dynamicRodRow = {
    name: `Varilla calibrada lisa Ø ${preset.wireDiameterMm.toFixed(1).replace('.', ',')} mm`,
    spec: `Paso ${preset.pitchMm.toFixed(1).replace('.', ',')} mm · Luz libre ${preset.clearGapMm.toFixed(1).replace('.', ',')} mm`,
    qtyLabel: `${preset.rodCountPerSection * 2} varillas (${preset.totalWireMeters} m)`,
  };

  const bomRows = [
    dynamicRodRow,
    ...BASE_BOM_ITEMS.map((item) => ({
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
  drawSectionTitle('05 · Montaje paso a paso', 'Secuencia constructiva en 7 fases de taller');

  ASSEMBLY_PHASES.forEach((phase) => {
    const instrLines = phase.instructions.flatMap((line, idx) =>
      doc.splitTextToSize(cleanText(`${phase.step}.${idx + 1} ${line}`), contentW - 4)
    );
    const tolLines = doc.splitTextToSize(cleanText(`Tolerancia: ${phase.toleranceNote}`), contentW - 4);
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

  // Running headers and footers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Taller Olivar · Manual de Criba Deshojadora Plegable (90x50x20 cm)', margin, pageH - 7.5);
    doc.text(`Página ${p} de ${totalPages}`, pageW - margin, pageH - 7.5, { align: 'right' });
  }

  // Trigger reliable Blob download inside iframe
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `manual-criba-deshojadora-${preset.id}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}
