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

      const existingIds = new Set(state.selectedSchedules.map((s) => s.id));
      const filtered = newSchedules.filter((s) => !existingIds.has(s.id));

      return {
        selectedSchedules: [...state.selectedSchedules, ...filtered],
      };
    }),

  resetSelectedSchedules: () => set({ selectedSchedules: [] }),
}));
