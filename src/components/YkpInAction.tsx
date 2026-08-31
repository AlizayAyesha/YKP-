import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, X, ExternalLink } from 'lucide-react';
import { YKP_IN_ACTION } from '../data/youthData';
import { YkpVideo } from '../types';

const thumb = (youtubeId: string) =>
  `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

export const YkpInAction: React.FC = () => {
  const [modalVideo, setModalVideo] = useState<YkpVideo | null>(null);
  const videos = YKP_IN_ACTION.videos.slice(0, 3);

  return (
    <section id="ykp-in-action" className="py-20 sm:py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="inline-flex items-center rounded-full bg-[#E7F2EC] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-green)]">
            {YKP_IN_ACTION.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)] tracking-tight">
            {YKP_IN_ACTION.title}
          </h2>
          <p className="text-[var(--ykp-muted)] text-base leading-relaxed">
            {YKP_IN_ACTION.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((video, i) => (
            <motion.button
              key={video.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setModalVideo(video)}
              className="group text-left cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_16px_40px_rgba(5,71,42,0.14)] bg-[var(--ykp-canvas)]">
                <img
                  src={thumb(video.youtubeId)}
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-14 h-14 rounded-full bg-[var(--ykp-gold)] text-[var(--ykp-ink)] flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </span>
                </span>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-1.5 py-0.5 font-medium rounded">
                  {video.duration}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-[var(--ykp-ink)] group-hover:text-[var(--ykp-green)] transition-colors leading-snug">
                {video.title}
              </h3>
              <p className="mt-1.5 text-sm text-[var(--ykp-muted)] leading-relaxed line-clamp-2">
                {video.description}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href={YKP_IN_ACTION.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] hover:text-[var(--ykp-green-deep)]"
          >
            {YKP_IN_ACTION.channelCta}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--ykp-green-deep)]/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--ykp-green)]/10">
              <h3 className="font-display text-lg font-semibold text-[var(--ykp-ink)] truncate pr-4">
                {modalVideo.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalVideo(null)}
                className="text-[var(--ykp-muted)] hover:text-[var(--ykp-ink)] p-2 cursor-pointer"
                aria-label="Close video"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${modalVideo.youtubeId}?autoplay=1&rel=0`}
                title={modalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
