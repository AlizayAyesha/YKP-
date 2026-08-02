import React, { useState } from 'react';
import { ImpactProject, ModalType } from '../types';
import { INITIAL_IMPACT_PROJECTS } from '../data/impactProjectsData';
import { Search, Filter, Globe, Users, HeartHandshake, PlusCircle, CheckCircle } from 'lucide-react';

interface ProjectsViewProps {
  userProjects: ImpactProject[];
  openModal: (type: ModalType) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ userProjects, openModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSdgFilter, setSelectedSdgFilter] = useState<number | 'all'>('all');

  const allProjects = [...userProjects, ...INITIAL_IMPACT_PROJECTS];

  const filteredProjects = allProjects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.leadName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.leadCountry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSdg = selectedSdgFilter === 'all' || proj.sdgGoals.includes(Number(selectedSdgFilter));

    return matchesSearch && matchesSdg;
  });

  return (
    <div className="space-y-0 text-[#111827] font-sans bg-[#F9FAFB]">
      
      {/* Page Header */}
      <section className="bg-[#0047AB] py-16 text-center text-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
            GLOBAL ACTION DIRECTORY
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-white">
            Youth in <span className="text-[#FFD700] italic font-normal">Action</span>
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Explore 922+ youth-led projects transforming communities worldwide across UN Sustainable Development Goals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Search & Filter Controls */}
          <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search project title, country, or lead..."
                  className="w-full bg-white border border-gray-300 rounded-full pl-10 pr-4 py-2.5 text-xs text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                />
              </div>

              {/* Submit CTA button */}
              <button
                onClick={() => openModal('submit-project')}
                className="w-full md:w-auto bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all hover:scale-105"
              >
                <PlusCircle className="w-4 h-4 text-black" /> SUBMIT NEW PROJECT
              </button>
            </div>

            {/* SDG Quick Filter Buttons */}
            <div className="pt-2 border-t border-gray-200">
              <span className="text-[11px] font-mono font-bold text-gray-500 uppercase tracking-wider block mb-2">
                FILTER BY SUSTAINABLE DEVELOPMENT GOAL (SDG):
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSdgFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedSdgFilter === 'all'
                      ? 'bg-[#0047AB] text-white font-bold shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0047AB]'
                  }`}
                >
                  All SDGs ({allProjects.length})
                </button>

                {[4, 6, 13, 16, 17].map((sdg) => (
                  <button
                    key={sdg}
                    onClick={() => setSelectedSdgFilter(sdg)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedSdgFilter === sdg
                        ? 'bg-[#0047AB] text-white font-bold shadow-sm'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0047AB]'
                    }`}
                  >
                    SDG {sdg}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#0047AB] transition-all p-6 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#0047AB] uppercase tracking-widest bg-[#0047AB]/10 px-2.5 py-1 rounded-full">
                      {proj.reportCycle} CYCLE
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      proj.status === 'Active' ? 'bg-[#FFD700] text-black' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#111827] leading-tight">
                    {proj.title}
                  </h3>

                  <div className="text-xs text-gray-600 flex items-center gap-2 font-medium">
                    <Globe className="w-3.5 h-3.5 text-[#0047AB]" />
                    <span>Lead: <strong>{proj.leadName}</strong> ({proj.leadCountry})</span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {proj.summary}
                  </p>

                  {/* SDG Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.sdgLabels.map((lbl, idx) => (
                      <span key={idx} className="bg-[#F9FAFB] border border-gray-200 text-[10px] font-semibold text-gray-700 px-2.5 py-0.5 rounded-full">
                        {lbl}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card footer metrics */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="text-gray-400 block">Beneficiaries:</span>
                    <span className="text-[#0047AB] font-bold font-mono">{(proj.beneficiariesCount).toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 block">Volunteers:</span>
                    <span className="text-[#111827] font-bold font-mono">{(proj.volunteersCount).toLocaleString()}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
