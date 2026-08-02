import React from 'react';
import { MetricsBar } from './MetricsBar';
import { IMPACT_REPORTS } from '../data/conferenceData';
import { ImpactReport, ModalType } from '../types';
import { Download, CheckCircle, FileText, ArrowRight, Send, Layers, Award } from 'lucide-react';

interface ImpactViewProps {
  openModal: (type: ModalType) => void;
  setSelectedReport: (report: ImpactReport) => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({ openModal, setSelectedReport }) => {
  return (
    <div className="space-y-0 text-[#111827] font-sans bg-[#F9FAFB]">
      
      {/* Page Header */}
      <section className="bg-[#0047AB] py-16 text-center text-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
            BEYOND THE CONFERENCE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-white">
            IYC <span className="text-[#FFD700] italic font-normal">Impact</span>
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Discover how delegates from 186+ nations turn UN policy declarations into on-the-ground community projects.
          </p>
        </div>
      </section>

      {/* Metrics Bar */}
      <MetricsBar variant="light" />

      {/* Overview Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-[#0047AB] uppercase tracking-[0.25em]">OVERVIEW</span>
              
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#111827]">
                From Conference <br />
                <span className="text-[#0047AB] font-normal italic">to Action</span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                The International Youth Conference is not just an event. It is a launchpad for measurable, scalable youth-led action across the globe.
              </p>

              {/* Checklist */}
              <div className="space-y-3 pt-2">
                {[
                  "Every delegate leaves with a concrete project plan aligned with the UN Sustainable Development Goals",
                  "Projects are tracked through a multi-tier monitoring framework led by the IOY Impact Directorate",
                  "Impact reports are published after each conference cycle detailing verified metrics and stories",
                  "High-performing projects receive scaling support, institutional micro-grants, and UN presentation opportunities"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => openModal('submit-project')}
                  className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full shadow-md flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
                >
                  <Send className="w-4 h-4 text-black" /> SUBMIT YOUR IMPACT PROJECT
                </button>
              </div>

            </div>

            {/* Right Column Stats Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0047AB] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="border-b border-white/20 pb-4">
                  <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
                    VERIFIED REACH SUMMARY
                  </span>
                  <div className="font-serif text-3xl font-black text-white mt-1">
                    922 Youth Projects
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-white/80">Global Reach</div>
                      <div className="text-lg font-bold font-serif text-[#FFD700]">186 Countries</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/80">Mobilized Youth</div>
                      <div className="text-lg font-bold font-serif text-white">79,445 Volunteers</div>
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-xl border border-white/20 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-white/80">Direct Beneficiaries</div>
                      <div className="text-xl font-bold font-serif text-[#FFD700]">27.0M People</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-white/80">Indirect Impact</div>
                      <div className="text-xl font-bold font-serif text-white">96.2M People</div>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-white/70 italic text-center">
                  Data independently verified by IOY Monitoring & Evaluation Directorate (Updated 2026).
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0047AB] uppercase tracking-[0.25em]">METHODOLOGY</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#111827]">
              The <span className="text-[#0047AB] font-normal italic">Process</span>
            </h2>
            <p className="text-gray-500 text-xs">
              From conference hall resolution to verified community transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Implementation",
                desc: "Delegates launch community projects in their home countries post-conference, leveraging IYC toolkits and mentor networks."
              },
              {
                step: "02",
                title: "Reporting",
                desc: "Project leads submit quarterly progress reports, beneficiary metrics, and photographic evidence to the IOY portal."
              },
              {
                step: "03",
                title: "Monitoring",
                desc: "The IOY Impact Directorate verifies outcomes through regional hubs and local civil society partner networks."
              },
              {
                step: "04",
                title: "Evaluation",
                desc: "Final metrics are compiled into the official annual IYC Impact Report and presented to multilateral partners."
              }
            ].map((proc, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#0047AB] transition-all duration-300 space-y-3 group shadow-sm"
              >
                <div className="font-serif text-4xl font-black text-[#0047AB] group-hover:scale-105 transition-transform">
                  {proc.step}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#111827]">
                  {proc.title}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {proc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Global Footprint */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-center">
          <div>
            <span className="text-xs font-bold text-[#0047AB] uppercase tracking-[0.25em]">GLOBAL FOOTPRINT</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#111827] mt-1">
              The <span className="text-[#0047AB] font-normal italic">Reach</span>
            </h2>
          </div>

          <MetricsBar variant="light" />
        </div>
      </section>

      {/* Impact Reports Grid */}
      <section className="bg-[#F9FAFB] py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0047AB] uppercase tracking-[0.25em]">DOCUMENTATION</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#111827]">
              Impact <span className="text-[#0047AB] font-normal italic">Reports</span>
            </h2>
            <p className="text-gray-500 text-xs">
              Annual comprehensive publications tracking youth-led SDG progress worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {IMPACT_REPORTS.map((report) => (
              <div 
                key={report.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5 hover:border-[#0047AB] transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#0047AB] uppercase tracking-widest bg-[#0047AB]/10 px-2.5 py-1 rounded-full">
                      {report.code}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {report.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#111827]">
                    {report.title}
                  </h3>

                  <p className="text-gray-600 text-xs line-clamp-2">
                    {report.executiveSummary}
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 block">Projects:</span>
                      <span className="text-[#111827] font-bold">{report.projectsCount}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Countries:</span>
                      <span className="text-[#0047AB] font-bold">{report.countriesCount}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedReport(report);
                    openModal('report-detail');
                  }}
                  className="w-full text-black font-extrabold text-xs uppercase tracking-wider py-3 rounded-full flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: report.colorHex === '#f59e0b' ? '#FFD700' : report.colorHex }}
                >
                  <Download className="w-4 h-4" /> DOWNLOAD REPORT
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Submit Project CTA Banner */}
      <section className="bg-white py-16 text-center text-[#111827]">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl font-black">
            Have an Impact Project to <span className="text-[#0047AB]">Share?</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
            Submit your youth-led project to be featured in the upcoming IYC Impact Report and evaluated for international recognition.
          </p>
          <div>
            <button
              onClick={() => openModal('submit-project')}
              className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg cursor-pointer transition-all hover:scale-105"
            >
              SUBMIT YOUR IMPACT PROJECT
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
