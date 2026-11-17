import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, Globe, Wrench } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { FoldingSimulator } from './components/FoldingSimulator';
import { BlueprintsViewer } from './components/BlueprintsViewer';
import { MaterialsList } from './components/MaterialsList';
import { AssemblyGuide } from './components/AssemblyGuide';
import { PrintExportModal } from './components/PrintExportModal';
import { OlivePreset, REFERENCE_PHOTOS } from './data/manualData';
import { LANGUAGE_OPTIONS, LanguageCode } from './i18n/types';
import { UI_COPY } from './i18n/uiCopy';
import { getLocalizedDataset } from './i18n/dataTranslations';

const LANG_STORAGE_KEY = 'criba-olivar-lang-v1';

const VALID_LANGS: LanguageCode[] = ['es', 'en', 'pt', 'de', 'fr', 'ca'];

export default function App() {
  const [lang, setLang] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY) as LanguageCode | null;
      return saved && VALID_LANGS.includes(saved) ? saved : 'es';
    } catch {
      return 'es';
    }
  });
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(REFERENCE_PHOTOS[0].id);
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({});
  const [selectedPresetId, setSelectedPresetId] = useState<OlivePreset['id']>('picual');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isPrintPreparing, setIsPrintPreparing] = useState<boolean>(false);

  const copy = UI_COPY[lang];
  const dataset = useMemo(() => getLocalizedDataset(lang), [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = lang;
    document.title = copy.pageTitle;
  }, [lang, copy.pageTitle]);

  const activePhoto =
    dataset.referencePhotos.find((p) => p.id === selectedPhotoId) ?? dataset.referencePhotos[0];

  return (
    <div id="inicio" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <TopBar lang={lang} onOpenExportModal={() => setIsExportModalOpen(true)} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Editorial Lead */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
                <div className="space-y-5">
                  {/* Language Switcher Bar (placed in hero toolbar so <header> maintains strict 3-zone contract) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 no-print">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500">
                      <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      <span>{copy.hero.languageLabel}</span>
                    </span>
                    <div
                      role="group"
                      aria-label={copy.hero.languageLabel}
                      className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg"
                    >
                      {LANGUAGE_OPTIONS.map((option) => {
                        const isActive = option.code === lang;
                        return (
                          <button
                            key={option.code}
                            type="button"
                            onClick={() => setLang(option.code)}
                            title={option.nativeName}
                            aria-pressed={isActive}
                            className={`px-2.5 py-1 text-xs font-mono font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                              isActive
                                ? 'bg-white text-blue-800 shadow-sm font-semibold'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {option.shortLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-xs font-mono text-slate-500 flex flex-wrap items-center gap-2">
                    <span>{copy.hero.kickerParts[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{copy.hero.kickerParts[1]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{copy.hero.kickerParts[2]}</span>
                  </div>

                  <h1
                    className="font-display font-bold tracking-tight text-slate-900 leading-[1.08] text-balance"
                    style={{ fontSize: 'clamp(2.15rem, 3.8vw, 3.25rem)' }}
                  >
                    {copy.hero.title}
                  </h1>

                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    {copy.hero.lead}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
                    <a
                      href="#plegado"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap"
                    >
                      <span>{copy.hero.ctaPrimary}</span>
                      <ArrowDown className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href="#planos"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
                    >
                      <span>{copy.hero.ctaSecondary}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
                  <span>{copy.hero.metaParts[0]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{copy.hero.metaParts[1]}</span>
                  <span aria-hidden="true">·</span>
                  <span>{copy.hero.metaParts[2]}</span>
                </div>
              </div>

              {/* Right Column: Interactive Reference Photo Inspector */}
              <div className="lg:col-span-6 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden flex flex-col justify-between">
                <div className="px-4 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-500">{copy.hero.refLabel}</span>
                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg no-print">
                    {dataset.referencePhotos.map((photo, index) => (
                      <button
                        key={photo.id}
                        type="button"
                        onClick={() => setSelectedPhotoId(photo.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          selectedPhotoId === photo.id
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {copy.hero.photoTabs[index]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative flex-1 min-h-[280px] bg-white flex items-center justify-center p-4">
                  {!imgErrorIds[activePhoto.id] ? (
                    <img
                      src={activePhoto.src}
                      alt={activePhoto.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrorIds((prev) => ({ ...prev, [activePhoto.id]: true }))
                      }
                      className="max-h-[320px] w-auto object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-500 p-6 text-center">
                      <Wrench className="w-6 h-6 text-slate-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-slate-700">{activePhoto.title}</span>
                      <span className="text-xs font-mono">{activePhoto.specs}</span>
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-sm font-semibold text-slate-900">{activePhoto.title}</h2>
                    <span className="text-xs font-mono text-blue-800">{activePhoto.specs}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{activePhoto.caption}</p>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Dimensional KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 border border-slate-200 rounded-xl bg-slate-50 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {copy.hero.kpis.map((kpi, idx) => (
                <div key={idx} className="p-5">
                  <div className="text-xs text-slate-500">{kpi.label}</div>
                  <div
                    className={`font-mono text-2xl font-semibold mt-1 ${
                      idx === 3 ? 'text-blue-800' : 'text-slate-900'
                    }`}
                  >
                    {kpi.value}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{kpi.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FoldingSimulator lang={lang} />
        <BlueprintsViewer lang={lang} forceExpand={isPrintPreparing} />
        <MaterialsList
          lang={lang}
          selectedPresetId={selectedPresetId}
          onSelectPresetId={setSelectedPresetId}
        />
        <AssemblyGuide lang={lang} forceExpand={isPrintPreparing} />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">{copy.footer.title}</p>
            <p>{copy.footer.maintenance}</p>
          </div>
          <a
            href="#inicio"
            className="font-medium text-blue-800 hover:underline underline-offset-4 whitespace-nowrap shrink-0 no-print"
          >
            {copy.footer.backToTop}
          </a>
        </div>
      </footer>

      <PrintExportModal
        lang={lang}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        selectedPresetId={selectedPresetId}
        onPreparePrint={setIsPrintPreparing}
      />
    </div>
  );
}
