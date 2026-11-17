import { useEffect, useState } from 'react';
import { FileDown, Printer, X } from 'lucide-react';
import { OlivePreset } from '../data/manualData';
import { LanguageCode } from '../i18n/types';
import { UI_COPY } from '../i18n/uiCopy';
import { getLocalizedDataset } from '../i18n/dataTranslations';
import { generateManualPdf } from '../utils/pdfGenerator';

interface PrintExportModalProps {
  lang: LanguageCode;
  isOpen: boolean;
  onClose: () => void;
  selectedPresetId: OlivePreset['id'];
  onPreparePrint: (expand: boolean) => void;
}

export function PrintExportModal({
  lang,
  isOpen,
  onClose,
  selectedPresetId,
  onPreparePrint,
}: PrintExportModalProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [printBlockedHint, setPrintBlockedHint] = useState(false);

  const copy = UI_COPY[lang].exportModal;
  const dataset = getLocalizedDataset(lang);
  const decimalSep = lang === 'en' ? '.' : ',';

  const activePreset =
    dataset.olivePresets.find((p) => p.id === selectedPresetId) ?? dataset.olivePresets[1];

  useEffect(() => {
    if (!isOpen) {
      setDownloadedFile(null);
      setPdfError(null);
      setPrintBlockedHint(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    setPdfError(null);
    setDownloadedFile(null);
    try {
      const filename = await generateManualPdf(selectedPresetId, lang);
      setDownloadedFile(filename);
    } catch {
      setPdfError(copy.pdfError);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleBrowserPrint = () => {
    setPrintBlockedHint(false);
    onPreparePrint(true);

    let printTriggered = false;
    const onBeforePrint = () => {
      printTriggered = true;
    };
    const onAfterPrint = () => {
      onPreparePrint(false);
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };

    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);

    setTimeout(() => {
      try {
        window.print();
      } catch {
        printTriggered = false;
      }

      setTimeout(() => {
        if (!printTriggered) {
          onPreparePrint(false);
          setPrintBlockedHint(true);
          window.removeEventListener('beforeprint', onBeforePrint);
          window.removeEventListener('afterprint', onAfterPrint);
        }
      }, 450);
    }, 120);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-4 no-print"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div
        className="w-full max-w-lg rounded-xl bg-white border border-slate-200 shadow-lg p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 id="export-modal-title" className="font-display text-lg font-semibold text-slate-900">
              {copy.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {copy.activeCalib(
                activePreset.name,
                activePreset.clearGapMm.toFixed(1).replace('.', decimalSep)
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.closeAria}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Option 1: Direct A4 PDF generation */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900">{copy.pdfTitle}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{copy.pdfDesc}</p>
            </div>
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-blue-900 disabled:opacity-60 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4" aria-hidden="true" />
              <span>{isGeneratingPdf ? copy.pdfBtnBusy : copy.pdfBtnIdle}</span>
            </button>
            {downloadedFile && (
              <p className="text-xs font-medium text-emerald-700">
                {copy.pdfSuccess(downloadedFile)}
              </p>
            )}
            {pdfError && <p className="text-xs font-medium text-red-700">{pdfError}</p>}
          </div>

          {/* Option 2: Direct browser print */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="space-y-1">
              <div className="text-sm font-semibold text-slate-900">{copy.printTitle}</div>
              <p className="text-xs text-slate-600 leading-relaxed">{copy.printDesc}</p>
            </div>
            <button
              type="button"
              onClick={handleBrowserPrint}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>{copy.printBtn}</span>
            </button>

            {printBlockedHint && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>{copy.printBlockedTitle}</strong> {copy.printBlockedBody}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
