import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { GALLERY_ALBUMS } from '../data/youthData';
import { GalleryAlbum } from '../types';
import { SmartImage } from './SmartImage';

export const GalleryView: React.FC = () => {
  const [activeAlbum, setActiveAlbum] = useState<GalleryAlbum | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openAlbum = (album: GalleryAlbum) => {
    setActiveAlbum(album);
    setLightboxIndex(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAlbum = () => {
    setActiveAlbum(null);
    setLightboxIndex(null);
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    if (lightboxIndex === null || !activeAlbum) return;
    setLightboxIndex((lightboxIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length);
  };

  const nextImage = () => {
    if (lightboxIndex === null || !activeAlbum) return;
    setLightboxIndex((lightboxIndex + 1) % activeAlbum.images.length);
  };

  return (
    <div className="text-[var(--ykp-ink)]">
      <section className="relative bg-section-green text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.15),transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center space-y-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Moments from the movement
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Gallery
          </h1>
          <p className="text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Browse albums named after YKP events — open any album to see the full photo set.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!activeAlbum ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {GALLERY_ALBUMS.map((album, i) => (
                <motion.button
                  key={album.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => openAlbum(album)}
                  className="group text-left cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[var(--ykp-canvas)] shadow-[0_10px_30px_rgba(5,71,42,0.08)]">
                    <SmartImage
                      src={album.coverImage}
                      alt={album.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[var(--ykp-gold)] mb-1">
                        {album.year}
                      </p>
                      <h2 className="font-display text-lg sm:text-xl font-semibold text-white leading-snug">
                        {album.name}
                      </h2>
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-white/80">
                        <Images className="w-3.5 h-3.5" />
                        {album.images.length} photos
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div>
              <button
                type="button"
                onClick={closeAlbum}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] hover:text-[var(--ykp-green-deep)] mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to albums
              </button>

              <div className="mb-8 space-y-2">
                <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[var(--ykp-gold)]">
                  Event album · {activeAlbum.year}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
                  {activeAlbum.name}
                </h2>
                <p className="text-sm text-[var(--ykp-muted)]">
                  {activeAlbum.images.length} photos from this event
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {activeAlbum.images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-[var(--ykp-canvas)] cursor-pointer"
                  >
                    <SmartImage
                      src={image.url}
                      alt={image.caption || activeAlbum.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {image.caption && (
                      <span className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/70 to-transparent text-left">
                        <span className="text-xs text-white/90">{image.caption}</span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeAlbum && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-6"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white p-2 cursor-pointer z-10 bg-black/40 rounded-full"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-1 sm:left-6 text-white/80 hover:text-white p-2 cursor-pointer z-10 bg-black/40 rounded-full"
              aria-label="Previous"
            >
              <ChevronLeft className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-1 sm:right-6 text-white/80 hover:text-white p-2 cursor-pointer z-10 bg-black/40 rounded-full"
              aria-label="Next"
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8" />
            </button>
            <div className="max-w-5xl w-full text-center px-8 sm:px-12">
              <SmartImage
                src={activeAlbum.images[lightboxIndex].url}
                alt={activeAlbum.images[lightboxIndex].caption || activeAlbum.name}
                className="max-h-[70vh] sm:max-h-[78vh] w-auto max-w-full mx-auto object-contain rounded-md"
              />
              <p className="mt-3 sm:mt-4 text-white/80 text-xs sm:text-sm px-2">
                {activeAlbum.images[lightboxIndex].caption || activeAlbum.name}
                <span className="text-white/40"> · {lightboxIndex + 1}/{activeAlbum.images.length}</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
