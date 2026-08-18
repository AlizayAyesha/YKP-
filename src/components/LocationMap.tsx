import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

export interface MapLocation {
  name: string;
  label: string;
  googleMapsUrl: string;
  bingMapsUrl: string;
  googleEmbed: string;
  bingEmbed: string;
}

interface LocationMapProps {
  location: MapLocation;
  title: string;
  description?: string;
}

type MapProvider = 'google' | 'bing';

export const LocationMap: React.FC<LocationMapProps> = ({ location, title, description }) => {
  const [provider, setProvider] = useState<MapProvider>('google');
  const embed = provider === 'google' ? location.googleEmbed : location.bingEmbed;
  const providerLabel = provider === 'google' ? 'Google Maps' : 'Bing Maps';

  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="location-map-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold)]">
              Find us
            </p>
            <h2 id="location-map-heading" className="font-display text-3xl sm:text-4xl font-semibold text-[var(--ykp-ink)]">
              {title}
            </h2>
            {description && (
              <p className="text-[var(--ykp-muted)] text-sm leading-relaxed">{description}</p>
            )}
            <p className="text-sm font-medium text-[var(--ykp-ink)]">{location.label}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-md border border-[var(--ykp-green)]/15 overflow-hidden" role="tablist" aria-label="Map provider">
              <button
                type="button"
                role="tab"
                aria-selected={provider === 'google'}
                onClick={() => setProvider('google')}
                className={`px-4 py-2 text-xs font-semibold tracking-wide cursor-pointer ${
                  provider === 'google'
                    ? 'bg-[var(--ykp-green)] text-white'
                    : 'bg-white text-[var(--ykp-muted)] hover:text-[var(--ykp-green)]'
                }`}
              >
                Google Maps
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={provider === 'bing'}
                onClick={() => setProvider('bing')}
                className={`px-4 py-2 text-xs font-semibold tracking-wide cursor-pointer ${
                  provider === 'bing'
                    ? 'bg-[var(--ykp-green)] text-white'
                    : 'bg-white text-[var(--ykp-muted)] hover:text-[var(--ykp-green)]'
                }`}
              >
                Bing Maps
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--ykp-green)]/10 shadow-[0_16px_40px_rgba(5,71,42,0.08)] bg-[var(--ykp-canvas)]">
          <iframe
            key={provider}
            title={`${location.name} on ${providerLabel}`}
            src={embed}
            width="100%"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-[320px] sm:h-[420px] lg:h-[450px] border-0"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] hover:underline"
          >
            Open in Google Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-[var(--ykp-muted)]">·</span>
          <a
            href={location.bingMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ykp-green)] hover:underline"
          >
            Open in Bing Maps
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
