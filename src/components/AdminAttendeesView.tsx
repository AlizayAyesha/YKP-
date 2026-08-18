import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/youthData';
import { EventProfile, EventProfileRole, PartnerInquiry, StudentInterest, YkpEvent } from '../types';

interface AttendeeRow {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  organization: string;
  designation: string;
  eventId: string;
  registrationId: string;
  createdAt: string;
  posterStatus: string;
  posterUrl: string;
  publicConsent: boolean;
}

type AdminTab = 'registrations' | 'students' | 'inquiries' | 'profiles' | 'event';

function adminHeaders(adminKey: string): HeadersInit {
  return { 'x-admin-key': adminKey, 'Content-Type': 'application/json' };
}

export const AdminAttendeesView: React.FC = () => {
  const [key, setKey] = useState(sessionStorage.getItem('ykp-admin-key') || '');
  const [tab, setTab] = useState<AdminTab>('registrations');
  const [rows, setRows] = useState<AttendeeRow[]>([]);
  const [students, setStudents] = useState<StudentInterest[]>([]);
  const [inquiries, setInquiries] = useState<PartnerInquiry[]>([]);
  const [profiles, setProfiles] = useState<EventProfile[]>([]);
  const [event, setEvent] = useState<YkpEvent | null>(EVENTS_DATA[0] || null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState('');

  const eventName = (id: string) => {
    const found = EVENTS_DATA.find((item) => item.id === id);
    return found?.title || found?.dates || id;
  };

  const load = async (adminKey: string) => {
    setError('');
    const [regRes, profileRes, eventRes, studentRes, inquiryRes] = await Promise.all([
      fetch('/api/admin/registrations', { headers: { 'x-admin-key': adminKey } }),
      fetch('/api/admin/profiles', { headers: { 'x-admin-key': adminKey } }),
      fetch('/api/events'),
      fetch('/api/admin/students', { headers: { 'x-admin-key': adminKey } }),
      fetch('/api/admin/inquiries', { headers: { 'x-admin-key': adminKey } })
    ]);
    const regData = await regRes.json().catch(() => ({}));
    const profileData = await profileRes.json().catch(() => ({}));
    const eventData = await eventRes.json().catch(() => ({}));
    const studentData = await studentRes.json().catch(() => ({}));
    const inquiryData = await inquiryRes.json().catch(() => ({}));
    if (!regRes.ok) {
      setError(regData.error || 'Could not load attendees.');
      setLoaded(false);
      return;
    }
    sessionStorage.setItem('ykp-admin-key', adminKey);
    setRows(regData.attendees || []);
    setProfiles(profileData.profiles || []);
    setStudents(studentData.students || []);
    setInquiries(inquiryData.inquiries || []);
    setEvent((eventData.events && eventData.events[0]) || EVENTS_DATA[0]);
    setLoaded(true);
  };

  const patchProfile = async (id: string, body: Record<string, unknown>) => {
    setSaving(id);
    setError('');
    const response = await fetch(`/api/admin/profiles/${id}`, {
      method: 'PATCH',
      headers: adminHeaders(key),
      body: JSON.stringify(body)
    });
    const data = await response.json().catch(() => ({}));
    setSaving('');
    if (!response.ok) {
      setError(data.error || 'Could not update profile.');
      return;
    }
    setProfiles((current) => current.map((row) => (row.id === id ? data.profile : row)));
  };

  const saveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;
    setSaving('event');
    setError('');
    const response = await fetch(`/api/admin/events/${event.id}`, {
      method: 'PATCH',
      headers: adminHeaders(key),
      body: JSON.stringify({
        title: event.title,
        subtitle: event.subtitle,
        tagline: event.tagline,
        summary: event.summary,
        description: event.description,
        venue: event.venue,
        city: event.city,
        dates: event.dates,
        date: event.date,
        time: event.time,
        themeUrdu: event.themeUrdu,
        themeEnglish: event.themeEnglish,
        organizer: event.organizer,
        contactPhone: event.contactPhone,
        image: event.image,
        status: event.status,
        registrationStatus: event.registrationStatus,
        registrationEnabled: event.registrationEnabled
      })
    });
    const data = await response.json().catch(() => ({}));
    setSaving('');
    if (!response.ok) {
      setError(data.error || 'Could not save event.');
      return;
    }
    setEvent(data.event);
  };

  const fieldClass = 'w-full border border-[var(--ykp-green)]/15 px-3 py-2 text-sm';

  return (
    <div className="bg-white min-h-[70vh]">
      <section className="bg-section-green text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-[var(--ykp-gold-bright)]">
            Staff only
          </p>
          <h1 className="font-display text-4xl font-semibold mt-2">YKP administration</h1>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-10 space-y-6">
        <form
          className="flex flex-col sm:flex-row gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            load(key);
          }}
        >
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Admin key"
            className="flex-1 border border-[var(--ykp-green)]/15 px-3 py-2.5 text-sm"
          />
          <button type="submit" className="bg-[var(--ykp-green)] text-white font-semibold px-5 py-2.5 text-sm">
            Load dashboard
          </button>
        </form>
        {error && <p className="text-sm text-red-700">{error}</p>}
        {loaded && (
          <>
            <div className="flex flex-wrap gap-2">
              {([
                ['registrations', 'Event RSVPs'],
                ['students', 'Students'],
                ['inquiries', 'Partners / Mentors'],
                ['profiles', 'Profile moderation'],
                ['event', 'Event']
              ] as const).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md cursor-pointer ${
                    tab === id ? 'bg-[var(--ykp-green)] text-white' : 'bg-[var(--ykp-canvas)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === 'registrations' && (
              <div className="overflow-x-auto border border-[var(--ykp-green)]/10">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--ykp-canvas)] text-left">
                    <tr>
                      {['Name', 'Email', 'Phone', 'City', 'Organization', 'Registration ID', 'Date', 'Poster', 'Consent'].map((h) => (
                        <th key={h} className="px-3 py-2 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 && (
                      <tr>
                        <td colSpan={9} className="px-3 py-6 text-[var(--ykp-muted)]">No registrations yet.</td>
                      </tr>
                    )}
                    {rows.map((row) => (
                      <tr key={row.registrationId} className="border-t border-[var(--ykp-green)]/10">
                        <td className="px-3 py-2">{row.fullName}</td>
                        <td className="px-3 py-2">{row.email}</td>
                        <td className="px-3 py-2">{row.phone}</td>
                        <td className="px-3 py-2">{row.city}</td>
                        <td className="px-3 py-2">{row.organization || '—'}</td>
                        <td className="px-3 py-2 font-medium">{row.registrationId}</td>
                        <td className="px-3 py-2">{new Date(row.createdAt).toLocaleString()}</td>
                        <td className="px-3 py-2">
                          {row.posterStatus}{' '}
                          {row.posterUrl && (
                            <a href={row.posterUrl} className="text-[var(--ykp-green)] underline" target="_blank" rel="noreferrer">
                              Open
                            </a>
                          )}
                        </td>
                        <td className="px-3 py-2">{row.publicConsent ? 'Yes' : 'No'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'students' && (
              <div className="overflow-x-auto border border-[var(--ykp-green)]/10">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--ykp-canvas)] text-left">
                    <tr>
                      {['ID', 'Name', 'Email', 'WhatsApp', 'City', 'Age', 'School', 'Level', 'Interests', 'Motivation', 'Date'].map((h) => (
                        <th key={h} className="px-3 py-2 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 && (
                      <tr>
                        <td colSpan={11} className="px-3 py-6 text-[var(--ykp-muted)]">No student waitlist entries yet.</td>
                      </tr>
                    )}
                    {students.map((row) => (
                      <tr key={row.id} className="border-t border-[var(--ykp-green)]/10 align-top">
                        <td className="px-3 py-2 font-medium whitespace-nowrap">{row.id}</td>
                        <td className="px-3 py-2">{row.fullName}</td>
                        <td className="px-3 py-2">{row.email}</td>
                        <td className="px-3 py-2">{row.phone}</td>
                        <td className="px-3 py-2">{row.city}</td>
                        <td className="px-3 py-2">{row.age}</td>
                        <td className="px-3 py-2">{row.school}</td>
                        <td className="px-3 py-2">{row.educationLevel}</td>
                        <td className="px-3 py-2">{(row.interests || []).join(', ')}</td>
                        <td className="px-3 py-2 min-w-[220px]">{row.motivation}</td>
                        <td className="px-3 py-2 whitespace-nowrap">{new Date(row.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'inquiries' && (
              <div className="space-y-4">
                {inquiries.length === 0 && (
                  <p className="text-sm text-[var(--ykp-muted)]">No partner, mentor, or educator inquiries yet.</p>
                )}
                {inquiries.map((row) => (
                  <article key={row.id} className="border border-[var(--ykp-green)]/10 p-4 space-y-2 text-sm">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-semibold">{row.fullName}</p>
                      <p className="text-[var(--ykp-muted)]">{row.id} · {new Date(row.createdAt).toLocaleString()}</p>
                    </div>
                    <p>
                      <span className="font-medium">{row.role}{row.otherRole ? ` — ${row.otherRole}` : ''}</span>
                      {' · '}
                      {row.organization} · {row.city}
                    </p>
                    <p className="text-[var(--ykp-muted)]">{row.email} · {row.phone}</p>
                    {row.website && (
                      <p>
                        <a href={row.website} className="text-[var(--ykp-green)] underline" target="_blank" rel="noreferrer">
                          {row.website}
                        </a>
                      </p>
                    )}
                    <p><span className="text-[var(--ykp-muted)]">Support types:</span> {(row.supportTypes || []).join(', ')}</p>
                    <p><span className="text-[var(--ykp-muted)]">Expertise:</span> {row.expertise}</p>
                    {row.availability && (
                      <p><span className="text-[var(--ykp-muted)]">Availability:</span> {row.availability}</p>
                    )}
                    <p className="leading-relaxed"><span className="text-[var(--ykp-muted)]">How they will support:</span> {row.supportDetails}</p>
                  </article>
                ))}
              </div>
            )}

            {tab === 'profiles' && (
              <div className="space-y-4">
                {profiles.length === 0 && (
                  <p className="text-sm text-[var(--ykp-muted)]">No invitation profiles submitted yet.</p>
                )}
                {profiles.map((profile) => (
                  <article key={profile.id} className="border border-[var(--ykp-green)]/10 p-4 flex flex-col sm:flex-row gap-4">
                    <img src={profile.photoUrl} alt={profile.fullName} className="w-24 h-24 object-cover rounded-md" />
                    <div className="flex-1 space-y-1 text-sm">
                      <p className="font-semibold">{profile.fullName}</p>
                      <p>{profile.designation} · {profile.organization}</p>
                      <p className="text-[var(--ykp-muted)]">{profile.role} · {profile.status} · {eventName(profile.eventId)}</p>
                      <p className="text-[var(--ykp-muted)]">{profile.email} · {profile.phone}</p>
                      {profile.bio && <p className="text-[var(--ykp-muted)]">{profile.bio}</p>}
                    </div>
                    <div className="flex flex-col gap-2 min-w-[180px]">
                      <select
                        className={fieldClass}
                        value={profile.role}
                        onChange={(e) => patchProfile(profile.id, { role: e.target.value as EventProfileRole })}
                      >
                        {['Guest of Honor', 'Speaker', 'Panelist', 'Educational Leader', 'Corporate Representative', 'Participant'].map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <div className="flex flex-wrap gap-2">
                        {(['pending', 'approved', 'rejected'] as const).map((status) => (
                          <button
                            key={status}
                            type="button"
                            disabled={saving === profile.id}
                            onClick={() => patchProfile(profile.id, { status })}
                            className={`px-2 py-1 text-xs font-semibold cursor-pointer ${
                              profile.status === status ? 'bg-[var(--ykp-green)] text-white' : 'bg-[var(--ykp-canvas)]'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                      <label className="text-xs flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profile.featuredSpeaker}
                          onChange={(e) => patchProfile(profile.id, { featuredSpeaker: e.target.checked })}
                        />
                        Featured Speaker
                      </label>
                      <label className="text-xs flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={profile.featuredPanelist}
                          onChange={(e) => patchProfile(profile.id, { featuredPanelist: e.target.checked })}
                        />
                        Featured Panelist
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {tab === 'event' && event && (
              <form onSubmit={saveEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ['title', 'Title'],
                  ['subtitle', 'Subtitle'],
                  ['tagline', 'Tagline'],
                  ['dates', 'Date'],
                  ['time', 'Time'],
                  ['venue', 'Venue'],
                  ['city', 'City'],
                  ['organizer', 'Organizer'],
                  ['contactPhone', 'Contact'],
                  ['themeEnglish', 'Theme (English)'],
                  ['themeUrdu', 'Theme (Urdu)'],
                  ['image', 'Event poster URL']
                ].map(([field, label]) => (
                  <label key={field} className="text-sm">
                    <span className="block mb-1 text-[var(--ykp-muted)]">{label}</span>
                    <input
                      className={fieldClass}
                      value={String(event[field as keyof YkpEvent] ?? '')}
                      onChange={(e) => setEvent({ ...event, [field]: e.target.value })}
                    />
                  </label>
                ))}
                <label className="text-sm sm:col-span-2">
                  <span className="block mb-1 text-[var(--ykp-muted)]">Summary</span>
                  <textarea
                    rows={3}
                    className={fieldClass}
                    value={event.summary}
                    onChange={(e) => setEvent({ ...event, summary: e.target.value })}
                  />
                </label>
                <label className="text-sm sm:col-span-2">
                  <span className="block mb-1 text-[var(--ykp-muted)]">Description</span>
                  <textarea
                    rows={5}
                    className={fieldClass}
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  />
                </label>
                <label className="text-sm">
                  <span className="block mb-1 text-[var(--ykp-muted)]">Registration status</span>
                  <select
                    className={fieldClass}
                    value={event.status}
                    onChange={(e) => setEvent({ ...event, status: e.target.value as YkpEvent['status'] })}
                  >
                    <option value="Open">Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
                <label className="text-sm flex items-center gap-2 mt-6">
                  <input
                    type="checkbox"
                    checked={event.registrationEnabled}
                    onChange={(e) => setEvent({ ...event, registrationEnabled: e.target.checked })}
                  />
                  Registration enabled
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" disabled={saving === 'event'} className="bg-[var(--ykp-gold)] font-semibold px-5 py-3 text-sm cursor-pointer">
                    {saving === 'event' ? 'Saving…' : 'Save event'}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </section>
    </div>
  );
};
