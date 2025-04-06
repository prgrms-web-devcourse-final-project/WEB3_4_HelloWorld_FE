'use client';

import { useDisclosure } from '@heroui/react';
import { useState } from 'react';

import ModalView from './ModalView';

import Calendar from '@/components/molecules/Calendar';
import dayjs from '@/utils/dayjsSetup';

const CalendarWithModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD'),
  );

  const handleRedDotClick = (date: string) => {
    setSelectedDate(date);
    onOpen();
  };

  return (
    <>
      <Calendar onRedDotClick={handleRedDotClick} />
      <ModalView
        isOpen={isOpen}
        scheduleDate={selectedDate}
        onClose={onClose}
      />
    </>
  );
};

export default CalendarWithModal;
