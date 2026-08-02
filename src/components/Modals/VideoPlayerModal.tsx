import React from 'react';
import { X, Play, Share2, Globe } from 'lucide-react';
import { VideoHighlight } from '../../types';

interface VideoPlayerModalProps {
  video: VideoHighlight | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-3xl w-full overflow-hidden text-[#111827] shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0047AB] uppercase tracking-widest">
              IYC VIDEO DOCUMENTARY • {video.event}
            </span>
            <h3 className="font-serif text-lg font-black text-[#111827] leading-tight">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Responsive Video Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          
          <div className="absolute text-center p-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#FFD700] text-black flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-black ml-1" />
            </div>
            <p className="text-xs text-white/90 max-w-md mx-auto">
              Broadcast Highlight: <strong>{video.subtitle}</strong> ({video.duration})
            </p>
          </div>
        </div>

        {/* Video details & Stats */}
        <div className="p-4 bg-[#F9FAFB] border-t border-gray-200 flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0047AB]" />
            <span className="font-medium">{video.views} Views • Official IYC Broadcast</span>
          </div>
          
          <button 
            onClick={() => alert(`Share video link copied:\nhttps://iycforyouth.org/watch?v=${video.id}`)}
            className="flex items-center gap-1.5 text-[#0047AB] hover:underline font-bold cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" /> SHARE VIDEO
          </button>
        </div>

      </div>
    </div>
  );
};
