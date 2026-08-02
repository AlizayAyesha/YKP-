import React, { useState } from 'react';
import { ActiveTab, ModalType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { BlogView } from './components/BlogView';
import { ContactView } from './components/ContactView';
import { YouthContactModal } from './components/Modals/YouthContactModal';
import { ProgramEnrollModal } from './components/Modals/ProgramEnrollModal';
import { LearnMoreModal } from './components/Modals/LearnMoreModal';
import { StudentRegistrationModal } from './components/Modals/StudentRegistrationModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--ykp-canvas)] text-[var(--ykp-ink)] font-sans">
      
      {/* Sticky Top Header */}
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openModal={openModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {(activeTab === 'home' || activeTab === 'about' || activeTab === 'offerings') && (
          <HomeView 
            setActiveTab={setActiveTab}
            openModal={openModal}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}

        {activeTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab}
        openModal={openModal}
      />

      {/* Interactive Youth Modals */}
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

    </div>
  );
}


