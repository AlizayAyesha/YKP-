import React, { useState } from 'react';
import { PAST_CONFERENCES, CURRENT_CONFERENCE } from '../data/conferenceData';
import { ModalType, Conference } from '../types';
import { Calendar, MapPin, Users, Globe, ExternalLink, Filter } from 'lucide-react';

interface PastConferencesViewProps {
  openModal: (type: ModalType) => void;
}

export const PastConferencesView: React.FC<PastConferencesViewProps> = ({ openModal }) => {
  const [filterCity, setFilterCity] = useState<string>('all');

  const allConferences = [CURRENT_CONFERENCE, ...PAST_CONFERENCES];

  const filteredConferences = allConferences.filter(conf => {
    if (filterCity === 'all') return true;
    if (filterCity === 'nyc') return conf.location.includes('New York');
    if (filterCity === 'la') return conf.location.includes('Los Angeles');
    return true;
  });

  return (
    <div className="space-y-0 text-[#111827] font-sans bg-[#F9FAFB]">
      
      {/* Page Banner */}
      <section className="bg-[#0047AB] py-16 text-center text-white shadow-inner">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-widest">
            HISTORICAL DIPLOMACY ARCHIVE
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-black text-white">
            Conference <span className="text-[#FFD700] italic font-normal">Archives</span>
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Fourteen editions of international youth convening across Los Angeles and New York City.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F9FAFB] p-4 rounded-xl border border-gray-200">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-[#0047AB]" />
              <span>Filter Archives:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Editions (14)' },
                { id: 'nyc', label: 'New York City (UNGA Week)' },
                { id: 'la', label: 'Los Angeles (UCLA Campus)' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterCity(f.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    filterCity === f.id
                      ? 'bg-[#0047AB] text-white font-bold shadow-sm'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#0047AB]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conference Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConferences.map((conf) => (
              <div
                key={conf.id}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#0047AB] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Top Bar */}
                  <div className="bg-[#0047AB] text-white p-5 flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#FFD700] uppercase tracking-widest block">
                        EDITION {conf.editionNumber} {conf.isUpcoming && "• UPCOMING"}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white mt-1">
                        {conf.title}
                      </h3>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono ${
                      conf.status === 'Upcoming' ? 'bg-[#FFD700] text-black' : 'bg-white/20 text-white'
                    }`}>
                      {conf.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4">
                    <p className="text-xs text-gray-600 leading-relaxed italic">
                      "{conf.theme}"
                    </p>

                    <div className="space-y-2 text-xs border-y border-gray-100 py-3">
                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Calendar className="w-3.5 h-3.5 text-[#0047AB]" /> Date:
                        </span>
                        <span className="font-semibold text-[#111827]">{conf.dates}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <MapPin className="w-3.5 h-3.5 text-[#0047AB]" /> Location:
                        </span>
                        <span className="font-semibold text-[#111827]">{conf.location}</span>
                      </div>

                      <div className="flex items-center justify-between text-gray-700">
                        <span className="flex items-center gap-1.5 text-gray-500">
                          <Globe className="w-3.5 h-3.5 text-[#0047AB]" /> Countries:
                        </span>
                        <span className="font-bold text-[#0047AB]">{conf.countriesCount} Represented</span>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#F9FAFB] p-3 rounded-xl border border-gray-200">
                      <div>
                        <span className="text-gray-400 block">Online Reg:</span>
                        <span className="text-[#0047AB] font-bold font-mono">{conf.onlineRegistered}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">In-Person:</span>
                        <span className="text-[#111827] font-bold font-mono">{conf.inPersonDelegates}</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-gray-100 bg-[#F9FAFB]">
                  {conf.isUpcoming ? (
                    <button
                      onClick={() => openModal('register')}
                      className="w-full bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs py-2.5 rounded-full uppercase tracking-wider cursor-pointer shadow-sm transition-all hover:scale-[1.02]"
                    >
                      JOIN THE MOVEMENT
                    </button>
                  ) : (
                    <button
                      onClick={() => alert(`IYC Edition ${conf.editionNumber} Summary:\n\nTheme: ${conf.theme}\nVenue: ${conf.venue}\nDelegates: ${conf.inPersonDelegates} in-person, ${conf.onlineRegistered} online.\nOutcome: Delegate declaration submitted to UN secretariat.`)}
                      className="w-full bg-white hover:bg-gray-50 text-[#0047AB] border border border-gray-200 text-xs font-bold py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View Archive Brief</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#0047AB]" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
