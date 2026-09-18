import React from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DocumentItem } from '../../types';
import { AssetBadge } from './AssetBadge';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  const handleDownload = () => {
    // Simulate genuine document download
    const content = `VINS Christian College of Engineering, Nagercoil\nOfficial Document: ${document.title}\nFilename: ${document.filename}\nPath: ${document.path}\nVerified AICTE & Anna University Document`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = document.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2.5 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl max-w-2xl w-full shadow-2xl border border-[#dedcd7] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#363539] text-white p-3.5 sm:p-5 flex items-start justify-between border-b border-[#dedcd7]/20 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/20 shrink-0">
              <FileText className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-[#eceae6] text-[10px] sm:text-xs font-semibold mb-0.5 border border-white/10 truncate">
                {document.fileType} · {document.fileSize}
              </span>
              <h3 className="text-sm sm:text-lg font-bold text-white truncate">{document.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#d3d1cc] hover:text-white p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1 bg-[#f6f5f2]">
          <div className="bg-[#ebe9e4] border border-[#dedcd7] rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
            <ShieldCheck className="w-5 h-5 text-[#54524e] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#252528]">
              <p className="font-semibold">Official VINS Engineering Document</p>
              <p className="text-[#54524e] text-xs mt-0.5">{document.description}</p>
            </div>
          </div>

          {/* Exact Asset Path Notice */}
          <div className="bg-[#28272b] rounded-xl p-3 sm:p-4 text-white space-y-2 border border-[#dedcd7]/20 overflow-x-auto">
            <p className="text-xs text-[#d3d1cc] font-medium">Exact Storage Asset Path (PDF Spec):</p>
            <AssetBadge path={document.path} variant="banner" />
          </div>

          {/* Simulated PDF Preview Page */}
          <div className="bg-white border border-[#dedcd7] rounded-xl p-4 sm:p-6 shadow-xs space-y-3 sm:space-y-4 text-[#3a3936]">
            <div className="border-b border-[#dedcd7] pb-3 sm:pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
              <div>
                <p className="text-[10px] sm:text-xs font-bold text-[#54524e] tracking-wider uppercase font-cinzel">VINS Christian College of Engineering</p>
                <p className="text-xs sm:text-sm font-semibold text-[#252528]">{document.title}</p>
              </div>
              <span className="text-[10px] sm:text-xs text-[#787671] font-mono">Academic Year 2026-27</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3 text-xs leading-relaxed text-[#54524e]">
              <p>
                This document is certified by the Principal and Governing Council of VINS Christian College of Engineering, Chunkankadai, Nagercoil - 629 807, Tamil Nadu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 p-2.5 sm:p-3 bg-[#f6f5f2] rounded-lg border border-[#dedcd7]">
                <div>
                  <span className="text-[#787671] block text-[10px]">College Code</span>
                  <span className="font-bold text-[#252528]">4982 (Anna University)</span>
                </div>
                <div>
                  <span className="text-[#787671] block text-[10px]">AICTE EOA</span>
                  <span className="font-bold text-[#252528]">F.No. Southern/2026-27</span>
                </div>
              </div>
              <p className="italic text-[10px] sm:text-[11px] text-[#787671]">
                Notice: Download the complete signed file below or view physical copies at the Principal's Office during working hours.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 sm:p-4 bg-white/90 backdrop-blur-md border-t border-[#dedcd7] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-[#54524e] font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-[11px] sm:text-xs font-semibold">Anna University Affiliation Verified</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs text-[#54524e] hover:text-[#252528] font-bold rounded-full hover:bg-[#ebe9e4] transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              Close
            </button>
            <button
              onClick={handleDownload}
              className="btn-valer-green text-xs uppercase tracking-wider px-4 sm:px-6 py-2.5 rounded-full cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-2 font-bold w-1/2 sm:w-auto justify-center"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
