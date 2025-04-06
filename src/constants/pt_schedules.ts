export const ptSchedules = [
  {
    id: '0',
    label: '일요일',
  },
  {
    id: '1',
    label: '월요일',
  },
  {
    id: '2',
    label: '화요일',
  },
  {
    id: '3',
    label: '수요일',
  },
  {
    id: '4',
    label: '목요일',
  },
  {
    id: '5',
    label: '금요일',
  },
  {
    id: '6',
    label: '토요일',
  },
];

// 타입 정의도 추가
export interface PtSchedule {
  id: number;
  label: string;
}
