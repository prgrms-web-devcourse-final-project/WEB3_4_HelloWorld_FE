import { create } from 'zustand';

interface Schedule {
  id: number;
  date: string;
  title: string;
  description: string;
  tag: string;
}

interface CalendarStore {
  scheduleList: Schedule[];
  selectedSchedules: Schedule[];
  setScheduleList: (list: Schedule[]) => void;
  setSchedulesByDate: (date: string) => void;
  resetSelectedSchedules: () => void;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  scheduleList: [],
  selectedSchedules: [],

  setScheduleList: (list) => set({ scheduleList: list }),

  setSchedulesByDate: (date) =>
    set((state) => {
      const newSchedules = state.scheduleList.filter((s) => s.date === date);

      const validOld = state.selectedSchedules.filter((s) =>
        state.scheduleList.some((item) => item.id === s.id),
      );

      const notDuplicated = newSchedules.filter(
        (s) => !validOld.some((existing) => existing.id === s.id),
      );

      return {
        selectedSchedules: [...validOld, ...notDuplicated],
      };
    }),

  resetSelectedSchedules: () => set({ selectedSchedules: [] }),
}));
