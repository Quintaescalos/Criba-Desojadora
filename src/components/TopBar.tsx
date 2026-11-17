import { Printer } from 'lucide-react';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';

interface TopBarProps {
  lang: LanguageCode;
  onOpenExportModal: () => void;
}

export function TopBar({ lang, onOpenExportModal }: TopBarProps) {
  const copy = UI_COPY[lang];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 rounded-sm"
        >
          {copy.brand}
        </a>

        <nav
          aria-label={copy.pageTitle}
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#plegado"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.folding}
          </a>
          <a
            href="#planos"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.blueprints}
          </a>
          <a
            href="#materiales"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.materials}
          </a>
          <a
            href="#montaje"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            {copy.nav.assembly}
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenExportModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{copy.nav.exportBtn}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
