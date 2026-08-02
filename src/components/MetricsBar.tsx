import React from 'react';
import { GLOBAL_METRICS } from '../data/conferenceData';

interface MetricsBarProps {
  variant?: 'light' | 'dark';
}

export const MetricsBar: React.FC<MetricsBarProps> = ({ variant = 'light' }) => {
  const metrics = [
    { value: GLOBAL_METRICS.projects, label: GLOBAL_METRICS.projectsLabel, color: "text-amber-500" },
    { value: GLOBAL_METRICS.countries, label: GLOBAL_METRICS.countriesLabel, color: "text-emerald-500" },
    { value: GLOBAL_METRICS.volunteers, label: GLOBAL_METRICS.volunteersLabel, color: "text-purple-500" },
    { value: GLOBAL_METRICS.directBeneficiaries, label: GLOBAL_METRICS.directBeneficiariesLabel, color: "text-amber-600" },
    { value: GLOBAL_METRICS.indirectImpact, label: GLOBAL_METRICS.indirectImpactLabel, color: "text-teal-500" }
  ];

  if (variant === 'dark') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-[#0047AB] text-white border border-white/20 rounded-2xl p-6 text-center shadow-lg">
            <div className="font-serif text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 text-[#FFD700]">
              {m.value}
            </div>
            <div className="text-[11px] font-bold tracking-widest text-white/90 uppercase">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white text-[#111827] border-y border-gray-200 shadow-sm py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {metrics.map((m, idx) => (
          <div key={idx} className="pt-4 md:pt-0 px-2 flex flex-col justify-center">
            <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-1.5 text-[#0047AB]">
              {m.value}
            </div>
            <div className="text-[11px] font-bold tracking-widest text-gray-500 uppercase leading-snug">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
