import { useState } from 'react';
import { ArrowDown, Wrench } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { FoldingSimulator } from './components/FoldingSimulator';
import { BlueprintsViewer } from './components/BlueprintsViewer';
import { MaterialsList } from './components/MaterialsList';
import { AssemblyGuide } from './components/AssemblyGuide';
import { REFERENCE_PHOTOS } from './data/manualData';

export default function App() {
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>(REFERENCE_PHOTOS[0].id);
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({});

  const activePhoto =
    REFERENCE_PHOTOS.find((p) => p.id === selectedPhotoId) ?? REFERENCE_PHOTOS[0];

  return (
    <div id="inicio" className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <TopBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-6 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Editorial Lead */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
                <div className="space-y-5">
                  <div className="text-xs font-mono text-slate-500 flex flex-wrap items-center gap-2">
                    <span>Carpintería Agrícola</span>
                    <span aria-hidden="true">·</span>
                    <span>Doble Etapa de Cribado</span>
                    <span aria-hidden="true">·</span>
                    <span>Sin Electricidad</span>
                  </div>

                  <h1
                    className="font-display font-bold tracking-tight text-slate-900 leading-[1.08] text-balance"
                    style={{ fontSize: 'clamp(2.15rem, 3.8vw, 3.25rem)' }}
                  >
                    Criba deshojadora de aceitunas plegable en madera
                  </h1>

                  <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                    Manual constructivo completo con despiece optimizado, calibración de varillas por variedad y mecanismo de plegado compacto. Separa palos en la tolva superior y evacua las hojas por gravedad a lo largo de su rampa de 31,5° sin dañar el fruto.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2 no-print">
                    <a
                      href="#plegado"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors whitespace-nowrap"
                    >
                      <span>Simular plegado compacto</span>
                      <ArrowDown className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <a
                      href="#planos"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap"
                    >
                      <span>Ver planos de corte</span>
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 font-mono">
                  <span>Tiempo de taller: ~4,5 horas</span>
                  <span aria-hidden="true">·</span>
                  <span>Peso final: ~9,5 kg</span>
                  <span aria-hidden="true">·</span>
                  <span>8 listones de pino estándar (240 cm)</span>
                </div>
              </div>

              {/* Right Column: Interactive Reference Photo Inspector */}
              <div className="lg:col-span-6 border border-slate-200 rounded-xl bg-slate-50 overflow-hidden flex flex-col justify-between">
                <div className="px-4 py-3 border-b border-slate-200 bg-white flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-500">
                    Modelo de referencia real
                  </span>
                  <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg no-print">
                    {REFERENCE_PHOTOS.map((photo, index) => (
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
                        {index === 0 ? 'Desplegada' : index === 1 ? 'Tolva' : 'Plegada'}
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
              <div className="p-5">
                <div className="text-xs text-slate-500">Altura total de trabajo</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 mt-1">120 cm</div>
                <div className="text-xs text-slate-500 mt-1">Hasta borde superior de tolva</div>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-500">Ancho de tolva y carga</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 mt-1">45 cm</div>
                <div className="text-xs text-slate-500 mt-1">Malla cuadrada 25 × 25 mm</div>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-500">Alto de caída en boca</div>
                <div className="font-mono text-2xl font-semibold text-slate-900 mt-1">30 cm</div>
                <div className="text-xs text-slate-500 mt-1">Espacio libre para caja de campo</div>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-500">Volumen plegado compacto</div>
                <div className="font-mono text-2xl font-semibold text-blue-800 mt-1">
                  90 × 50 × 20 cm
                </div>
                <div className="text-xs text-slate-500 mt-1">Cabe en cualquier maletero</div>
              </div>
            </div>
          </div>
        </section>

        <FoldingSimulator />
        <BlueprintsViewer />
        <MaterialsList />
        <AssemblyGuide />
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1">
            <p className="font-medium text-slate-800">
              Taller Olivar · Manual constructivo de criba deshojadora plegable
            </p>
            <p>
              Mantenimiento recomendado tras campaña: cepillar hojas secas de la parrilla y repasar la madera con aceite de linaza cocido antes de guardar.
            </p>
          </div>
          <a
            href="#inicio"
            className="font-medium text-blue-800 hover:underline underline-offset-4 whitespace-nowrap shrink-0 no-print"
          >
            Volver al inicio
          </a>
        </div>
      </footer>
    </div>
  );
}
