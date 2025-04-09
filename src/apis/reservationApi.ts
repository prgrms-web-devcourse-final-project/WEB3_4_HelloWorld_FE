import type { ReservationResponse } from '@/types/reservation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getMemberReservations = async (): Promise<ReservationResponse> => {
  const token = localStorage.getItem('accessToken');

  const res = await fetch(`${API_BASE_URL}/reservation/member`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('예약 내역 조회 실패');
  }

  const data: ReservationResponse = await res.json();

  return data;
};
