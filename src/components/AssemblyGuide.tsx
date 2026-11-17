import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';

export function AssemblyGuide({
  lang,
  forceExpand = false,
}: {
  lang: LanguageCode;
  forceExpand?: boolean;
}) {
  const [selectedStep, setSelectedStep] = useState<number>(1);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(false);

  const copy = UI_COPY[lang].assembly;
  const phases = useMemo(() => getLocalizedDataset(lang).assemblyPhases, [lang]);

  const isExpanded = showAllSteps || forceExpand;
  const activePhase = phases.find((p) => p.step === selectedStep) ?? phases[0];

  return (
    <section id="montaje" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-blue-800 mb-2">
              {copy.kicker}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 text-balance">
              {copy.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowAllSteps((v) => !v)}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap self-start md:self-auto no-print"
          >
            {isExpanded ? copy.stepByStepBtn : copy.expandAllBtn}
          </button>
        </div>

        {!isExpanded ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Phase Selector List */}
            <div className="lg:col-span-4 border border-slate-200 rounded-xl bg-white divide-y divide-slate-100 overflow-hidden">
              {phases.map((phase) => {
                const isSelected = phase.step === selectedStep;
                return (
                  <button
                    key={phase.step}
                    type="button"
                    onClick={() => setSelectedStep(phase.step)}
                    className={`w-full text-left px-4 py-3.5 transition-colors cursor-pointer flex items-start gap-3 ${
                      isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-semibold pt-0.5 shrink-0 ${
                        isSelected ? 'text-blue-800' : 'text-slate-400'
                      }`}
                    >
                      {String(phase.step).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-medium leading-snug ${
                          isSelected ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {phase.title}
                      </div>
                      <div className="text-xs font-mono text-slate-500 mt-1">
                        {phase.duration}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Detail Panel */}
            <div className="lg:col-span-8 border border-slate-200 rounded-xl bg-white p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs font-mono text-slate-500">
                <span>
                  {copy.phaseCounter(activePhase.step, phases.length, activePhase.duration)}
                </span>
                <span>
                  {copy.toolsLabel} {activePhase.tools}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-xl md:text-2xl font-semibold text-slate-900">
                  {activePhase.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">{activePhase.summary}</p>
              </div>

              <ol className="space-y-3.5">
                {activePhase.instructions.map((stepText, idx) => (
                  <li key={idx} className="flex items-start gap-3.5 text-sm text-slate-800 leading-relaxed">
                    <span className="font-mono text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 rounded w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{stepText}</span>
                  </li>
                ))}
              </ol>

              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
                <strong className="font-semibold text-slate-900">{copy.toleranceLabel} </strong>
                {activePhase.toleranceNote}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 no-print">
                <button
                  type="button"
                  disabled={selectedStep === 1}
                  onClick={() => setSelectedStep((s) => Math.max(1, s - 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.prevBtn}</span>
                </button>

                <button
                  type="button"
                  disabled={selectedStep === phases.length}
                  onClick={() => setSelectedStep((s) => Math.min(phases.length, s + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>{copy.nextBtn}</span>
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {phases.map((phase) => (
              <article
                key={phase.step}
                className="border border-slate-200 rounded-xl bg-white p-6 md:p-8 space-y-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-3 border-b border-slate-100">
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {String(phase.step).padStart(2, '0')}. {phase.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-500">
                    {phase.duration} · {phase.tools}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{phase.summary}</p>
                <ol className="space-y-2">
                  {phase.instructions.map((line, i) => (
                    <li key={i} className="text-sm text-slate-800 flex items-start gap-2.5">
                      <span className="font-mono text-xs text-blue-800 font-semibold mt-0.5">
                        {phase.step}.{i + 1}
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <strong className="text-slate-900">{copy.toleranceLabel} </strong>
                  {phase.toleranceNote}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
