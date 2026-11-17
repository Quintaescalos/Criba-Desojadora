import { useEffect, useMemo, useState } from 'react';
import { Download, RotateCcw } from 'lucide-react';
import { BomItem, OlivePreset } from '../data/manualData';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';

type CategoryFilter = 'Todos' | BomItem['category'];

const CATEGORIES: CategoryFilter[] = [
  'Todos',
  'Madera',
  'Metálica y Malla',
  'Herrajes',
  'Herramientas',
];

const STORAGE_KEY = 'criba-olivar-bom-checked-v1';

interface MaterialsListProps {
  lang: LanguageCode;
  selectedPresetId: OlivePreset['id'];
  onSelectPresetId: (id: OlivePreset['id']) => void;
}

export function MaterialsList({
  lang,
  selectedPresetId,
  onSelectPresetId,
}: MaterialsListProps) {
  const [filter, setFilter] = useState<CategoryFilter>('Todos');
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [checkedIds]);

  const copy = UI_COPY[lang].materials;
  const dataset = useMemo(() => getLocalizedDataset(lang), [lang]);
  const decimalSep = lang === 'en' ? '.' : ',';

  const activePreset = useMemo(
    () => dataset.olivePresets.find((p) => p.id === selectedPresetId) ?? dataset.olivePresets[1],
    [dataset.olivePresets, selectedPresetId]
  );

  const dynamicRodItem: BomItem = useMemo(
    () => ({
      id: 'bom-rods-dynamic',
      category: 'Metálica y Malla',
      name: copy.dynamicRodName(activePreset.wireDiameterMm.toFixed(1).replace('.', decimalSep)),
      spec: copy.dynamicRodSpec(
        activePreset.pitchMm.toFixed(1).replace('.', decimalSep),
        activePreset.clearGapMm.toFixed(1).replace('.', decimalSep),
        activePreset.name
      ),
      qtyLabel: copy.dynamicRodQty(
        activePreset.rodCountPerSection * 2,
        activePreset.totalWireMeters
      ),
      note: copy.dynamicRodNote(activePreset.rodCountPerSection),
    }),
    [activePreset, copy, decimalSep]
  );

  const allItems = useMemo(
    () => [dynamicRodItem, ...dataset.bomItems],
    [dynamicRodItem, dataset.bomItems]
  );

  const visibleItems = useMemo(
    () => (filter === 'Todos' ? allItems : allItems.filter((item) => item.category === filter)),
    [allItems, filter]
  );

  const completedCount = useMemo(
    () => allItems.filter((item) => checkedIds[item.id]).length,
    [allItems, checkedIds]
  );

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetChecklist = () => {
    setCheckedIds({});
  };

  const handleExportCsv = () => {
    const header = copy.csvHeaders;
    const rows = allItems.map((item) => [
      dataset.categoryNames[item.category],
      item.name,
      item.spec,
      item.qtyLabel,
      item.note,
      checkedIds[item.id] ? copy.csvReady : copy.csvPending,
    ]);

    const escapeCell = (cell: string) => `"${cell.replace(/"/g, '""')}"`;
    const csvContent =
      '\uFEFF' + [header, ...rows].map((row) => row.map(escapeCell).join(';')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bom-${lang}-${activePreset.id}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="materiales" className="py-16 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-blue-800 mb-2">
              {copy.kicker}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-900 text-balance">
              {copy.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copy.exportCsvBtn}</span>
            </button>
            <button
              type="button"
              onClick={resetChecklist}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{copy.clearMarksBtn}</span>
            </button>
          </div>
        </div>

        {/* Olive Variety Calibration Configurator */}
        <div className="border border-slate-200 rounded-xl bg-slate-50 p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900">{copy.calibTitle}</h3>
              <p className="text-xs text-slate-600 mt-1">{copy.calibSubtitle}</p>
            </div>

            <div className="inline-flex flex-wrap gap-1 p-1 bg-slate-200/80 rounded-lg shrink-0">
              {dataset.olivePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onSelectPresetId(preset.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    selectedPresetId === preset.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
            <div>
              <div className="text-xs text-slate-500">{copy.caliberLabel}</div>
              <div className="font-mono text-base font-semibold text-slate-900 mt-0.5">
                {activePreset.caliberMm}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{copy.clearGapLabel}</div>
              <div className="font-mono text-base font-semibold text-blue-800 mt-0.5">
                {activePreset.clearGapMm.toFixed(1).replace('.', decimalSep)} mm
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{copy.pitchLabel}</div>
              <div className="font-mono text-base font-semibold text-slate-900 mt-0.5">
                {activePreset.pitchMm.toFixed(1).replace('.', decimalSep)} mm
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">{copy.totalRodsLabel}</div>
              <div className="font-mono text-base font-semibold text-slate-900 mt-0.5">
                {activePreset.rodCountPerSection * 2} {copy.rodsUnit} ({activePreset.totalWireMeters} m)
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600">{activePreset.recommendation}</p>
        </div>

        {/* Category Filter & Progress */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start no-print">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  filter === cat
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat === 'Todos' ? copy.allCat : dataset.categoryNames[cat]}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-600">
            {copy.checklistProgress}{' '}
            <strong className="text-slate-900">
              {completedCount} / {allItems.length}
            </strong>{' '}
            {copy.checklistItems}
          </div>
        </div>

        {/* BOM Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-medium text-slate-600">
                <th className="py-3 px-4 w-12 text-center">{copy.tableCols.ready}</th>
                <th className="py-3 px-4">{copy.tableCols.item}</th>
                <th className="py-3 px-4">{copy.tableCols.category}</th>
                <th className="py-3 px-4">{copy.tableCols.qty}</th>
                <th className="py-3 px-4">{copy.tableCols.notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleItems.map((item) => {
                const isChecked = Boolean(checkedIds[item.id]);
                return (
                  <tr
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`cursor-pointer transition-colors ${
                      isChecked ? 'bg-slate-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        aria-label={item.name}
                        className="w-4 h-4 accent-blue-800 rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-3.5 px-4">
                      <div className={`font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.spec}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {dataset.categoryNames[item.category]}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-blue-900 whitespace-nowrap">
                      {item.qtyLabel}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 max-w-sm">{item.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
