import React, { useState } from 'react';
import { X, CheckCircle, Sparkles, UserCheck, ShieldCheck, Download, Award } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [track, setTrack] = useState<'delegate' | 'speaker' | 'volunteer' | 'partner'>('delegate');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    organization: '',
    ageGroup: '18-24',
    attendanceType: 'In-Person (NYC)',
    motivation: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [badgeId, setBadgeId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'IYC14-NYC-' + Math.floor(100000 + Math.random() * 900000);
    setBadgeId(randomCode);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-[#111827] shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <span className="text-xs font-mono font-bold text-[#0047AB] uppercase tracking-widest">
              OFFICIAL DELEGATE REGISTRATION
            </span>
            <h2 className="font-serif text-2xl font-black text-[#111827] mt-1">
              International Youth Conference 14
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Select Registration Track */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Registration Track
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'delegate', label: 'Delegate', desc: 'In-person / Virtual' },
                    { id: 'speaker', label: 'Apply as Speaker', desc: 'Panelist / Youth Keynote' },
                    { id: 'volunteer', label: 'Volunteer', desc: 'Conference Logistics' },
                    { id: 'partner', label: 'Inquiry', desc: 'Institutional Sponsor' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTrack(item.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        track === item.id
                          ? 'border-[#0047AB] bg-[#0047AB]/5 text-[#0047AB] font-bold shadow-sm'
                          : 'border-gray-200 bg-[#F9FAFB] text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Alex Thorne"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="delegate@iycforyouth.org"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Country of Representation *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Ghana, Singapore, Brazil..."
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Organization / University
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Youth Diplomacy Council"
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Age Group
                  </label>
                  <select
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  >
                    <option value="15-17">15 - 17 Years (Youth Observer)</option>
                    <option value="18-24">18 - 24 Years (Youth Delegate)</option>
                    <option value="25-35">25 - 35 Years (Young Professional)</option>
                    <option value="36+">36+ Years (Adviser / Partner)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Attendance Mode
                  </label>
                  <select
                    value={formData.attendanceType}
                    onChange={(e) => setFormData({ ...formData, attendanceType: e.target.value })}
                    className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] focus:outline-none focus:border-[#0047AB]"
                  >
                    <option value="In-Person (NYC)">In-Person (New York City)</option>
                    <option value="Global Virtual Pass">Global Virtual Pass (Online)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Brief Statement of Purpose / UN SDG Interest
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="Describe your community engagement or areas of policy interest (e.g., Climate Action, Education, Governance)..."
                  className="w-full bg-[#F9FAFB] border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-[#111827] placeholder-gray-400 focus:outline-none focus:border-[#0047AB]"
                ></textarea>
              </div>

              <div className="bg-[#0047AB]/5 border border-[#0047AB]/20 rounded-xl p-4 flex items-start gap-3 text-xs text-[#0047AB]">
                <ShieldCheck className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                <div>
                  <strong>Official Confirmation:</strong> By submitting, your application is logged with the IOY Secretariat. Selected in-person delegates will receive official diplomatic invitation letters for UN clearance.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs tracking-wider uppercase px-7 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer"
                >
                  CONFIRM & GENERATE BADGE
                </button>
              </div>

            </form>
          ) : (
            /* Badge Output / Confirmation */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#0047AB]/10 text-[#0047AB] flex items-center justify-center mx-auto border border-[#0047AB]/30">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#0047AB] uppercase tracking-widest">
                  REGISTRATION CONFIRMED
                </span>
                <h3 className="font-serif text-2xl font-black text-[#111827] mt-1">
                  Welcome to IYC14, {formData.fullName}!
                </h3>
                <p className="text-gray-600 text-xs mt-2 max-w-md mx-auto">
                  Your official delegate credential has been generated. Confirmation details have been logged for country delegation of <strong>{formData.country || 'Global'}</strong>.
                </p>
              </div>

              {/* Printable Delegate Pass Mockup */}
              <div className="max-w-md mx-auto bg-[#0047AB] border-2 border-[#FFD700] rounded-2xl p-6 text-left relative overflow-hidden shadow-xl text-white">
                <div className="absolute top-0 right-0 bg-[#FFD700] text-black font-mono text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
                  OFFICIAL DELEGATE
                </div>

                <div className="flex items-center gap-3 border-b border-white/20 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700] text-black font-bold flex items-center justify-center text-lg font-serif">
                    {formData.fullName.charAt(0) || 'D'}
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#FFD700] font-semibold">{badgeId}</div>
                    <div className="font-serif text-base font-bold text-white leading-tight">
                      {formData.fullName || 'Registered Delegate'}
                    </div>
                    <div className="text-xs text-white/80">{formData.organization || 'Youth Leader'} • {formData.country}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                  <div>
                    <span className="text-white/60 block">EVENT:</span>
                    <span className="text-white font-semibold">IYC14 New York City</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">DATES:</span>
                    <span className="text-white font-semibold">Sep 22–25, 2026</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">MODE:</span>
                    <span className="text-white font-semibold">{formData.attendanceType}</span>
                  </div>
                  <div>
                    <span className="text-white/60 block">STATUS:</span>
                    <span className="text-[#FFD700] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"></span> Verified
                    </span>
                  </div>
                </div>

                <div className="bg-white/10 p-3 rounded-lg border border-white/20 flex items-center justify-between text-xs">
                  <span className="text-white/80 font-mono text-[10px]">UNGA81 High-Level Clearance</span>
                  <Award className="w-4 h-4 text-[#FFD700]" />
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => alert(`Downloading IYC14 Official Delegate Pass PDF\n\nRegistration Code: ${badgeId}\nName: ${formData.fullName}\nStatus: Verified`)}
                  className="bg-[#FFD700] hover:bg-[#ffe033] text-black font-extrabold text-xs px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md cursor-pointer transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 text-black" /> DOWNLOAD BADGE PDF
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs px-6 py-2.5 rounded-full cursor-pointer"
                >
                  CLOSE
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
