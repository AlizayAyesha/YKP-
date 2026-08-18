import React, { useEffect, useState } from 'react';
import { ActiveTab, ModalType, YkpEvent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { EventsView } from './components/EventsView';
import { GalleryView } from './components/GalleryView';
import { AdminAttendeesView } from './components/AdminAttendeesView';
import { YouthContactModal } from './components/Modals/YouthContactModal';
import { ProgramEnrollModal } from './components/Modals/ProgramEnrollModal';
import { LearnMoreModal } from './components/Modals/LearnMoreModal';
import { StudentRegistrationModal } from './components/Modals/StudentRegistrationModal';
import { EventRsvpModal } from './components/Modals/EventRsvpModal';
import { InvitationProfileModal } from './components/Modals/InvitationProfileModal';
import { PartnerInquiryModal } from './components/Modals/PartnerInquiryModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rsvpEvent, setRsvpEvent] = useState<YkpEvent | null>(null);

  useEffect(() => {
    if (window.location.hash === '#admin') {
      setActiveTab('admin');
    }
  }, []);

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
          <EventsView onRsvp={openRsvp} openModal={openModal} />
        )}

        {activeTab === 'gallery' && (
          <GalleryView />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'contact' && (
          <ContactView openModal={openModal} />
        )}

        {activeTab === 'admin' && (
          <AdminAttendeesView />
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
        onBackToEvents={() => setActiveTab('events')}
      />

      <InvitationProfileModal
        isOpen={activeModal === 'invitation-profile'}
        onClose={closeModal}
      />

      <PartnerInquiryModal
        isOpen={activeModal === 'partner-inquiry'}
        onClose={closeModal}
      />
    </div>
  );
}
