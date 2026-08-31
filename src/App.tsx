import React, { useCallback, useEffect, useState } from 'react';
import { ActiveTab, ModalType, YkpEvent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { EventsView } from './components/EventsView';
import { GalleryView } from './components/GalleryView';
import { AdminAttendeesView } from './components/AdminAttendeesView';
import { Seo } from './components/Seo';
import { BackToTopButton } from './components/BackToTopButton';
import { LocationMap } from './components/LocationMap';
import { HQ_LOCATION } from './lib/location';
import { YouthContactModal } from './components/Modals/YouthContactModal';
import { ProgramEnrollModal } from './components/Modals/ProgramEnrollModal';
import { LearnMoreModal } from './components/Modals/LearnMoreModal';
import { StudentRegistrationModal } from './components/Modals/StudentRegistrationModal';
import { EventRsvpModal } from './components/Modals/EventRsvpModal';
import { InvitationProfileModal } from './components/Modals/InvitationProfileModal';
import { PartnerInquiryModal } from './components/Modals/PartnerInquiryModal';
import { pathToTab, tabToPath } from './lib/seo';
import './lib/canvasTone';

function readTabFromLocation(): ActiveTab {
  if (window.location.hash === '#admin') return 'admin';
  return pathToTab(window.location.pathname);
}

export default function App() {
  const [activeTab, setActiveTabState] = useState<ActiveTab>(readTabFromLocation);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [rsvpEvent, setRsvpEvent] = useState<YkpEvent | null>(null);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    const nextPath = tabToPath(tab);
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    if (currentPath !== nextPath) {
      window.history.pushState({ tab }, '', nextPath);
    }
    setActiveTabState(tab);
  }, []);

  useEffect(() => {
    if (window.location.hash === '#admin') {
      window.history.replaceState({ tab: 'admin' }, '', '/admin');
      setActiveTabState('admin');
    }

    const onPopState = () => {
      setActiveTabState(readTabFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
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
      <Seo tab={activeTab} />
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal={openModal}
      />

      <main id="main-content" className="flex-1" tabIndex={-1}>
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

      {activeTab !== 'admin' &&
        (activeTab === 'home' || activeTab === 'about' || activeTab === 'offerings' || activeTab === 'contact') && (
        <LocationMap
          location={HQ_LOCATION}
          title="Karachi, Pakistan"
          description="Youth ka Pakistan is based in Karachi and works with youth nationwide. Open the map in Google or Bing for directions."
        />
      )}

      <Footer
        setActiveTab={setActiveTab}
        openModal={openModal}
      />
      <BackToTopButton page={activeTab} />

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
