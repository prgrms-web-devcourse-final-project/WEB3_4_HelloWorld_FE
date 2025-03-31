import { create } from 'zustand';
import { Schedule } from '@/types/schedule';

type CalendarStore = {
  selectedSchedules: Schedule[];
  setSchedulesByDate: (date: string) => void;
  scheduleList: Schedule[];
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedSchedules: [],
  setSchedulesByDate: (date) =>
    set((state) => {
      const newItems = state.scheduleList.filter((s) => s.date === date);
      return {
        selectedSchedules: [...state.selectedSchedules, ...newItems],
      };
    }),
  scheduleList: [
    {
      date: '2025-03-25',
      title: '오늘 운동은 성공적 !',
      description: '별 하나에 추억과 별 하나에 사랑과...',
      tag: '오운했',
    },
    {
      date: '2025-03-26',
      title: '오늘 의 Dream!',
      description: '예쁘네 오늘도 어제만큼...',
      tag: '오운했',
    },
  ],
}));
