import React from 'react';
import { EventDetailView } from './EventDetailView';
import { FEATURED_EVENT } from '../data/youthData';
import { ModalType, YkpEvent } from '../types';

interface EventsViewProps {
  onRsvp: (event: YkpEvent) => void;
  openModal: (type: ModalType) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onRsvp, openModal }) => {
  return (
    <EventDetailView
      event={FEATURED_EVENT}
      onRsvp={onRsvp}
      onSubmitProfile={() => openModal('invitation-profile')}
    />
  );
};
