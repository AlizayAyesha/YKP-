import React from 'react';
import { X, Download, FileText, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { ImpactReport } from '../../types';

interface ReportDetailModalProps {
  report: ImpactReport | null;
  onClose: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full overflow-hidden text-[#111827] shadow-2xl">
        
        {/* Header styling matching the report card color */}
        <div 
          className="p-6 border-b border-gray-200 relative bg-[#0047AB] text-white"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#FFD700] text-black">
                {report.code} IMPACT DOCUMENTATION
              </span>
              <h2 className="font-serif text-2xl font-black text-white mt-3">
                {report.title}
              </h2>
              <p className="text-xs text-white/80 mt-1">{report.cycleName} • Published {report.year}</p>
            </div>
            
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 text-center">
            <div>
              <div className="font-serif text-2xl font-black text-[#111827]">{report.projectsCount}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Youth Projects</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-black text-[#0047AB]">{report.countriesCount}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Countries</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-black text-[#111827]">{(report.volunteersCount).toLocaleString()}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Volunteers</div>
            </div>
            <div>
              <div className="font-serif text-2xl font-black text-[#0047AB]">{(report.beneficiariesCount / 1000000).toFixed(1)}M</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Beneficiaries</div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h4 className="text-xs font-bold text-[#0047AB] uppercase tracking-wider mb-2">
              EXECUTIVE SUMMARY
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {report.executiveSummary}
            </p>
          </div>

          {/* SDG Focus Pills */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              TARGET SUSTAINABLE DEVELOPMENT GOALS
            </h4>
            <div className="flex flex-wrap gap-2">
              {report.sdgFocus.map((sdg, idx) => (
                <span key={idx} className="bg-[#F9FAFB] border border-gray-200 px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                  {sdg}
                </span>
              ))}
            </div>
          </div>

          {/* Report Features */}
          <div className="bg-[#F9FAFB] rounded-2xl p-4 border border-gray-200 text-xs space-y-2">
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0" />
              <span>Full SDG alignment matrix and monitoring metrics</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0" />
              <span>Delegate project case studies across 6 global regions</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#0047AB] shrink-0" />
              <span>Verified data by the IOY Monitoring & Evaluation Directorate</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200">
            <span className="text-xs font-mono text-gray-400">
              {report.pdfFileName}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert(`Downloading official PDF: ${report.pdfFileName}\n\nSize: 4.8 MB\nStatus: File downloaded to your local device.`);
                }}
                className="px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-wider text-black bg-[#FFD700] hover:bg-[#ffe033] flex items-center gap-2 shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <Download className="w-4 h-4 text-black" /> DOWNLOAD FULL REPORT (PDF)
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
