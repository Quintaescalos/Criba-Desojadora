import { Printer } from 'lucide-react';

export function TopBar() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700 rounded-sm"
        >
          Taller Olivar
        </a>

        <nav
          aria-label="Navegación principal del manual"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#plegado"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            Plegado
          </a>
          <a
            href="#planos"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            Planos
          </a>
          <a
            href="#materiales"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            Materiales
          </a>
          <a
            href="#montaje"
            className="hover:text-slate-900 hover:underline underline-offset-4 decoration-blue-700 transition-colors whitespace-nowrap shrink-0"
          >
            Montaje
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Imprimir manual</span>
          </button>
        </div>
      </div>
    </header>
  );
}
