import React, { useState } from 'react';
import { ActiveTab, ModalType, YkpEvent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { EventsView } from './components/EventsView';
import { GalleryView } from './components/GalleryView';
import { YouthContactModal } from './components/Modals/YouthContactModal';
import { ProgramEnrollModal } from './components/Modals/ProgramEnrollModal';
import { LearnMoreModal } from './components/Modals/LearnMoreModal';
import { StudentRegistrationModal } from './components/Modals/StudentRegistrationModal';
import { EventRsvpModal } from './components/Modals/EventRsvpModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rsvpEvent, setRsvpEvent] = useState<YkpEvent | null>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setRsvpEvent(null);
  };

  const openRsvp = (event: YkpEvent) => {
    setRsvpEvent(event);
    setActiveModal('event-rsvp');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--ykp-canvas)] text-[var(--ykp-ink)] font-sans">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal={openModal}
      />

      <main className="flex-1">
        {(activeTab === 'home' || activeTab === 'about' || activeTab === 'offerings') && (
          <HomeView
            setActiveTab={setActiveTab}
            openModal={openModal}
            onRsvp={openRsvp}
          />
        )}

        {activeTab === 'events' && (
          <EventsView onRsvp={openRsvp} />
        )}

        {activeTab === 'gallery' && (
          <GalleryView />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      <Footer
        setActiveTab={setActiveTab}
        openModal={openModal}
      />

      <YouthContactModal
        isOpen={activeModal === 'contact'}
        onClose={closeModal}
      />

      <ProgramEnrollModal
        isOpen={activeModal === 'program-enroll'}
        onClose={closeModal}
      />

      <LearnMoreModal
        isOpen={activeModal === 'learn-more'}
        onClose={closeModal}
      />

      <StudentRegistrationModal
        isOpen={activeModal === 'student-register'}
        onClose={closeModal}
      />

      <EventRsvpModal
        event={activeModal === 'event-rsvp' ? rsvpEvent : null}
        onClose={closeModal}
      />
    </div>
  );
}
