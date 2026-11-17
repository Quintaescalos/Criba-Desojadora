export type LanguageCode = 'es' | 'en' | 'pt' | 'de' | 'fr' | 'ca';

export interface LanguageOption {
  code: LanguageCode;
  shortLabel: string;
  nativeName: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'es', shortLabel: 'ES', nativeName: 'Español' },
  { code: 'en', shortLabel: 'EN', nativeName: 'English' },
  { code: 'pt', shortLabel: 'PT', nativeName: 'Português' },
  { code: 'de', shortLabel: 'DE', nativeName: 'Deutsch' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français' },
  { code: 'ca', shortLabel: 'CA', nativeName: 'Català' },
];

export interface UiCopy {
  pageTitle: string;
  brand: string;
  nav: {
    folding: string;
    blueprints: string;
    materials: string;
    assembly: string;
    exportBtn: string;
  };
  hero: {
    languageLabel: string;
    kickerParts: [string, string, string];
    title: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metaParts: [string, string, string];
    refLabel: string;
    photoTabs: [string, string, string];
    kpis: [
      { label: string; value: string; sub: string },
      { label: string; value: string; sub: string },
      { label: string; value: string; sub: string },
      { label: string; value: string; sub: string },
    ];
  };
  simulator: {
    kicker: string;
    title: string;
    subtitle: string;
    lengthLabel: string;
    heightLabel: string;
    angleLabel: string;
    stateFolded: string;
    stateWorking: string;
    stateTransition: string;
    sliderLabel: string;
    sliderMarks: [string, string, string];
    pauseBtn: string;
    unfoldBtn: string;
    foldBtn: string;
    resetBtn: string;
    stagesTitle: string;
    toggleFlow: string;
    toggleAxes: string;
    svgFloor: string;
    svgLeafZone: string;
    svgCrate: string;
    svgLowerFrame: string;
    svgUpperFrame: string;
    svgHopper: string;
    svgHinge: string;
    svgFoldedVolume: string;
  };
  blueprints: {
    kicker: string;
    title: string;
    tabs: {
      elevation: string;
      top: string;
      hinge: string;
      hopper: string;
    };
    sheetNoteLeft: string;
    sheetNoteRight: string;
    svgElevationFloor: string;
    svgElevationLower: string;
    svgElevationUpper: string;
    svgElevationHopper: string;
    svgElevationDrop: string;
    svgElevationSlope: string;
    svgElevationSpan: string;
    svgTopLowerCaption: string;
    svgTopUpperCaption: string;
    svgTopHingeOverlap: string;
    svgHingeStop: string;
    svgHingeAxis: string;
    svgHingePin: string;
    svgHingeArc: string;
    svgHopperSideTitle: string;
    svgHopperSideLabel: string;
    svgHopperStrut: string;
    svgHopperSeat: string;
    svgHopperTopTitle: string;
    svgHopperTopFooter: string;
    cutTableTitle: string;
    cutTableSummary: string;
    cutTableCols: {
      code: string;
      piece: string;
      qty: string;
      length: string;
      section: string;
      cuts: string;
      drills: string;
    };
    stockTitle: string;
    stockSummary: string;
    barSingle: string;
    barPlural: string;
    barPrefix: string;
    wasteLabel: string;
  };
  pieces: {
    title: string;
    subtitle: string;
    allGroup: string;
    viewInspector: string;
    viewAllGrid: string;
    unitSingle: string;
    unitPlural: string;
    cutsHeading: string;
    holesHeading: string;
  };
  materials: {
    kicker: string;
    title: string;
    exportCsvBtn: string;
    clearMarksBtn: string;
    calibTitle: string;
    calibSubtitle: string;
    caliberLabel: string;
    clearGapLabel: string;
    pitchLabel: string;
    totalRodsLabel: string;
    rodsUnit: string;
    allCat: string;
    checklistProgress: string;
    checklistItems: string;
    tableCols: {
      ready: string;
      item: string;
      category: string;
      qty: string;
      notes: string;
    };
    csvHeaders: [string, string, string, string, string, string];
    csvReady: string;
    csvPending: string;
    dynamicRodName: (diam: string) => string;
    dynamicRodSpec: (pitch: string, gap: string, presetName: string) => string;
    dynamicRodQty: (count: number, meters: number) => string;
    dynamicRodNote: (perSection: number) => string;
  };
  assembly: {
    kicker: string;
    title: string;
    stepByStepBtn: string;
    expandAllBtn: string;
    phaseCounter: (step: number, total: number, duration: string) => string;
    toolsLabel: string;
    toleranceLabel: string;
    prevBtn: string;
    nextBtn: string;
  };
  exportModal: {
    title: string;
    activeCalib: (name: string, gap: string) => string;
    closeAria: string;
    pdfTitle: string;
    pdfDesc: string;
    pdfBtnIdle: string;
    pdfBtnBusy: string;
    pdfSuccess: (filename: string) => string;
    pdfError: string;
    printTitle: string;
    printDesc: string;
    printBtn: string;
    printBlockedTitle: string;
    printBlockedBody: string;
  };
  footer: {
    title: string;
    maintenance: string;
    backToTop: string;
  };
  pdf: {
    headerKicker: string;
    docTitle: string;
    intro: (presetName: string) => string;
    kpiLabels: [string, string, string, string];
    foldKicker: string;
    foldTitle: string;
    foldSteps: [string, string, string, string];
    piecesKicker: string;
    piecesTitle: string;
    cutKicker: string;
    cutTitle: string;
    cutCols: [string, string, string, string, string, string];
    stockTitle: string;
    stockBarsLabel: (section: string, count: number) => string;
    wasteShort: (cm: string) => string;
    bomKicker: string;
    bomTitle: (presetName: string, gap: string) => string;
    assemblyKicker: string;
    assemblyTitle: string;
    tolerancePrefix: string;
    footerLeft: string;
    pageOf: (p: number, total: number) => string;
  };
}
