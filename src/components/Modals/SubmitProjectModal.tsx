import React, { useState } from 'react';
import { X, CheckCircle, Send, Globe, Users, HeartHandshake } from 'lucide-react';
import { ImpactProject } from '../../types';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: (project: ImpactProject) => void;
}

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({ isOpen, onClose, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    leadName: '',
    leadCountry: '',
    volunteersCount: 50,
    beneficiariesCount: 2500,
    location: '',
    summary: '',
    outcomes: '',
    selectedSdgs: [16, 17] as number[]
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleSdg = (sdgNum: number) => {
    if (formData.selectedSdgs.includes(sdgNum)) {
      setFormData({
        ...formData,
        selectedSdgs: formData.selectedSdgs.filter(s => s !== sdgNum)
      });
    } else {
      setFormData({
        ...formData,
        selectedSdgs: [...formData.selectedSdgs, sdgNum]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const outcomesList = formData.outcomes
      ? formData.outcomes.split('\n').filter(Boolean)
      : ['Project initialized following IYC delegate training', `${formData.beneficiariesCount} community beneficiaries served`];

    const sdgMap: Record<number, string> = {
      1: 'No Poverty', 2: 'Zero Hunger', 3: 'Good Health', 4: 'Quality Education',
      5: 'Gender Equality', 6: 'Clean Water', 7: 'Clean Energy', 8: 'Decent Work',
      9: 'Industry & Innovation', 10: 'Reduced Inequalities', 11: 'Sustainable Cities',
      12: 'Responsible Consumption', 13: 'Climate Action', 14: 'Life Below Water',
      15: 'Life on Land', 16: 'Peace & Justice', 17: 'Partnerships'
    };

    const newProj: ImpactProject = {
      id: 'proj-' + Date.now(),
      title: formData.title,
      leadName: formData.leadName,
      leadCountry: formData.leadCountry,
      sdgGoals: formData.selectedSdgs,
      sdgLabels: formData.selectedSdgs.map(s => `SDG ${s}: ${sdgMap[s] || 'Goal'}`),
      volunteersCount: Number(formData.volunteersCount),
      beneficiariesCount: Number(formData.beneficiariesCount),
      status: 'Active',
      location: formData.location || formData.leadCountry,
      summary: formData.summary,
      outcomes: outcomesList,
      dateSubmitted: new Date().toISOString().split('T')[0],
      reportCycle: 'IYC14'
    };

    onProjectAdded(newProj);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-[#111827] shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <span className="text-xs font-mono font-bold text-[#0047AB] uppercase tracking-widest">
              IYC IMPACT INITIATIVE
            </span>
            <h2 className="font-serif text-2xl font-black text-[#111827] mt-1">
              Submit Your Impact Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <p className="text-gray-600 text-xs leading-relaxed">
                Already attended IYC or representing a youth council? Submit your community project to be integrated into the upcoming annual <strong>IYC Impact Report</strong> and evaluated for top youth innovation awards.
              </p>

              {/* Title & Lead */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Grassroots Solar Filtration & Eco-Literacy"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Project Lead / Delegate Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadName}
                    onChange={(e) => setFormData({ ...formData, leadName: e.target.value })}
                    placeholder="Your Name"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Country of Implementation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.leadCountry}
                    onChange={(e) => setFormData({ ...formData, leadCountry: e.target.value })}
                    placeholder="e.g. Nigeria, Philippines, Peru..."
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              {/* Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Volunteers Mobilized
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.volunteersCount}
                    onChange={(e) => setFormData({ ...formData, volunteersCount: Number(e.target.value) })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Direct Beneficiaries Reached
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.beneficiariesCount}
                    onChange={(e) => setFormData({ ...formData, beneficiariesCount: Number(e.target.value) })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Specific City/Region
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lagos State"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  />
                </div>
              </div>

              {/* SDG Goals Multi-Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">
                  Select Target UN Sustainable Development Goals (SDGs)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 16, 17].map((sdg) => {
                    const isSelected = formData.selectedSdgs.includes(sdg);
                    return (
                      <button
                        key={sdg}
                        type="button"
                        onClick={() => toggleSdg(sdg)}
                        className={`p-2 rounded-lg text-xs font-semibold transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-[#0047AB] text-white font-bold shadow-sm'
                            : 'bg-[#F9FAFB] text-gray-700 border border-gray-200 hover:border-[#0047AB]'
                        }`}
                      >
                        SDG {sdg}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Project Abstract / Summary *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Explain the mission, strategy, and community impact achieved..."
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Key Measurable Outcomes (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.outcomes}
                  onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })}
                  placeholder="e.g. Installed 15 water filters&#10;Trained 40 youth ambassador leads"
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-500 hover:text-gray-800 cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs tracking-wider uppercase px-7 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  SUBMIT IMPACT PROJECT
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0047AB]/10 text-[#0047AB] flex items-center justify-center mx-auto border border-[#0047AB]/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl font-black text-[#111827]">
                Impact Project Submitted!
              </h3>

              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Thank you for contributing to the <strong>IYC Impact Initiative</strong>. Your project has been added to the official project directory and queued for review in the upcoming IYC Impact Report.
              </p>

              <button
                onClick={onClose}
                className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider cursor-pointer shadow-sm transition-all hover:scale-105"
              >
                RETURN TO PLATFORM
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
