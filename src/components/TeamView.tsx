import React from 'react';
import { TEAM_MEMBERS } from '../data/conferenceData';
import { ModalType } from '../types';
import { Globe, ShieldCheck, Mail, Award } from 'lucide-react';

interface TeamViewProps {
  openModal: (type: ModalType) => void;
}

export const TeamView: React.FC<TeamViewProps> = ({ openModal }) => {
  return (
    <div className="space-y-0 text-[#111827] font-sans bg-[#F9FAFB]">
      
      {/* Page Header */}
      <section className="bg-[#0047AB] py-16 text-center text-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
            ORGANIZATION & DELEGATES
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-white">
            Leadership & <span className="text-[#FFD700] italic font-normal">Secretariat</span>
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Meet the international organizers, regional directors, and youth advisory board behind the International Youth Conference.
          </p>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#0047AB] uppercase tracking-[0.25em]">
              EXECUTIVE COUNCIL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#111827]">
              Guiding Youth <span className="text-[#0047AB] font-normal italic">Diplomacy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-[#F9FAFB] border border-gray-200 rounded-2xl overflow-hidden hover:border-[#0047AB] transition-all p-6 space-y-4 group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#0047AB] shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#0047AB] uppercase tracking-wider block">
                      {member.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#111827] leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-gray-600 mt-0.5">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-gray-600 border-t border-gray-200 pt-3 flex items-center gap-2 font-medium">
                  <Globe className="w-4 h-4 text-[#0047AB] shrink-0" />
                  <span>Representation: <strong>{member.country}</strong></span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Join the Secretariat Banner */}
      <section className="bg-white py-16 text-center text-[#111827]">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl font-black">
            Want to Join Team <span className="text-[#0047AB]">IYC?</span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            We are always expanding our regional diplomatic committees, rapporteur teams, and media officers.
          </p>
          <div>
            <button
              onClick={() => openModal('register')}
              className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md cursor-pointer transition-all hover:scale-105"
            >
              APPLY FOR VOLUNTEER & SECRETARIAT ROLES
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
