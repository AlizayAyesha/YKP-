import React from 'react';
import { X, CheckCircle2, Globe, ShieldCheck } from 'lucide-react';
import { SITE_INFO, WHY_CHOOSE_DATA } from '../../data/youthData';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto text-[#111827] shadow-2xl p-6 sm:p-8 relative space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-[#05472A] uppercase tracking-widest">
              WHY CHOOSE YOUTH KA PAKISTAN
            </span>
            <h3 className="font-serif text-2xl font-black text-[#111827]">
              Growth & Empowerment Overview
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          {WHY_CHOOSE_DATA.features.map((item) => (
            <div key={item.id} className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-5 space-y-2">
              <h4 className="font-serif text-lg font-bold text-[#05472A]">{item.title}</h4>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
          ))}

          <div className="bg-[#05472A] text-white p-5 rounded-2xl space-y-2 text-xs">
            <div className="font-bold text-[#FFD700] uppercase tracking-wider">Equal Opportunity Promise</div>
            <p>We ensure both young men and women from rural and urban communities have equal access to mentorship, skill certificates, and career showcases.</p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-200 text-right">
          <button 
            onClick={onClose}
            className="bg-[#05472A] text-white font-bold text-xs uppercase px-6 py-2.5 rounded-full cursor-pointer"
          >
            CLOSE OVERVIEW
          </button>
        </div>

      </div>
    </div>
  );
};
