import { ReservationItem } from '@/types/reservation';

export interface CommonHistory {
  id: string;
  status: string;
  time: string;
  content: string;
  seller: string;
  price: number;
}

export const convertReservationToHistory = (
  data: ReservationItem[],
): CommonHistory[] => {
  return data.map((item) => {
    const status = item.completedDate ? '만료' : '예약';
    const time = `${item.date} ${item.time}:00`;
    const content = item.productName;
    const seller = `트레이너 #${item.trainerId}`;

    return {
      id: String(item.reservationId),
      status,
      time,
      content,
      seller,
      price: item.price,
    };
  });
};
